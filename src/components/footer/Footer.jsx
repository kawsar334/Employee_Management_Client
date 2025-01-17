import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
    
        <div className="grid md:grid-cols-3 gap-8">
      
          <div>
            <h3 className="text-2xl font-semibold mb-4">About Us</h3>
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
                <a href="#about" className="text-gray-400 hover:text-indigo-500">About</a>
              </li>
              <li className="mb-2">
                <a href="#contact" className="text-gray-400 hover:text-indigo-500">Contact</a>
              </li>
              <li className="mb-2">
                <a href="#signup" className="text-gray-400 hover:text-indigo-500">Sign Up</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">1234 Employee Rd, HR City, 56789</p>
            <p className="text-gray-400 mb-2">Phone: +1 234 567 890</p>
            <p className="text-gray-400">Email: support@company.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
