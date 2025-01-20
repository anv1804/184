const User = require("../models/User");

// Function to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }); // Fetch users with role 'student'
    res.status(200).json(students); // Send the list of students as a response
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error" });
  }
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
