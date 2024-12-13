// src/pages/RatingsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext'; // Import UserContext

function RatingsPage() {
    const { user } = useContext(UserContext); // Access user state from context
    const [books, setBooks] = useState([]);
    const [rating, setRating] = useState(0);
    const [selectedBookId, setSelectedBookId] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    const handleSubmitRating = async () => {
        if (!rating || !selectedBookId) {
            alert('Please select a rating and a book');
            return;
        }

        if (!user) {
            alert('Please log in to rate books');
            return;
        }

        try {
            await axios.post('/api/ratings', {
                raterId: user.userid,
                rateeId: selectedBookId,
                ratingValue: rating,
            });
            alert('Your rating has been submitted!');
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Error submitting rating');
        }
    };

    return (
        <div>
            <h1>Book Ratings</h1>
            <p>Rate books and see what others have rated them.</p>
            <div>
                <h2>Select a book to rate</h2>
                <select onChange={(e) => setSelectedBookId(e.target.value)} defaultValue="">
                    <option value="" disabled>Select a book</option>
                    {books.map((book) => (
                        <option key={book.bookid} value={book.bookid}>
                            {book.title} by {book.author}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Rate the book (1 to 5)</h2>
                <select onChange={(e) => setRating(Number(e.target.value))} defaultValue={0}>
                    <option value={0} disabled>Select rating</option>
                    {[1, 2, 3, 4, 5].map((rate) => (
                        <option key={rate} value={rate}>{rate}</option>
                    ))}
                </select>
            </div>

            <button onClick={handleSubmitRating}>Submit Rating</button>

            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default RatingsPage;
