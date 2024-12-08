import { useState, useEffect } from 'react';

function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // You can add logic to fetch user details using the token here.
            setUser({ token }); // For simplicity, only storing token.
        }
    }, []);

    return { user, setUser };
}

export default useAuth;
