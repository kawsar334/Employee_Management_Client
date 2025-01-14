const Testimonials = () => {
    const testimonials = [
        { name: 'Jane Doe', role: 'CEO, XYZ Ltd.', text: 'This company transformed our business with their innovative solutions.' },
        { name: 'John Smith', role: 'Founder, ABC Inc.', text: 'Exceptional service and support. Highly recommend!' },
    ];

    return (
        <div className="testimonials py-12">
            <h2 className="text-3xl text-center font-bold mb-8">What Our Clients Say</h2>
            <div className="slider flex overflow-x-scroll space-x-4 px-4">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card p-6 bg-gray-100 rounded shadow">
                        <p className="text-lg mb-4">{testimonial.text}</p>
                        <h4 className="text-xl font-bold">{testimonial.name}</h4>
                        <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Testimonials;
