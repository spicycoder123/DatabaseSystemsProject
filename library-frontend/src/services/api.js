export const getBooks = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/books');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};
