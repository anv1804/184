const express = require("express");
const { getTeachers,getFreeTeachers } = require("../controllers/Teacher/teacherController");
const router = express.Router();

router.get("/", getTeachers);
router.get("/free", getFreeTeachers);

module.exports = router;
