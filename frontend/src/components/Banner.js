import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'; // Import the CSS file

function Banner() {
    return (
        <div className="banner">
            <h2>Welcome to the Katun-Ngana Library System</h2>
            <nav>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/books" className="nav-link">Books</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
            </nav>
        </div>
    );
}

export default Banner;
