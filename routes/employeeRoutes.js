const express = require('express');
const router = express.Router();
const { getAttendanceHistory } = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/attendance-history', authMiddleware, getAttendanceHistory);

module.exports = router;
