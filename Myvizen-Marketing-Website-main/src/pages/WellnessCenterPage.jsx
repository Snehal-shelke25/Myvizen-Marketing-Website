import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MarqueeTicker from '../components/MarqueeTicker';
import DownloadCTA from '../components/DownloadCTA';

export default function WellnessCenterPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="hero" id="home" style={{ minHeight: '75vh' }}>
        <div className="hero-blobs" aria-hidden="true">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        <div className="container hero-grid">
          <div className="hero-content reveal active">
            <div className="section-badge" style={{ marginBottom: '18px' }}><span className="badge-dot"></span> Built for Physical Centers</div>
            <p className="hero-subtitle">Wellness Centers</p>
            <h1>Digitize Your Entire <span className="gradient-text">Wellness Center</span> in One App</h1>
            <p className="hero-desc">
              From walk-in visitor registration to body composition reports, diet assignment, habit compliance, and revenue analytics — MyVizen gives wellness center owners one powerful command hub.
            </p>
            <div className="hero-buttons">
              <Link to="/download" className="btn btn-primary btn-pulse">Register Your Center Free</Link>
              <Link to="/contact" className="btn btn-outline">Talk to Sales</Link>
            </div>
            <div className="hero-info-line">
              <span>
                <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"/></svg>
                No Setup Fee
              </span>
              <span>
                <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z"/></svg>
                Ready in Under 5 Minutes
              </span>
            </div>
          </div>

          <div className="mockup-container">
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-top-bar" style={{ color: '#0f172a' }}>
                <span>19:02</span>
                <div className="phone-top-icons"><span>5G</span><span>100%</span></div>
              </div>

              {/* Exact replacement mockup matching Snehal Shelke Dashboard */}
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
          </div>
        </div>
      </section>

      <MarqueeTicker />

      {/* HOW WELLNESS CENTERS USE MYVIZEN */}
      <section className="section section-bg-light" id="how-to-use">
        <div className="container">
          <div className="section-header reveal active">
            <div className="section-badge"><span className="badge-dot"></span> Getting Started</div>
            <h2>How Your Wellness Center <span>Gets Started</span></h2>
            <p>Set up your entire center on MyVizen in under 5 minutes. Follow these simple steps to go fully digital.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px', marginTop: '50px' }}>
            <div className="step-card">
              <span style={{ fontSize: '1.8rem', marginBottom: '10px', display: 'block' }}>📲</span>
              <div className="step-number">1</div>
              <h3>Download & Register</h3>
              <p>Download the MyVizen app on Android or iOS. Tap <strong>"I am a Coach / Center Owner"</strong> on the welcome screen and complete your profile in under 2 minutes.</p>
            </div>
            <div className="step-card">
              <span style={{ fontSize: '1.8rem', marginBottom: '10px', display: 'block' }}>🏪</span>
              <div className="step-number">2</div>
              <h3>Set Up Your Center Profile</h3>
              <p>Enter your <strong>center name, city, and type</strong> (herbal, nutrition, wellness clinic). Add a logo and description. Your center is now searchable by local members.</p>
            </div>
            <div className="step-card">
              <span style={{ fontSize: '1.8rem', marginBottom: '10px', display: 'block' }}>👥</span>
              <div className="step-number">3</div>
              <h3>Add Your Guests / Members</h3>
              <p>Invite existing clients via phone number or walk-in code. Log new walk-in visitors daily using the <strong>Visitor Registry</strong> in your dashboard.</p>
            </div>
            <div className="step-card">
              <span style={{ fontSize: '1.8rem', marginBottom: '10px', display: 'block' }}>📊</span>
              <div className="step-number">4</div>
              <h3>Generate Body Reports</h3>
              <p>Enter height, weight, and body composition readings for each guest. MyVizen <strong>auto-calculates BMI, fat%, muscle%, water%</strong> and generates a color-coded PDF report.</p>
            </div>
            <div className="step-card">
              <span style={{ fontSize: '1.8rem', marginBottom: '10px', display: 'block' }}>🍎</span>
              <div className="step-number">5</div>
              <h3>Assign Personalized Diet Plans</h3>
              <p>Build meal-by-meal diet blueprints using the Diet Architect. Set start/end dates and <strong>assign plans directly</strong> to guest accounts from your coach dashboard.</p>
            </div>
            <div className="step-card">
              <span style={{ fontSize: '1.8rem', marginBottom: '10px', display: 'block' }}>🔔</span>
              <div className="step-number">6</div>
              <h3>Set Compliance Reminders</h3>
              <p>Configure automated push notifications for supplement doses, hydration reminders, and meal times. Guests get <strong>nudge alerts</strong> directly on their phones.</p>
            </div>
            <div className="step-card">
              <span style={{ fontSize: '1.8rem', marginBottom: '10px', display: 'block' }}>✓</span>
              <div className="step-number">7</div>
              <h3>Monitor Compliance Daily</h3>
              <p>Your dashboard shows <strong>Excellent / On Track / At Risk / No Log</strong> compliance status for every guest. Tap any name to send a personal nudge or message.</p>
            </div>
            <div className="step-card">
              <span style={{ fontSize: '1.8rem', marginBottom: '10px', display: 'block' }}>📈</span>
              <div className="step-number">8</div>
              <h3>Track Center Growth</h3>
              <p>View walk-in conversion rates, active member counts, revenue trends, and program cycle data on the <strong>Center Analytics</strong> screen every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STAT HIGHLIGHT */}
      <div className="container" style={{ margin: '60px auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #0f1f13, #166534)', borderRadius: 'var(--radius-lg)', padding: '50px 20px', color: '#ffffff', textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-green)', display: 'block', lineHeight: 1, marginBottom: '6px' }}>5 min</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg center setup time</span>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-green)', display: 'block', lineHeight: 1, marginBottom: '6px' }}>40%</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>Higher member compliance vs manual</span>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-green)', display: 'block', lineHeight: 1, marginBottom: '6px' }}>3x</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>More reports generated monthly</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER FEATURES DEEP DIVE */}
      <section className="section" id="center-features">
        <div className="container">
          <div className="section-header reveal active">
            <div className="section-badge"><span className="badge-dot"></span> Center Features</div>
            <h2>Everything a Wellness Center <span>Needs</span></h2>
            <p>Purpose-built tools for owners managing physical herbal wellness spaces.</p>
          </div>

          {/* Feature Row 1: Walk-in Management */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <p className="hero-subtitle">Walk-in Management</p>
              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Never Lose a Walk-in Lead Again</h2>
              <p style={{ marginBottom: '25px' }}>Replace paper visitor books with a digital walk-in registry. Capture name, phone, and interest area in seconds — then convert visitors into full program members with one tap.</p>
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', color: 'var(--primary-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', flexShrink: 0 }}>✓</div>
                <div><h4 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '3px' }}>Digital Visitor Registry</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Log every walk-in with contact details, visit purpose, and follow-up date.</p></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', color: 'var(--primary-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', flexShrink: 0 }}>✓</div>
                <div><h4 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '3px' }}>Visitor → Member Conversion</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Instantly convert interested visitors to active program guests with a single button.</p></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', color: 'var(--primary-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', flexShrink: 0 }}>✓</div>
                <div><h4 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '3px' }}>Conversion Rate Dashboard</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Track daily walk-in volumes and see what percentage are converting to paid members.</p></div>
              </div>
              <Link to="/download" className="btn btn-primary" style={{ marginTop: '10px' }}>Start Free Trial</Link>
            </div>

            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '36px', boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(22,101,52,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', color: 'var(--primary-dark)' }}>Today's Visitors</h4>
                <span style={{ fontSize: '0.75rem', background: 'var(--bg-light-green)', color: 'var(--primary-mid)', padding: '4px 10px', borderRadius: '100px', fontWeight: '700' }}>LIVE</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 15px', borderRadius: '100px', borderLeft: '4px solid var(--accent-green)' }}>
                  <div><p style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '2px' }}>Priya Mehta</p><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interested in Weight Loss · 10:30 AM</p></div>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(34,197,94,0.12)', color: 'var(--primary-mid)', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>CONVERTED</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 15px', borderRadius: '100px', borderLeft: '4px solid #f59e0b' }}>
                  <div><p style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '2px' }}>Rohan Desai</p><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Herbal Supplement Query · 11:15 AM</p></div>
                  <span style={{ fontSize: '0.7rem', background: '#fffbeb', color: '#b45309', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>FOLLOW UP</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 15px', borderRadius: '100px', borderLeft: '4px solid #3b82f6' }}>
                  <div><p style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '2px' }}>Sneha Kulkarni</p><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Body Composition Test · 12:45 PM</p></div>
                  <span style={{ fontSize: '0.7rem', background: '#eff6ff', color: '#1d4ed8', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>ENROLLED</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
                <div style={{ background: 'var(--bg-light-green)', padding: '14px', borderRadius: '10px', borderLeft: '3px solid var(--accent-green)' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Walk-ins Today</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-dark)', display: 'block' }}>12</span>
                </div>
                <div style={{ background: '#fffbeb', padding: '14px', borderRadius: '10px', borderLeft: '3px solid #f59e0b' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Conversion Rate</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-dark)', display: 'block' }}>68%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Row 2: Body Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '36px', boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(22,101,52,0.06)' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--primary-dark), #15803d)', borderRadius: '12px', padding: '20px', color: '#ffffff', textAlign: 'center', marginBottom: '15px' }}>
                <p style={{ fontSize: '0.7rem', opacity: 0.7, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>Body Comp Index (BMI)</p>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4ade80', marginBottom: '4px' }}>22.5</p>
                <span style={{ fontSize: '0.75rem', background: 'rgba(74,222,128,0.2)', color: '#4ade80', padding: '3px 12px', borderRadius: '100px', fontWeight: '700' }}>NORMAL</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div><p style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '1px' }}>Estimated Fat</p><p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Total fat mass ratio</p></div>
                  <div style={{ textAlign: 'right' }}><p style={{ fontWeight: '800', fontSize: '0.9rem' }}>20.25%</p><span style={{ fontSize: '0.6rem', background: 'rgba(34,197,94,0.15)', color: 'var(--primary-mid)', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Normal</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div><p style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '1px' }}>Visceral Fat</p><p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Organ fat rating</p></div>
                  <div style={{ textAlign: 'right' }}><p style={{ fontWeight: '800', fontSize: '0.9rem' }}>6.0</p><span style={{ fontSize: '0.6rem', background: 'rgba(34,197,94,0.15)', color: 'var(--primary-mid)', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Normal</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div><p style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '1px' }}>Skeletal Muscle</p><p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Muscle mass ratio</p></div>
                  <div style={{ textAlign: 'right' }}><p style={{ fontWeight: '800', fontSize: '0.9rem' }}>46.25%</p><span style={{ fontSize: '0.6rem', background: 'rgba(34,197,94,0.15)', color: 'var(--primary-mid)', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>Normal</span></div>
                </div>
              </div>
            </div>

            <div>
              <p className="hero-subtitle">Body Analysis</p>
              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Professional Body Reports in Seconds</h2>
              <p style={{ marginBottom: '25px' }}>Input a client's measurements and MyVizen instantly generates a color-coded health scorecard — covering BMI, estimated fat%, visceral fat, skeletal muscle, and hydration index. Share as a branded PDF.</p>
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', color: 'var(--primary-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', flexShrink: 0 }}>✓</div>
                <div><h4 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '3px' }}>12+ Health Metrics Calculated</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>BMI, body fat %, visceral fat rating, skeletal muscle %, body water %, metabolic rate, and more.</p></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', color: 'var(--primary-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', flexShrink: 0 }}>✓</div>
                <div><h4 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '3px' }}>Color-Coded Status Badges</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Each metric shows Normal / Low / High / Severe with clear visual indicators for guests to understand.</p></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', color: 'var(--primary-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', flexShrink: 0 }}>✓</div>
                <div><h4 style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '3px' }}>Auto-Named PDF Export</h4><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Reports are named after each client and shared via WhatsApp or downloaded with one tap.</p></div>
              </div>
              <Link to="/download" className="btn btn-primary" style={{ marginTop: '10px' }}>Generate Your First Report</Link>
            </div>
          </div>
        </div>
      </section>

      <DownloadCTA />
    </main>
  );
}
