

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
                const response = await axios.get('http://localhost:7000/api/auth/jwt', {
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
                const response = await axios.get("http://localhost:7000/api/message/messages", { withCredentials: true });
                setMessage(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        fetchReports();
    }, []);

    return (
        <div className="bg-white text-gray-500 p-5 w-72 h-screen shadow-lg">
            <h1 className="text-xl font-bold text-gray-700 mb-6 capitalize">{user?.displayName}</h1>
            {userRole === 'admin' && (
                <div className="flex flex-col gap-4">
                    <NavLink to="/dashboard" className="text-lg hover:text-blue-600">Admin Dashboard</NavLink>
                    <NavLink to="/payroll" className="text-lg hover:text-blue-600">User Management</NavLink>
                    <NavLink to="/admin/reports" className="text-lg hover:text-blue-600">
                        Reports <span className="text-red-500">{message.length}</span>
                    </NavLink>

                </div>
            )}
            {userRole === 'hr' && (
                <div className="flex flex-col gap-4 mt-6">
                    <NavLink to="/dashboard" className="text-lg hover:text-blue-600">Dashboard</NavLink>
                    <NavLink to="/employeelist" className="text-lg hover:text-blue-600">Employee</NavLink>
                    <NavLink to="/analytics" className="text-lg hover:text-blue-600">Analytics</NavLink>
                </div>
            )}
            {userRole === 'employee' && user && (
                <div className="flex flex-col gap-4 mt-6">
                    <NavLink to="/dashboard" className="text-lg hover:text-blue-600">Dashboard</NavLink>
                    <NavLink to="/payment-history" className="text-lg hover:text-blue-600">Payment History</NavLink>
                    <NavLink to="/worksheet" className="text-lg hover:text-blue-600">Worksheet</NavLink>
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
