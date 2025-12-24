require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./models/Article');

const seedData = [
    {
        name: "sector-7-whispering-cinema",
        title: "Sector 7: The Whispering Cinema",
        content: [
            "REPORT ID: 001 | STATUS: UNSTABLE",
            "Observations: A suburban theater turned nest.",
            "Tactical Note: Avoid using high-beam flashlights."
        ]
    },
    {
        name: "mercy-hospital-perimeter",
        title: "Mercy Hospital: East Wing Perimeter",
        content: [
            "REPORT ID: 002 | STATUS: CRITICAL",
            "Observations: Heavy infestation detected in the triage area."
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Article.deleteMany({}); // Clears existing data to prevent duplicates
        await Article.insertMany(seedData);
        console.log("INTEL UPLOADED SUCCESSFULLY TO THE VOID MAP.");
        process.exit();
    } catch (err) {
        console.error("DATA CORRUPTION DURING UPLOAD:", err);
        process.exit(1);
    }
};

seedDB();