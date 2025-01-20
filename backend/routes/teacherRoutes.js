const express = require("express");
const { getTeachers,getFreeTeachers } = require("../controllers/Teachers/teacherController");
const router = express.Router();

router.get("/", getTeachers);
router.get("/free", getFreeTeachers);

module.exports = router;
