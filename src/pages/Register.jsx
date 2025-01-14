import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthProviders";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";


const Register = () => {

const navigate = useNavigate()
    const { createUser, user } = useContext(AuthContext)
   
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return regex.test(password);
    };
// handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(formData.password)) {
            setError("Password must be at least 6 characters long with uppercase and lowercase letters.");
            toast.error("Password must be at least 6 characters long with uppercase and lowercase letters.");
            return;
        }

        try {
           await createUser(formData.email, formData.password, formData.name, formData.photoURL, navigate);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-transparent">
            {/* <div className="w-full max-w-md p-8 space-y-3 rounded-xl  md:border   shadow-lg">
                <h1 className="text-2xl font-bold text-center">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border-b  focus:outline-none focus:ring focus:ring-blue focus:rounded border-blue  bg-transparent text-[gray]"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border-b  focus:outline-none focus:ring focus:ring-blue focus:rounded border-blue  bg-transparent text-[gray]"
                        />
                    </div>
                    <div>
                        <label htmlFor="photoURL" className="block text-sm font-medium">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            name="photoURL"
                            id="photoURL"
                            value={formData.photoURL}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border-b  focus:outline-none focus:ring focus:ring-blue focus:rounded border-blue  bg-transparent text-[gray]"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border-b  focus:outline-none focus:ring focus:ring-blue focus:rounded border-blue  bg-transparent text-[gray]"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-2  border   rounded-md  focus:outline-none focus:ring focus:ring-blue focus:rounded   bg-transparent   "
                    >
                        Register
                    </button>
                </form>
                <p >Already Have an account ? <NavLink to="/login" className="text-blue">Login</NavLink></p>
            </div> */}
        </div>
    );
};

export default Register;

