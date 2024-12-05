import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api'; // Assuming this is where you defined the API calls

const BookPage = () => {
    const [books, setBooks] = useState([]);

    // Fetch data from the backend API on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getBooks();
            if (data) {
                setBooks(data);
            }
        };

        fetchBooks();
    }, []);

    // Handle the delete action (this will need to connect to an API endpoint)
    const handleDelete = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Remove the deleted book from the list
                setBooks(books.filter((book) => book.bookid !== bookId));
            } else {
                console.error('Failed to delete the book');
            }
        } catch (error) {
            console.error('Error deleting the book:', error);
        }
    };

    return (
        <div>
            <h2>Books List</h2>
            <div>
                {books.length === 0 ? (
                    <p>No books available. Please add some books to get started.</p>
                ) : (
                    <ul>
                        {books.map((book) => (
                            <li key={book.bookid}>
                                <h3>{book.title}</h3>
                                <p>Author: {book.author}</p>
                                <button onClick={() => alert(`Viewing details for ${book.title}`)}>
                                    View Details
                                </button>
                                <button onClick={() => handleDelete(book.bookid)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default BookPage;
