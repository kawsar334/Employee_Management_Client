import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserRole = () => {
  const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
          const response = await axios.get('http://localhost:7000/api/auth/jwt', {
          withCredentials: true, 
        });
          setUserRole(response.data?.user?.role);
          // console.log(response.data.message)
      } catch (err) {
        setError('Failed to fetch user role. Please try again.');
        // console.error(err.response.data?.message);
      }
    };

    fetchUserRole();
  }, [userRole]);
    return {
        userRole,
        error,
    }

};

export default UserRole;
