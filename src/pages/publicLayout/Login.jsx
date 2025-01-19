import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProviders';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ toggleToRegister }) => {
  const { signInWithGoogle, signInUser, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [vissible, setVissible] = useState(false)
  const navigate = useNavigate()

  const handleGoogleLogin = () => {
    signInWithGoogle(navigate)
  }

  const handleLoginWithEmailAndPassword=async(e)=>{
    e.preventDefault()
    try{

      const res= await signInUser(email, password);
     setUser(res.user);
     console.log(res.user)
      
      const sendData = await axios.post("https://employee-one-coral.vercel.app/api/auth/login",{email,password},{
        withCredentials: 'include', 
      });
      console.log()
      if (sendData?.status === 200){
        toast.success('Login successful!');
        navigate('/dashboard')
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      }else{
        navigate('/login')
      }
    }catch(err){
      toast.error('An error occurred during login.');
    }
  }

  return (
    <div className="flex justify-center items-center flex-col  mx-auto h-screen  bg-gradient-to-r from-main to-transparent " 
    
    >
      <div className='flex justify-center items-center gap-2 flex-col bg- rounded p-7 my-10 border shadow  w-[95%] md:w-max '>
        <h1 className='text-3xl font-semibold '>Login</h1>
        <form onSubmit={handleLoginWithEmailAndPassword} className='w-[100%] md:w-[500px]  flex justify-center items-center gap-2 flex-col p-4 '>
          <div className='flex justify-start items-start gap-1 flex-col  w-full'>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full placeholder:text-[lightgray] border px-4 py-2 rounded '
              placeholder='Email'
            />
          </div>
          <div className='flex justify-start items-start gap-1 flex-col w-full relative'>
            <label>Password:</label>
            <input
              type={vissible ? "text" : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full placeholder:text-[lightgray] border px-4 py-2 rounded '
              placeholder='password'
            />
        { vissible?   <i className="fas fa-eye cursor-pointer absolute right-[30px] top-[40px]" onClick={()=>setVissible(!vissible)}></i>: 
            <i className="fas fa-eye-slash  cursor-pointer absolute right-[30px] top-[40px]" onClick={()=>setVissible(!vissible)}></i>} 

         </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className='w-full border px-3 py-2 rounded  bg-main text-white'>Login</button>
        </form>

        <button onClick={handleGoogleLogin} className='border hover:bg-main hover:text-text transition-all duration-500  px-4 py-2 text-white w-[93%]   rounded'>
          Login with Google
        </button>
        <NavLink to="/register" >
          Don't have any account? <span className='text-blue-400' >Register here</span>
        </NavLink>
    </div>
    </div>
  );
};

export default Login;
