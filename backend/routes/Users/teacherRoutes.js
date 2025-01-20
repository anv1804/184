const express = require("express");
const {
  getAllTeachers,
  getFreeTeachers,
  getClassesByTeacherId,
  createTeacher,
  getTeacherById,
} = require("../../controllers/Users/TeacherController");
const router = express.Router();

router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.get("/free", getFreeTeachers);
router.get("/classteacherteaching", getClassesByTeacherId);
router.post("/", createTeacher);

module.exports = router;
