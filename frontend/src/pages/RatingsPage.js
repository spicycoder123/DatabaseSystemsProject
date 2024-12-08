import React from 'react';
import { Link } from 'react-router-dom';

function RatingsPage() {
    return (
        <div>
            <h1>Book Ratings</h1>
            <p>Rate books and see what others have rated them.</p>
            {/* Add functionality to show ratings and submit new ones here */}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default RatingsPage;
