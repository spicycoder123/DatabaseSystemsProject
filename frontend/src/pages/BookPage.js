import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookPage.css';

function BookPage() {
    const [books, setBooks] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError('Failed to load books.');
            }
        };

        const fetchRatings = async () => {
            try {
                const response = await axios.get('/api/ratings'); // Adjust API call to get all ratings
                setRatings(response.data);
            } catch (error) {
                console.error('Error fetching ratings:', error);
                setError('Failed to load ratings.');
            }
        };

        fetchBooks();
        fetchRatings();
    }, []);

    const submitRating = async (bookId, ratingValue) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please log in to rate the book');
            return;
        }

        try {
            const response = await axios.post('/api/ratings', {
                raterId: user.userid,
                rateeId: bookId,
                ratingValue: ratingValue,
            });

            alert('Rating submitted');
        } catch (error) {
            console.error('Error submitting rating:', error.response ? error.response.data : error.message);
            alert('Error submitting rating');
        }
    };

    return (
        <div className="book-page-container">
            {error && <div className="error-message">{error}</div>}

            <h1>Book Catalog</h1>

            <div className="books-list">
                {books.length > 0 ? (
                    books.map((book) => {
                        const bookRatings = ratings.filter(rating => rating.rateeId === book._id); // Get ratings for each book
                        const averageRating = bookRatings.length > 0 ? bookRatings.reduce((acc, rating) => acc + rating.ratingValue, 0) / bookRatings.length : 0;

                        return (
                            <div key={book._id} className="book-card">
                                <h2 className="book-title">{book.title}</h2>
                                <p className="book-author">by {book.author}</p>
                                <p className="book-rating">Average Rating: {averageRating.toFixed(1)} / 5</p>

                                {/* Display rating options */}
                                <select
                                    onChange={(e) => submitRating(book._id, Number(e.target.value))}
                                    className="rating-select"
                                >
                                    <option value={0}>Rate this book</option>
                                    {[1, 2, 3, 4, 5].map((rate) => (
                                        <option key={rate} value={rate}>
                                            {rate}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading books...</p>
                )}
            </div>
        </div>
    );
}

export default BookPage;
