import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProviders'
import { Navigate } from 'react-router-dom';

export const RedirectRoute = ({children}) => {


    const {user} = useContext(AuthContext);

    if (user) {
        // Redirect to the dashboard if the user is already authenticated
        return <Navigate to="/" replace />;
    }
    return children;
}
