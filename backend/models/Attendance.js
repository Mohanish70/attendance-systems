// backend/models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checkInTime: { type: Date, default: null },
  checkOutTime: { type: Date, default: null },
  date: { type: Date, default: Date.now },
  hoursWorked: { type: Number, default: 0 }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
