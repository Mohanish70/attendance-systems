const Attendance = require('../models/Attendance');
const { Parser } = require('json2csv');

const generateReport = async (req, res) => {
  const { fromDate, toDate } = req.query;
  try {
    const attendanceRecords = await Attendance.find({
      checkIn: { $gte: new Date(fromDate), $lte: new Date(toDate) }
    }).populate('user', 'name email');

    const fields = ['user.name', 'user.email', 'checkIn', 'checkOut', 'totalHours'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(attendanceRecords);

    res.header('Content-Type', 'text/csv');
    res.attachment('attendance-report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateReport };
