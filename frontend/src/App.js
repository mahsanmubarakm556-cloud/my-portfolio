import React, { useState, useEffect } from 'react';
import './App.css';
import myPic from './ahsan.jpg'; 

function App() {
  // Default Data (Agar server fail ho jaye to yeh dikhega)
  const defaultData = {
    profile: {
      name: "Muhammad Ahsan Mubarak",
      role: "Full Stack Developer (MERN)",
      bio: "Based in Pakistan 🇵🇰. Bridging the gap between clean code and interactive design.",
    },
    skills: {
      frontend: ["React.js", "Tailwind CSS", "HTML/CSS", "JavaScript"],
      backend: ["Node.js", "Express", "MongoDB", "API Design"],
      devOps: ["Git", "GitHub", "Vercel", "Render"]
    },
    projects: [
      { id: 1, title: "Project Loading...", desc: "Server is connecting...", type: "Waiting" }
    ]
  };

  const [data, setData] = useState(defaultData);
  const [serverStatus, setServerStatus] = useState("Connecting...");

  useEffect(() => {
    fetch('https://ahsan-api-final.vercel.app/api/data')
      .then(res => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(result => {
        setData(result);
        setServerStatus("Online 🟢");
      })
      .catch(err => {
        console.log("Server Error:", err);
        setServerStatus("Offline 🔴 (Using Local Data)");
        // Agar error aaye to hum data ko null nahi karte, balki defaultData hi rehne dete hain
      });
  }, []);

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">&lt;DevPortfolio /&gt;</div>
        <div className="status-badge">API Status: {serverStatus}</div>
      </nav>

      <header className="hero">
        <img 
            src={myPic} 
            alt="Profile" 
            className="profile-pic" 
        />
        <h1>{data.profile.name}</h1>
        <h2>{data.profile.role}</h2>
        <p>{data.profile.bio}</p>
        
        <div className="cta-buttons">
            {/* Resume Link */}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="primary-btn"
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              View Resume
            </a>
            <button className="secondary-btn">GitHub</button>
        </div>
      </header>

      <section className="section">
        <h3>Technical Arsenal</h3>
        <div className="skills-grid">
            <div className="skill-card">
                <h4>Frontend</h4>
                <ul>{data.skills.frontend.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className="skill-card">
                <h4>Backend</h4>
                <ul>{data.skills.backend.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
            <div className="skill-card">
                <h4>DevOps</h4>
                <ul>{data.skills.devOps.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
        </div>
      </section>

      <section className="section">
        <h3>Featured Deployments</h3>
        <div className="projects-grid">
            {data.projects.map((proj, i) => (
                <div key={i} className="project-card">
                    <span className="badge">{proj.type}</span>
                    <h4>{proj.title}</h4>
                    <p>{proj.desc}</p>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default App;