const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ensure this matches the actual model name
    required: true
  },
  checkInTime: {
    type: Date,
    default: null
  },
  checkOutTime: {
    type: Date,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  },
  hoursWorked: {
    type: Number,
    default: 0
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
