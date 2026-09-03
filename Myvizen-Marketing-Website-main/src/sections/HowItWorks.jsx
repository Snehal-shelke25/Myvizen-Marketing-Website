import React from 'react';

export default function HowItWorks() {
  return (
    <section className="section section-bg-light" id="how-it-works">
      <div className="container">
        <div className="section-header reveal active">
          <div className="section-badge"><span className="badge-dot"></span> App Usage Guide</div>
          <h2>How to Use <span>MyVizen</span> — Step by Step</h2>
          <p>From first download to daily wellness tracking — here's exactly how MyVizen works for both coaches and members.</p>
        </div>

        {/* Full App Usage Timeline Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginBottom: '60px', marginTop: '20px' }}>
          {/* Coach Flow */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--primary-dark)', color: '#fff', padding: '6px 18px', borderRadius: '100px', fontSize: '0.8rem', fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '24px' }}>
              🧑‍⚕️ Coach Flow
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-mid),var(--accent-green))', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</div>
                  <div style={{ width: '2px', flex: 1, background: 'rgba(34,197,94,0.2)', margin: '4px 0' }}></div>
                </div>
                <div style={{ paddingBottom: '16px' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>Download & Register as Coach</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Choose "I am a Coach", fill profile details, create wellness center.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-mid),var(--accent-green))', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</div>
                  <div style={{ width: '2px', flex: 1, background: 'rgba(34,197,94,0.2)', margin: '4px 0' }}></div>
                </div>
                <div style={{ paddingBottom: '16px' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>Add Guests & Log Walk-ins</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Invite existing clients or log daily walk-in visitors to the registry.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-mid),var(--accent-green))', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</div>
                  <div style={{ width: '2px', flex: 1, background: 'rgba(34,197,94,0.2)', margin: '4px 0' }}></div>
                </div>
                <div style={{ paddingBottom: '16px' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>Generate Body Composition Report</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enter measurements → auto-calculate all metrics → download PDF.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-mid),var(--accent-green))', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</div>
                  <div style={{ width: '2px', flex: 1, background: 'rgba(34,197,94,0.2)', margin: '4px 0' }}></div>
                </div>
                <div style={{ paddingBottom: '16px' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>Create & Assign Diet Plan</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Build meal schedule, set portions, assign to guest — visible instantly on their app.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold), #f59e0b)', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>5</div>
                </div>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>Monitor Compliance & Nudge</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Live dashboard shows At Risk members. Tap to send personal nudge message.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Member Flow */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(22,101,52,0.1)', color: 'var(--primary-dark)', padding: '6px 18px', borderRadius: '100px', fontSize: '0.8rem', fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '24px' }}>
              🧘 Member Flow
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-mid),var(--accent-green))', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</div>
                  <div style={{ width: '2px', flex: 1, background: 'rgba(34,197,94,0.2)', margin: '4px 0' }}></div>
                </div>
                <div style={{ paddingBottom: '16px' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>Download & Register as Member</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Choose "I am a Member", fill name & phone, accept coach invite link.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-mid),var(--accent-green))', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</div>
                  <div style={{ width: '2px', flex: 1, background: 'rgba(34,197,94,0.2)', margin: '4px 0' }}></div>
                </div>
                <div style={{ paddingBottom: '16px' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>View Your Body Composition Report</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Check BMI, fat%, muscle%, and health status scores shared by coach.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-mid),var(--accent-green))', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</div>
                  <div style={{ width: '2px', flex: 1, background: 'rgba(34,197,94,0.2)', margin: '4px 0' }}></div>
                </div>
                <div style={{ paddingBottom: '16px' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>Follow Your Daily Diet Plan</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tick off each meal and supplement dose as you complete them in real-time.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-mid),var(--accent-green))', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</div>
                  <div style={{ width: '2px', flex: 1, background: 'rgba(34,197,94,0.2)', margin: '4px 0' }}></div>
                </div>
                <div style={{ paddingBottom: '16px' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>Enable Habit Reminders</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Allow notifications for hydration, supplement, and meal timing nudges.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold), #f59e0b)', color: '#fff', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>5</div>
                </div>
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px', color: 'var(--primary-dark)' }}>Track Progress & Win Leaderboard</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Log daily weight, track charts, and compete in center-wide wellness challenges.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-header reveal active" style={{ marginTop: '30px' }}>
          <div className="section-badge"><span className="badge-dot"></span> The 4-Step Wellness Loop</div>
          <h2>Coach + Member <span>Working Together</span></h2>
          <p>How MyVizen unites coaches and members to achieve measurable, sustainable results.</p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Body Analysis</h3>
            <p>The coach measures the client's body composition and generates a color-coded smart health report.</p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Meal Blueprinting</h3>
            <p>Based on report indices, the coach designs and schedules a personalized meal and herbal diet roadmap.</p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Daily Execution</h3>
            <p>The member follows the diet, marks off meals, logs habits, and gets water alarms on their own app.</p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Track Results</h3>
            <p>Both coach and member track weight charts, habit compliance logs, and side-by-side photo logs over time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
