import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Decorative animated blobs */}
      <div className="hero-blobs" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Decorative particles */}
      <div className="hero-particles" aria-hidden="true">
        <div className="particle" style={{ width: '8px', height: '8px', top: '15%', left: '8%', animationDuration: '6s' }}></div>
        <div className="particle" style={{ width: '5px', height: '5px', top: '70%', left: '15%', animationDuration: '8s', animationDelay: '-2s' }}></div>
        <div className="particle" style={{ width: '10px', height: '10px', top: '35%', left: '4%', animationDuration: '7s', animationDelay: '-4s' }}></div>
        <div className="particle" style={{ width: '6px', height: '6px', top: '55%', left: '90%', animationDuration: '9s', animationDelay: '-1s' }}></div>
        <div className="particle" style={{ width: '4px', height: '4px', top: '25%', left: '85%', animationDuration: '5s', animationDelay: '-3s' }}></div>
      </div>

      <div className="container hero-grid">
        <div className="hero-content reveal active">
          <h1>
            Complete Herbal Wellness <span className="hero-title-gold">Coach</span> <span className="hero-title-green">Platform</span>
          </h1>
          
          <p className="hero-desc">
            MyVizen is a complete herbal wellness platform that connects wellness coaches with their clients — for body composition analysis, smart health reports, personalized diet plans, and daily habit tracking.
          </p>

          <div className="hero-buttons">
            <Link to="/download" className="btn-download-badge">
              <svg viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.116 1.116 0 0 1-.61-.994V2.808c0-.414.22-.79.609-.994zM15.206 13.414l2.586 2.586-11.45 6.611 8.864-9.197zM15.206 10.586L6.342 1.389l11.45 6.611-2.586 2.586zm2.414 1.414l3.197 1.846c.773.446.773 1.17 0 1.616l-3.197 1.846-2.414-2.708 2.414-2.6 0z"/>
              </svg>
              <div>
                <span className="btn-badge-subtitle">GET IT ON</span>
                <span className="btn-badge-title">Google Play</span>
              </div>
            </Link>

            <Link to="/download" className="btn-download-badge">
              <svg viewBox="0 0 24 24">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22.05 13.89,21.24 12.37,21.24C10.84,21.24 10.37,21.97 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z"/>
              </svg>
              <div>
                <span className="btn-badge-subtitle">DOWNLOAD ON THE</span>
                <span className="btn-badge-title">App Store</span>
              </div>
            </Link>
          </div>

          <div className="hero-info-line">
            <span>
              <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"/></svg>
              No Credit Card Required
            </span>
            <span>
              <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"/></svg>
              Instant Center Setup
            </span>
          </div>
        </div>

        {/* Dashboard Mockup Syncing with Reference Image */}
        <div className="mockup-container">
          <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-top-bar" style={{ color: '#0f172a' }}>
              <span>19:02</span>
              <div className="phone-top-icons">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            <div className="phone-screen" id="hero-mock-screen" style={{ backgroundColor: '#f0fdf4', padding: '10px' }}>
              {/* Green App Header */}
              <div style={{ background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)', borderRadius: '16px', padding: '14px 12px', color: '#ffffff', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.58rem', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: '100px' }}>📅 Wednesday, Aug 26</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontSize: '0.7rem' }}>💬</span>
                    <span style={{ fontSize: '0.7rem' }}>🔔</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '0.62rem', opacity: 0.9, margin: 0 }}>Good afternoon,</p>
                    <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0, fontWeight: '800' }}>Snehal 👋</h3>
                    <p style={{ fontSize: '0.55rem', opacity: 0.85, margin: '2px 0 0 0' }}>🏢 Charming Aura</p>
                  </div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #22c55e', overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" alt="Snehal Shelke" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>

              {/* Overview Grid */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#166534' }}>Overview</span>
                <span style={{ fontSize: '0.55rem', color: '#15803d', fontWeight: '700' }}>Live</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '10px' }}>
                <div style={{ background: '#ffffff', padding: '8px 4px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', borderTop: '3px solid #22c55e' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2px auto', fontSize: '0.65rem' }}>👥</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#166534' }}>2</div>
                  <div style={{ fontSize: '0.58rem', fontWeight: '700' }}>Guests</div>
                  <div style={{ fontSize: '0.48rem', color: '#64748b' }}>Total Active</div>
                </div>
                <div style={{ background: '#ffffff', padding: '8px 4px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', borderTop: '3px solid #f59e0b' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(245,158,11,0.15)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2px auto', fontSize: '0.65rem' }}>📄</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#166534' }}>0</div>
                  <div style={{ fontSize: '0.58rem', fontWeight: '700' }}>Reports</div>
                  <div style={{ fontSize: '0.48rem', color: '#64748b' }}>Created</div>
                </div>
                <div style={{ background: '#ffffff', padding: '8px 4px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', borderTop: '3px solid #0284c7' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(2,132,199,0.15)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2px auto', fontSize: '0.65rem' }}>🍎</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#166534' }}>4</div>
                  <div style={{ fontSize: '0.58rem', fontWeight: '700' }}>Diet Plans</div>
                  <div style={{ fontSize: '0.48rem', color: '#64748b' }}>Assigned</div>
                </div>
              </div>

              {/* Habit Compliance Card */}
              <div style={{ background: '#ffffff', borderRadius: '12px', padding: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: '800', color: '#166534' }}>Today's Habit Compliance</span>
                  <span style={{ fontSize: '0.55rem', color: '#15803d', fontWeight: '700' }}>Full View →</span>
                </div>

                <div style={{ background: '#09381e', borderRadius: '10px', padding: '8px', color: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.62rem', fontWeight: '700' }}>🍃 Habit Tracker</span>
                    <span style={{ fontSize: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: '4px' }}>Dashboard →</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', textAlign: 'center' }}>
                    <div><span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#22c55e' }}>🏆 0</span><p style={{ fontSize: '0.42rem', opacity: 0.8, margin: 0 }}>EXCELLENT</p></div>
                    <div><span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#eab308' }}>👍 0</span><p style={{ fontSize: '0.42rem', opacity: 0.8, margin: 0 }}>ON TRACK</p></div>
                    <div><span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ef4444' }}>⚠️ 2</span><p style={{ fontSize: '0.42rem', opacity: 0.8, margin: 0 }}>AT RISK</p></div>
                    <div><span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8' }}>📬 0</span><p style={{ fontSize: '0.42rem', opacity: 0.8, margin: 0 }}>NO LOG</p></div>
                  </div>
                </div>
              </div>

              {/* Bottom Nav Bar */}
              <div className="phone-navbar">
                <div className="phone-nav-item active"><span>🏠 Home</span></div>
                <div className="phone-nav-item"><span>🍎 Diet Plan</span></div>
                <div className="phone-nav-fab">📄</div>
                <div className="phone-nav-item"><span>👥 Guests</span></div>
                <div className="phone-nav-item"><span>⚙️ Settings</span></div>
              </div>

              <div className="phone-home-indicator"></div>
            </div>
          </div>

          {/* Floating glassmorphism badge cards */}
          <div className="hero-floating-card hero-floating-card-left">
            <div className="hero-floating-card-icon green">📊</div>
            <div className="hero-floating-card-text">
              <h5>Live Report</h5>
              <p>PDF generated instantly</p>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-card-right">
            <div className="hero-floating-card-icon gold">🌿</div>
            <div className="hero-floating-card-text">
              <h5>Herbal Plans</h5>
              <p>Custom diet roadmap</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
