require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL Pool configuration
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test database connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Database connection error:', err));

// Export pool for use in route files
module.exports = {
    pool,
};

// Import routes
const userRoutes = require('./routes/userRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const swapRoutes = require('./routes/swapRoutes');
const bookRoutes = require('./routes/bookRoutes');
const recommendationsRoutes = require('./routes/recommendationsRoutes');

// Mount routes
app.use('/api/users', userRoutes.router);

// Add other routes
app.use('/api/ratings', ratingRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/recommendations', recommendationsRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
