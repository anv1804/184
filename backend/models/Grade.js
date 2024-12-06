const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  semester: { type: Number, required: true },
  scores: {
    coefficient1: { type: [Number], default: [] },
    coefficient2: { type: [Number], default: [] },
    coefficient3: { type: [Number], default: [] }
  },
  academicYear: { type: String, required: true }
});

module.exports = mongoose.model('Grade', gradeSchema);
