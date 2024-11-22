const Student = require('../models/Student');
const Class = require('../models/Class');
const Grade = require('../models/Grade');

// Tạo học sinh mới
const createStudent = async (req, res) => {
  try {
    const { name, age, gender, email, password, avatar, description, class_id } = req.body;

    // Kiểm tra lớp học có hợp lệ không
    const classObj = await Class.findById(class_id);
    if (!classObj) {
      return res.status(400).json({ message: 'Lớp học không tồn tại' });
    }

    const student = new Student({
      name,
      age,
      gender,
      email,
      password,
      avatar,
      description,
      student_id: `ST${Date.now()}`, // Tạo ID học sinh tự động (có thể thay đổi cách tạo)
      class_id,
    });

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo học sinh' });
  }
};

// Lấy tất cả học sinh
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('class_id grades');
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách học sinh' });
  }
};

// Lấy thông tin học sinh theo ID
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId).populate('class_id grades');
    if (!student) {
      return res.status(404).json({ message: 'Học sinh không tồn tại' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin học sinh' });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
};
