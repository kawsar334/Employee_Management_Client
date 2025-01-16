import React, { useState } from 'react';

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:7000/api/message/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, message }),
        });

        if (response.ok) {
            setStatus('Message sent successfully!');
            setEmail('');
            setMessage('');
        } else {
            setStatus('Failed to send the message. Try again.');
        }
    };

    return (
        <div className="flex justify-center items-center gap-2 flex-col h-screen">
            <h1 className='text-3xl my-4 '>Contact Us</h1>
          <div className='flex justify-center items-center gap-4 flex-col'>
                <div className="company-info">
                    <p><strong>Address:</strong> 123 Dummy Street, Some City, Some Country</p>
                    <p><strong>Email:</strong> info@dummycompany.com</p>
                    <p><strong>Phone:</strong> +123-456-7890</p>
                </div>
                <form onSubmit={handleSubmit} className=" flex justify-start items-start flex-col  w-[500px] mx-auto border p-5 ">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border px-5 py-2 w-full mb-2"
                    />
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="border px-5 py-2 w-full mb-2"
                    />
                    <button type="submit" className="w-full py-2 px-4 border my-2 bg-main  rounded">Send</button>
                {status && <p className="status">{status}</p>}
                </form>
          </div>
        </div>
    );
};

export default ContactUs;
