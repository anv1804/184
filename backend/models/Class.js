const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
  class_name: { type: String, required: true },
  grade: { type: String, required: true }, // Grade là 10, 11, 12
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Lớp có giáo viên chủ nhiệm
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }] // Lưu danh sách học sinh theo ObjectId
}, {
  timestamps: true
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
