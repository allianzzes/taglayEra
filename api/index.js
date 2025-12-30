require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// BRIDGE PATHS: Reaching from /api into your /server folder
// Ensure these paths match your actual folder structure
const userRoutes = require("../server/routes/userRoutes");
const articleRoutes = require("../server/routes/articleRoutes");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    // Vercel MUST have MONGO_URI in Environment Variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'survivor_db' 
    });
    isConnected = true;
  } catch (err) {
    console.error("DATABASE_CONNECTION_ERROR:", err.message);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

app.get("/api", (req, res) => {
  res.send("Void Map API is running...");
});

// Error Handling - This prevents the generic 500 and tells you what's wrong
app.use((err, req, res, next) => {
  console.error("SERVER_CRASH_LOG:", err.stack);
  res.status(500).json({ 
    message: "Server Error", 
    details: err.message,
    path: err.path 
  });
});

module.exports = app;