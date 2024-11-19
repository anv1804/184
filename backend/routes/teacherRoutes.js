const express = require('express');
const { getTeachers, addTeacher } = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getTeachers).post(protect, addTeacher);

module.exports = router;
