const express = require('express');
const router = express.Router();
const pool = require('../server'); // Assuming `server.js` exports the pool instance
const { authenticateToken } = require('./userRoutes'); // Import the authentication middleware

console.log('swapRoutes loaded');

// Create a new swap (POST)
router.post('/swaps', authenticateToken, async (req, res) => {
    const { borrower_id, lender_id, bookid } = req.body;
    const userId = req.user.userId; // Get user ID from the token

    // Ensure that the user creating the swap is either the borrower or lender
    if (borrower_id !== userId && lender_id !== userId) {
        return res.status(403).json({ message: 'You can only create swaps for yourself.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO public.swap (borrower_id, lender_id, bookid) VALUES ($1, $2, $3) RETURNING *',
            [borrower_id, lender_id, bookid]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all swaps (GET)
router.get('/swaps', authenticateToken, async (req, res) => {
    const userId = req.user.userId; // Get user ID from the token
    try {
        const result = await pool.query(
            `SELECT * FROM public.swap
             WHERE borrower_id = $1 OR lender_id = $1`,
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a swap by ID (GET)
router.get('/swaps/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId; // Get user ID from the token
    try {
        const result = await pool.query('SELECT * FROM public.swap WHERE swap_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Swap not found');
        }

        // Ensure the user is either the borrower or lender in the swap
        if (result.rows[0].borrower_id !== userId && result.rows[0].lender_id !== userId) {
            return res.status(403).json({ message: 'You do not have permission to view this swap.' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router; // Export the router for use in server.js
