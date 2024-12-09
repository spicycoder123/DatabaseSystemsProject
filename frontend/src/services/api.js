// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL if different

// Create an axios instance with the base URL
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
});

// Function to get books
export const getBooks = async () => {
    try {
        const response = await apiClient.get('/books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Function to create a new user
export const createUser = async (userData) => {
    try {
        const response = await apiClient.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Function to get recommendations (authentication required)
export const getRecommendations = async (token) => {
    try {
        const response = await apiClient.get('/recommendations', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};
