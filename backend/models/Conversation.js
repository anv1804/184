// backend/models/Conversation.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  timestamp: { type: Date, default: Date.now },
  isRecalled: { type: Boolean, default: false },
  deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  editHistory: [{
    content: String,
    editedAt: Date
  }],
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'sticker'],
    default: 'text'
  },
  fileUrl: String,
  fileName: String,
  fileSize: Number,
  mimeType: String,
  replyTo: {
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    content: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  forwardedFrom: {
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  isImportant: { type: Boolean, default: false },
  reactions: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    emoji: String
  }]
});

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [messageSchema],
  lastMessage: {
    content: String,
    timestamp: Date,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);