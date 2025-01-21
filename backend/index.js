const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const User = require("./models/User");
const { authenticateToken } = require("./middleware/authMiddleware");
dotenv.config(); // Load environment variables
const setupSocket = require("./socket");
const app = express();
const schedule = require("node-schedule");

// Middleware
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Lưu trữ users và rooms
const users = new Map(); // Lưu user ID và socket ID
const rooms = new Map(); // Lưu thông tin về các phòng

// Tạo sẵn phòng mặc định
const DEFAULT_ROOM = "room_default";
rooms.set(DEFAULT_ROOM, {
  users: [],
  messages: [],
});

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Xử lý khi user join vào phòng
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
  });

  // Xử lý tin nhắn
  socket.on("send_message", async (data) => {
    try {
      const { conversationId, messageId, content, senderId } = data;

      // Broadcast tin nhắn đến tất cả người trong phòng trừ người gửi
      socket.to(conversationId).emit("new_message", {
        _id: messageId,
        sender: {
          _id: senderId,
          // Các thông tin khác sẽ được populate từ API response
        },
        content,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error handling socket message:", error);
    }
  });

  // Xử lý join room cho mỗi user
  socket.on("join_chat", (userId) => {
    socket.join(`user_${userId}`);
  });

  // Xử lý ngắt kết nối
  socket.on("disconnect", () => {
    let disconnectedUserId = null;

    // Tìm user ID từ socket ID
    for (const [userId, socketId] of users.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        users.delete(userId);
        break;
      }
    }

    if (disconnectedUserId) {
      const room = rooms.get(DEFAULT_ROOM);
      const index = room.users.indexOf(disconnectedUserId);
      if (index !== -1) {
        room.users.splice(index, 1);

        // Thông báo cho các users còn lại
        io.to(DEFAULT_ROOM).emit("room_info", {
          roomId: DEFAULT_ROOM,
          users: room.users,
          messages: room.messages,
        });
      }
    }

    console.log("User disconnected:", socket.id);
  });

  socket.on("typing_status", ({ conversationId, userId, isTyping }) => {
    // Broadcast typing status to all users in the conversation except sender
    socket.to(conversationId).emit("typing_status", {
      userId,
      isTyping,
    });
  });

  socket.on("message_recalled", ({ conversationId, messageId }) => {
    socket.to(conversationId).emit("message_recalled", { messageId });
  });

  socket.on(
    "message_edited",
    ({ conversationId, messageId, newContent, sender }) => {
      socket.to(conversationId).emit("message_edited", {
        messageId,
        newContent,
        sender,
      });
    }
  );
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/Class/classRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const authRoutes = require("./routes/authRoutes");
// const teacherRoutes = require("./routes/teacherRoutes");
const chatRoutes = require("./routes/chatRoutes");
const friendRoutes = require("./routes/friendRoutes");
const eventRoutes = require("./routes/Events/eventRouter");
const teacherRoutes = require("./routes/Users/teacherRoutes.js");
const studentRoutes = require("./routes/Users/studentRoutes.js");

const subjectRoutes = require("./routes/Subjects/subjectRoutes.js");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/auth", authRoutes);
// app.use("/api/teachers", teacherRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);

app.post("/auth/status", authenticateToken, async (req, res) => {
  try {
    const { userId, isOnline } = req.body;

    // Cập nhật trạng thái trong database
    await User.findByIdAndUpdate(userId, { isOnline });

    // Thông báo cho các clients khác thông qua socket
    io.emit("user_status_change", { userId, isOnline });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/auth/verify", authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Scheduled job to update user statuses
schedule.scheduleJob("*/5 * * * *", async () => {
  // Every 5 minutes
  const now = new Date();
  const offlineThreshold = 24 * 60 * 60 * 1000; // 24 hours

  await User.updateMany(
    { lastActive: { $lt: new Date(now - offlineThreshold) } },
    { isOnline: false }
  );
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
