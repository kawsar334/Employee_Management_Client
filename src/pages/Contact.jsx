import React, { useState } from 'react';

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/messages', {
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
        <div className="contact-us">
            <h1>Contact Us</h1>
            <div className="company-info">
                <p><strong>Address:</strong> 123 Dummy Street, Some City, Some Country</p>
                <p><strong>Email:</strong> info@dummycompany.com</p>
                <p><strong>Phone:</strong> +123-456-7890</p>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Message:</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
            {status && <p className="status">{status}</p>}
        </div>
    );
};

export default ContactUs;
