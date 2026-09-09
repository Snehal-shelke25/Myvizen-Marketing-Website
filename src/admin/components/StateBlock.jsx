import React from 'react';

/**
 * The three states every list needs besides "loaded".
 *
 * Screens used to hand-roll these, so some had a retry button and some showed
 * a blank white box when a request failed. One component means every list
 * behaves the same.
 */
/**
 * A shimmer in the shape of the rows that are coming, rather than the words
 * "Loading...". The table then appears in place instead of the whole panel
 * jumping when the data lands.
 */
export function LoadingState({ label = 'Loading...', rows = 5, avatar = true }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="admin-visually-hidden">{label}</span>
      {Array.from({ length: rows }).map((_, index) => (
        <div className="admin-skeleton-row" key={index}>
          {avatar && <div className="admin-skeleton admin-skeleton-avatar" />}
          <div style={{ flex: 2, display: 'grid', gap: 7 }}>
            <div className="admin-skeleton" style={{ width: '46%' }} />
            <div className="admin-skeleton" style={{ width: '30%' }} />
          </div>
          <div className="admin-skeleton" style={{ flex: 1, maxWidth: 110 }} />
          <div className="admin-skeleton" style={{ flex: 1, maxWidth: 80 }} />
          <div className="admin-skeleton" style={{ flex: 1, maxWidth: 96 }} />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, hint, action }) {
  return (
    <div className="admin-empty">
      <svg className="admin-empty-icon" width="34" height="34" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" strokeWidth="1.6"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
      <p className="admin-empty-title">{title}</p>
      {hint && <p className="admin-empty-hint">{hint}</p>}
      {action && <div style={{ marginTop: 14 }}>{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="admin-error-alert" style={{ margin: '0 0 16px' }} role="alert">
      <span>{message}</span>
      {onRetry && (
        <button type="button" className="btn btn-outline"
                style={{ marginLeft: 12 }} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
