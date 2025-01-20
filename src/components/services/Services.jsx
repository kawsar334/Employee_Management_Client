import React from "react";

const servicesData = [
  {
    id: 1,
    title: "Employee Management",
    description: "Manage employee profiles, roles, and tasks efficiently.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCN5hOVLzUVYhaZ00HNUwDIlPehoauv29g6g&s",
  },
  {
    id: 2,
    title: "Payroll Processing",
    description: "Automated payroll calculation and salary distribution.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQLIliia0TMzfb2Q8bMMla3o_JRRgOMZR60Q&s",
  },
  {
    id: 3,
    title: "Leave Management",
    description: "Track and manage employee leaves, holidays, and absences.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVmjolKQV7EFYCyEhK20d6P_7BQ68rDnRn3w&s",
  },
  {
    id: 4,
    title: "Performance Tracking",
    description: "Monitor employee performance through feedback and reviews.",
    icon: "https://via.placeholder.com/40x40?text=📊",
  },
  {
    id: 5,
    title: "Task Management",
    description: "Assign and track employee tasks with real-time updates.",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDm9lYfNk_YxGGe74qYTUgK3KMbLW-PRfXmQ&s",
  },
  {
    id: 6,
    title: "Recruitment Management",
    description: "Streamline your recruitment process with applicant tracking.",
    icon: "https://www.ismartrecruit.com/upload/blog/main_image/Recruitment_Management_System.webp",
  },
];

const Services = () => {
  return (
    <section className="py-16 " id="services" >
      <div className="container mx-auto px-6 text-center">
        <h2 data-aos="zoom-out" className="text-3xl font-bold text-gray-800 mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div data-aos="zoom-in" key={service.id}  className="bg-white   p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-main mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
