const express = require('express');
const router = express.Router();

// Dummy endpoints for testing
router.get('/', (req, res) => {
  res.send('Reports route');
});

router.get('/daily', (req, res) => {
  res.send('Daily report route');
});

module.exports = router;
