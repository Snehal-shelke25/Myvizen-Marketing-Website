import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DownloadCTA from '../components/DownloadCTA';

export default function CoachesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className="page-header">
        <div className="container">
          <div className="section-badge"><span className="badge-dot"></span> For Wellness Coaches</div>
          <h1 className="page-title">Scale Your Herbal Coaching Business</h1>
          <p className="page-lead">
            Manage clients, generate color-coded body composition PDFs, build meal blueprints, and track habit compliance from one central dashboard.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '60px' }}>
            <div className="feature-grid-card">
              <div className="feature-grid-icon">📊</div>
              <h3>Smart Body-Composition Reports</h3>
              <p>Automate body-fat, visceral fat, skeletal muscle, hydration, and metabolic rates reports as downloadable PDFs for clients.</p>
            </div>
            <div className="feature-grid-card">
              <div className="feature-grid-icon">🍎</div>
              <h3>Diet & Compliance Tracking</h3>
              <p>Track daily habit logs and set supplement/water alerts reaching client phones directly to ensure compliance.</p>
            </div>
            <div className="feature-grid-card">
              <div className="feature-grid-icon">🏪</div>
              <h3>Center & Club Operations</h3>
              <p>Optimize check-in logs, walk-in lead captures, and schedule settings for high retention rates across your team.</p>
            </div>
          </div>

          <div style={{ background: 'var(--bg-light-green)', borderRadius: 'var(--radius-lg)', padding: '40px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>5-Step Coach Onboarding Setup</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p>1. Download the Vizen app on Android or iOS and select <strong>"I am a Coach"</strong>.</p>
              <p>2. Create your <strong>Wellness Center Profile</strong> with name, location, and logo.</p>
              <p>3. Add your active clients or log daily walk-in visitors in the <strong>Visitor Registry</strong>.</p>
              <p>4. Input body composition measurements to instantly generate downloadable <strong>Smart PDF Reports</strong>.</p>
              <p>5. Build meal blueprints with the <strong>Diet Architect</strong> and monitor daily compliance status on your live dashboard.</p>
            </div>
            <Link to="/download" className="btn btn-primary" style={{ marginTop: '24px' }}>Start Coach Trial Now</Link>
          </div>
        </div>
      </section>

      <DownloadCTA />
    </main>
  );
}
