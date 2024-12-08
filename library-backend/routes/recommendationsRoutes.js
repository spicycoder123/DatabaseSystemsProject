const express = require('express');
const router = express.Router();
const pool = require('../server'); // Assuming `server.js` exports the pool instance
const { authenticateToken } = require('./userRoutes'); // Import the authentication middleware

// Get book recommendations based on genre (GET)
router.get('/recommendations', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Get the user ID from the authenticated token

    try {
        // Step 1: Find genres of books that the user has rated highly (e.g., 4 or 5 stars)
        const genresResult = await pool.query(
            `SELECT DISTINCT b.genre
             FROM public.book b
             JOIN public.rating r ON b.bookid = r.bookid
             WHERE r.userid = $1 AND r.rating >= 4`,
            [userId]
        );

        if (genresResult.rows.length === 0) {
            return res.status(404).json({ message: 'No genre-based recommendations available.' });
        }

        // Extract genres into an array for querying
        const genres = genresResult.rows.map(row => row.genre);

        // Step 2: Find books in the same genres that the user has not rated
        const recommendationsResult = await pool.query(
            `SELECT b.bookid, b.title, b.author, b.genre
             FROM public.book b
             WHERE b.genre = ANY($1)
             AND b.bookid NOT IN (
                 SELECT r.bookid
                 FROM public.rating r
                 WHERE r.userid = $2
             )
             ORDER BY RANDOM() LIMIT 10`,
            [genres, userId]
        );

        if (recommendationsResult.rows.length === 0) {
            return res.status(404).json({ message: 'No recommendations found for the selected genres.' });
        }

        res.status(200).json(recommendationsResult.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

