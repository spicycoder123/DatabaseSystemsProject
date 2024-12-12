const express = require('express');
const router = express.Router();
const { pool } = require('../server'); // Import pool directly
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

// Register a new user (POST)
router.post('/', async (req, res) => {
    const { fname, lname, email, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await pool.query('SELECT * FROM public."user" WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO public."user" (fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [fname, lname, email, hashedPassword]
        );

        // Send the response with the newly created user
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error during user registration:', err.message);
        res.status(500).send('Server error');
    }
});

// Login user (POST) – returns a JWT token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM public."user" WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.json({ accessToken });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).send('Server error');
    }
});

// Example of a protected route (only accessible with token)
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = req.user; // This is the decoded token data
        const result = await pool.query('SELECT * FROM public."user" WHERE email = $1', [user.email]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        res.status(500).send('Server error');
    }
});

// Export both router and middleware separately
module.exports = {
    router, // Export the router instance for user routes
    authenticateToken, // Export the authentication middleware for use in other files
};
