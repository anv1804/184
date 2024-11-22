const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Subject = require('../models/Subject');

// Tạo giáo viên mới
const createTeacher = async (req, res) => {
  try {
    const { name, age, gender, email, password, avatar, description, subject, homeroom_class, classes_taught } = req.body;

    // Kiểm tra xem môn học và lớp chủ nhiệm có hợp lệ không
    const subjectObj = await Subject.findById(subject);
    const homeroomClass = await Class.findById(homeroom_class);

    if (!subjectObj) {
      return res.status(400).json({ message: 'Môn học không tồn tại' });
    }
    if (!homeroomClass) {
      return res.status(400).json({ message: 'Lớp chủ nhiệm không tồn tại' });
    }

    const teacher = new Teacher({
      name,
      age,
      gender,
      email,
      password,
      avatar,
      description,
      subject,
      homeroom_class,
      classes_taught
    });

    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo giáo viên' });
  }
};

// Lấy tất cả giáo viên
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('subject homeroom_class classes_taught');
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách giáo viên' });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
};
