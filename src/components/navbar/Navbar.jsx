import React from 'react';

const Navbar = ({ role }) => {

 
  const user= {}
  
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Noukori.com</div>
        <div className="space-x-6">
          {/* General Navigation Items */}
          <a href="/contact-us" className="text-lg">Contact Us</a>

          {/* Admin-Specific Links */}
          {role === 'admin' && (
            <>
              <a href="/admin/dashboard" className="text-lg">Admin Dashboard</a>
              <a href="/admin/user-management" className="text-lg">User Management</a>
              <a href="/admin/reports" className="text-lg">Reports</a>
            </>
          )}

          {/* HR-Specific Links */}
          {role === 'hr' && (
            <>
              <a href="/hr/dashboard" className="text-lg">HR Dashboard</a>
              <a href="/hr/employee-management" className="text-lg">Employee Management</a>
              <a href="/hr/analytics" className="text-lg">Analytics</a>
            </>
          )}

          {/* Conditional Login / Logout */}
          {!user ? (
            <>
              <a href="/login" className="text-lg">Login</a>
              <a href="/register" className="text-lg">Register</a>
            </>
          ) : (
            <div className='bg-teal flex '>
              <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full cursor-pointer" onClick={() => {/* Logout function here */ }} />
              <button onClick={() => {/* Logout function here */ }} className="text-lg">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
