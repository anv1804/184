const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/gradeController");

router.post("/add", gradeController.addGrade);
router.get("/:id", gradeController.getGradesById);
router.get("/student/:student_id", gradeController.getGradesByStudent);
router.get("/subject/:subject_id/semester/:semester", gradeController.getGradesBySubjectAndSemester);
router.put("/update/:grade_id", gradeController.updateGrade);
router.delete("/delete/:grade_id", gradeController.deleteGrade);

module.exports = router;
