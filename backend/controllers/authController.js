const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validator = require('validator'); // Ensure this is installed
const bcrypt = require('bcrypt'); // Ensure this is installed

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate input fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email }); // Fetch user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // User does not exist
    }

    // Match provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Password mismatch
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Logout a user
exports.logoutUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
