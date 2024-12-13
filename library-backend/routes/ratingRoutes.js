const express = require('express');
const router = express.Router();
const pool = require('../server'); // Assuming `server.js` exports the pool instance

// Create a new rating
router.post('/', async (req, res) => {
    const { raterId, rateeId, ratingValue } = req.body;

    try {
        // Check if the rater and ratee are valid users and the rating value is between 1-5
        if (!raterId || !rateeId || !ratingValue || ratingValue < 1 || ratingValue > 5) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const result = await pool.query(
            'INSERT INTO rating (rater_id, ratee_id, rating_value) VALUES ($1, $2, $3) RETURNING *',
            [raterId, rateeId, ratingValue]
        );
        res.status(201).json(result.rows[0]); // Return the inserted rating data
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all ratings for a specific book
router.get('/book/:bookId', async (req, res) => {
    const { bookId } = req.params;

    try {
        // Fetch all ratings for a book along with the user who rated it
        const result = await pool.query(
            'SELECT rating_value, rater_id, u.fname, u.lname ' +
            'FROM rating r ' +
            'JOIN "user" u ON r.rater_id = u.userid ' +
            'WHERE r.ratee_id = $1',
            [bookId]  // ratee_id is the bookId
        );
        res.status(200).json(result.rows); // Return the list of ratings
    } catch (error) {
        console.error('Error fetching ratings for book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all books rated by a specific user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await pool.query(
            'SELECT b.title, b.author, r.rating_value ' +
            'FROM rating r ' +
            'JOIN book b ON r.ratee_id = b.userid ' +
            'WHERE r.rater_id = $1',
            [userId]
        );
        res.status(200).json(result.rows); // Return the list of rated books
    } catch (error) {
        console.error('Error fetching user ratings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
