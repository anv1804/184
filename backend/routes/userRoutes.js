const express = require("express");
const { getAllUsers, createUser,getUserById,getTeachers } = require("../controllers/userController");
const {
  getClassesByTeacherId,
} = require("../controllers/Teacher/teacherController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/classes", getClassesByTeacherId);
router.get("/:id", getUserById);

module.exports = router;
