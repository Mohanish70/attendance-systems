// backend/controllers/attendanceController.js
const Attendance = require('../models/Attendance');

// Check-in user
const checkIn = async (req, res) => {
  const { employeeId } = req.body;
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const attendance = await Attendance.findOne({ employeeId, date });

    if (attendance && attendance.checkInTime) {
      return res.status(400).json({ message: 'Already checked in' });
    }

    if (!attendance) {
      const newAttendance = new Attendance({ employeeId, checkInTime: new Date() });
      await newAttendance.save();
      return res.status(200).json({ message: 'Checked in successfully' });
    }

    attendance.checkInTime = new Date();
    await attendance.save();
    res.status(200).json({ message: 'Checked in successfully' });
  } catch (error) {
    console.error('Error during check-in:', error);
    res.status(500).json({ message: 'Server error during check-in' });
  }
};
