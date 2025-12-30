require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Ensure these paths correctly point back to your server folder logic
const userRoutes = require("../server/routes/userRoutes");
const articleRoutes = require("../server/routes/articleRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Optimized CORS Configuration for Production
app.use(cors({
  origin: "*", // You can change this to your specific Vercel URL later for security
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));

// Database Connection with Serverless Optimization
// We define the connection outside the handler for potential reuse by Vercel
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'survivor_db' 
    });
    isConnected = true;
    console.log(`SUCCESS: MongoDB Connected to: ${conn.connection.db.databaseName}`);
  } catch (err) {
    console.error("DATABASE_CONNECTION_ERROR:", err.message);
  }
};

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Root path test to confirm API is live
app.get("/api", (req, res) => {
  res.send("Void Map API is running...");
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// --- CRUCIAL CHANGE FOR VERCEL ---
// We remove app.listen() because Vercel handles the execution environment.
// Instead, we export the app instance.
module.exports = app;