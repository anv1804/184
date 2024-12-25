const Grade = require('../models/Grade');

exports.getGradesByStudent = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.params.studentId })
      .populate('subject class')
      .exec();

    const gradesWithAverage = grades.map(grade => ({
      ...grade.toObject(),
      average: calculateAverage(grade.scores),
    }));

    res.status(200).json(gradesWithAverage);
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

const calculateAverage = (scores) => {
  const totalCoefficient1 = scores.coefficient1.reduce((a, b) => a + b, 0);
  const totalCoefficient2 = scores.coefficient2.reduce((a, b) => a + b, 0);
  const totalCoefficient3 = scores.coefficient3.reduce((a, b) => a + b, 0);

  const average = (totalCoefficient1 * 5 + totalCoefficient2 * 3 + totalCoefficient3 * 1) / 
                  (scores.coefficient1.length * 5 + scores.coefficient2.length * 3 + scores.coefficient3.length * 1);
  
  return average;
};
