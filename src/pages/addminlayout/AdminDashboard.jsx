

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import AdminEmployeeList from './AdminPageEmployee';
import axios from 'axios';
import AdminEmployeeListComponent from '../../components/admincomponents/AdminEmployeeComponent';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [hr, sethr] = useState([]);
  const [fired, setfired] = useState([]);
  useEffect(()=>{
    const users = async()=>{
      try{
        const res = await axios.get("https://server-wheat-xi.vercel.app/api/user/userList",{
          withCredentials:true
        });
        console.log(res.data.data);
        setEmployees(res.data.data);
        // const hrr = res.data.data.filter((item)=>item.role === "hr");
        const emp = res.data.data.filter((item) => item.isFired === true);
        console.log(emp)
        setfired(res.data.data.filter((item) => item.isFired === true))
        sethr(res.data.data.filter((item) => item.role === "hr"))
      }catch(err){
        console.log(err); 
      }
    }
    users();
  },[])
  return (
    <div className="flex justify-start gap-3  bg-gray-100 w-full">
      <Sidebar />

     
      <div className="flex-1 p-">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          {/* <div>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md"
            />
          </div> */}
        </header>

        {/* Dashboard Content */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white p-4 rounded shadow text-center">
              <i className="fas fa-users text-blue-500 text-3xl mb-2"></i>
              <h3 className="text-gray-500">Total Employees</h3>
              <p className="text-2xl font-bold">{employees.length}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
          
              <i className="fas fa-users  text-green-500 text-3xl mb-2"></i>
              <h3 className="text-gray-500">Total Hr</h3>
              <p className="text-2xl font-bold">{hr.length}</p>
            </div>
            {/* <div className="bg-white p-4 rounded shadow text-center">
              <i className="fas fa-shopping-cart text-yellow-500 text-3xl mb-2"></i>
              <h3 className="text-gray-500">Blocked /fired Employees</h3>
              <p className="text-2xl font-bold">{fired.length}</p>
            </div> */}
          </div>

          {/* Employees Section */}
          <div className="mt-8">
            <AdminEmployeeListComponent/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
