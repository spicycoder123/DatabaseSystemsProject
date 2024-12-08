import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`/api/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Published: {book.publicationYear}</p>
            <p>Description: {book.description}</p>
        </div>
    );
}

export default BookPage;
