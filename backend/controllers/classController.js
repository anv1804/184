const Class = require('../models/Class');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Subject = require('../models/Subject');

// Tạo lớp mới
const createClass = async (req, res) => {
  try {
    const { name, homeroom_teacher, students, subjects, grade } = req.body;

    // Kiểm tra xem giáo viên chủ nhiệm, học sinh và môn học có hợp lệ không
    const homeroomTeacher = await Teacher.findById(homeroom_teacher);
    if (!homeroomTeacher) {
      return res.status(400).json({ message: 'Giáo viên chủ nhiệm không tồn tại' });
    }

    const studentsList = await Student.find({ '_id': { $in: students } });
    if (studentsList.length !== students.length) {
      return res.status(400).json({ message: 'Một hoặc nhiều học sinh không tồn tại' });
    }

    const subjectsList = await Subject.find({ '_id': { $in: subjects } });
    if (subjectsList.length !== subjects.length) {
      return res.status(400).json({ message: 'Một hoặc nhiều môn học không tồn tại' });
    }

    // Tạo lớp mới
    const newClass = new Class({
      name,
      homeroom_teacher,
      students,
      subjects,
      grade
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo lớp học' });
  }
};

// Lấy tất cả các lớp học
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('homeroom_teacher students subjects');
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách lớp học' });
  }
};

// Lấy lớp theo ID
const getClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const classData = await Class.findById(classId).populate('homeroom_teacher students subjects');
    if (!classData) {
      return res.status(404).json({ message: 'Lớp học không tồn tại' });
    }
    res.status(200).json(classData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin lớp học' });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
};
