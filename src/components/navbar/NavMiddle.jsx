import React from 'react'
import { NavLink } from 'react-router-dom'

const NavMiddle = () => {
    return (
        <div className='w-full bg-white mx-auto shadow-sm sticky top-0 left-0 z-50 '>

            <div className="navbar  lg:px-10   py-3">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a><i className="fa-solid fa-user"></i>
                                </a>
                                <ul className="p-2 ">
                                    <li><NavLink to="/login">Login</NavLink></li>
                                    <li><NavLink to="/register">Register</NavLink></li>
                                </ul>
                            </li>
                            <li><NavLink to="/products">products</NavLink></li>
                        </ul>
                    </div>
                    <NavLink className="btn btn-ghost text-xl " to="/">
                        <span className='first-letter:text-teal teaxt-white'>AL-ANUD</span>
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/products">products</NavLink></li>
                        <li>
                            <details>
                                <summary><i class="fa-solid fa-user"></i>
                                </summary>
                                <ul className="p-2">
                                    <li><NavLink to="/login">Login</NavLink></li>
                                    <li><NavLink to="/products">products</NavLink></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>products</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li><a><i class="fa-solid fa-cart-shopping"></i>
                            </a></li>
                            <li><a><i class="fa-solid fa-heart"></i>
                            </a></li>
                            <li>
                                <details>
                                    <summary><i class="fa-solid fa-user"></i>
                                    </summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li><NavLink to="/login">Login</NavLink></li>
                                        <li><NavLink to="/register">Register</NavLink></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavMiddle