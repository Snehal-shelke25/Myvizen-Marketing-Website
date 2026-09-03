import React, { useEffect } from 'react';

export default function DownloadPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ backgroundColor: '#fafdfb' }}>
      <section className="page-header" style={{ borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
          <div className="section-badge"><span className="badge-dot"></span> Get the App</div>
          <h1 className="page-title" style={{ fontWeight: '800' }}>Download MyVizen Mobile App</h1>
          <p className="page-lead" style={{ opacity: 0.9 }}>
            Join 10,000+ members and 500+ wellness coaches. Choose your mobile platform to start your transformation.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0px' }}>
        <div className="container">
          <div className="download-grid-premium">
            
            {/* Left Side: Animated Mobile App Screen Mockup */}
            <div className="download-mockup-wrapper reveal active">
              <div className="download-mockup-badge">
                <span style={{ fontSize: '1.2rem' }}>🌿</span>
                <div>
                  <h5 style={{ fontSize: '0.78rem', margin: 0, fontWeight: '700', color: 'var(--primary-dark)' }}>MyVizen Client Portal</h5>
                  <p style={{ fontSize: '0.62rem', margin: 0, color: 'var(--text-muted)' }}>Real-time updates active</p>
                </div>
              </div>
              
              <div className="phone-frame" style={{ animationDuration: '8s' }}>
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
            </div>

            {/* Right Side: Store download options */}
            <div className="reveal active">
              <div className="download-option-card">
                <div className="download-platform-header">
                  <span className="download-platform-icon">🤖</span>
                  <div>
                    <h3>Download for Android</h3>
                    <span className="badge-requirement">Requires Android 9.0 or later</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginBottom: '20px' }}>
                  Install MyVizen on your Android mobile device to receive immediate body metrics updates, daily habit logs, and direct center broadcasts.
                </p>
                <a href="#android-download" className="btn-download-badge btn-pulse" style={{ display: 'inline-flex', width: 'auto' }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.116 1.116 0 0 1-.61-.994V2.808c0-.414.22-.79.609-.994zM15.206 13.414l2.586 2.586-11.45 6.611 8.864-9.197zM15.206 10.586L6.342 1.389l11.45 6.611-2.586 2.586zm2.414 1.414l3.197 1.846c.773.446.773 1.17 0 1.616l-3.197 1.846-2.414-2.708 2.414-2.6 0z"/>
                  </svg>
                  <div>
                    <span className="btn-badge-subtitle">GET IT ON</span>
                    <span className="btn-badge-title">Google Play</span>
                  </div>
                </a>
              </div>

              <div className="download-option-card">
                <div className="download-platform-header">
                  <span className="download-platform-icon">🍏</span>
                  <div>
                    <h3>Download for iOS</h3>
                    <span className="badge-requirement">Requires iOS 14.0 or later</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginBottom: '20px' }}>
                  Install MyVizen on your Apple iPhone or iPad to unlock clean composition PDF reports, meal checklists, and water notification alarms.
                </p>
                <a href="#ios-download" className="btn-download-badge" style={{ display: 'inline-flex', width: 'auto' }}>
                  <svg viewBox="0 0 24 24">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22.05 13.89,21.24 12.37,21.24C10.84,21.24 10.37,21.97 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z"/>
                  </svg>
                  <div>
                    <span className="btn-badge-subtitle">DOWNLOAD ON THE</span>
                    <span className="btn-badge-title">App Store</span>
                  </div>
                </a>
              </div>

              {/* Animated QR Scanner Block */}
              <div className="scanner-container">
                <div className="qr-scanner-box-animated">
                  <svg viewBox="0 0 100 100" width="130" height="130">
                    <rect width="100" height="100" fill="#ffffff"/>
                    {/* Top-left corner box */}
                    <rect x="10" y="10" width="25" height="25" fill="#166534"/>
                    <rect x="14" y="14" width="17" height="17" fill="#ffffff"/>
                    <rect x="18" y="18" width="9" height="9" fill="#166534"/>
                    {/* Top-right corner box */}
                    <rect x="65" y="10" width="25" height="25" fill="#166534"/>
                    <rect x="69" y="14" width="17" height="17" fill="#ffffff"/>
                    <rect x="73" y="18" width="9" height="9" fill="#166534"/>
                    {/* Bottom-left corner box */}
                    <rect x="10" y="65" width="25" height="25" fill="#166534"/>
                    <rect x="14" y="69" width="17" height="17" fill="#ffffff"/>
                    <rect x="18" y="73" width="9" height="9" fill="#166534"/>
                    {/* Data patterns */}
                    <rect x="40" y="10" width="6" height="6" fill="#166534"/>
                    <rect x="50" y="10" width="6" height="6" fill="#166534"/>
                    <rect x="40" y="20" width="6" height="6" fill="#166534"/>
                    <rect x="10" y="40" width="6" height="6" fill="#166534"/>
                    <rect x="25" y="45" width="6" height="6" fill="#166534"/>
                    <rect x="40" y="40" width="12" height="12" fill="#166534"/>
                    <rect x="55" y="35" width="6" height="6" fill="#166534"/>
                    <rect x="70" y="40" width="6" height="6" fill="#166534"/>
                    <rect x="85" y="45" width="6" height="6" fill="#166534"/>
                    <rect x="40" y="60" width="6" height="6" fill="#166534"/>
                    <rect x="55" y="55" width="6" height="6" fill="#166534"/>
                    <rect x="40" y="75" width="10" height="10" fill="#166534"/>
                    <rect x="60" y="70" width="12" height="12" fill="#166534"/>
                    <rect x="75" y="75" width="10" height="10" fill="#166534"/>
                    <rect x="55" y="85" width="6" height="6" fill="#166534"/>
                  </svg>
                </div>
                
                <div className="scanner-text">
                  <h4>Scan QR to Install Instantly</h4>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                    Open your smartphone camera app and focus on the QR code to open the store page automatically.
                  </p>
                </div>
              </div>

              {/* Security trust badges */}
              <div className="download-security-checklist">
                <div className="security-checklist-item">
                  <span>✓</span> Certified Safe APK
                </div>
                <div className="security-checklist-item">
                  <span>✓</span> Fully Encrypted SSL
                </div>
                <div className="security-checklist-item">
                  <span>✓</span> Zero Adware or Trackers
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
