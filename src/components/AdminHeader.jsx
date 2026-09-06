import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminHeader({
  title,
  subtitle,
  onAddGuest,
  onPrimaryAction,
  actionLabel,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnDashboard = location.pathname === '/admin';

  return (
    <header className="admin-top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {!isOnDashboard && (
          <button
            onClick={() => navigate(-1)}
            title="Go Back"
            className="admin-back-button"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        )}

        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0, lineHeight: 1.2 }}>
            {title || 'Admin Dashboard'}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '2px 0 0 0', lineHeight: 1.4 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span className="admin-live-badge">
          Live production panel
        </span>

        {onAddGuest && (
          <button
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.83rem' }}
            onClick={onAddGuest}
          >
            Add New Guest
          </button>
        )}

        {onPrimaryAction && (
          <button
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.83rem' }}
            onClick={onPrimaryAction}
          >
            {actionLabel || 'Add New'}
          </button>
        )}
      </div>
    </header>
  );
}
