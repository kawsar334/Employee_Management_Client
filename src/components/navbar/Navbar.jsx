


import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProviders';
import UserRole from '../../essentialRoutes/UserRole';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { userRole } = UserRole();
  const { user, signOutUser } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);


  return (
    <nav className="bg-main text-text p-4 sticky top-0 left-0 z-40 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-3xl font-bold text-text ml-3 ">Noukori <span className="text-white">Gulf</span></NavLink>
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className="text-lg hover:text-gray-300">Home</NavLink>
          <NavLink to="/contact" className="text-lg hover:text-gray-300">Contact</NavLink>

          {/* {userRole === 'admin' && (
            <NavLink to="/dashboard" className="text-lg hover:text-gray-300">Dashboard</NavLink>
          )}
          {user&&<NavLink to="/profile" className="text-white capitalize font-semibold cursor-pointer hover:text-blue-500">{user?.displayName}</NavLink>}
          {userRole === 'hr' && (
            <NavLink to="/dashboard" className="text-lg hover:text-gray-300">Dashboard</NavLink>
          )} */}
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
              <NavLink to="/profile">

              <img
                src={user?.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 object-cover"
                />
                </NavLink>
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

      {openMenu &&<div className="bg-main md:hidden rounded text-gray-500 p-5 w-full md:w-72 h-screen shadow-lg sticky left-0 top-[500px] my-10 ">
        <h1 className="text-xl font-bold text-gray-700 mb-6 capitalize"> <i className="fas fa-tasks text-green-500 mr-2 hidden"></i> {user?.displayName}</h1>
        {userRole === 'admin' && (
          <div className="flex flex-col gap-4">
            {/* <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/dashboard" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Admin Dashboard</NavLink> */}
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/all-employee-list" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Employee list</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/payroll" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> User Management</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/admin/reports" className="text-lg hover:text-blue-600">
              <span className='text-text'>-</span> Reports 
            </NavLink>

          </div>
        )}
        {userRole === 'hr' && (
          <div className="flex flex-col gap-4 mt-6">
            {/* <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/dashboard" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Dashboard</NavLink> */}
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/employeelist" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Employee</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/analytics" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Progress</NavLink>
          </div>
        )}
        {userRole === 'employee' && user && (
          <div className="flex flex-col gap-4 mt-6 w-full">
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/dashboard" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Dashboard</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/payment-history" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Payment History</NavLink>
            <NavLink     onClick={()=>setOpenMenu(!openMenu)} to="/worksheet" className="text-lg hover:text-blue-600"><span className='text-text'>-</span> Worksheet</NavLink>
          </div>
        )}
        <div className="flex flex-col gap-4 mt-6  pt-4">
          <NavLink    onClick={()=>setOpenMenu(!openMenu)} to="/" className="text-lg hover:text-blue-600">Home</NavLink>
          <NavLink    onClick={()=>setOpenMenu(!openMenu)} to="/contact" className="text-lg hover:text-blue-600">Contact</NavLink>
        </div>


        <div className='md:hidden'>
          {!user ? (
            <div className=' flex flex-col gap-2'>
              <NavLink    onClick={()=>setOpenMenu(!openMenu)} to="/login" className="text-lg hover:text-gray-300">Login</NavLink>
              <NavLink    onClick={()=>setOpenMenu(!openMenu)} to="/register" className="text-lg hover:text-gray-300">Register</NavLink>
            </div>
          ) : (
              <div className="flex items-center space-x-3 my-2" onClick={() => setOpenMenu(!openMenu)}>
                <NavLink to="/profile">
              <img
                src={user?.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 object-cover "
              />
                </NavLink>
              <button onClick={signOutUser} className="text-lg  hover:text-gray-300">Logout</button>
            </div>
          )}
        </div>
      </div>}
      {/*  */}
    </nav>
  );
};

export default Navbar;
