import React, { useState } from 'react';

export default function ScreenshotCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'dashboard',
      title: 'Home Dashboard & Compliance',
      subtitle: 'Real-time overview of active guests, reports, and habit compliance',
      tag: 'Dashboard',
      renderScreen: () => (
        <div className="phone-screen" style={{ backgroundColor: '#f0fdf4', padding: '10px 10px 14px 10px' }}>
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

          <div className="phone-navbar">
            <div className="phone-nav-item active"><span>🏠 Home</span></div>
            <div className="phone-nav-item"><span>🍎 Diet Plan</span></div>
            <div className="phone-nav-fab">📄</div>
            <div className="phone-nav-item"><span>👥 Guests</span></div>
            <div className="phone-nav-item"><span>⚙️ Settings</span></div>
          </div>
        </div>
      )
    },
    {
      id: 'quick-actions',
      title: 'Quick Actions (16 Tools)',
      subtitle: 'Comprehensive 16-tool grid for rapid guest management, diet assignment & broadcast alerts',
      tag: '16 Tools Grid',
      renderScreen: () => (
        <div className="phone-screen" style={{ backgroundColor: '#f0fdf4', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#166534', fontWeight: '800', margin: 0 }}>Quick Actions</h3>
            <span style={{ fontSize: '0.55rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '100px', fontWeight: '700' }}>16 tools</span>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '14px', padding: '10px 8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px 6px', textAlign: 'center' }}>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#166534', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>🏪</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Guest Entries</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>👤+</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Add Guest</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#0d9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>💬</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Messages</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#dc2626', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>📢</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Broadcast</span></div>

              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#84cc16', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>📷</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Guest Meals</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>📄</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>New Report</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#15803d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>📁</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Old Reports</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>🍎</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Diet Plan</span></div>

              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#9333ea', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>📅</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Calendar</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>📊</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Analytics</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#db2777', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>🖼️</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Photos</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#4f46e5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>🏋️</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Workouts</span></div>

              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#e11d48', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>🏆</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Stories</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#d97706', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>💳</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Subscription</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#f97316', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>⏰</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Alarms</span></div>
              <div><div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#475569', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 3px auto', fontSize: '0.8rem' }}>⚙️</div><span style={{ fontSize: '0.5rem', fontWeight: '700', color: '#166534', display: 'block' }}>Settings</span></div>
            </div>
          </div>

          <div className="phone-navbar">
            <div className="phone-nav-item"><span>🏠 Home</span></div>
            <div className="phone-nav-item"><span>🍎 Diet Plan</span></div>
            <div className="phone-nav-fab">📄</div>
            <div className="phone-nav-item"><span>👥 Guests</span></div>
            <div className="phone-nav-item active"><span>⚙️ Settings</span></div>
          </div>
        </div>
      )
    },
    {
      id: 'guests-schedule',
      title: 'Recent Guests & WhatsApp Invites',
      subtitle: 'View client directory cards, daily schedule, and direct WhatsApp credentials sharing',
      tag: 'Client Directory',
      renderScreen: () => (
        <div className="phone-screen" style={{ backgroundColor: '#f0fdf4', padding: '10px' }}>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: '800', color: '#166534', marginBottom: '4px' }}>
              <span>📅 Today's Schedule</span>
              <span style={{ color: '#2563eb' }}>Calendar ›</span>
            </div>
            <div style={{ background: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', color: '#6366f1' }}>📅</span>
                <div>
                  <h5 style={{ fontSize: '0.7rem', fontWeight: '700', margin: 0, color: '#1e293b' }}>No schedule today</h5>
                  <p style={{ fontSize: '0.55rem', color: '#64748b', margin: 0 }}>Tap to add appointments in Calendar</p>
                </div>
              </div>
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#4f46e5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>+</span>
            </div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: '800', color: '#166534', marginBottom: '6px' }}>
              <span>Recent Guests</span>
              <span style={{ color: '#15803d' }}>See all ›</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <div style={{ background: '#ffffff', borderRadius: '10px', padding: '8px 4px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 4px auto' }}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Siddharth Zende" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h6 style={{ fontSize: '0.58rem', fontWeight: '700', color: '#1e293b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Siddharth Z.</h6>
                <p style={{ fontSize: '0.48rem', color: '#64748b', margin: '1px 0 4px 0' }}>26 yrs · Male</p>
                <span style={{ fontSize: '0.48rem', border: '1px solid #166534', color: '#166534', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>📄 Report</span>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '10px', padding: '8px 4px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '800', margin: '0 auto 4px auto' }}>MS</div>
                <h6 style={{ fontSize: '0.58rem', fontWeight: '700', color: '#1e293b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Manisha Sh...</h6>
                <p style={{ fontSize: '0.48rem', color: '#64748b', margin: '1px 0 4px 0' }}>25 yrs · Female</p>
                <span style={{ fontSize: '0.48rem', border: '1px solid #166534', color: '#166534', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>📄 Report</span>
              </div>

              <div style={{ background: '#ffffff', border: '1px dashed #22c55e', borderRadius: '10px', padding: '8px 4px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', marginBottom: '4px' }}>👤+</div>
                <span style={{ fontSize: '0.55rem', fontWeight: '700', color: '#166534' }}>Add Guest</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '8px 10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '1.1rem', color: '#16a34a' }}>💬</span>
            <div>
              <h5 style={{ fontSize: '0.65rem', fontWeight: '700', color: '#166534', margin: 0 }}>Invite clients to join MyVizen</h5>
              <p style={{ fontSize: '0.5rem', color: '#334155', margin: '2px 0 0 0' }}>Tap guest → open profile → tap <strong>Send Invite</strong> via WhatsApp</p>
            </div>
          </div>

          <div className="phone-navbar">
            <div className="phone-nav-item"><span>🏠 Home</span></div>
            <div className="phone-nav-item"><span>🍎 Diet Plan</span></div>
            <div className="phone-nav-fab">📄</div>
            <div className="phone-nav-item active"><span>👥 Guests</span></div>
            <div className="phone-nav-item"><span>⚙️ Settings</span></div>
          </div>
        </div>
      )
    },
    {
      id: 'diet-herbal',
      title: 'Diet Plans & Herbal Library',
      subtitle: '25 herbs reference catalog, template assignments & plan expiration management',
      tag: 'Diet Architect',
      renderScreen: () => (
        <div className="phone-screen" style={{ backgroundColor: '#f0fdf4', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <h3 style={{ fontSize: '0.9rem', color: '#166534', fontWeight: '800', margin: 0 }}>Diet Plans</h3>
              <p style={{ fontSize: '0.52rem', color: '#64748b', margin: 0 }}>4 plans — tap to use as template</p>
            </div>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '800' }}>+</span>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #166534, #15803d)', borderRadius: '12px', padding: '10px', color: '#ffffff', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem' }}>🌿</span>
              <div>
                <h5 style={{ fontSize: '0.72rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>Herbal Library</h5>
                <p style={{ fontSize: '0.55rem', opacity: 0.9, margin: '2px 0 0 0' }}>25 herbs · Dosage · Benefits · Dosha guide</p>
              </div>
            </div>
            <span style={{ fontSize: '0.8rem' }}>›</span>
          </div>

          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '8px 10px', marginBottom: '6px', borderLeft: '4px solid #dc2626', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h5 style={{ fontSize: '0.68rem', fontWeight: '800', color: '#166534', margin: 0 }}>Siddharth Zende's...</h5>
              <span style={{ fontSize: '0.48rem', background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>📋 Template</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.5rem', background: '#2563eb', color: '#fff', padding: '1px 6px', borderRadius: '100px', fontWeight: '700' }}>Muscle Gain</span>
              <span style={{ fontSize: '0.5rem', color: '#15803d', fontWeight: '700' }}>● Active</span>
            </div>
          </div>

          <div className="phone-navbar">
            <div className="phone-nav-item"><span>🏠 Home</span></div>
            <div className="phone-nav-item active"><span>🍎 Diet Plan</span></div>
            <div className="phone-nav-fab">📄</div>
            <div className="phone-nav-item"><span>👥 Guests</span></div>
            <div className="phone-nav-item"><span>⚙️ Settings</span></div>
          </div>
        </div>
      )
    },
    {
      id: 'settings-center',
      title: 'Settings & Center Administration',
      subtitle: 'Coach profile controls, business partners & physical wellness center management',
      tag: 'Settings Hub',
      renderScreen: () => (
        <div className="phone-screen" style={{ backgroundColor: '#f0fdf4', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1rem', color: '#166534', fontWeight: '800', margin: 0 }}>Settings</h3>
            <span style={{ fontSize: '0.58rem', background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '6px', fontWeight: '700' }}>✏️ Edit</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 6px auto', border: '2px solid #22c55e' }}>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" alt="Snehal Shelke" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#166534', margin: 0 }}>Snehal Shelke</h4>
            <span style={{ fontSize: '0.55rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '100px', fontWeight: '700', marginTop: '2px', display: 'inline-block' }}>
              🏢 Charming Aura
            </span>
          </div>

          <div className="phone-navbar">
            <div className="phone-nav-item"><span>🏠 Home</span></div>
            <div className="phone-nav-item"><span>🍎 Diet Plan</span></div>
            <div className="phone-nav-fab">📄</div>
            <div className="phone-nav-item"><span>👥 Guests</span></div>
            <div className="phone-nav-item active"><span>⚙️ Settings</span></div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="section carousel-section" id="screenshots">
      <div className="container">
        <div className="section-header reveal active">
          <div className="section-badge"><span className="badge-dot"></span> Live App Screens</div>
          <h2>Explore the <span>Actual FitZen Mobile Screens</span></h2>
          <p>Browse through the real FitZen application screens. Click any tab below or use the arrows to switch screens.</p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              style={{
                padding: '8px 16px',
                borderRadius: '100px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: '700',
                border: '1.5px solid var(--primary-mid)',
                background: currentSlide === idx ? 'var(--primary-dark)' : 'transparent',
                color: currentSlide === idx ? '#ffffff' : 'var(--primary-dark)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* Carousel Phone Mockup Container */}
        <div className="carousel-container">
          <button className="carousel-btn carousel-btn-prev" onClick={prevSlide} aria-label="Previous Screen">
            ◀
          </button>
          <button className="carousel-btn carousel-btn-next" onClick={nextSlide} aria-label="Next Screen">
            ▶
          </button>

          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', margin: '0 0 4px 0' }}>{slides[currentSlide].title}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', margin: 0 }}>{slides[currentSlide].subtitle}</p>
          </div>

          <div className="carousel-track-wrapper">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="carousel-slide">
                  <div className="phone-frame">
                    <div className="phone-notch"></div>
                    <div className="phone-top-bar" style={{ color: '#0f172a' }}>
                      <span>19:02</span>
                      <div className="phone-top-icons">
                        <span>5G</span>
                        <span>100%</span>
                      </div>
                    </div>
                    {slide.renderScreen()}
                    <div className="phone-home-indicator"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`carousel-dot ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
