const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  academicYear: { type: String, required: true },
  description: { type: String, required: false } 
});

module.exports = mongoose.model('Subject', subjectSchema);
