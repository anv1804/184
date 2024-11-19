const Teacher = require('../models/Teacher');

// Lấy danh sách giáo viên
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm giáo viên mới
const addTeacher = async (req, res) => {
  const { name, gender, dob, address, phone, email, main_subject } = req.body;
  try {
    const teacher = new Teacher({ name, gender, dob, address, phone, email, main_subject });
    const savedTeacher = await teacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTeachers, addTeacher };
