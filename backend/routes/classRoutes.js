const express = require("express");
const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

const router = express.Router();

// Tạo lớp mới
router.post("/", createClass);

// Lấy thông tin tất cả lớp
router.get("/", getAllClasses);

// Lấy thông tin lớp theo ID
router.get("/:id", getClassById);

// Cập nhật thông tin lớp
router.put("/:id", updateClass);

// Xoá lớp
router.delete("/:id", deleteClass);

module.exports = router;
