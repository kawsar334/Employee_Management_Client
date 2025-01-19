


import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProviders';
import UserRole from '../../essentialRoutes/UserRole';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { userRole } = UserRole();
  const { user, signOutUser } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);


  return (
    <nav className="bg-blue-800 text-white p-4 sticky top-0 left-0 z-40 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">Noukori.com</NavLink>
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/contact" className="text-lg hover:text-gray-300">Contact</NavLink>
          {userRole === 'admin' && (
            <NavLink to="/dashboard" className="text-lg hover:text-gray-300">Dashboard</NavLink>
          )}
          {userRole === 'hr' && (
            <NavLink to="/dashboard" className="text-lg hover:text-gray-300">Dashboard</NavLink>
          )}
          {userRole === 'employee' && user && (
            <NavLink to="/dashboard" className="text-lg hover:text-gray-300">Dashboard</NavLink>
          )}
          {!user ? (
            <>
              <NavLink to="/login" className="text-lg hover:text-gray-300">Login</NavLink>
              <NavLink to="/register" className="text-lg hover:text-gray-300">Register</NavLink>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <img
                src={user?.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 object-cover"
              />
              <button onClick={signOutUser} className="text-lg hover:text-gray-300">Logout</button>
            </div>
          )}
        </div>
        <button
        onClick={()=>setOpenMenu(!openMenu)}
          className="md:hidden text-2xl focus:outline-none">
         {!openMenu? <i className="fas fa-tasks text-green-500 mr-2"></i>:
          <i className="fas fa-xmark text-red-500 mr-2 text-3xl"></i>}

        </button>
      </div>
      {/* <div id="mobile-menu" className="hidden  md:flex flex-col space-y-4 mt-4 ">
        {userRole === 'admin' && <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/dashboard" className="text-lg">Dashboard</NavLink>}
        {userRole === 'hr' && <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/dashboard" className="text-lg">Dashboard</NavLink>}
        {userRole === 'employee' && user && <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/dashboard" className="text-lg">Dashboard</NavLink>}

      </div> */}

      {/* sidebar  */}

      {openMenu &&<div className="bg-white md:hidden rounded text-gray-500 p-5 w-full md:w-72 h-screen shadow-lg sticky left-0 top-[500px] my-10 ">
        <h1 className="text-xl font-bold text-gray-700 mb-6 capitalize"> <i className="fas fa-tasks text-green-500 mr-2 hidden"></i> {user?.displayName}</h1>
        {userRole === 'admin' && (
          <div className="flex flex-col gap-4">
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/dashboard" className="text-lg hover:text-blue-600">Admin Dashboard</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/all-employee-list" className="text-lg hover:text-blue-600">Employee list</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/payroll" className="text-lg hover:text-blue-600">User Management</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/admin/reports" className="text-lg hover:text-blue-600">
              Reports 
            </NavLink>

          </div>
        )}
        {userRole === 'hr' && (
          <div className="flex flex-col gap-4 mt-6">
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/dashboard" className="text-lg hover:text-blue-600">Dashboard</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/employeelist" className="text-lg hover:text-blue-600">Employee</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/analytics" className="text-lg hover:text-blue-600">Progress</NavLink>
          </div>
        )}
        {userRole === 'employee' && user && (
          <div className="flex flex-col gap-4 mt-6 w-full">
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/dashboard" className="text-lg hover:text-blue-600">Dashboard</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/payment-history" className="text-lg hover:text-blue-600">Payment History</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/worksheet" className="text-lg hover:text-blue-600">Worksheet</NavLink>
          </div>
        )}
        <div className="flex flex-col gap-4 mt-6 border-t pt-4">
          <NavLink    onClick={()=>setOpenMenu(!openMenu)} to="/" className="text-lg hover:text-blue-600">Home</NavLink>
          <NavLink    onClick={()=>setOpenMenu(!openMenu)} to="/contact" className="text-lg hover:text-blue-600">Contact</NavLink>
        </div>


        <div className='md:hidden'>
          {!user ? (
            <>
              <NavLink    onClick={()=>setOpenMenu(!openMenu)} to="/login" className="text-lg hover:text-gray-300">Login</NavLink>
              <NavLink    onClick={()=>setOpenMenu(!openMenu)} to="/register" className="text-lg hover:text-gray-300">Register</NavLink>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <img
                src={user?.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 object-cover hidden"
              />
              <button onClick={signOutUser} className="text-lg hover:text-gray-300">Logout</button>
            </div>
          )}
        </div>
      </div>}
      {/*  */}
    </nav>
  );
};

export default Navbar;
