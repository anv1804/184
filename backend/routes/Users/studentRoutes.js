const express = require("express");
const {
  getAllStudents,
  getStudentById,
  createStudent,
} = require("../../controllers/Users/StudentController");
const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
// router.get("/free", getFreeTeachers);
// router.get("/classteacherteaching", getClassesByTeacherId);
router.post("/", createStudent);

module.exports = router;
