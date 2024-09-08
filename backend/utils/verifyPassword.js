// utils/verifyPassword.js

require('dotenv').config()

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust path as necessary

const testUserEmail = 'testuser@example.com';
const testPassword = 'TestPassword123'; // Use the password you set in createUser.js

const verifyPassword = async () => {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in the environment variables.');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = await User.findOne({ email: testUserEmail });
    if (!user) {
      console.log('User not found');
      return;
    }

    console.log('Stored hashed password:', user.password);

    const isMatch = await bcrypt.compare(testPassword, user.password);
    if (isMatch) {
      console.log('Password is correct');
    } else {
      console.log('Password is incorrect');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

verifyPassword();