const Attendance = require('../models/Attendance');

// Controller for getting attendance
const getAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error.message);
    res.status(500).json({ message: 'Server error while fetching attendance records' });
  }
};

// Controller for marking attendance
const markAttendance = async (req, res) => {
  const { employeeId, checkInTime, checkOutTime } = req.body;
  try {
    const attendance = new Attendance({ employeeId, checkInTime, checkOutTime });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error.message);
    res.status(500).json({ message: 'Server error while marking attendance' });
  }
};

// Controller for checking in
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
    console.error('Error during check-in:', error.message);
    res.status(500).json({ message: 'Server error during check-in' });
  }
};

// Controller for getting total hours
const getTotalHours = async (req, res) => {
  try {
    const totalHours = await Attendance.aggregate([
      {
        $match: { checkInTime: { $ne: null }, checkOutTime: { $ne: null } }
      },
      {
        $project: {
          hoursWorked: { $divide: [{ $subtract: ["$checkOutTime", "$checkInTime"] }, 3600000] } // Convert ms to hours
        }
      },
      {
        $group: {
          _id: null,
          totalHours: { $sum: "$hoursWorked" }
        }
      }
    ]);
    res.json(totalHours[0] || { totalHours: 0 });
  } catch (error) {
    console.error('Error fetching total hours:', error.message);
    res.status(500).json({ message: 'Server error while fetching total hours' });
  }
};

module.exports = { getAttendance, markAttendance, checkIn, getTotalHours };
