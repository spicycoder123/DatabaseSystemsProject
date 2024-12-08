import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', //  backend URL
    timeout: 1000,
});

export default api;
