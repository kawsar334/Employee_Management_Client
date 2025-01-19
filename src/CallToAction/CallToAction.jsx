
import React from "react";
import { NavLink } from "react-router-dom";
import ContactUs from "../pages/publicLayout/Contact";

const CallToAction = () => {
    return (
        <section className="py-16 bg-indigo-600 text-white text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-4">Get Started with Our Employee Management System</h2>
                <p className="text-lg mb-6">
                    Manage your employees efficiently with our easy-to-use and secure platform. Start now to streamline your HR processes!
                </p>
                <NavLink
                    href="/register"
                    className="bg-white text-indigo-600 hover:bg-indigo-100 py-3 px-6 rounded-full font-semibold transition duration-300"
                >
                    Sign Up Today
                </NavLink>


                <ContactUs/>
            </div>
        </section>
    );
};

export default CallToAction;
