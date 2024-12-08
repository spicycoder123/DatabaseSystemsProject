import React, { useState } from 'react';

function RatingForm({ bookId, onSubmit }) {
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0 && rating <= 5) {
            onSubmit(bookId, rating);
        } else {
            alert('Rating must be between 1 and 5');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="rating">Rating (1-5):</label>
            <input
                type="number"
                id="rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default RatingForm;
