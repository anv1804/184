const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  description: { type: String },
  class_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true }, // Liên kết với lớp
  grades: [{
    subject_id: { type: Schema.Types.ObjectId, ref: 'Subject', required: true }, // Liên kết với môn học
    grade: {
      type: Map,
      of: Number, // Lưu điểm theo hệ số
      required: true
    }
  }]
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
