

import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProviders';
import UserRole from '../../essentialRoutes/UserRole';
import axios from 'axios';

const Sidebar = () => {
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState([]);
    const { user } = useContext(AuthContext);
    const { userRole } = UserRole();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('https://server-wheat-xi.vercel.app/api/auth/jwt', {
                    withCredentials: true,
                });
                setUserId(response.data?.user.id);
            } catch (err) {
                console.error('Error fetching user role:', err);
            }
        };
        fetchUserRole();
    }, []);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("https://server-wheat-xi.vercel.app/api/message/messages", { withCredentials: true });
                setMessage(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        fetchReports();
    }, []);

    return (
        <div className="bg-main text-white  p-5 w-full md:w-72 h-screen shadow-lg sticky left-0 top-0  hidden md:flex flex-col">
            <h1 className="text-xl font-bold text-text mb-6 capitalize"> <i className="fas fa-tasks text-text mr-2"></i> {user?.displayName}</h1>
            {userRole === 'admin' && (
                <div className="flex  flex-col gap-4">
                    <NavLink to="/dashboard" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Admin Dashboard</NavLink>
                    <NavLink to="/all-employee-list" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Employee list</NavLink>
                    <NavLink to="/payroll" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> User Management</NavLink>
                    <NavLink to="/admin/reports" className="text-lg hover:text-blue-600">
                        <span className='text-text'>-</span> Reports <span className="text-red-500">{message.length}</span>
                    </NavLink>

                </div>
            )}
            {userRole === 'hr' && (
                <div className="flex flex-col gap-4 mt-6">
                    <NavLink to="/dashboard" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Dashboard</NavLink>
                    <NavLink to="/employeelist" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Employee</NavLink>
                    <NavLink to="/analytics" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Progress</NavLink>
                </div>
            )}
            {userRole === 'employee' && user && (
                <div className="flex flex-col gap-4 mt-6 w-full">
                    <NavLink to="/dashboard" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Dashboard</NavLink>
                    <NavLink to="/payment-history" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Payment History</NavLink>
                    <NavLink to="/worksheet" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Worksheet</NavLink>
                </div>
            )}
            <div className="flex flex-col gap-4 mt-6 border-t pt-4">
                <NavLink to="/" className="text-lg hover:text-blue-600">Home</NavLink>
                <NavLink to="/contact" className="text-lg hover:text-blue-600">Contact</NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
