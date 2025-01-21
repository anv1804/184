const express = require("express");
const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  updateStudentsInClass,
  updateHomeroomTeacher,
  createMultipleClasses,
  uploadClasses,
} = require("../../controllers/Class/classController");
const upload = require("../../middleware/uploadFile");
const router = express.Router();

// Tạo lớp mới
router.post("/", createMultipleClasses);

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

router.put("/upload/:id", upload, updateClass);
module.exports = router;
