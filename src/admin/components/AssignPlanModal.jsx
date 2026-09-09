import React, { useMemo, useState } from 'react';
import { useToast } from '../../context/ToastContext';
import Modal from './Modal';
import * as adminApi from '../api/endpoints';

const PLANS = [
  { code: 'free', label: 'Free' },
  { code: 'professional', label: 'Professional' },
  { code: 'elite', label: 'Elite' },
];

const DURATIONS = [1, 3, 6, 12];

/**
 * Assign or extend a coach's subscription.
 *
 * Two things this deliberately does:
 *  - shows the resulting end date BEFORE you confirm, because date arithmetic
 *    is where mistakes happen;
 *  - requires a reason, which the backend stores on the subscription and in
 *    the audit log. A plan change nobody can explain later is worse than no
 *    record at all.
 */
export default function AssignPlanModal({ coach, onClose, onDone }) {
  const { showToast } = useToast();
  const [planCode, setPlanCode] = useState(
    coach.plan_code && coach.plan_code !== 'free' ? coach.plan_code : 'professional'
  );
  const [months, setMonths] = useState(1);
  const [note, setNote] = useState('');
  const [source, setSource] = useState('granted');
  const [paymentRef, setPaymentRef] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Mirrors grant_subscription() on the server: when the current plan is still
  // running, the new period starts at its end date instead of today.
  const projected = useMemo(() => {
    const days = months * 30;
    const stillActive =
      coach.plan_status === 'active' &&
      coach.plan_ends_at &&
      new Date(coach.plan_ends_at) > new Date();
    const start = stillActive ? new Date(coach.plan_ends_at) : new Date();
    const end = new Date(start.getTime() + days * 86400000);
    return { stillActive, start, end };
  }, [coach, months]);

  const fmt = (d) => d.toLocaleDateString('en-IN',
    { day: 'numeric', month: 'short', year: 'numeric' });

  const submit = async (event) => {
    event.preventDefault();
    if (!note.trim()) {
      setError('Please give a reason — it is stored with the subscription.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await adminApi.grantSubscription({
        coachId: coach.id,
        planCode,
        months: Number(months),
        note: note.trim(),
        source,
        paymentRef: paymentRef.trim() || undefined,
      });
      showToast(`${coach.name} is now on ${planCode}.`, 'success');
      onDone();
    } catch (err) {
      setError(err.message || 'Could not assign this plan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Assign Plan" onClose={onClose} maxWidth="560px" busy={saving}>
        <p className="admin-muted">
          {coach.name} &middot; {coach.email}
        </p>

        {error && <div className="admin-error-alert">{error}</div>}

        <form className="admin-form-grid" onSubmit={submit}>
          <div>
            <label className="admin-field-label">Plan</label>
            <select className="admin-input" value={planCode}
                    onChange={(e) => setPlanCode(e.target.value)}>
              {PLANS.map((p) => (
                <option key={p.code} value={p.code}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="admin-field-label">Duration</label>
            <select className="admin-input" value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}>
              {DURATIONS.map((m) => (
                <option key={m} value={m}>{m} month{m > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="admin-field-label">Why</label>
            <select className="admin-input" value={source}
                    onChange={(e) => setSource(e.target.value)}>
              <option value="granted">Granted (manual / goodwill)</option>
              <option value="paid">Paid (UPI payment received)</option>
            </select>
          </div>

          {source === 'paid' && (
            <div>
              <label className="admin-field-label">UPI reference / UTR</label>
              <input className="admin-input" value={paymentRef}
                     onChange={(e) => setPaymentRef(e.target.value)}
                     placeholder="12-digit reference from your bank statement" />
            </div>
          )}

          <div>
            <label className="admin-field-label">Reason (required)</label>
            <input className="admin-input" value={note}
                   onChange={(e) => setNote(e.target.value)}
                   placeholder="e.g. Paid by UPI on 7 Sep" />
          </div>

          <div className="admin-callout">
            {projected.stillActive ? (
              <>
                Current plan runs to <strong>{fmt(new Date(coach.plan_ends_at))}</strong>.
                {' '}This extends it to <strong>{fmt(projected.end)}</strong> — no days are lost.
              </>
            ) : (
              <>Starts today and runs to <strong>{fmt(projected.end)}</strong>.</>
            )}
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Assigning...' : 'Assign Plan'}
            </button>
          </div>
        </form>
    </Modal>
  );
}
