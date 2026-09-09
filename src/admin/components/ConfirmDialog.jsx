import React, { useState } from 'react';
import Modal from './Modal';

/**
 * Confirmation for a destructive action, optionally requiring a typed reason.
 *
 * This replaces window.prompt(), which could not be styled, could not validate,
 * and is blocked outright by some browsers. Suspending a coach is recorded in
 * the audit log, so the reason field is not decoration — it is the record of
 * why someone lost access.
 */
export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  destructive = false,
  requireReason = false,
  reasonLabel = 'Reason',
  reasonPlaceholder = '',
  busy = false,
  onConfirm,
  onCancel,
}) {
  const [reason, setReason] = useState('');
  const [touched, setTouched] = useState(false);

  const reasonMissing = requireReason && !reason.trim();

  const submit = (event) => {
    event.preventDefault();
    setTouched(true);
    if (reasonMissing) return;
    onConfirm(reason.trim());
  };

  return (
    <Modal title={title} onClose={onCancel} maxWidth="460px" busy={busy}>
      {message && <p className="admin-muted">{message}</p>}

        <form onSubmit={submit}>
          {requireReason && (
            <div style={{ marginTop: 12 }}>
              <label className="admin-field-label">{reasonLabel}</label>
              <input
                className="admin-input"
                value={reason}
                autoFocus
                placeholder={reasonPlaceholder}
                onChange={(e) => setReason(e.target.value)}
              />
              {touched && reasonMissing && (
                <p style={{ color: '#b91c1c', fontSize: 12, margin: '6px 0 0' }}>
                  This is required — it is stored in the audit log.
                </p>
              )}
            </div>
          )}

          <div className="admin-modal-actions">
            <button type="button" className="btn btn-outline"
                    onClick={onCancel} disabled={busy}>
              Cancel
            </button>
            <button type="submit"
                    className={`btn ${destructive ? 'btn-danger' : 'btn-primary'}`}
                    disabled={busy}>
              {busy ? 'Working...' : confirmLabel}
            </button>
          </div>
      </form>
    </Modal>
  );
}
