const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
  getFriendRequests,
  removeFriend
} = require('../controllers/friendController');

const router = express.Router();

// Tất cả các routes đều yêu cầu xác thực
router.use(authenticateToken);

router.post('/send-request', sendFriendRequest);
router.post('/accept-request', acceptFriendRequest);
router.post('/reject-request', rejectFriendRequest);
router.get('/list', getFriends);
router.get('/requests', getFriendRequests);
router.post('/remove', removeFriend);

module.exports = router; 