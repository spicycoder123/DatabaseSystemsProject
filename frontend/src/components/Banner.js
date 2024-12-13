import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'; // Make sure this path is correct
import UserContext from '../context/UserContext'; // Import UserContext to display logged-in user info if necessary
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

function Banner() {
    const { user } = useContext(UserContext); // Get user state from context

    return (
        <div className="banner">
            <h2>Welcome to the Katun-Ngana Library System</h2>
            <nav>
                <Link to="/books" className="nav-link">Books</Link>

                {/* Render Profile if user is logged in */}
                {user ? (
                    <>
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <LogoutButton /> {/* Render LogoutButton only if user is logged in */}
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </nav>
        </div>
    );
}

export default Banner;
