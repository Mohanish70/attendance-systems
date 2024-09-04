const express = require('express');
const router = express.Router();
const { getAttendance, markAttendance } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure correct path to middleware

// Route for getting attendance records with authentication
router.get('/', authMiddleware, getAttendance);

// Route for marking attendance with authentication
router.post('/mark', authMiddleware, markAttendance);

module.exports = router;
