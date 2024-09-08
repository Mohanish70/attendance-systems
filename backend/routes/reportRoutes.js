const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Reports route');
});

router.get('/daily', (req, res) => {
  res.send('Daily report route');
});

module.exports = router;
