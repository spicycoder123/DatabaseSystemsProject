import React from 'react';

function ProfilePage() {
    // Assuming user data is available in localStorage or context
    const user = JSON.parse(localStorage.getItem('user')) || {};

    return (
        <div>
            <h1>User Profile</h1>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
            {/* Add more profile management features as needed */}
        </div>
    );
}

export default ProfilePage;
