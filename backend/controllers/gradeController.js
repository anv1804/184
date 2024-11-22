const Grade = require("../models/Grade");

// Thêm điểm cho học sinh
const addGrade = async (req, res) => {
  try {
    const {
      student,
      subject,
      semester,
      coefficient_1,
      coefficient_2,
      coefficient_3,
    } = req.body;

    // Tính tổng điểm dựa trên hệ số
    const total_score =
      coefficient_1 * 5 + coefficient_2 * 3 + coefficient_3 * 1;

    const newGrade = new Grade({
      student,
      subject,
      semester,
      coefficient_1,
      coefficient_2,
      coefficient_3,
      total_score,
    });

    await newGrade.save();
    res.status(201).json({ message: "Điểm đã được thêm thành công", newGrade });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm điểm", error });
  }
};

const getGradesById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const grades = await Grade.findById(id);
    console.log(`grades : `, grades);

    if (!grades.length && grades.length <= 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy điểm của học sinh này" });
    }

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: "Lỗi ", error });
  }
};

// Lấy danh sách điểm của học sinh theo student_id
const getGradesByStudent = async (req, res) => {
  try {
    const { student_id } = req.params;
    console.log( student_id );

    const grades = await Grade.find({ student_id : student_id });
    console.log(`grades : `, grades);

    // if (!grades.length) {
    //   return res.status(404).json({ message: "Không tìm thấy điểm của học sinh này" });
    // }

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy điểm", error });
  }
};

// Lấy điểm của học sinh theo môn học và học kỳ
const getGradesBySubjectAndSemester = async (req, res) => {
  try {
    const { subject_id, semester } = req.params;
    const grades = await Grade.find({ subject_id, semester }).populate(
      "student_id"
    );

    if (!grades.length) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy điểm cho môn học này và học kỳ này" });
    }

    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy điểm", error });
  }
};

// Cập nhật điểm của học sinh
const updateGrade = async (req, res) => {
  try {
    const { grade_id } = req.params;
    const { coefficient_1, coefficient_2, coefficient_3 } = req.body;

    const grade = await Grade.findById(grade_id);

    if (!grade) {
      return res.status(404).json({ message: "Điểm không tồn tại" });
    }

    grade.coefficient_1 = coefficient_1;
    grade.coefficient_2 = coefficient_2;
    grade.coefficient_3 = coefficient_3;

    // Tính lại tổng điểm
    grade.total_score =
      coefficient_1 * 5 + coefficient_2 * 3 + coefficient_3 * 1;

    await grade.save();
    res.status(200).json({ message: "Cập nhật điểm thành công", grade });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật điểm", error });
  }
};

// Xóa điểm của học sinh
const deleteGrade = async (req, res) => {
  try {
    const { grade_id } = req.params;

    const grade = await Grade.findById(grade_id);

    if (!grade) {
      return res.status(404).json({ message: "Điểm không tồn tại" });
    }

    await grade.remove();
    res.status(200).json({ message: "Xóa điểm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa điểm", error });
  }
};

module.exports = {
  addGrade,
  getGradesById,
  getGradesByStudent,
  getGradesBySubjectAndSemester,
  updateGrade,
  deleteGrade,
};
