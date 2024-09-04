const Attendance = require('../models/Attendance');

const getAttendanceHistory = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assume `req.user.id` is set by authentication middleware
    const attendanceRecords = await Attendance.find({ employeeId: userId }).sort({ date: -1 });
    res.json(attendanceRecords);
  } catch (err) {
    next(err);
  }
};

const getTotalHours = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assume `req.user.id` is set by authentication middleware
    const totalHours = await Attendance.aggregate([
      { $match: { employeeId: mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalHours: { $sum: '$hoursWorked' } } }
    ]);
    res.json({ totalHours: totalHours[0]?.totalHours || 0 });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAttendanceHistory,
  getTotalHours
};
