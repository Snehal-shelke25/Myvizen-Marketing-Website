import React from 'react';
import { Link } from 'react-router-dom';

export default function ExperienceSection() {
  return (
    <section className="section section-bg-light" id="experiences">
      <div className="container">
        <div className="section-header reveal active">
          <div className="section-badge"><span className="badge-dot"></span> Double Duty App</div>
          <h2>One App, <span>Two Experiences</span></h2>
          <p>Whether you are a nutrition coach managing a physical wellness center or a member working toward your body transformation goals, MyVizen has a custom experience tailored for you.</p>
        </div>

        <div className="experiences-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
          {/* Left Column: Coach Profile */}
          <div className="experience-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="experience-badge">COACH PROFILE</div>
              <h3>Empower Your Wellness Business</h3>
              <p>Ditch the manual spreadsheets. Connect instantly with clients, generate color-coded metrics reports, manage center diaries, and track supplement compliance from one dashboard.</p>
              
              <div className="experience-features-list">
                <div className="experience-feature-item">
                  <div className="experience-feature-icon">✓</div>
                  <div className="experience-feature-text">
                    <h4>Smart Body-Composition Reports</h4>
                    <p>Automate body-fat, visceral fat, skeletal muscle, and metabolic rates reports as downloadable PDFs.</p>
                  </div>
                </div>
                <div className="experience-feature-item">
                  <div className="experience-feature-icon">✓</div>
                  <div className="experience-feature-text">
                    <h4>Diet & Compliance Tracking</h4>
                    <p>Track habit logs and set supplement/water alerts reaching client phones directly.</p>
                  </div>
                </div>
                <div className="experience-feature-item">
                  <div className="experience-feature-icon">✓</div>
                  <div className="experience-feature-text">
                    <h4>Center & Club Operations</h4>
                    <p>Optimize check-in logs, walk-in lead captures, and schedule settings for high retention rates.</p>
                  </div>
                </div>
              </div>

              {/* Coach Quick Start */}
              <div style={{ background: 'var(--bg-light-green)', borderRadius: '14px', padding: '20px 22px', marginTop: '24px', borderLeft: '4px solid var(--accent-green)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '0.9rem', color: 'var(--primary-dark)', marginBottom: '12px' }}>
                  🚀 Quick Start for Coaches
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>Download app → Select <strong>"I am a Coach"</strong></p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>Set up <strong>Center Profile</strong> with name & city</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>Add guests → Generate first <strong>Body Report</strong></p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>Assign <strong>Diet Plan</strong> → Set nudge reminders</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>5</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>Monitor <strong>compliance dashboard</strong> daily</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
              <Link to="/for-coaches" className="btn btn-primary">Full Coach Guide</Link>
              <Link to="/wellness-center" className="btn btn-outline">Wellness Centers</Link>
            </div>
          </div>

          {/* Right Column: Member Profile */}
          <div className="experience-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="experience-badge">MEMBER PROFILE</div>
              <h3>Achieve Your Body Goals</h3>
              <p>Your complete health roadmap, right in your pocket. Sync up with your assigned wellness coach, review diet plans, log daily nutrition, track challenges, and watch your metrics climb.</p>
              
              <div className="experience-features-list">
                <div className="experience-feature-item">
                  <div className="experience-feature-icon">✓</div>
                  <div className="experience-feature-text">
                    <h4>Personalized Meal Roadmaps</h4>
                    <p>Follow meal plans created by your coach. Mark off items as you eat and track supplement intakes.</p>
                  </div>
                </div>
                <div className="experience-feature-item">
                  <div className="experience-feature-icon">✓</div>
                  <div className="experience-feature-text">
                    <h4>Habit Trackers & Notifications</h4>
                    <p>Get automated nudge alarms for critical wellness actions: hydration, supplements, and meals.</p>
                  </div>
                </div>
                <div className="experience-feature-item">
                  <div className="experience-feature-icon">✓</div>
                  <div className="experience-feature-text">
                    <h4>Leaderboard & Chat Motivations</h4>
                    <p>Participate in center-wide challenges, check your scores on community boards, and message coaches.</p>
                  </div>
                </div>
              </div>

              {/* Member Quick Start */}
              <div style={{ background: 'var(--bg-light-green)', borderRadius: '14px', padding: '20px 22px', marginTop: '24px', borderLeft: '4px solid var(--accent-green)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '0.9rem', color: 'var(--primary-dark)', marginBottom: '12px' }}>
                  🚀 Quick Start for Members
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>Download app → Select <strong>"I am a Member"</strong></p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>Accept <strong>invite link</strong> from your coach</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>View your <strong>Body Composition Report</strong></p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>Follow your <strong>Diet Plan</strong> & tick off meals</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#166534', color: '#fff', fontSize: '0.68rem', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>5</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>Enable <strong>reminders</strong> & track daily progress</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
              <Link to="/for-members" className="btn btn-primary">Full Member Guide</Link>
              <Link to="/download" className="btn btn-outline">Download App</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
