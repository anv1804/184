const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Route để tạo môn học
router.post('/subjects', subjectController.createSubject);

// Route để lấy tất cả môn học
router.get('/subjects', subjectController.getAllSubjects);

// Route để cập nhật môn học
router.put('/subjects', subjectController.updateSubject);

// Route để xóa môn học
router.delete('/subjects/:subject_id', subjectController.deleteSubject);

module.exports = router;
