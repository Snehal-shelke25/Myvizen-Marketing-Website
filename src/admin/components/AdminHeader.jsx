import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE } from '../api/client';

/**
 * Page header: back link, title, and the page's primary action.
 *
 * The environment badge is derived rather than hardcoded — it previously read
 * "Live production panel" even when pointed at localhost, which is exactly the
 * wrong thing to be confident about.
 */
export default function AdminHeader({
  title, subtitle, actionLabel, onPrimaryAction, onToggleNav, navOpen,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnDashboard = location.pathname === '/admin';

  const isProduction = /^https:\/\/(api\.)?myvizen\.in/i.test(API_BASE);

  return (
    <header className="admin-top-header">
      <div className="admin-header-left">
        {onToggleNav && (
          <button
            type="button"
            className="admin-nav-toggle"
            onClick={onToggleNav}
            aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={!!navOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        {!isOnDashboard && (
          <button onClick={() => navigate(-1)} className="admin-back-button"
                  aria-label="Go back" title="Go back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="admin-back-label">Back</span>
          </button>
        )}

        <div className="admin-header-titles">
          <h2>{title || 'Admin Dashboard'}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="admin-header-right">
        <span className={`admin-live-badge ${isProduction ? '' : 'is-testing'}`}
              title={API_BASE}>
          {isProduction ? 'Live production data' : 'Test environment'}
        </span>

        {onPrimaryAction && (
          <button className="btn btn-primary admin-header-action" onClick={onPrimaryAction}>
            {actionLabel || 'Add New'}
          </button>
        )}
      </div>
    </header>
  );
}
