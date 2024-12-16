const mongoose = require("mongoose");
const Class = require("../models/Class");

// Tạo lớp mới
const createClass = async (req, res) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo lớp mới", error: error.message });
  }
};

// Lấy thông tin tất cả lớp
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("homeroomTeacher", "name email")
      .populate({
        path: "subjects.subject",
        select: "name",
      });

    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy lớp nào" });
    }

    res.status(200).json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy thông tin lớp", error: error.message });
  }
};

// Lấy thông tin một lớp theo ID
const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundClass = await Class.findById(id)
      .populate("students", "name email avatar gender") // Lấy tên và email học sinh
      .populate("homeroomTeacher", "name email") // Lấy giáo viên chủ nhiệm
      .populate({
        path: "subjects.subject",
        select: "name",
      });

    if (!foundClass) {
      return res.status(404).json({ message: "Lớp không tồn tại" });
    }

    // Đếm số lượng học sinh
    const studentCount = foundClass.students.length;

    res.status(200).json({ ...foundClass.toObject(), studentCount });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm lớp", error: error.message });
  }
};

// Cập nhật thông tin lớp
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("students", "name email")
      .populate("homeroomTeacher", "name email")
      .populate({
        path: "subjects.subject",
        select: "name",
      });

    if (!updatedClass) {
      return res.status(404).json({ message: "Lớp không tồn tại" });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật thông tin lớp",
      error: error.message,
    });
  }
};

// Xoá lớp
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: "Không tìm thấy lớp cần xoá" });
    }

    res.status(200).json({ message: "Xoá lớp thành công", deletedClass });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá lớp", error: error.message });
  }
};
// Cập nhật học sinh của lớp
const updateStudentsInClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { students } = req.body; // students sẽ là một danh sách Array chứa IDs học sinh

    // Kiểm tra xem các ID có hợp lệ hay không
    if (!Array.isArray(students)) {
      return res.status(400).json({ message: "Invalid students data" });
    }

    // Cập nhật thông tin học sinh
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { students },
      { new: true, runValidators: true }
    )
      .populate("students", "name email avatar")
      .populate("homeroomTeacher", "name email")
      .populate({
        path: "subjects.subject",
        select: "name",
      });

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({
      message: "Students updated successfully",
      updatedClass,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating students",
      error: error.message,
    });
  }
};

// Cập nhật giáo viên chủ nhiệm cho lớp
const updateHomeroomTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { homeroomTeacherId } = req.body; // ID của giáo viên chủ nhiệm mới

    if (!homeroomTeacherId) {
      return res.status(400).json({ message: "Teacher ID is required" });
    }

    // Cập nhật giáo viên chủ nhiệm
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { homeroomTeacher: homeroomTeacherId },
      { new: true, runValidators: true }
    )
      .populate("students", "name email avatar")
      .populate("homeroomTeacher", "name email")
      .populate({
        path: "subjects.subject",
        select: "name",
      });

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({
      message: "Homeroom teacher updated successfully",
      updatedClass,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating homeroom teacher",
      error: error.message,
    });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  updateStudentsInClass,
  updateHomeroomTeacher,
};
