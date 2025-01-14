// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { setUser, setLoading, setError } from './authSlice';
// import { auth } from '../firebase';

// export const login = (email, password) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         dispatch(setUser(userCredential.user));
//     } catch (error) {
//         dispatch(setError(error.message));
//     } finally {
//         dispatch(setLoading(false));
//     }
// }

// export const signup = (email, password) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         dispatch(setUser(userCredential.user));
//     } catch (error) {
//         dispatch(setError(error.message));
//     } finally {
//         dispatch(setLoading(false));
//     }
// };


// export const logout =()=>async(dispatch)=>{
//     dispatch(setLoading(true));
//     try {
//         await signOut(auth);
//         dispatch(setUser(null));
//     } catch (error) {
//         dispatch(setError(error.message));
//     } finally {
//         dispatch(setLoading(false));
//     }
// }


// export const googleLogin = ()=>async(dispatch)=>{
//     dispatch(setLoading(true));
//     try {
//         const provider = new GoogleAuthProvider();
//         const result = await signInWithPopup(provider);
//         dispatch(setUser(result.user));
//     } catch (error) {
//         dispatch(setError(error.message));
//     } finally {
//         dispatch(setLoading(false));
//     }   
// }


import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { setUser, setLoading, setError } from './authSlice';
import axios from 'axios';
import { auth } from '../firebase';

// export const login = (email, password) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         const { data } = await axios.post('/api/auth/login', { email, password });
//         dispatch(setUser(data.user));
//     } catch (error) {
//         dispatch(setError(error.response?.data?.message || error.message));
//     } finally {
//         dispatch(setLoading(false));
//     }
// };
// 


export const register = (email, password, photoURL, name, navigate, toast)=>async(dispatch)=>{
    dispatch(setLoading(true));
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: name,
            photoURL: photoURL,
        })
        const userInfo = {
            email: user.email,
            uid: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
        };

        console.log(email, password, photoURL, name)
        const response = await axios.post("https://server-anud.vercel.app/api/auth/register", userInfo);
        console.log(response)
        if (response.data?.user) {
            // dispatch(setUser(response.data.user)); // Update Redux store with user data
            toast.success("Registration successful!");
            navigate("/"); // Redirect to homepage or another page
        }
      dispatch(setLoading(false));
    }catch(error){
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(setError(errorMessage));
        toast.error(errorMessage || "Registration failed. Please try again.");
      console.log(error)
    }

}
export const login =(email, password, navigate,toast)=> async (dispatch) => {
  
     dispatch(setLoading(true));
    try {
      const response = await axios.post("https://server-anud.vercel.app/api/auth/login",
        { email, password },
        { withCredentials: true } 
      );
      if (response.data?.user){
          dispatch(setUser(response.data?.user));
        toast.success("Login successful!");
        navigate("/");
        localStorage.setItem("user", response.data?.user?._id);
      }

    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed. Please try again.");
        dispatch(setError(error.response?.data?.error || "Login failed. Please try again."));
        dispatch(setLoading(false))
    } finally {
      setLoading(false);
    }
  }



// 

export const signup = (email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        // Send signup data to the backend
        const { data } = await axios.post('/api/auth/signup', { email, password });
        dispatch(setUser(data.user));
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const logout = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await axios.post('/api/auth/logout');
        dispatch(setUser(null));
    } catch (error) {
        dispatch(setError(error.response?.data?.message || error.message));
    } finally {
        dispatch(setLoading(false));
    }
};




export const loginGoogle = (navigate, toast) => async (dispatch)=>{
     dispatch(setLoading(true));
   try{
     const provider = new GoogleAuthProvider();
     const result = await signInWithPopup(auth, provider);
     const userInfo = {
       name: result?.user?.displayName,
       email: result?.user?.email,
       photoURL: result?.user?.photoURL,
       password:""
     }
     const res = await axios.post("https://server-anud.vercel.app/api/auth/google", userInfo)
     console.log(res.data?.data)
     if (res.data?.data) {
         dispatch(setUser(res.data?.data));       
       toast.success(res?.data?.message);
         dispatch(setLoading(false));
       localStorage.setItem("user", res.data?.data?._id);
       navigate("/");
     }else{
       navigate("/login");
         dispatch(setLoading(false));
     }
   }catch(err){
    console.log(err)
    toast.error("Login failed. Please try again.");
    navigate("/login")
       dispatch(setLoading(false));
   }
  }