import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Manage user state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser); // Set user if available in localStorage
        }
        setLoading(false);
    }, []);

    const loginUser = (userData) => {
        setUser(userData);  // Set user data in state
        localStorage.setItem('user', JSON.stringify(userData)); // Store in localStorage
    };

    const logoutUser = () => {
        setUser(null); // Clear the user from state
        localStorage.removeItem('user'); // Remove the user from localStorage
    };

    return (
        <UserContext.Provider value={{ user, loading, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
