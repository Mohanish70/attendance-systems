const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust path as necessary
require('dotenv').config({ path: '../.env' }); // Explicitly set the path to your .env file

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createUser() {
  try {
    // Remove existing user with the same email
    await User.deleteOne({ email: 'testuser@example.com' });

    const newUser = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'TestPassword123', // Password to be hashed
      role: 'admin',
    });

    console.log('Password before hashing:', newUser.password);

    await newUser.save();
    console.log('User created');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

createUser();
