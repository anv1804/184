const Class = require("../../models/Class/ClassModel");
const Subject = require("../../models/Subjects/SubjectModel");
const Teacher = require("../../models/Users/TeacherModel");

// GET ALL TEACHER
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  GET TEACHER BY ID
exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTeacher = await Teacher.findById(id)
      .populate("homeroomClass")
      .populate("teachingSubject");
    if (!foundTeacher) {
      return res
        .status(404)
        .json({ message: `Không tồn tại giáo viên có id là : ${id}` });
    }

    res.status(200).json(foundTeacher);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tìm giáo viên", error: error.message });
  }
};

// CREATE TEACHER
exports.createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET FREE TEACHER
exports.getFreeTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({
      role: "teacher",
      homeroomClass: "", // Điều kiện: homeroomClass không tồn tại
    }).populate("teachingSubject", "name");

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy giáo viên nào" });
    }

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({
      message: "Lỗi khi lấy danh sách giáo viên",
      error: error.message,
    });
  }
};

// GET CLASS TEACHER TEACHING BY ID TEACHER

exports.getClassesByTeacherId = async (req, res) => {
  try {
    const teacherId = "6752640e8d5344fd0354b6b3"; // ID của giáo viên mặc định

    // Đảm bảo ID được chuyển đổi về ObjectId đúng cách
    const teacherIdObjectId = new mongoose.Types.ObjectId(teacherId);

    // Tìm tất cả các môn mà giáo viên này đang dạy
    const subjects = await Subject.find({ teachers: teacherIdObjectId });

    if (!subjects || subjects.length === 0) {
      return res
        .status(404)
        .json({ message: "Giáo viên này không dạy môn nào" });
    }

    // Lấy danh sách ID của các môn học mà giáo viên này dạy
    const subjectIds = subjects.map((subject) => subject._id);

    // Tìm các lớp học có môn học tương ứng với giáo viên đang giảng dạy
    const classes = await Class.find({
      subjects: {
        $elemMatch: {
          subject: { $in: subjectIds },
          teacher: teacherIdObjectId,
        },
      },
    })
      .populate({
        path: "subjects.subject",
        match: { _id: { $in: subjectIds } },
        select: "name",
      })
      .populate("homeroomTeacher", "name email");

    if (!classes || classes.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy lớp nào với môn học của giáo viên này",
      });
    }

    return res.status(200).json({ classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return res
      .status(500)
      .json({ message: "Lỗi máy chủ", error: error.message });
  }
};
