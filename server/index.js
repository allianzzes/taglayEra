require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// Import your routes (make sure these paths match your folder)
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection Logic
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DATABASE_CONNECTION_ERROR:", err.message);
  }
};

// Middleware to connect to DB on every request (important for Vercel)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Your actual routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => res.send("Server is running"));

// THE MOST IMPORTANT LINE:
module.exports = app;