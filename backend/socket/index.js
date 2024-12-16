// backend/socket/index.js
const socketIo = require('socket.io');

const setupSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  const activeRooms = new Map(); // roomId -> Set of userIds
  const userSockets = new Map(); // userId -> socketId

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log('User connected:', userId);
    userSockets.set(userId, socket.id);

    // Handle room creation
    socket.on('create_room', ({ roomId, targetUserId }) => {
      if (!activeRooms.has(roomId)) {
        activeRooms.set(roomId, new Set([userId, targetUserId]));
      }
      socket.join(roomId);
      
      // Notify target user if online
      const targetSocketId = userSockets.get(targetUserId);
      if (targetSocketId) {
        io.to(targetSocketId).emit('room_created', {
          roomId,
          initiatorId: userId
        });
      }
    });

    // Handle joining room
    socket.on('join_room', (roomId) => {
      if (activeRooms.has(roomId)) {
        socket.join(roomId);
        socket.emit('room_joined', roomId);
      }
    });

    // Handle messages
    socket.on('send_message', (data) => {
      const { roomId, message, senderId, timestamp } = data;
      io.to(roomId).emit('new_message', {
        roomId,
        message,
        senderId,
        timestamp
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      userSockets.delete(userId);
      console.log('User disconnected:', userId);
    });
  });

  return io;
};

module.exports = setupSocket;