const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "teacher", "student"], required: true },
  avatar: String,
  age: Number,
  gender: String,
  description: String,
  identityCard: String,
  socialInsurance: String, // Chỉ giáo viên
  bankAccount: String, // Chỉ giáo viên
  teachingSubject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // Giáo viên
  homeroomClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // Giáo viên
  studentClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // Học sinh
  academicYear: String,
});

module.exports = mongoose.model("User", userSchema);
