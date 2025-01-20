
import React from "react";
import { NavLink } from "react-router-dom";
import ContactUs from "../pages/publicLayout/Contact";
import SocialLinks from "../components/socialLinks/SocialLinks";

const CallToAction = () => {
    return (
        <section className="py-16 bg-main opacity-100 text-white text-center h-max" data-aos="zoom-in">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-4">Get Started with Our Employee Management System</h2>
                <p className="text-lg mb-6">
                    Manage your employees efficiently with our easy-to-use and secure platform. Start now to streamline your HR processes!
                </p>
                <NavLink
                    href="/register"
                    className="bg-text my-10 text-main hover:bg-indigo-100 py-3 px-6 rounded-full font-semibold transition duration-300"
                >
                    Sign Up Today
                </NavLink>

                {/* <ContactUs/> */}
            </div>
            <div className="flex justify-center my-10">
                <a href="https://facebook.com" className="text-text  hover:text-white mx-2">
                    <i className="fab fa-facebook-square text-4xl "></i>
                </a>
              
                <a href="https://linkedin.com" className="text-text  hover:text-white mx-2">
                    <i className="fab fa-linkedin text-4xl "></i>
                </a>
                <a href="https://instagram.com" className="text-text  hover:text-white mx-2">
                    <i className="fab fa-instagram-square text-4xl "></i>
                </a>
            </div>
        </section>
    );
};

export default CallToAction;
