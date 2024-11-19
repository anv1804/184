const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String },
  main_subject: { type: String, required: true },
  is_homeroom_teacher: { type: Boolean, default: false },
  social_insurance: { type: String },
  bank_account: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
