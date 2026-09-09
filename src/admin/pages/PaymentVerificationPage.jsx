import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import * as adminApi from '../api/endpoints';
import { useAdminList } from '../hooks/useAdminList';
import AdminLayout from '../components/AdminLayout';
import ConfirmDialog from '../components/ConfirmDialog';
import Pagination from '../components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';
import Modal from '../components/Modal';

const TABS = [
  { key: 'under_review', label: 'Awaiting review' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'all', label: 'All' },
];

const PLAN_LABELS = { professional: 'Professional', elite: 'Elite', free: 'Free' };

const money = (n) => `Rs. ${Number(n || 0).toLocaleString('en-IN')}`;

const formatWhen = (value) => (value
  ? new Date(value).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    })
  : '--');

/** Waiting time is the SLA, so it gets the colour, not the amount. */
function waitStyle(hours) {
  if (hours == null) return {};
  if (hours >= 24) return { background: '#fee2e2', color: '#b91c1c' };
  if (hours >= 12) return { background: '#fef3c7', color: '#b45309' };
  return { background: '#f1f5f9', color: '#475569' };
}

export default function PaymentVerificationPage() {
  const { canWrite } = useAuth();
  const { showToast } = useToast();
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState(null);   // { row, approve }
  const [busy, setBusy] = useState(false);

  const list = useAdminList(adminApi.listPayments, { status: 'under_review' });
  const activeTab = list.filters.status;

  const run = async (text) => {
    setBusy(true);
    try {
      if (action.approve) {
        await adminApi.approvePayment(action.row.id, text);
        showToast(`${action.row.order_id} approved — plan activated.`, 'success');
      } else {
        await adminApi.rejectPayment(action.row.id, text);
        showToast(`${action.row.order_id} rejected.`, 'success');
      }
      setAction(null);
      setSelected(null);
      list.reload();
    } catch (err) {
      showToast(err.message || 'Could not update this payment.', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout
      title="Payment Review"
      subtitle="Match each UPI reference against your bank statement, then activate"
    >
      <div className="admin-callout" style={{ marginBottom: 20 }}>
        Approve only once you can see the <strong>UTR</strong> in your bank
        statement with a matching amount. A screenshot on its own is not proof —
        images are easily edited.
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div className="admin-tabs">
            {TABS.map((tab) => (
              <button key={tab.key} type="button"
                      className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`}
                      onClick={() => list.setFilter('status', tab.key)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="admin-filter-row">
            <input className="admin-input" value={list.query}
                   onChange={(e) => list.setQuery(e.target.value)}
                   placeholder="Search order, UTR or email" />
          </div>
        </div>

        {list.error && <ErrorState message={list.error} onRetry={list.reload} />}

        {list.loading ? (
          <LoadingState label="Loading payments..." avatar={false} rows={4} />
        ) : list.items.length === 0 ? (
          <EmptyState
            title={activeTab === 'under_review' ? 'Nothing waiting for review.' : 'Nothing here.'}
            hint={activeTab === 'under_review'
              ? 'Payments appear here as soon as a coach submits their UPI reference.'
              : undefined}
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Coach</th>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>UTR</th>
                  <th>Waiting</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.items.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>{row.order_id}</strong>
                      <span className="admin-muted">{formatWhen(row.submitted_at)}</span>
                    </td>
                    <td>
                      {row.email}
                      {row.payer_name && (
                        <span className="admin-muted">paid as {row.payer_name}</span>
                      )}
                    </td>
                    <td>
                      <span className="admin-pill">
                        {PLAN_LABELS[row.plan_code] || row.plan_code}
                      </span>
                      <span className="admin-muted">{row.months} month{row.months > 1 ? 's' : ''}</span>
                    </td>
                    <td><strong>{money(row.amount)}</strong></td>
                    <td>
                      <span className="admin-utr">{row.utr || '--'}</span>
                      {row.duplicate_utr_orders?.length > 0 && (
                        <span className="admin-dupe-warn">
                          Also on {row.duplicate_utr_orders.join(', ')}
                        </span>
                      )}
                    </td>
                    <td>
                      {row.waiting_hours == null ? (
                        <span className="admin-muted">--</span>
                      ) : (
                        <span className="admin-status" style={waitStyle(row.waiting_hours)}>
                          {row.waiting_hours}h
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button type="button" onClick={() => setSelected(row)}>Review</button>
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
                      total={list.total} noun="payments" onChange={list.setPage} />
        )}
      </section>

      {selected && (
        <ReviewModal
          row={selected}
          canWrite={canWrite}
          onClose={() => setSelected(null)}
          onApprove={() => setAction({ row: selected, approve: true })}
          onReject={() => setAction({ row: selected, approve: false })}
        />
      )}

      {action && (
        <ConfirmDialog
          title={action.approve
            ? `Approve ${action.row.order_id}?`
            : `Reject ${action.row.order_id}?`}
          message={action.approve
            ? `This activates ${PLAN_LABELS[action.row.plan_code]} for ${action.row.months} month(s) and emails the coach.`
            : 'The coach is emailed this reason, so write it for them to read.'}
          confirmLabel={action.approve ? 'Approve & Activate' : 'Reject'}
          destructive={!action.approve}
          requireReason={!action.approve}
          reasonLabel="Reason (sent to the coach)"
          reasonPlaceholder="e.g. We could not find this reference in our statement"
          busy={busy}
          onConfirm={run}
          onCancel={() => setAction(null)}
        />
      )}
    </AdminLayout>
  );
}

function ReviewModal({ row, canWrite, onClose, onApprove, onReject }) {
  const copyUtr = () => {
    navigator.clipboard?.writeText(row.utr || '');
  };

  // What approving will actually produce. This mirrors grant_subscription() on
  // the server: an active plan with days left is extended from its end date
  // rather than overwritten, so the operator sees the real outcome instead of
  // working the dates out in their head.
  const stillActive = row.current_plan_ends_at
    && new Date(row.current_plan_ends_at) > new Date();
  const startFrom = stillActive ? new Date(row.current_plan_ends_at) : new Date();
  const newEnd = new Date(startFrom.getTime() + row.months * 30 * 86400000);
  const fmtDate = (d) => d.toLocaleDateString('en-IN',
    { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <Modal title={row.order_id} onClose={onClose} maxWidth="620px">
        <p className="admin-muted">{row.email}</p>

        {row.duplicate_utr_orders?.length > 0 && (
          <div className="admin-error-alert">
            This UTR was already used on {row.duplicate_utr_orders.join(', ')}.
            Check your statement before approving.
          </div>
        )}

        <div className="admin-detail-grid">
          <Detail label="Plan" value={`${PLAN_LABELS[row.plan_code] || row.plan_code}, ${row.months} month(s)`} />
          <Detail label="Amount" value={money(row.amount)} />
          <Detail label="Payer name" value={row.payer_name || '--'} />
          <Detail label="Submitted" value={formatWhen(row.submitted_at)} />
          <Detail label="Current plan" value={PLAN_LABELS[row.current_plan_code] || 'None'} />
          <Detail label="Current plan ends" value={row.current_plan_ends_at
            ? new Date(row.current_plan_ends_at).toLocaleDateString('en-IN') : '--'} />
        </div>

        {row.status === 'under_review' && (
          <div className="admin-callout" style={{ marginTop: 14 }}>
            {stillActive ? (
              <>
                Their {PLAN_LABELS[row.current_plan_code] || 'current'} plan runs to{' '}
                <strong>{fmtDate(new Date(row.current_plan_ends_at))}</strong>.
                Approving extends them to <strong>{fmtDate(newEnd)}</strong>.
              </>
            ) : (
              <>Approving starts {PLAN_LABELS[row.plan_code] || row.plan_code} today,
                 running to <strong>{fmtDate(newEnd)}</strong>.</>
            )}
          </div>
        )}

        <div className="admin-utr-block">
          <div>
            <span className="admin-field-label">UPI reference (UTR)</span>
            <strong className="admin-utr">{row.utr || '--'}</strong>
          </div>
          <button type="button" className="btn btn-outline" onClick={copyUtr}>Copy</button>
        </div>

        {row.user_note && (
          <p className="admin-muted" style={{ marginTop: 12 }}>
            Coach note: {row.user_note}
          </p>
        )}

        {row.proof_url && (
          <a href={row.proof_url} target="_blank" rel="noreferrer"
             className="btn btn-outline" style={{ marginTop: 12, display: 'inline-block' }}>
            View payment screenshot
          </a>
        )}

        {row.admin_note && (
          <div className="admin-callout" style={{ marginTop: 14 }}>
            Decision note: {row.admin_note}
          </div>
        )}

        <div className="admin-modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Close</button>
          {canWrite && row.status === 'under_review' && (
            <>
              <button type="button" className="btn btn-danger" onClick={onReject}>Reject</button>
              <button type="button" className="btn btn-primary" onClick={onApprove}>
                Approve &amp; Activate
              </button>
            </>
          )}
        </div>
    </Modal>
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
