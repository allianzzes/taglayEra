const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // The slug (e.g., sector-7)
    title: { type: String, required: true },
    content: { type: [String], required: true }, // Array of strings
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);