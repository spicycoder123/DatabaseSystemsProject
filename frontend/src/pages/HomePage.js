import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookList from '../components/BookList';

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
            
            <nav>
                <Link to="/swaps" style={{ margin: '0 15px' }}>Swaps</Link>
                <Link to="/ratings" style={{ margin: '0 15px' }}>Ratings</Link>
                <Link to="/recommendations" style={{ margin: '0 15px' }}>Recommendations</Link>
            </nav>
            <h1>Book Catalog</h1>
            <BookList books={books} />
        </div>
    );
}

export default HomePage;
