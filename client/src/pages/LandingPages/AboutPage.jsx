import React from 'react';

function AboutPage() {
  return (
    
    
    <div className="page">
      <div className="page-header">
        <p className="eyebrow">About</p>
        <h1>THE PROTOCOL</h1>
        <p className="lead">
          Established Year Zero. This database serves as the final link between remaining survivor cells.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="feature-icon">UX</div>
          <h3>Objective</h3>
          <p>
            To document every "Screamer" nest and "Seeker" territory to minimize further casualties during supply runs.
          </p>
        </div>
        <div className="about-card">
          <div className="feature-icon">DX</div>
          <h3>Authentication</h3>
          <p>
            Only verified scouts can upload new intel. If your sector has gone dark, report it immediately via the Intel tab.
          </p>
        </div>
      </div>

      <div className="timeline">
        <div className="timeline-row">
          <strong>PHASE 1</strong>
          <p>
            The initial outbreak. Total communication blackout.
          </p>
        </div>
        <div className="timeline-row">
          <strong>PHASE 2</strong>
          <p>
            Establishment of THE VOID MAP. First sectors mapped.
          </p>
        </div>
      </div>

      <div className="cta-banner">
        <h3>Get the next drop.</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra interdum vel volutpat in
          molestie mauris quis.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
