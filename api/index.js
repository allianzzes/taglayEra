require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// BRIDGE PATHS: Reaching from /api into /server/routes
const userRoutes = require("../server/routes/userRoutes");
const articleRoutes = require("../server/routes/articleRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Optimized CORS
app.use(cors({
  origin: "*", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

// Database Connection with Serverless Optimization
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    // Ensure MONGO_URI is set in Vercel Environment Variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'survivor_db' 
    });
    isConnected = true;
    console.log("MongoDB Connected for Serverless Function");
  } catch (err) {
    console.error("DATABASE_CONNECTION_ERROR:", err.message);
  }
};

// Ensure DB is connected before handling any route
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Root path test
app.get("/api", (req, res) => {
  res.send("Void Map API is running via Vercel Serverless...");
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// CRITICAL: Export for Vercel execution
module.exports = app;