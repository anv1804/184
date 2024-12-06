const express = require("express");
const { getAllUsers, createUser } = require("../controllers/userController");
const {
  getClassesByTeacherId,
} = require("../controllers/Teacher/teacherController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/classes", getClassesByTeacherId);

module.exports = router;
