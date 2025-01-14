const Services = () => {
    const services = [
        { title: 'Software Development', description: 'Custom software solutions tailored to your needs.' },
        { title: 'Digital Marketing', description: 'Boost your online presence and reach your target audience.' },
        { title: 'Cloud Solutions', description: 'Scalable and secure cloud infrastructure for your business.' },
    ];

    return (
        <div className="services py-12 bg-gray-100">
            <h2 className="text-3xl text-center font-bold mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {services.map((service, index) => (
                    <div key={index} className="service-card p-6 bg-white shadow rounded">
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>

{/* <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Employee Management</h3>
            <p className="mt-2">Streamlined employee workflow and payroll management.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">HR Solutions</h3>
            <p className="mt-2">Comprehensive HR services for managing your workforce effectively.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Workplace Analytics</h3>
            <p className="mt-2">Real-time insights into employee performance and productivity.</p>
        </div>
      </section> */}

        </div>
    );
};
export default Services;
