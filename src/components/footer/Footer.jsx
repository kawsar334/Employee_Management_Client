import React from "react";
import { NavLink } from "react-router-dom";
import SocialLinks from "../socialLinks/SocialLinks";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <div className="container mx-auto px-6">
    
        <div className="grid md:grid-cols-3 gap-3 md:gap-8">
      
          <div>
            {/* <h3 className="text-2xl font-semibold mb-4">About Us</h3> */}
             <NavLink to="/" className="text-3xl font-bold text-text ">Noukori <span className="text-white">Gulf</span></NavLink>
            <p className="text-gray-400">
              We provide top-notch solutions to manage your employees. Our platform streamlines HR processes, ensuring efficiency and security.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="#services" className="text-gray-400 hover:text-indigo-500">Services</a>
              </li>
              <li className="mb-2">
                <NavLink to="/" className="text-gray-400 hover:text-indigo-500">About</NavLink>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-gray-400 hover:text-indigo-500">Contact</a>
              </li>
              <li className="mb-2">
                <NavLink to="/register" className="text-gray-400 hover:text-indigo-500">Sign Up</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">1234 Taif, Soudi arabia, </p>
            <p className="text-gray-400 mb-2">Phone: +966509325731</p>
            <p className="text-gray-400">Email: kawsarfiroz11@gmail.com</p>
          </div>
        </div>
        {/* <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <div className="flex justify-center mb-4">
            <a href="https://facebook.com" className="text-gray-400 hover:text-indigo-500 mx-2">
              <i className="fab fa-facebook-square text-2xl"></i>
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-indigo-500 mx-2">
              <i className="fab fa-twitter-square text-2xl"></i>
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-indigo-500 mx-2">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-indigo-500 mx-2">
              <i className="fab fa-instagram-square text-2xl"></i>
            </a>
          </div>
          <p className="text-gray-400 text-sm">&copy; 2025 Your Company. All rights reserved.</p>
        </div> */}

        <SocialLinks/>
      </div>
    </footer>
  );
};

export default Footer;
