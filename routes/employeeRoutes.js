const express = require('express');
const router = express.Router();
const { getEmployee, createEmployee } = require('../controllers/employeeController');

// Route to get employee by ID
router.get('/:id', getEmployee);

// Route to create a new employee
router.post('/register', createEmployee); // Ensure the route matches your request

module.exports = router;
