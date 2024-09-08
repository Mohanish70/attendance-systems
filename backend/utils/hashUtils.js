const bcrypt = require('bcrypt');

// Hash a password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

// Compare a password with a hashed password
const comparePasswords = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = { hashPassword, comparePasswords };
