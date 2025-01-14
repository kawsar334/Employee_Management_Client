import React, { useState } from 'react';
import "../../App.css";
import { NavLink } from 'react-router-dom';

const NavBottom = () => {
    const [open, setOpen] = useState(false);
    const [openNav, setOpenNav] = useState(false);


    // Array of categories
    const categories = ["Fruits", "Vegetables", "Dairy", "Meat", "Snacks", "Beverages", "Bakery", "Frozen Foods"];

    const handleShow = () => {
        setOpen(!open);
    };

    return (
        <>
            {!openNav && <div className="navbar bg-base-100 shadow-sm w-full relative">
                <span className='absolute right-0 md:right-[100px] top-[100px] md:top-[20px] text-3xl cursor-pointer text-red-500' onClick={() => setOpenNav(true)}>
                <i class="fa-solid fa-xmark"></i>
                </span>
                <div className='flex w-full  justify-between items-center gap-5 px-10 md:w-[80%] m-auto mt-[-10px] py-3 flex-col-reverse lg:flex-row'>
                    <div className="md:flex-1 p-3  w-full relative rounded border" onClick={handleShow}>
                        <div className='w-full flex justify-between items-center cursor-pointer'>
                            <span>All Categories</span>
                            <span><i className={`${open ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}`}></i></span>
                        </div>
                        {open && (
                            <ul className='w-full bg-white p-4 flex justify-start items-start flex-col gap-3 absolute top-[47px] left-0 bg-inherit h-[300px] overflow-auto'>
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        onClick={handleShow}
                                        className='border-b w-full py-2'
                                    >
                                        <NavLink to={`/category/${category}`}>{category}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input w-full border border-teal focus:border-teal focus:outline-none"
                        />
                    </div>
                </div>
            </div>}
        </>
    );
};

export default NavBottom;
