const Class = require("../../models/Class/ClassModel");
const Subject = require("../../models/Subjects/SubjectModel");
const Teacher = require("../../models/Users/TeacherModel");
const Student = require("../../models/Users/StudentModel");

// GET ALL STUDENT
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET STUDENT BY ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundStudent = await Student.findById(id)
      .populate("homeroomClass")
      .populate();
    if (!foundStudent) {
      return res
        .status(404)
        .json({ message: `Không tồn tại học sinh có id là : ${id}` });
    }

    res.status(200).json(foundStudent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tìm học sinh", error: error.message });
  }
};
// CREATE NEW STUDENT
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
