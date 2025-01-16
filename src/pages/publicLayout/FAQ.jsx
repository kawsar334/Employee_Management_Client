import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

const FAQ = () => {

    const { isDarkMode } = useContext(ThemeContext)
    const faqs = [
        {
            id: 1,
            question: "How do I find a tutor?",
            answer: "You can find a tutor by browsing our 'Find Tutors' section and selecting a category or language.",
        },
        {
            id: 2,
            question: "What if I am not satisfied with my tutor?",
            answer: "We encourage you to contact us if you're not satisfied with your tutor, and we will help you find a better match.",
        },
        {
            id: 3,
            question: "Is there a trial session available?",
            answer: "Yes, many tutors offer a free or discounted trial session. Check the tutor's profile for more details.",
        },
        {
            id: 4,
            question: "How do I contact support?",
            answer: "You can reach out to our support team through the 'Contact Us' page or directly via email.",
        },
        {
            id: 5,
            question: "Can I change my tutor?",
            answer: "Yes, you can change your tutor anytime. Just contact us for assistance with the process.",
        },
        {
            id: 6,
            question: "Are the tutors certified?",
            answer: "All our tutors are highly qualified, and many are certified in their respective fields.",
        },
        {
            id: 7,
            question: "Can I book a tutor for group lessons?",
            answer: "Yes, you can book tutors for group lessons. You can discuss the details with the tutor beforehand.",
        },
        {
            id: 8,
            question: "What is the refund policy?",
            answer: "If you're not satisfied with the lesson, we offer a refund within 24 hours after the session.",
        },
        {
            id: 9,
            question: "Do I need any special software to attend the lessons?",
            answer: "You just need a reliable internet connection and a video conferencing tool like Zoom or Skype.",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index); 
    };

    return (
        <section className=" py-12 my-[100px] px-4">
            <h2 className={`${isDarkMode ? "text-3xl font-bold text-center text-white mb-8" : "text-3xl font-bold text-center text-gray-800 mb-8"}`}>Frequently Asked Questions</h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {faqs?.map((faq, index) => (
                    <div key={faq.id} className="mb-4  h-max ">
                        <button
                            data-aos="fade-up"
                            onClick={() => toggleAnswer(index)}
                            className="w-full text-left bg-white border p-4 rounded-lg shadow-md flex justify-between items-center"
                        >
                            <span className="text-xl font-semibold text-gray-800">{faq.question}</span>
                            <span className="text-xl font-bold text-gray-600">
                                {activeIndex === index ? "-" : "+"}
                            </span>
                        </button>
                        {activeIndex === index && (
                            <div className="bg-gray-100  p-4 mt-2 rounded-lg" data-aos="fade-down">
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
