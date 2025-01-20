import React from "react";

// Feature data
const featuresData = [
    {
        id: 1,
        icon: "✔️",
        title: "User-Friendly Interface",
        description: "Our system is designed with simplicity in mind, making it easy for anyone to use.",
    },
    {
        id: 2,
        icon: "🔒",
        title: "Secure & Reliable",
        description: "We prioritize the security of your data, ensuring that your information is always safe.",
    },
    {
        id: 3,
        icon: "📊",
        title: "Detailed Analytics",
        description: "Get powerful reports and analytics to help you manage employees more efficiently.",
    },
    {
        id: 4,
        icon: "🌍",
        title: "Global Access",
        description: "Access the system from anywhere in the world, anytime, using any device.",
    },
];

const Features = () => {
    return (
        <section className="py-16 bg-gray-50" data-aos="fade-up">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuresData.map((feature) => (
                        <div key={feature.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="text-4xl text-indigo-600 mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-text mb-2">{feature.title}</h3>
                            <p className="text-gray-500 first-letter:text-main first-letter:text-2xl">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
