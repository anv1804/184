const express = require('express');
const { createSchedule, getSchedules } = require('../controllers/scheduleController');

const router = express.Router();

router.post('/create', createSchedule);
router.get('/', getSchedules);

module.exports = router; 