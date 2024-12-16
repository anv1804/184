const express = require("express");
const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  updateStudentsInClass,
  updateHomeroomTeacher,
} = require("../controllers/classController");

const router = express.Router();

// Tạo lớp mới
router.post("/create", createClass);

// Lấy thông tin tất cả các lớp
router.get("/", getAllClasses);

// Lấy thông tin một lớp theo ID
router.get("/:id", getClassById);

// Cập nhật thông tin lớp
router.put("/:id", updateClass);

// Xoá lớp
router.delete("/:id", deleteClass);

// Cập nhật danh sách học sinh trong lớp
router.put("/:id/students", updateStudentsInClass);

// Cập nhật giáo viên chủ nhiệm của lớp
router.put("/:id/homeroomTeacher", updateHomeroomTeacher);

module.exports = router;
