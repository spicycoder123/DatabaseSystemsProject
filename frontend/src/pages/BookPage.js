import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookPage() {
    const [books, setBooks] = useState([]);

    // Fetch books from the backend API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/books');  // Replace with the correct endpoint for fetching books
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
            <h1 style={{ color: '#4b2f14', fontFamily: 'Arial, sans-serif' }}>Book List</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book.bookid} style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ margin: '0', color: '#4b2f14' }}>{book.title}</h3>
                            <p style={{ color: '#555' }}>Author: {book.author}</p>
                        </div>
                    ))
                ) : (
                    <p>No books found</p>
                )}
            </div>
        </div>
    );
}

export default BookPage;
