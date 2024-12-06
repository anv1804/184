const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
// Routes
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/grades', gradeRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
