const express = require('express');
const router = express.Router();
const pool = require('../server'); // Assuming `server.js` exports the pool instance

// Create a new user (POST)
router.post('/users', async (req, res) => {
    const { fname, lname, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO public."user" (fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [fname, lname, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all users (GET)
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public."user"');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a user by ID (GET)
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM public."user" WHERE userid = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a user (PUT)
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, password } = req.body;
    try {
        const result = await pool.query(
            'UPDATE public."user" SET fname = $1, lname = $2, email = $3, password = $4 WHERE userid = $5 RETURNING *',
            [fname, lname, email, password, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a user (DELETE)
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM public."user" WHERE userid = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
