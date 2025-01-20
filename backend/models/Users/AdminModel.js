const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
  avatar: String,
  age: Number,
  gender: String,
  isOnline: { type: Boolean, default: false },
  lastActive: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Admin", adminSchema);
