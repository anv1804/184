const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "student" },
  avatar: {
    type: String,
    required: false,
    default:
      "https://static.vecteezy.com/system/resources/previews/042/891/253/non_2x/professional-teacher-avatar-illustration-for-education-concept-vector.jpg",
  },
  birth: { type: String, required: false, default: "1/1/2025" },
  gender: { type: String, required: true, default: "Male" },
  description: {
    type: String,
    required: false,
    default: "Xin chào, tôi là giáo viên!",
  },
  studentClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  pointRanking: { type: Number, required: false, default: 0 },
  isOnline: { type: Boolean, default: false },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  lastActive: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);
