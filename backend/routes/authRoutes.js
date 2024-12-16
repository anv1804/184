const express = require('express');
const { login } = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Route đăng nhập
router.post('/login', login);

// Route xác thực token
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ valid: false, message: 'User not found' });
    }

    res.json({ 
      valid: true, 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isOnline: user.isOnline,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false, error: error.message });
  }
});

// Route cập nhật trạng thái
router.post('/status', authenticateToken, async (req, res) => {
  try {
    const { userId, isOnline } = req.body;
    
    // Verify that the user is updating their own status
    if (userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isOnline },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isOnline: user.isOnline,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route bảo mật - chỉ admin mới được vào
router.get('/admin-dashboard', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome to admin dashboard' });
});

// Route bảo mật - chỉ giáo viên mới được vào
router.get('/teacher-dashboard', authenticateToken, authorizeRoles('teacher'), (req, res) => {
  res.status(200).json({ message: 'Welcome to teacher dashboard' });
});

// Route bảo mật - chỉ học sinh mới được vào
router.get('/student-dashboard', authenticateToken, authorizeRoles('student'), (req, res) => {
  res.status(200).json({ message: 'Welcome to student dashboard' });
});

module.exports = router;
