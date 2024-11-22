const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
  student_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Student',  // Liên kết với bảng học sinh
    required: true 
  },
  subject: { 
    type: Schema.Types.ObjectId, 
    ref: 'Subject',  // Liên kết với bảng môn học
    required: true 
  },
  semester: {
    type: Number, // Kỳ học (1 hoặc 2)
    required: true
  },
  coefficient_1: {
    type: [Number], // Mảng chứa các điểm của hệ số 1
    required: true,
    // validate: [arrayLimit, 'Hệ số 1 phải chứa 5 điểm']
  },
  coefficient_2: {
    type: [Number], // Mảng chứa các điểm của hệ số 2
    required: true,
    // validate: [arrayLimit, 'Hệ số 2 phải chứa 3 điểm']
  },
  coefficient_3: {
    type: [Number], // Mảng chứa các điểm của hệ số 3
    required: true,
    // validate: [arrayLimit, 'Hệ số 3 phải chứa 1 điểm']
  },
  average_score: { 
    type: Number, // Điểm trung bình của học sinh
    required: true
  }
});

// Giới hạn số lượng điểm của mỗi hệ số
function arrayLimit(val) {
  if (val.length === 5 || val.length === 3 || val.length === 1) {
    return true;
  }
  return false;
}

module.exports = mongoose.model('Grade', gradeSchema);