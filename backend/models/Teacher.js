const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  description: { type: String },
  subject: { type: String, required: true },
  class_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true }, // Sử dụng ObjectId để liên kết với lớp
  classesTaught: [{ type: String }]
}, {
  timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
