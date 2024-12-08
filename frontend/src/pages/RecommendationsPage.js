import React from 'react';
import { Link } from 'react-router-dom';

function RecommendationsPage() {
    return (
        <div>
            <h1>Book Recommendations</h1>
            <p>Find recommended books based on your preferences and past ratings.</p>
            {/* Add functionality to show book recommendations here */}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default RecommendationsPage;
