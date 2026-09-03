import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminHeader({ title, subtitle, onAddGuest }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Show back button on all pages except the root /admin dashboard
  const isOnDashboard = location.pathname === '/admin';

  return (
    <header className="admin-top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

        {/* ── Back Button (shown on sub-pages, not on /admin dashboard) ── */}
        {!isOnDashboard && (
          <button
            onClick={() => navigate(-1)}
            title="Go Back"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '7px 14px',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              color: 'var(--primary-dark)',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#dcfce7';
              e.currentTarget.style.borderColor = '#22c55e';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#f1f5f9';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            {/* Left arrow icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        )}

        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0, lineHeight: 1.2 }}>
            {title || 'Coach Dashboard'}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '2px 0 0 0', lineHeight: 1.4 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '100px', fontWeight: '700', whiteSpace: 'nowrap' }}>
          🟢 LIVE CENTER ONLINE
        </span>

        {onAddGuest && (
          <button
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.83rem' }}
            onClick={onAddGuest}
          >
            + Add New Guest
          </button>
        )}
      </div>
    </header>
  );
}
