const express = require('express');
const router = express.Router();
const pool = require('../server'); // Assuming `server.js` exports the pool instance


// Create a new rating (POST)
router.post('/ratings', async (req, res) => {
    const { rating_value, rater_id, ratee_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO public.rating (rating_value, rater_id, ratee_id) VALUES ($1, $2, $3) RETURNING *',
            [rating_value, rater_id, ratee_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all ratings (GET)
router.get('/ratings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.rating');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a rating by ID (GET)
router.get('/ratings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM public.rating WHERE rating_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Rating not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a rating (PUT)
router.put('/ratings/:id', async (req, res) => {
    const { id } = req.params;
    const { rating_value, rater_id, ratee_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE public.rating SET rating_value = $1, rater_id = $2, ratee_id = $3 WHERE rating_id = $4 RETURNING *',
            [rating_value, rater_id, ratee_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Rating not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a rating (DELETE)
router.delete('/ratings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM public.rating WHERE rating_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Rating not found');
        }
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
