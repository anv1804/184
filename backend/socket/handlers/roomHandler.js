const EVENTS = require('../events');

class RoomHandler {
  constructor(io) {
    this.io = io;
  }

  handleJoinRoom(socket, roomId) {
    try {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
      socket.emit(EVENTS.ERROR, { message: error.message });
    }
  }

  handleLeaveRoom(socket, roomId) {
    try {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
    } catch (error) {
      console.error('Error leaving room:', error);
      socket.emit(EVENTS.ERROR, { message: error.message });
    }
  }
}

module.exports = RoomHandler; 