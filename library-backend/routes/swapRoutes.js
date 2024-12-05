const express = require('express');
const router = express.Router();
const pool = require('../server'); // Assuming `server.js` exports the pool instance

// Create a new swap (POST)
router.post('/swaps', async (req, res) => {
    const { borrower_id, lender_id, bookid } = req.body;
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
router.get('/swaps', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.swap');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a swap by ID (GET)
router.get('/swaps/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM public.swap WHERE swap_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Swap not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a swap (PUT)
router.put('/swaps/:id', async (req, res) => {
    const { id } = req.params;
    const { borrower_id, lender_id, bookid } = req.body;
    try {
        const result = await pool.query(
            'UPDATE public.swap SET borrower_id = $1, lender_id = $2, bookid = $3 WHERE swap_id = $4 RETURNING *',
            [borrower_id, lender_id, bookid, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Swap not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a swap (DELETE)
router.delete('/swaps/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM public.swap WHERE swap_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Swap not found');
        }
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
