// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { getRecommendations } from '../services/api';  // Import the recommendations function

function DashboardPage() {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await getRecommendations();
                setRecommendations(data);  // Set the fetched recommendations to the state
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, []);  // Empty dependency array ensures this runs once when the component mounts

    return (
        <div>
            <h1>Your Recommendations</h1>
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>{item.title}</li> // Example rendering of recommendations
                ))}
            </ul>
        </div>
    );
}

export default DashboardPage;
