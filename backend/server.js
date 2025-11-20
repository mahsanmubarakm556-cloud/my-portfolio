// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- Mock Database ---
const profileData = {
    name: "Muhammad Ahsan Mubarak",
    role: "Full Stack Developer (MERN)",
    bio: "Based in Pakistan 🇵🇰. Bridging the gap between clean code and interactive design.",
    avatar: "profile.jpg"  // <-- Yeh line humne add ki hai
};

const skills = {
    frontend: ["React.js", "Tailwind CSS", "Redux", "Next.js"],
    backend: ["Node.js", "Express", "MongoDB", "REST APIs"],
    devOps: ["Docker", "AWS", "Git"]
};

const projects = [
    {
        id: 1,
        title: "SaaS CRM Dashboard",
        desc: "Customer relationship tool with JWT Auth.",
        type: "Full Stack"
    },
    {
        id: 2,
        title: "AI Image Generator",
        desc: "Integration with OpenAI API & Stripe payments.",
        type: "Backend Heavy"
    }
];

// --- API Routes ---

// 1. Health Check (Server Status)
app.get('/api/health', (req, res) => {
    res.json({ status: "Online", uptime: process.uptime() });
});

// 2. Get All Portfolio Data
app.get('/api/data', (req, res) => {
    res.json({
        profile: profileData,
        skills: skills,
        projects: projects
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// Isko file ke sabse end mein likhein
module.exports = app;