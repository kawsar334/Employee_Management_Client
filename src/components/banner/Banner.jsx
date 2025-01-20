import React, { useState } from "react";

const sliderData = [
    {
        id: 1,
        image: "https://jobhunt.madrasthemes.com/wp-content/uploads/2018/08/blog-2-836x340.jpg",
        title: "Employee Workflow Monitoring",
        description: "Track employee workload and performance with ease using our employee management system.",
    },
    {
        id: 2,
        image: "https://kfkit.rometheme.pro/brite/wp-content/uploads/sites/45/2023/02/job-interview-24LCA7E.jpg",
        title: "Salary Management",
        description: "Efficiently manage employee salaries, deductions, and payments in one place.",
    },
    {
        id: 3,
        image: "https://www.shutterstock.com/image-vector/project-planning-roadmap-two-managers-260nw-2254064463.jpg",
        title: "Task Assignment",
        description: "Assign and track tasks for employees, ensuring smooth workflow across departments.",
    },
    {
        id: 4,
        image: "https://jobhunt.madrasthemes.com/wp-content/uploads/2018/09/home-bg.jpg",
        title: "Employee Records",
        description: "Maintain accurate employee records including contracts, job roles, and more.",
    },
    {
        id: 5,
        image: "https://tivazo.com/wp-content/uploads/2024/05/Happy-Employees-img.webp",
        title: "HR Dashboard",
        description: "HRs can efficiently monitor and manage employees, payroll, and performance metrics.",
    },
    {
        id: 6,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhMTgyreAPuGEB7HGPACnd2vV6wjdoCnhaHQ&s",
        title: "Leave Management",
        description: "Streamline leave requests and approvals with the leave management system.",
    }
];

const BannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1));
    };
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full bg-gray-100  h-[500px] " data-aos="fade-up">
            <div className="relative h-full">
                <div className="w-full h-full">
                    <img
                        src={sliderData[currentIndex].image}
                        alt={sliderData[currentIndex].title}
                        className="w-full h-full object-cover  "
                        data-aos="zoom-in"
                    />
                    <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-t from-main to-transparent p-4 text-white flex justify-center items-center flex-col gap-3">
                        <h2 className="text-3xl md:text-5xl font-semibold text-text ">{sliderData[currentIndex].title}</h2>
                        <p className="text-sm mt-2">{sliderData[currentIndex].description}</p>
                        <a href="#services" className="flex justify-center items-center border bg-text hover:bg-main transition-all duration-500 px-3 py-1 rounded ">
                            Learn More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-2"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 19.59L19.59 12 12 4.41 4.41 12 12 19.59z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-700"
                >
                    &#60;
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-black text-white p-2  rounded-full shadow-md hover:bg-gray-700"
                >
                    &#62;
                </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center space-x-2 mt-4">
                {sliderData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-text" : "bg-gray-300"} transition-all duration-300`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;
