const express = require('express');
const { getGradesByStudent, createGrade } = require('../controllers/gradeController');
const router = express.Router();

router.get('/:studentId', getGradesByStudent);
router.post('/', createGrade);

module.exports = router;
