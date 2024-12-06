const Grade = require('../models/Grade');

exports.getGradesByStudent = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.params.studentId })
      .populate('subject class')
      .exec();
    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createGrade = async (req, res) => {
  try {
    const grade = new Grade(req.body);
    await grade.save();
    res.status(201).json(grade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
