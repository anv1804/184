const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all teachers

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(404).json({ message: "Không tồn tại người dùng" });
    }

    res.status(200).json(foundUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tìm người dùng", error: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  console.log("Request to get all students:", req.params);
  console.log("Full request object:", req);
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Lỗi khi tìm người dùng", error: error.message });
  }
};
