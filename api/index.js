// api/index.js
require("dotenv").config();

// We are importing the ALREADY CONFIGURED app from your server folder.
// Ensure your server/index.js or server/app.js has 'module.exports = app;' at the bottom.
try {
    const app = require("../server/index"); 
    module.exports = app;
} catch (error) {
    console.error("Vercel Bridge Error:", error.message);
    // If the path above is wrong, this will show in Vercel Logs
    const express = require("express");
    const app = express();
    app.all("*", (req, res) => res.status(500).json({ error: "Bridge path failed", detail: error.message }));
    module.exports = app;
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // Use existing connection if available
  try {
    await mongoose.connect(process.env.MONGO_URI); // This is where it was failing
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DATABASE_CONNECTION_ERROR:", err.message);
  }
};