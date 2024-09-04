const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/adminController'); // Ensure correct imports
const authMiddleware = require('../middlewares/authMiddleware');

// GET route for fetching users
router.get('/users', authMiddleware, getUsers);

// POST route for creating a new user
router.post('/users', authMiddleware, createUser);

module.exports = router;
