// backend/socket/index.js
const socketIo = require('socket.io');
const EVENTS = require('./events');
const MessageHandler = require('./handlers/messageHandler');
const RoomHandler = require('./handlers/roomHandler');
const TypingHandler = require('./handlers/typingHandler');

class SocketServer {
  constructor(io) {
    this.io = io;
    this.messageHandler = new MessageHandler(io);
    this.roomHandler = new RoomHandler(io);
    this.typingHandler = new TypingHandler(io);
  }

  initialize() {
    this.io.on(EVENTS.CONNECTION, (socket) => {
      console.log('User connected:', socket.id);

      // Message events
      socket.on(EVENTS.MESSAGE.SEND, (data) => 
        this.messageHandler.handleSendMessage(socket, data));
      socket.on(EVENTS.MESSAGE.RECALL, (data) => 
        this.messageHandler.handleRecallMessage(socket, data));
      socket.on(EVENTS.MESSAGE.EDIT, (data) => 
        this.messageHandler.handleEditMessage(socket, data));

      // Room events
      socket.on(EVENTS.ROOM.JOIN, (roomId) => 
        this.roomHandler.handleJoinRoom(socket, roomId));
      socket.on(EVENTS.ROOM.LEAVE, (roomId) => 
        this.roomHandler.handleLeaveRoom(socket, roomId));

      // Typing events
      socket.on(EVENTS.TYPING.STATUS, (data) => 
        this.typingHandler.handleTypingStatus(socket, data));

      // Disconnect
      socket.on(EVENTS.DISCONNECT, () => {
        console.log('User disconnected:', socket.id);
      });
    });
  }
}

module.exports = (io) => {
  const socketServer = new SocketServer(io);
  socketServer.initialize();
};