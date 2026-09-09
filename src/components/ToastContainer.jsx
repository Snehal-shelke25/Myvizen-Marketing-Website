import React from 'react';
import { useToast } from '../context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="false"
      style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px',
      width: '100%',
      pointerEvents: 'none',
    }}>
      {toasts.map(t => {
        const isError = t.type === 'error';
        const isInfo = t.type === 'info';

        return (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              background: isError ? '#fef2f2' : isInfo ? '#eff6ff' : '#f0fdf4',
              border: `1.5px solid ${isError ? '#fca5a5' : isInfo ? '#bfdbfe' : '#86efac'}`,
              color: isError ? '#991b1b' : isInfo ? '#1e40af' : '#166534',
              borderRadius: '14px',
              padding: '14px 18px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              display: 'flex',
              // Top-aligned, not centred: error toasts now stay until dismissed
              // and can run to several lines, and the dismiss button should sit
              // beside the first line rather than float in the middle.
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: '700',
              animation: 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              lineHeight: 1.45,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0, lineHeight: 1.2 }} aria-hidden="true">
                {isError ? '⚠️' : isInfo ? 'ℹ️' : '✅'}
              </span>
              <span>{t.message}</span>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              aria-label="Dismiss notification"
              style={{
                background: 'none',
                border: 'none',
                color: 'currentColor',
                fontSize: '1.1rem',
                cursor: 'pointer',
                opacity: 0.6,
                padding: '2px',
                // Without this the ✕ gets squashed when a long error wraps.
                flexShrink: 0,
                lineHeight: 1.2,
              }}
            >
              ✕
            </button>
          </div>
        );
      })}

      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(-16px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
