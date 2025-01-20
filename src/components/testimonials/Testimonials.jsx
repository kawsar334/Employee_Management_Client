import React, { useState } from "react";

// Testimonial data
const testimonialsData = [
    {
        id: 1,
        name: "John Doe",
        position: "CEO, Example Inc.",
        feedback: "This company has helped us streamline our employee management and significantly improved our workflow. Highly recommend!",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnuSUx4ZNlJU8DaQrot2ebQpP_KT3m29OA5Q&s",
    },
    {
        id: 2,
        name: "Jane Smith",
        position: "HR Manager, ABC Corp.",
        feedback: "The best employee management system we've used. The user interface is sleek, and the features are exactly what we need.",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIUlSYvbvcD_xbSD5moLY6ElhzTUEPcMLDA&s",
    },
    {
        id: 3,
        name: "Michael Brown",
        position: "Director, XYZ Ltd.",
        feedback: "Incredibly satisfied with the services. The system is intuitive, and the support team is always helpful.",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHSMG0Wn6bRXTpgEbp_NVBdc7favwX-L8yQ&s",
    },
    {
        id: 4,
        name: "Sarah Wilson",
        position: "Manager, LMN Co.",
        feedback: "A great experience using this employee management system. It has saved us so much time and effort.",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMF8mnganLnLt0GyNmxBCVueFTCGelTeMD4Q&s",
    },
];

const Testimonials = () => {
    // State to handle the current testimonial index
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    };
    const prevTestimonial = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
        );
    };

    const currentTestimonial = testimonialsData[currentIndex];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Clients Say</h2>
                <div className="relative">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto" data-aos="zoom-in">
                        <div className="flex justify-center mb-4">
                            <img
                                src={currentTestimonial.avatar}
                                alt={currentTestimonial.name}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        </div>
                        <p className="text-lg text-gray-600 italic mb-4">
                            "{currentTestimonial.feedback}"
                        </p>
                        <p className="font-semibold text-text">{currentTestimonial.name}</p>
                        <p className="text-gray-500">{currentTestimonial.position}</p>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-main w-10 h-10 flex justify-center items-center text-white p-2 rounded-full"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-main w-10 h-10 flex justify-center items-center text-white p-2 rounded-full"
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
