import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import axios from 'axios';

function HomePage() {
    const [books, setBooks] = useState([]);

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

    return (
        <div>
            <h1>Book Catalog</h1>
            <BookList books={books} />
        </div>
    );
}

export default HomePage;

