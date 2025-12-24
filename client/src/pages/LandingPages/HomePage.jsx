import React from 'react';
import { Link } from 'react-router-dom';
import articles from '../../article-content';

function HomePage() {
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow" style={{color: 'var(--accent)'}}>SITUATION REPORT: ACTIVE</p>
          <h1>THE VOID MAP: SECTOR INTEL DATABASE.</h1>
          <p className="lead">
            The world went dark, but the map stays open. Use this terminal to scout infested 
            territories, log screamer nests, and verify safe zones for the resistance.
          </p>
          <div className="hero-actions">
            <Link to="/articles" className="button-link primary">
              SCOUT SECTORS
            </Link>
            <Link to="/about" className="button-link secondary">
              THE PROTOCOL
            </Link>
          </div>
          <div className="stats">
            <div className="stat">
              <strong>{articles.length}+</strong>
              <span>Active Reports</span>
            </div>
            <div className="stat">
              <strong>CRITICAL</strong>
              <span>Alert Status</span>
            </div>
            <div className="stat">
              <strong>OFFLINE</strong>
              <span>Central Grid</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-panel">
            <img
              src="https://images.unsplash.com/photo-1684636553231-7612951229d2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Dark abandoned post-apocalyptic city"
              style={{filter: 'grayscale(1) contrast(1.2)'}}
            />
            <p className="muted">
              Visual feed from Sector 4 perimeter. Evidence of mass migration detected at 0400 hours.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIELD NOTES</p>
            <h2>SURVIVAL ESSENTIALS.</h2>
          </div>
          <span className="muted">Standard operating procedures for the end of the world.</span>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Scouting</h3>
            <p>
              Learn how to identify Screamer nests before they identify you. Silence is your only armor.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Resource Management</h3>
            <p>
              Documenting supply drops and medical stashes left by previous scouting parties.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Safe Zones</h3>
            <p>
              Current fortification status of major metro bunkers and rural outposts.
            </p>
          </div>
        </div>
      </section>

      <section className="articles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">INTEL LOGS</p>
            <h2>LATEST SCOUTING REPORTS.</h2>
          </div>
          <Link to="/articles" className="button-link secondary">
            VIEW ALL LOGS
          </Link>
        </div>
        <div className="article-preview-grid">
          {featuredArticles.map((article) => (
            <div key={article.name} className="article-preview">
              <div className="article-meta">
                <span className="pill" style={{backgroundColor: 'var(--accent)', color: 'white'}}>DANGER</span>
                <span className="muted">TS: {new Date().toLocaleDateString()}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.content[1].substring(0, 150)}...</p>
              <Link to={`/articles/${article.name}`} className="button-link secondary">
                OPEN FILE
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;