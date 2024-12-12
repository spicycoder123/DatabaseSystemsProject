import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Your backend URL

// Create an axios instance with the base URL and timeout configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
});

// Function to get books (public endpoint)
export const getBooks = async () => {
    try {
        const response = await apiClient.get('/books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Function to create a new user (public endpoint)
export const createUser = async (userData) => {
    try {
        const response = await apiClient.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Function to login a user (returns the JWT token)
export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('/users/login', { email, password });
        return response.data;  // Expected response: { accessToken }
    } catch (error) {
        console.error('Login error:', error);
        throw error;  // You can handle the error further in your component if needed
    }
};

// Function to get recommendations (protected endpoint)
export const getRecommendations = async () => {
    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    if (!token) {
        throw new Error('No token found');
    }

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

// Add a request interceptor to automatically add the Authorization header (if token exists)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Attach token to the header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
