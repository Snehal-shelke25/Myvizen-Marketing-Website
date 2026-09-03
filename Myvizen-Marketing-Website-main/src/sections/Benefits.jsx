import React from 'react';

export default function Benefits() {
  return (
    <section className="section" id="benefits">
      <div className="container">
        <div className="section-header reveal active">
          <div className="section-badge"><span className="badge-dot"></span> Why Choose MyVizen</div>
          <h2>Designed for <span>Physical Centers & Modern Coaches</span></h2>
          <p>Everything you need to digitize visitor diaries, automate PDF scorecards, and deliver personal member care.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          <div className="feature-grid-card">
            <div className="feature-grid-icon">⚡</div>
            <h3>5-Minute Setup</h3>
            <p>Download the app, create your wellness center profile, and start inviting clients in under 5 minutes.</p>
          </div>
          <div className="feature-grid-icon-card feature-grid-card">
            <div className="feature-grid-icon">📄</div>
            <h3>Instant PDF Generation</h3>
            <p>Turn raw composition scans into downloadable color-coded PDF reports with your center's logo automatically embedded.</p>
          </div>
          <div className="feature-grid-card">
            <div className="feature-grid-icon">🔔</div>
            <h3>Automated Habit Nudges</h3>
            <p>Set custom alarms for water intake, herbal tea, and supplements to keep members accountable throughout the day.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
