import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [serverStatus, setServerStatus] = useState("Connecting...");

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(result => {
        setData(result);
        setServerStatus("Online 🟢");
      })
      .catch(err => setServerStatus("Offline 🔴"));
  }, []);

  if (!data) return <div className="loading">Booting up server...</div>;

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">&lt;DevPortfolio /&gt;</div>
        <div className="status-badge">API Status: {serverStatus}</div>
      </nav>

<header className="hero">
        {/* Photo yahan add ki hai */}
<img 
    src="/profile.jpg"  // Humne direct naam likh diya
    alt="Profile" 
    className="profile-pic" 
/>
        <h1>{data.profile.name}</h1>
        <h2>{data.profile.role}</h2>
        <p>{data.profile.bio}</p>
        <div className="cta-buttons">
            <button className="primary-btn">View Resume</button>
            <button className="secondary-btn">GitHub</button>
        </div>
      </header>

      <section className="section">
        <h3>Technical Arsenal</h3>
        <div className="skills-grid">
            <div className="skill-card">
                <h4>Frontend</h4>
                <ul>{data.skills.frontend.map(s => <li key={s}>{s}</li>)}</ul>
            </div>
            <div className="skill-card">
                <h4>Backend</h4>
                <ul>{data.skills.backend.map(s => <li key={s}>{s}</li>)}</ul>
            </div>
            <div className="skill-card">
                <h4>DevOps</h4>
                <ul>{data.skills.devOps.map(s => <li key={s}>{s}</li>)}</ul>
            </div>
        </div>
      </section>

      <section className="section">
        <h3>Featured Deployments</h3>
        <div className="projects-grid">
            {data.projects.map(proj => (
                <div key={proj.id} className="project-card">
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