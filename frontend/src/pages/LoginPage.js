import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext'; // Import UserContext

function LoginPage() {
    const { loginUser } = useContext(UserContext); // Get loginUser from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulate login API response (replace with actual API call)
        const userData = { userId: 1, email, fname: 'John', lname: 'Doe' };

        // After login is successful, store the user and navigate to profile
        loginUser(userData); // Update the context with logged-in user
        navigate('/profile'); // Redirect to profile page
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
