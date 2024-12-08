import api from './api';

export const getBooks = async () => {
    const response = await api.get('/api/books');
    return response.data;
};

export const getBookById = async (id) => {
    const response = await api.get(`/api/books/${id}`);
    return response.data;
};

export const createBook = async (bookData) => {
    const response = await api.post('/api/books', bookData);
    return response.data;
};

export const updateBook = async (id, updatedData) => {
    const response = await api.put(`/api/books/${id}`, updatedData);
    return response.data;
};

export const deleteBook = async (id) => {
    const response = await api.delete(`/api/books/${id}`);
    return response.data;
};
