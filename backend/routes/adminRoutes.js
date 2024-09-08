const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/adminController'); // Ensure correct imports
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure correct path

router.get('/users', authMiddleware, getUsers);

router.post('/users', authMiddleware, createUser);

module.exports = router;
