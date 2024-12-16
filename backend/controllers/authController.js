const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Bí mật JWT key
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

// Hàm tạo token JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      role: user.role,
      name: user.name,
      email: user.email
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Controller đăng ký
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      age,
      gender,
      identityCard,
      socialInsurance,
      bankAccount,
      teachingSubject,
      homeroomClass,
    } = req.body;

    // Kiểm tra nếu email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      age,
      gender,
      identityCard,
      socialInsurance,
      bankAccount,
      teachingSubject,
      homeroomClass,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Controller đăng nhập
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Cập nhật trạng thái online
    await User.findByIdAndUpdate(user._id, { isOnline: true });

    // Tạo token JWT
    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isOnline: true,
        avatar: user.avatar
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  register,
  login,
};
