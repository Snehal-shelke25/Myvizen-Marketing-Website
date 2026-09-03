import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import AddGuestModal from '../../components/AddGuestModal';
import GuestModal from '../../components/GuestModal';
import ReportModal from '../../components/ReportModal';
import { initialGuests } from '../../data/guestsData';

export default function AdminDashboard() {
  const [guests, setGuests] = useState(initialGuests);
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [reportGuest, setReportGuest] = useState(null);
  const [nudgeSentId, setNudgeSentId] = useState(null);

  const handleAddGuest = (newGuest) => {
    setGuests([newGuest, ...guests]);
  };

  const handleSendNudge = (guestId) => {
    setNudgeSentId(guestId);
    setTimeout(() => setNudgeSentId(null), 2500);
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <AdminHeader
          title="Command Center Overview"
          subtitle="Real-time guest compliance, active reports, and center operations"
          onAddGuest={() => setIsAddGuestOpen(true)}
        />

        <div className="admin-page-body">

          {/* ── WELCOME HERO BANNER WITH GRADIENT & GLOW ── */}
          <div style={{
            background: 'linear-gradient(135deg, #09381e 0%, #15803d 60%, #16a34a 100%)',
            borderRadius: '24px',
            padding: '32px 36px',
            color: '#ffffff',
            marginBottom: '32px',
            boxShadow: '0 16px 40px rgba(9,56,30,0.18)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            {/* Background glowing circles */}
            <div style={{ position: 'absolute', right: '-60px', top: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: '120px', bottom: '-80px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(34,197,94,0.2)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '14px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <span>📅 {todayStr}</span>
                <span>•</span>
                <span style={{ color: '#4ade80' }}>Charming Aura Center</span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', margin: '0 0 10px 0', lineHeight: 1.2 }}>
                👋 Welcome Back, Coach Snehal!
              </h1>
              <p style={{ fontSize: '0.95rem', color: '#dcfce7', margin: 0, opacity: 0.95, lineHeight: 1.5 }}>
                Your center is operating at <strong style={{ color: '#ffffff', textDecoration: 'underline' }}>94% guest compliance</strong> today. 8 guests completed their morning nutrition logs!
              </p>

              {/* Quick Status Badges */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '700' }}>
                  👥 {guests.length} Active Guests
                </span>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '700' }}>
                  🍎 94 Active Diets
                </span>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '700' }}>
                  🎯 92% Streak Rate
                </span>
              </div>
            </div>

            {/* Quick Action Button inside Hero */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <button
                onClick={() => setIsAddGuestOpen(true)}
                style={{
                  background: '#ffffff',
                  color: '#09381e',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>➕</span> Add New Guest
              </button>
            </div>
          </div>

          {/* ── 4 ANIMATED OVERVIEW STAT CARDS ── */}
          <div className="admin-stats-grid">

            {/* Card 1 */}
            <div className="admin-stat-card">
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Guests</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', color: '#09381e', margin: '4px 0 6px 0' }}>
                  {guests.length + 124}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '100px', fontWeight: '800' }}>
                    ↑ 12%
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>vs last month</span>
                </div>
              </div>
              <div className="stat-icon-wrapper" style={{ background: '#dcfce7', color: '#15803d' }}>
                👥
              </div>
            </div>

            {/* Card 2 */}
            <div className="admin-stat-card">
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reports Created</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', color: '#09381e', margin: '4px 0 6px 0' }}>
                  342
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.72rem', background: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '100px', fontWeight: '800' }}>
                    ↑ 48
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>this week</span>
                </div>
              </div>
              <div className="stat-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
                📄
              </div>
            </div>

            {/* Card 3 */}
            <div className="admin-stat-card">
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Diet Plans</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', color: '#09381e', margin: '4px 0 6px 0' }}>
                  94
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '100px', fontWeight: '800' }}>
                    92%
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>active streak</span>
                </div>
              </div>
              <div className="stat-icon-wrapper" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                🍎
              </div>
            </div>

            {/* Card 4 */}
            <div className="admin-stat-card">
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Monthly Revenue</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', color: '#09381e', margin: '4px 0 6px 0' }}>
                  ₹1,45,000
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.72rem', background: '#f3e8ff', color: '#7e22ce', padding: '3px 8px', borderRadius: '100px', fontWeight: '800' }}>
                    ↑ 18%
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>vs last month</span>
                </div>
              </div>
              <div className="stat-icon-wrapper" style={{ background: '#f3e8ff', color: '#9333ea' }}>
                💳
              </div>
            </div>

          </div>

          {/* ── QUICK ACTIONS (16 TOOLS GRID) ── */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
            marginBottom: '32px',
            border: '1px solid #f1f5f9',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', color: '#09381e', margin: '0 0 4px 0' }}>
                  ⚡ Coach Command Tools (16 Grid)
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  Instant access to client management, reports, diet builder, and subscriptions
                </p>
              </div>

              <span className="live-pulse-badge">
                <span className="pulse-dot"></span>
                16 Active Tools Ready
              </span>
            </div>

            {/* Grid of Interactive Tool Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>

              {/* Tool 1 */}
              <Link to="/admin/guests" className="tool-grid-card">
                <div className="tool-icon-circle" style={{ background: '#166534', color: '#ffffff' }}>👥</div>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>Guest Directory</span>
              </Link>

              {/* Tool 2 */}
              <div onClick={() => setIsAddGuestOpen(true)} className="tool-grid-card">
                <div className="tool-icon-circle" style={{ background: '#22c55e', color: '#ffffff' }}>👤+</div>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>Add Guest</span>
              </div>

              {/* Tool 3 */}
              <Link to="/admin/reports" className="tool-grid-card">
                <div className="tool-icon-circle" style={{ background: '#2563eb', color: '#ffffff' }}>📄</div>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>New Body Report</span>
              </Link>

              {/* Tool 4 */}
              <Link to="/admin/diet-plans" className="tool-grid-card">
                <div className="tool-icon-circle" style={{ background: '#ea580c', color: '#ffffff' }}>🍎</div>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>Diet Architect</span>
              </Link>

              {/* Tool 5 */}
              <Link to="/admin/visitors" className="tool-grid-card">
                <div className="tool-icon-circle" style={{ background: '#16a34a', color: '#ffffff' }}>🏪</div>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>Walk-in Registry</span>
              </Link>

              {/* Tool 6 */}
              <Link to="/admin/subscriptions" className="tool-grid-card">
                <div className="tool-icon-circle" style={{ background: '#9333ea', color: '#ffffff' }}>💳</div>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>Subscriptions</span>
              </Link>

              {/* Tool 7 */}
              <Link to="/admin/analytics" className="tool-grid-card">
                <div className="tool-icon-circle" style={{ background: '#0284c7', color: '#ffffff' }}>📈</div>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>Center Analytics</span>
              </Link>

              {/* Tool 8 */}
              <Link to="/admin/settings" className="tool-grid-card">
                <div className="tool-icon-circle" style={{ background: '#475569', color: '#ffffff' }}>⚙️</div>
                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', textAlign: 'center' }}>Settings</span>
              </Link>

            </div>
          </div>

          {/* ── LIVE GUEST HABIT & COMPLIANCE TRACKER TABLE ── */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
            border: '1px solid #f1f5f9',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', color: '#09381e', margin: '0 0 4px 0' }}>
                  🎯 Guest Habit & Compliance Visualizer
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  Real-time body progress, nutrition log compliance, and instant nudge actions
                </p>
              </div>

              <Link to="/admin/guests" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
                View All Guests →
              </Link>
            </div>

            {/* Interactive Guest Progress Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f1f5f9', background: '#f8fafc' }}>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Guest</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Program Goal</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Habit Compliance</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Weight Status</th>
                    <th style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.slice(0, 4).map((guest) => {
                    const complianceRate = guest.id === 'G101' ? 95 : guest.id === 'G102' ? 88 : guest.id === 'G103' ? 72 : 90;

                    return (
                      <tr key={guest.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>

                        {/* Guest Profile */}
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img
                              src={guest.avatar}
                              alt={guest.name}
                              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #22c55e' }}
                            />
                            <div>
                              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', display: 'block' }}>
                                {guest.name}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                {guest.gender}, {guest.age} yrs • {guest.phone}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Program Goal */}
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '100px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            background: '#dcfce7',
                            color: '#15803d',
                          }}>
                            {guest.goal}
                          </span>
                        </td>

                        {/* Habit Compliance Bar */}
                        <td style={{ padding: '16px', minWidth: '180px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '100px', overflow: 'hidden' }}>
                              <div style={{
                                width: `${complianceRate}%`,
                                height: '100%',
                                background: complianceRate > 85 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : 'linear-gradient(90deg, #f59e0b, #d97706)',
                                borderRadius: '100px',
                                transition: 'width 0.6s ease',
                              }} />
                            </div>
                            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: complianceRate > 85 ? '#15803d' : '#b45309' }}>
                              {complianceRate}%
                            </span>
                          </div>
                        </td>

                        {/* Weight Status */}
                        <td style={{ padding: '16px' }}>
                          <div>
                            <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a', display: 'block' }}>
                              {guest.currentWeight} kg
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                              Target: {guest.targetWeight} kg
                            </span>
                          </div>
                        </td>

                        {/* Action buttons */}
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => setSelectedGuest(guest)}
                              style={{
                                background: '#f0fdf4',
                                border: '1px solid #bbf7d0',
                                color: '#15803d',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '0.78rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                              }}
                            >
                              👁️ View Profile
                            </button>

                            <button
                              onClick={() => handleSendNudge(guest.id)}
                              style={{
                                background: nudgeSentId === guest.id ? '#dcfce7' : '#ffffff',
                                border: '1px solid #e2e8f0',
                                color: nudgeSentId === guest.id ? '#15803d' : '#475569',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '0.78rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                              }}
                            >
                              {nudgeSentId === guest.id ? '✓ Nudge Sent!' : '🔔 Send Nudge'}
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modals */}
        <AddGuestModal
          isOpen={isAddGuestOpen}
          onClose={() => setIsAddGuestOpen(false)}
          onAddGuest={handleAddGuest}
        />

        {selectedGuest && (
          <GuestModal
            guest={selectedGuest}
            onClose={() => setSelectedGuest(null)}
            onGenerateReport={(g) => {
              setSelectedGuest(null);
              setReportGuest(g);
            }}
          />
        )}

        {reportGuest && (
          <ReportModal
            guest={reportGuest}
            onClose={() => setReportGuest(null)}
          />
        )}
      </main>
    </div>
  );
}
