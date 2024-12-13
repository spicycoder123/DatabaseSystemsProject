import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext'; // Import UserContext
import axios from 'axios';

function ProfilePage() {
    const { user, loading } = useContext(UserContext); // Get user and loading state from context
    const [userRatings, setUserRatings] = useState([]);

    // Fetch user ratings when the user is logged in
    useEffect(() => {
        const fetchUserRatings = async () => {
            if (!user) return; // Don't fetch if there's no user

            try {
                const response = await axios.get(`/api/ratings/user/${user.userId}`);
                setUserRatings(response.data);
            } catch (error) {
                console.error('Error fetching user ratings:', error);
            }
        };

        if (user) {
            fetchUserRatings();
        }
    }, [user]);

    if (loading) {
        return <p>Loading...</p>; // Show loading message until user is fetched
    }

    if (!user) {
        return <p>No user found. Please log in.</p>; // Show message if no user is found
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Email: {user.email}</p>
            <p>Name: {user.fname} {user.lname}</p>

            <h2>Rated Books</h2>
            {userRatings.length > 0 ? (
                <ul>
                    {userRatings.map((rating) => (
                        <li key={rating.bookid}>
                            {rating.title} by {rating.author} - Rating: {rating.rating_value}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books rated yet.</p>
            )}
        </div>
    );
}

export default ProfilePage;
