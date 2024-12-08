import React from 'react';
import { Link } from 'react-router-dom';

function SwapsPage() {
    return (
        <div>
            <h1>Book Swaps</h1>
            <p>Here you can browse available books for swapping, view your active swaps, and initiate new swaps.</p>
            {/* Add functionality to list books and initiate swaps here */}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default SwapsPage;
