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

// Define routes (only for user-related operations)
router.post('/users', async (req, res) => {
    const { fname, lname, email, password } = req.body;
    try {
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

// Export both router and middleware separately
module.exports = {
    router, // Export the router instance for user routes
    authenticateToken, // Export the authentication middleware for use in other files
};
