// backend/controllers/chatController.js
const Conversation = require('../models/Conversation');
const User = require('../models/User');

// Lấy hoặc tạo đoạn chat giữa 2 người
const getOrCreateConversation = async (req, res) => {
  try {
    const { participantId } = req.params;
    const userId = req.user._id;

    // Tìm đoạn chat hiện có
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] }
    }).populate('participants', 'name email avatar isOnline');

    // Nếu chưa có, tạo mới
    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, participantId],
        messages: []
      });
      await conversation.save();
      conversation = await conversation.populate('participants', 'name email avatar isOnline');
    }

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Gửi tin nhắn
const sendMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Tạo message mới
    const message = {
      sender: userId,
      content,
      timestamp: new Date()
    };

    // Lưu vào database
    conversation.messages.push(message);
    conversation.lastMessage = message;
    await conversation.save();

    // Populate thông tin sender
    const populatedMessage = await Conversation.populate(message, {
      path: 'sender',
      select: 'name email avatar'
    });

    // Trả về message đã được populate
    res.status(201).json(populatedMessage);

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
  }
};

// Lấy lịch sử tin nhắn
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId)
      .populate({
        path: 'messages.sender',
        select: 'name email avatar'
      });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation.messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm các hàm xử lý mới
const recallMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      'messages._id': messageId
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const message = conversation.messages.id(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Chỉ người gửi mới có thể thu hồi tin nhắn
    if (message.sender.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    message.isRecalled = true;
    await conversation.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      'messages._id': messageId
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Thêm userId vào mảng deletedFor
    const message = conversation.messages.id(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (!message.deletedFor) {
      message.deletedFor = [];
    }
    message.deletedFor.push(userId);
    await conversation.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const conversation = await Conversation.findOne({
      'messages._id': messageId
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const message = conversation.messages.id(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Kiểm tra quyền sửa tin nhắn
    if (message.sender.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Kiểm tra thời gian sửa (3 phút)
    const messageTime = new Date(message.timestamp).getTime();
    const currentTime = new Date().getTime();
    if (currentTime - messageTime > 180000) {
      return res.status(403).json({ message: 'Cannot edit message after 3 minutes' });
    }

    // Lưu nội dung cũ vào lịch sử
    if (!message.editHistory) {
      message.editHistory = [];
    }
    message.editHistory.push({
      content: message.content,
      editedAt: new Date()
    });

    // Cập nhật nội dung mới
    message.content = content;
    await conversation.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getOrCreateConversation,
  sendMessage,
  getMessages,
  recallMessage,
  deleteMessage,
  editMessage
};