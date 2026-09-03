import React from 'react';
import { Link } from 'react-router-dom';

export default function DownloadCTA() {
  return (
    <section className="section" style={{ background: 'linear-gradient(135deg, #09381e 0%, #15803d 100%)', color: '#ffffff', textAlign: 'center' }}>
      <div className="container">
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.15)', color: '#4ade80', padding: '4px 14px', borderRadius: '100px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'inline-block' }}>
            🌿 Free Mobile Download
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: '800', color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
            Ready to Digitize Your Wellness Journey?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
            Join thousands of wellness coaches and members using MyVizen daily for body composition analysis, diet plans, and habit tracking.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/download" className="btn btn-secondary btn-pulse">
              Download App Now
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ borderColor: '#ffffff', color: '#ffffff' }}>
              Contact Sales Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
