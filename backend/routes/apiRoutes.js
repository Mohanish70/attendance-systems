// routes/apiRoutes.js
const express = require('express');
const router = express.Router();

const attendanceRoutes = require('./attendanceRoutes'); 
const authRoutes = require('./authRoutes'); 
const userRoutes = require('./userRoutes'); 

router.use('/attendance', attendanceRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
