const express = require('express');
const router = express.Router();
const { getAttendance, markAttendance } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getAttendance);

router.post('/mark', authMiddleware, markAttendance);

module.exports = router;
