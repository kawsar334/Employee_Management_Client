import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Registration = ({ toggleToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee');
    const [errors, setErrors] = useState('');

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) errors.push('Password must be at least 6 characters long.');
        if (!/[A-Z]/.test(password)) errors.push('Password must have at least one capital letter.');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Password must have at least one special character.');
        return errors;
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const validationErrors = validatePassword(password);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });
            if (response.ok) {
                toast.success('Registration successful!');
                setEmail('');
                setPassword('');
                setRole('Employee');
            } else {
                const data = await response.json();
                toast.error(data.message || 'Registration failed.');
            }
        } catch (error) {
            toast.error('An error occurred during registration.');
        }
    };

    return (
        <div className="registration-page">
            <h1>Register</h1>
            <form onSubmit={handleRegistration}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                </select>
                {errors && <div className="error-messages">{errors.map((err, idx) => <p key={idx}>{err}</p>)}</div>}
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <span onClick={toggleToLogin}>Login here</span>
            </p>
        </div>
    );
};

export default Registration;
