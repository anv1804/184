const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String, required: true }, // Tên môn học
  description: { type: String }, // Mô tả môn học
}, {
  timestamps: true
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
