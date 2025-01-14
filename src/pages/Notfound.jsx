import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <p className="text-2xl text-gray-700 mb-6">Oops! Page not found.</p>
            <p className="text-gray-500 mb-8 text-center">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
