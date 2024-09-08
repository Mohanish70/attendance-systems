const express = require('express');
const router = express.Router();
const { getAttendance, markAttendance, checkIn, getTotalHours } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes
router.get('/attendance', authMiddleware, getAttendance);
router.post('/mark', authMiddleware, markAttendance);
router.post('/check-in', authMiddleware, checkIn);
router.get('/total-hours', authMiddleware, getTotalHours);

module.exports = router;
