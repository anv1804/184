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
  socialInsurance: String,
  bankAccount: String,
  teachingSubject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  homeroomClass: String,
  studentClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  academicYear: String,
  isOnline: { type: Boolean, default: false },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ 
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
  }],
  lastActive: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
