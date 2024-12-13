import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext'; // Import the UserContext to access the logout function

const LogoutButton = () => {
    const { logoutUser } = useContext(UserContext);  // Get logoutUser from context
    const navigate = useNavigate(); // Hook to navigate to another route

    // Handle logout and redirect to homepage
    const handleLogout = () => {
        logoutUser(); // Call the function to clear user data from context and localStorage
        navigate('/'); // Redirect to the homepage after logging out
    };

    return (
        <button onClick={handleLogout}>Logout</button>  // Render the logout button
    );
};

export default LogoutButton;
