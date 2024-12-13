import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <Link to="/" style={{ margin: '0 15px' }}>Home</Link>
            <Link to="/swaps" style={{ margin: '0 15px' }}>Swaps</Link>
            <Link to="/ratings" style={{ margin: '0 15px' }}>Ratings</Link>
            <Link to="/recommendations" style={{ margin: '0 15px' }}>Recommendations</Link>

        </nav>
    );
};

export default NavBar;
