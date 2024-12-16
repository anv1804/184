const EVENTS = require('../events');
const Conversation = require('../../models/Conversation');

class MessageHandler {
  constructor(io) {
    this.io = io;
  }

  async handleSendMessage(socket, data) {
    try {
      const { conversationId, messageId, content, senderId } = data;
      
      // Validate conversation
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }

      // Broadcast message
      socket.to(conversationId).emit(EVENTS.MESSAGE.NEW, {
        _id: messageId,
        sender: { _id: senderId },
        content,
        timestamp: new Date()
      });

    } catch (error) {
      console.error('Error handling message:', error);
      socket.emit(EVENTS.ERROR, { message: error.message });
    }
  }

  async handleRecallMessage(socket, data) {
    try {
      const { conversationId, messageId } = data;
      socket.to(conversationId).emit(EVENTS.MESSAGE.RECALL, { messageId });
    } catch (error) {
      console.error('Error recalling message:', error);
      socket.emit(EVENTS.ERROR, { message: error.message });
    }
  }

  async handleEditMessage(socket, data) {
    try {
      const { conversationId, messageId, newContent } = data;
      socket.to(conversationId).emit(EVENTS.MESSAGE.EDIT, { 
        messageId, 
        newContent 
      });
    } catch (error) {
      console.error('Error editing message:', error);
      socket.emit(EVENTS.ERROR, { message: error.message });
    }
  }
}

module.exports = MessageHandler; 