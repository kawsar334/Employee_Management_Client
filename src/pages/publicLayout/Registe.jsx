

import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProviders';
import { NavLink, useNavigate } from 'react-router-dom';

const Registration = ({ toggleToLogin }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState("")
    const [bankAccountNo, setBankAccountNo] =useState("");
    const [salary, setSalary] = useState(null);

   
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [photo, setPhoto] = useState(null); 
    const [errors, setErrors] = useState('');
    const navigate= useNavigate()
    const { createUser, signInWithGoogle } = useContext(AuthContext)
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'employee';

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) errors.push('Password must be at least 6 characters long.');
        if (!/[A-Z]/.test(password)) errors.push('Password must have at least one capital letter.');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Password must have at least one special character.');
        return errors;
    };

    const handlePhotoUpload = async () => {

        if (!photo) {
            toast.error('Please upload a profile picture!');
            return null;
        }


        const formData = new FormData();
        formData.append('file', photo);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            console.log(response.data.secure_url)
            return response.data.secure_url; 
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            toast.error('Failed to upload photo.');
            return null;
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const validationErrors = validatePassword(password);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const photoURL = await handlePhotoUpload();
            if (!photoURL) return;
            createUser(email, password, name, photoURL, role, navigate)
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.message || 'Registration failed.');
        }
    };


    // login with google function 
    const handleGoogleLogin = () => {
        signInWithGoogle(navigate)
    }

    return (
        <div className="flex justify-center items-center flex-col ">
            <div className=' w-full md:w-max  my-10 rounded p-4  shadow-md'>
                <h1 className='w-full text-center text-2xl my-1'>Register</h1>
                <form onSubmit={handleRegistration} className='flex mx-auto w-[90%] md:w-[500px] justify-center items-center flex-col gap-3'>

                    <div className='flex justify-center items-center '>
                        <div className='w-full flex justify-start items-start flex-col  p-1'>
                            <label>Name:</label>
                            <input
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                                required
                                className='w-full py-1 px-2 rounded border placeholder:text-[lightgray]'
                            />
                        </div>

                        <div className='w-full flex justify-start items-start flex-col  p-1'>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder='Email'
                                className='w-full py-1 px-2 rounded border placeholder:text-[lightgray]'
                            />
                        </div>
                    </div>

                    <div className='flex w-full justify-center items-center '>
                        <div className='w-full flex justify-start items-start flex-col  p-1'>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder='Password'
                                className='w-full py-1 px-2 rounded border placeholder:text-[lightgray]'
                            />
                        </div>
                        <div className='w-full flex justify-start items-start flex-col  p-1'>
                            <label>Designation:</label>
                            <input
                                type="text"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required
                                placeholder='Designation'
                                className='w-full py-1 px-2 rounded border placeholder:text-[lightgray]'
                            />
                        </div>
                    </div>
                    {/*  */}
                    <div className='flex w-full justify-center items-center '>
                        <div className='w-full flex justify-start items-start flex-col  p-1'>
                            <label>salary:</label>
                            <input
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                required
                                placeholder='salary'
                                className='w-full py-1 px-2 rounded border placeholder:text-[lightgray]'
                            />
                        </div>
                        <div className='w-full flex justify-start items-start flex-col  p-1'>
                            <label>bankAccountNo:</label>
                            <input
                                type="text"
                                value={bankAccountNo}
                                onChange={(e) => setBankAccountNo(e.target.value)}
                                required
                                placeholder='bankAccountNo'
                                className='w-full py-1 px-2 rounded border placeholder:text-[lightgray]'
                            />
                        </div>
                    </div>

                    {/*  */}
                        <div className='w-full flex justify-start items-start flex-col  p-1'>
                            <label>Role:</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}
                                className='w-full py-1 px-2 rounded border '
                            >
                                <option value="employee">Employee</option>
                                <option value="hr">HR</option>
                                {/* <option value="admin">Admin</option> */}
                            </select>
                        </div>

                    
                    <div className='w-full flex justify-start items-start flex-col  p-1'>
                        <label>Profile Picture:</label>
                        <input
                            placeholder='Password'
                            className='w-full py-1 px-2 rounded border placeholder:text-[lightgray] '
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            required
                        />
                    </div>
                    {errors && (
                        <div className="text-red-500">
                            {errors.map((err, idx) => (
                                <p key={idx}>{err}</p>
                            ))}
                        </div>
                    )}
                    <button type="submit" className='border  w-full py-2 px-4 rounded bg-main'>Register</button>
                </form>

                <button onClick={handleGoogleLogin}  className='border  w-full py-2 px-4 rounded bg-mn text-white'>Login with google</button>
                <NavLink to="/login" >
                    Already have an account? <span className='text-blue-400' >Login here</span>
                </NavLink>
           </div>
        </div>
    );
};

export default Registration;

