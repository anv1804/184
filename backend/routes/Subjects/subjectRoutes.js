const express = require("express");
const {
  getAllSubject,
  createSubject,
  getSubjectById,
  updateSubject,
} = require("../../controllers/Subjects/subjectController");
const router = express.Router();

router.get("/", getAllSubject);
router.post("/", createSubject);
router.get("/:id", getSubjectById);
router.put("/:id", updateSubject);
module.exports = router;
