const express = require('express');
const router = express.Router();
const pool = require('../server'); // Assuming `server.js` exports the pool instance
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate user token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

// Create a new user (POST)
router.post('/users', async (req, res) => {
    const { fname, lname, email, password } = req.body;
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO public."user" (fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [fname, lname, email, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Authenticate a user and issue a token (POST)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM public."user" WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const accessToken = jwt.sign({ userId: user.userid, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get user details by ID (GET)
router.get('/users/:id', authenticateToken, async (req, res) => {
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

module.exports = router;
