const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.post('/classes', classController.createClass);
router.get('/classes', classController.getAllClasses);
router.get('/classes/:id', classController.getClassById);

module.exports = router;
