import React from 'react'

const SocialLinks = () => {
  return (
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
  )
}

export default SocialLinks