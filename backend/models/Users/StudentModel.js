const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "student" },
  avatar: String,
  age: Number,
  gender: String,
  description: String,
  identityCard: String,
  socialInsurance: String,
  academicYear: String,
  studentClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
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
