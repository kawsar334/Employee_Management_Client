


import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProviders';
import UserRole from '../../essentialRoutes/UserRole';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { userRole } = UserRole();
  const { user, signOutUser } = useContext(AuthContext);


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

          {/* <NavLink to="/dashboard" className="text-lg hover:text-gray-300">Dashboard</NavLink> */}

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
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
          }}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div id="mobile-menu" className="md:hidden  flex flex-col space-y-4 mt-4">
        <NavLink to="/contact" className="text-lg">Contact</NavLink>
        {userRole === 'admin' && <NavLink to="/dashboard" className="text-lg">Dashboard</NavLink>}
        {userRole === 'hr' && <NavLink to="/dashboard" className="text-lg">Dashboard</NavLink>}
        {userRole === 'employee' && user && <NavLink to="/dashboard" className="text-lg">Dashboard</NavLink>}
        {!user ? (
          <>
            <NavLink href="/login" className="text-lg">Login</NavLink>
            <NavLink href="/register" className="text-lg">Register</NavLink>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-10 h-10 rounded-full border-2 object-cover"
            />
            <button onClick={signOutUser} className="text-lg">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
