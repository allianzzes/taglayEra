const Article = require('../models/Article');

// GET: Fetch all active intel from MongoDB
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({ isActive: true });
        res.status(200).json({ articles });
    } catch (error) {
        res.status(500).json({ message: "DATABASE_SCAN_FAILED: Unable to retrieve sector logs." });
    }
};

// GET: Fetch one specific report by name (slug)
const getArticleByName = async (req, res) => {
    try {
        const { name } = req.params;
        const article = await Article.findOne({ name, isActive: true });
        
        if (!article) {
            return res.status(404).json({ message: "SIGNAL_LOST: Report does not exist." });
        }
        res.status(200).json({ article });
    } catch (error) {
        res.status(500).json({ message: "DECRYPTION_FAILED: Error accessing secure file." });
    }
};

// POST: Create new intel
const createArticle = async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: "UPLOAD_FAILED: Invalid data format." });
    }
};

// PUT: Update existing intel
const updateArticle = async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: "UPDATE_FAILED: Data corrupted." });
    }
};

// PATCH: Toggle Archive/Active status
const toggleArticleStatus = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "TARGET_NOT_FOUND" });
        article.isActive = !article.isActive;
        await article.save();
        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({ message: "STATUS_TOGGLE_FAILED" });
    }
};

module.exports = {
    getArticles,
    getArticleByName,
    createArticle,
    updateArticle,
    toggleArticleStatus
};