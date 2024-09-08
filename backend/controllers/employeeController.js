const Employee = require('../models/Employee'); // Ensure the path is correct

// Controller to get employee by ID
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Server error while fetching employee' });
  }
};

// Controller to create a new employee
const createEmployee = async (req, res) => {
  const { employeeId, name, email, role } = req.body;

  if (!employeeId || !name || !email || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEmployee = new Employee({ employeeId, name, email, role });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error while creating employee' });
  }
};

module.exports = { getEmployee, createEmployee };
