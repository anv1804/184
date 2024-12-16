// backend/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  getOrCreateConversation,
  sendMessage,
  getMessages,
  recallMessage,
  deleteMessage,
  editMessage
} = require('../controllers/chatController');

router.use(authenticateToken);

router.get('/conversation/:participantId', getOrCreateConversation);
router.get('/messages/:conversationId', getMessages);
router.post('/messages/:conversationId', sendMessage);
router.post('/messages/:messageId/recall', authenticateToken, recallMessage);
router.post('/messages/:messageId/delete', authenticateToken, deleteMessage);
router.put('/messages/:messageId', authenticateToken, editMessage);

module.exports = router;
