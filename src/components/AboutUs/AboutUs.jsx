import React from "react";

// Team member data
const teamData = [
    {
        id: 1,
        name: "Alice Johnson",
        position: "Founder & CEO",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2uk3WmPdFI9SyEQI6OJiYFmIs_Fe-e17Bg&s",
    },
    {
        id: 2,
        name: "Bob Smith",
        position: "CTO",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRytGDVWIcH583zZsDR5f52g6X1j9TCUvZ7pA&s",
    },
    {
        id: 3,
        name: "Charlie Brown",
        position: "HR Manager",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSCJYPIlgqWD0kvXDzDnctV0IP4TLu4_VE7A&s",
    },
    {
        id: 4,
        name: "Diana Lee",
        position: "Software Engineer",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0fJBJjpVsaEwNliPJsdo5lgmMPpHsuVohw&s",
    },
];

const Team = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 text-center" data-aos="fade-up">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamData.map((member) => (
                        <div key={member.id} className="bg-gray-100 p-6 rounded-lg shadow-lg" data-aos="zoom-in">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-32 h-32 border-2 border-text rounded-full mx-auto mb-4 object-cover"
                            />
                            <h3 className="text-xl font-semibold text-main">{member.name}</h3>
                            <p className="text-gray-500 first-letter:text-text">{member.position}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
