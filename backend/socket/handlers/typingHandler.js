const EVENTS = require('../events');

class TypingHandler {
  constructor(io) {
    this.io = io;
  }

  handleTypingStatus(socket, data) {
    try {
      const { conversationId, userId, isTyping } = data;
      socket.to(conversationId).emit(EVENTS.TYPING.STATUS, { 
        userId, 
        isTyping 
      });
    } catch (error) {
      console.error('Error handling typing status:', error);
      socket.emit(EVENTS.ERROR, { message: error.message });
    }
  }
}

module.exports = TypingHandler; 