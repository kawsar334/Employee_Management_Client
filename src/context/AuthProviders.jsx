import React, { useEffect } from 'react'
import { useState } from 'react';

import { createContext } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import App from '../App';

export const AuthContext = createContext(null);


const AuthProviders = ({ children }) => {


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  // create user /register  
  const createUser = async (email, password, name, photoURL, role, bankAccountNo, navigate) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photoURL,
          email:email
        });
      } catch (profileError) {
        console.error("Error updating user profile:", profileError);
        toast.error("Failed to update profile!");
      }
      const userData = {
        uid: userCredential?.user?.uid,
        name: name,
        email: userCredential?.user?.email,
        photoURL: photoURL,
        password, 
        role,
        bankAccountNo
      };

      try {
        const response = await fetch("http://localhost:7000/api/auth/register", {
          method: "post" ,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        });

      const data =  await response.json();
        console.log(data?.data)
        setUser(data?.data)
        if (response.ok) {
          Swal.fire("Registration successful ");
          navigate("/dashboard");

          window.location.reload();
        } else {
          toast.error("Something went wrong with the backend!");
          navigate("/register");
        }
      } catch (backendError) {
        console.error("Error sending user data to backend:", backendError);
        toast.error("Failed to register user on the server!");
        navigate("/register");
      }
      setUser(userCredential.user);
      return userCredential.user;

    } catch (error) {
      console.error("Error during user registration:", error);
      toast.error(`Registration failed: ${error.message}`);
      navigate("/register");
    }
  };
// signin user 
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential; 
    } catch (error) {
      console.error('Error during sign-in:', error);

      toast.error(error.message || 'Failed to sign in. Please try again.');
      throw error; 
    } finally {
      setLoading(false); 
    }
  };


  const signOutUser = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:7000/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        const data = await response.json();      
        if (response.ok) {
          await signOut(auth); 
          setUser(null);
          Swal.fire("Signed Out!", "You have been signed out successfully.", "success");

          setTimeout(() => {
            // window.location.reload();
           window.location.replace("/")
          }, 600);
        } else {
          console.error(data.msg);
          Swal.fire("Error!", data.msg || "Failed to sign out.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to sign out. Please try again later.", "error");
      }
    }
  };

  // 
  const signInWithGoogle = async (navigate) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result?.user;
      const lastSignInTime = result?.user?.metadata?.lastSignInTime;
      const userData = {
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        lastSignInTime
      };
      const response = await fetch("http://localhost:7000/api/auth/google", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          
          
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const data = await response.json()
      console.log(user)
      if (response.ok) {
        Swal.fire("Login successful");
        setUser(user)
        navigate("/");
        window.location.reload();
      } else {
        navigate("/login");
        Swal.fire("Something went wrong during login!", "", "error");
      }
      return user;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      Swal.fire("Google sign-in failed!", "", "error");
      navigate("/login");
    }
  };

  // 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  
  const userInfo = {
    signInUser,
    loading,
    createUser,
    user,
    signOutUser,
    signInWithGoogle,
    setUser
  }

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
   
  )
}


export default AuthProviders; 