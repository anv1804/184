const express = require("express");
const { getAllUsers, createUser, getUserById, getAllStudents } = require("../controllers/userController");
const { getClassesByTeacherId } = require("../controllers/Teachers/teacherController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/classes", getClassesByTeacherId);
router.get("/:id", getUserById);
router.get('/students', getAllStudents);

module.exports = router;
