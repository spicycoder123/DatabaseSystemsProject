const express = require('express');
const router = express.Router();
const pool = require('../server'); // Assuming `server.js` exports the pool instance

// CREATE a new book
router.post('/books', async (req, res) => {
    const { title, author, userid } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO public.book (title, author, userid) VALUES ($1, $2, $3) RETURNING *',
            [title, author, userid]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// READ all books
router.get('/books', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.book');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// READ a single book by ID
router.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM public.book WHERE bookid = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE a book
router.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, userid } = req.body;
    try {
        const result = await pool.query(
            'UPDATE public.book SET title = $1, author = $2, userid = $3 WHERE bookid = $4 RETURNING *',
            [title, author, userid, id]
        );
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a book
router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM public.book WHERE bookid = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
