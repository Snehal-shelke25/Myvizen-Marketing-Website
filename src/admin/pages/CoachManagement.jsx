import React, { useEffect, useMemo, useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import * as adminApi from '../api/endpoints';
import { useAdminList } from '../hooks/useAdminList';
import AdminLayout from '../components/AdminLayout';
import Avatar from '../components/Avatar';
import CoachDetailModal from '../components/CoachDetailModal';
import AssignPlanModal from '../components/AssignPlanModal';
import ConfirmDialog from '../components/ConfirmDialog';
import CoachForm, { COACH_RULES, generatePassword } from '../components/CoachForm';
import Pagination from '../components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import Modal from '../components/Modal';

const PAGE_SIZE = 25;

const statusStyles = {
  active: { background: '#dcfce7', color: '#15803d' },
  suspended: { background: '#fee2e2', color: '#b91c1c' },
};

const planLabels = { free: 'Free', professional: 'Professional', elite: 'Elite' };

const formatDate = (value) => (value
  ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  : '--');

/** "61 days left" / "expired" — what support actually needs to read at a glance. */
function planContext(coach) {
  if (!coach.plan_code) return 'No plan';
  if (coach.plan_status === 'expired') return 'Expired';
  if (coach.plan_status === 'cancelled') return 'Cancelled';
  if (coach.days_remaining == null) return coach.plan_status || '';
  const suffix = coach.is_trial ? ' (trial)' : '';
  return `${coach.days_remaining} days left${suffix}`;
}

export default function CoachManagement() {
  const { showToast } = useToast();
  const { canWrite } = useAuth();

  const list = useAdminList(adminApi.listCoaches,
    { status: 'all', plan: 'all' }, { pageSize: PAGE_SIZE });

  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [assignTarget, setAssignTarget] = useState(null);
  const [confirming, setConfirming] = useState(null);   // { coach, suspend }
  const [resetting, setResetting] = useState(null);     // coach awaiting a new password
  const [editing, setEditing] = useState(null);         // coach being edited
  const [confirmBusy, setConfirmBusy] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let active = true;
    adminApi.getStats()
      .then((data) => { if (active) setStats(data); })
      .catch(() => { if (active) setStats(null); });
    return () => { active = false; };
  }, []);

  const totals = useMemo(() => ({
    total: stats?.coaches ?? list.total,
    guests: stats?.guests ?? 0,
    suspended: stats?.suspended ?? 0,
    expiring: stats?.expiring_30d ?? 0,
  }), [stats, list.total]);

  // Suspending asks for a reason in a real dialog rather than window.prompt,
  // which cannot be validated and is blocked by some browsers.
  const runConfirm = async (reason) => {
    const { coach, suspend } = confirming;
    setConfirmBusy(true);
    try {
      if (suspend) {
        await adminApi.suspendCoach(coach.id, reason);
        showToast(`${coach.name} suspended.`, 'success');
      } else {
        await adminApi.activateCoach(coach.id);
        showToast(`${coach.name} reactivated.`, 'success');
      }
      setConfirming(null);
      list.reload();
    } catch (err) {
      showToast(err.message || 'Could not update this coach.', 'error');
    } finally {
      setConfirmBusy(false);
    }
  };

  // The list row carries only summary fields; the form needs address,
  // description and the rest, which live on the detail endpoint.
  const openEdit = async (coach) => {
    try {
      setEditing(await adminApi.getCoach(coach.id));
    } catch (err) {
      showToast(err.message || 'Could not load this coach.', 'error');
    }
  };

  const openCoach = async (coach) => {
    setSelectedCoach({ ...coach, loading: true });
    try {
      setSelectedCoach(await adminApi.getCoach(coach.id));
    } catch (err) {
      showToast(err.message || 'Could not load coach details.', 'error');
      setSelectedCoach(null);
    }
  };

  return (
    <AdminLayout
      title="Coach Management"
      subtitle="Create coach accounts, review activity, and control subscription access"
      actionLabel={canWrite ? 'Create Coach' : undefined}
      onPrimaryAction={canWrite ? () => setShowCreateForm(true) : undefined}
    >
      <div className="admin-stats-grid">
        <MetricCard label="Total Coaches" value={totals.total} tone="green" />
        <MetricCard label="Total Guests" value={totals.guests} tone="blue" />
        <MetricCard label="Expiring in 30 days" value={totals.expiring} tone="amber" />
        <MetricCard label="Suspended" value={totals.suspended} tone="purple" />
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3>Coach Directory</h3>
            <p>Search by coach, center, phone, or email.</p>
          </div>
          <div className="admin-filter-row">
            <input
              className="admin-input"
              value={list.query}
              onChange={(event) => list.setQuery(event.target.value)}
              placeholder="Search coach or center"
            />
            <select className="admin-input" value={list.filters.status}
                    onChange={(e) => list.setFilter('status', e.target.value)}>
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
            <select className="admin-input" value={list.filters.plan}
                    onChange={(e) => list.setFilter('plan', e.target.value)}>
              <option value="all">All plans</option>
              <option value="free">Free</option>
              <option value="professional">Professional</option>
              <option value="elite">Elite</option>
            </select>
          </div>
        </div>

        {list.error && <ErrorState message={list.error} onRetry={list.reload} />}

        {list.loading ? (
          <LoadingState label="Loading coaches..." />
        ) : list.items.length === 0 ? (
          <EmptyState
            title={list.isFiltered ? 'No coaches match these filters.' : 'No coaches yet.'}
            hint={list.isFiltered
              ? 'Try a different search or clear the filters.'
              : 'Create the first coach to get started.'}
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Coach</th>
                  <th>Center</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.items.map((coach) => (
                  <tr key={coach.id}>
                    <td>
                      <div className="admin-person">
                        <Avatar src={coach.photo} name={coach.name} />
                        <div>
                          <strong>{coach.name || 'Unnamed coach'}</strong>
                          <span>{coach.email}</span>
                          <span>{coach.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td><strong>{coach.centre || '--'}</strong></td>
                    <td>
                      <span className="admin-pill">
                        {planLabels[coach.plan_code] || 'None'}
                      </span>
                      <span className="admin-muted">{planContext(coach)}</span>
                    </td>
                    <td>
                      <span className="admin-status"
                            style={statusStyles[coach.status] || statusStyles.active}>
                        {coach.status === 'suspended' ? 'Suspended' : 'Active'}
                      </span>
                    </td>
                    <td>{formatDate(coach.joined_at)}</td>
                    <td>
                      <div className="admin-actions">
                        <button type="button" onClick={() => openCoach(coach)}>View</button>
                        {canWrite && (
                          <button type="button" onClick={() => setAssignTarget(coach)}>
                            Assign Plan
                          </button>
                        )}
                        {canWrite && (
                          <button type="button" onClick={() => openEdit(coach)}>
                            Edit
                          </button>
                        )}
                        {canWrite && (
                          <button type="button" onClick={() => setResetting(coach)}>
                            Reset Password
                          </button>
                        )}
                        {canWrite && (coach.status === 'suspended' ? (
                          <button type="button"
                                  onClick={() => setConfirming({ coach, suspend: false })}>
                            Activate
                          </button>
                        ) : (
                          <button type="button" className="danger"
                                  onClick={() => setConfirming({ coach, suspend: true })}>
                            Suspend
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!list.loading && list.items.length > 0 && (
          <Pagination page={list.page} totalPages={list.totalPages}
                      total={list.total} noun="coaches" onChange={list.setPage} />
        )}
      </section>

      {showCreateForm && (
        <CoachForm
          mode="create"
          onClose={() => setShowCreateForm(false)}
          onSubmit={(payload) => adminApi.createCoach(payload)}
          onSaved={() => {
            setShowCreateForm(false);
            showToast('Coach created. Share the password with them directly.', 'success');
            list.reload();
          }}
        />
      )}

      {editing && (
        <CoachForm
          mode="edit"
          coach={editing}
          onClose={() => setEditing(null)}
          onSubmit={(payload) => adminApi.updateCoach(editing.id, payload)}
          onSaved={() => {
            setEditing(null);
            showToast('Coach updated.', 'success');
            list.reload();
          }}
        />
      )}

      {assignTarget && (
        <AssignPlanModal
          coach={assignTarget}
          onClose={() => setAssignTarget(null)}
          onDone={() => { setAssignTarget(null); list.reload(); }}
        />
      )}

      {confirming && (
        <ConfirmDialog
          title={confirming.suspend
            ? `Suspend ${confirming.coach.name}?`
            : `Reactivate ${confirming.coach.name}?`}
          message={confirming.suspend
            ? 'They will not be able to sign in to the app until reactivated.'
            : 'They will be able to sign in to the app again.'}
          confirmLabel={confirming.suspend ? 'Suspend' : 'Reactivate'}
          destructive={confirming.suspend}
          requireReason={confirming.suspend}
          reasonLabel="Reason (recorded in the audit log)"
          reasonPlaceholder="e.g. Repeated spam reports"
          busy={confirmBusy}
          onConfirm={runConfirm}
          onCancel={() => setConfirming(null)}
        />
      )}

      {resetting && (
        <ResetPasswordModal
          coach={resetting}
          onClose={() => setResetting(null)}
          onDone={() => setResetting(null)}
        />
      )}

      {selectedCoach && (
        <CoachDetailModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
      )}
    </AdminLayout>
  );
}

/* ── Reset password ───────────────────────────────────────────────────────── */

function ResetPasswordModal({ coach, onClose, onDone }) {
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Same rule the app enforces, so a password set here always works there.
  const pwError = password ? COACH_RULES.password(password) : null;

  const submit = async (event) => {
    event.preventDefault();
    if (pwError) { setError(pwError); return; }
    if (!reason.trim()) { setError('A reason is required — this is recorded.'); return; }
    setSaving(true);
    setError('');
    try {
      await adminApi.resetCoachPassword(coach.id, password, reason.trim());
      // Stay open on success: this is the only moment the password can be read,
      // and closing the dialog would lose it before it reaches the coach.
      setDone(true);
    } catch (err) {
      setError(err.message || 'Could not reset this password.');
    } finally {
      setSaving(false);
    }
  };

  const credentials = `MyVizen sign-in\nEmail: ${coach.email}\nPassword: ${password}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(credentials);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy — select the text and copy manually.', 'error');
    }
  };

  if (done) {
    return (
      <Modal title="Password Reset" onClose={onDone} maxWidth="520px">
        <div className="admin-callout" style={{ marginBottom: 14 }}>
          Done. Send these to {coach.name} yourself — the password cannot be
          read back from this panel once you close this dialog.
        </div>

        <pre className="admin-credentials">{credentials}</pre>

        <div className="admin-modal-actions">
          <button type="button" className="btn btn-outline" onClick={copy}>
            {copied ? 'Copied' : 'Copy credentials'}
          </button>
          <button type="button" className="btn btn-primary" onClick={onDone}>Done</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Reset Password" onClose={onClose} maxWidth="520px" busy={saving}>
      <p className="admin-muted">{coach.name} &middot; {coach.email}</p>

      {error && <div className="admin-error-alert" role="alert">{error}</div>}

      <form onSubmit={submit}>
        <div className="admin-form-field">
          <label className="admin-field-label">
            New password<span className="admin-required"> *</span>
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="admin-input" style={{ flex: 1 }} value={password}
                   aria-invalid={!!pwError}
                   onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="btn btn-outline"
                    onClick={() => setPassword(generatePassword())}>
              Generate
            </button>
          </div>
          {pwError
            ? <p className="admin-field-error">{pwError}</p>
            : <p className="admin-field-hint">
                At least 6 characters with a letter and a number — the app&apos;s own rule.
              </p>}
        </div>

        <div className="admin-form-field">
          <label className="admin-field-label">
            Reason<span className="admin-required"> *</span>
          </label>
          <input className="admin-input" value={reason}
                 onChange={(e) => setReason(e.target.value)}
                 placeholder="e.g. Coach locked out, verified by phone" />
          <p className="admin-field-hint">Recorded in the audit log.</p>
        </div>

        <div className="admin-modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary"
                  disabled={saving || !password || !!pwError || !reason.trim()}>
            {saving ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function MetricCard({ label, value, tone }) {
  return (
    <div className={`admin-stat-card admin-stat-${tone}`}>
      <div>
        <span>{label}</span>
        <h3>{value}</h3>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="admin-detail-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
