import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users', { fname, lname, email, password });
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Error registering user');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} required />
                <label>Last Name:</label>
                <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} required />

                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
