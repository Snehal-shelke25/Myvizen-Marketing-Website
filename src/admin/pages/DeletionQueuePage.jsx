import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import * as adminApi from '../api/endpoints';
import { useAdminList } from '../hooks/useAdminList';
import AdminLayout from '../components/AdminLayout';
import ConfirmDialog from '../components/ConfirmDialog';
import Pagination from '../components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'cancelled', label: 'Restored' },
  { key: 'purged', label: 'Purged' },
  { key: 'all', label: 'All' },
];

const formatWhen = (value) => (value
  ? new Date(value).toLocaleDateString('en-IN',
      { day: 'numeric', month: 'short', year: 'numeric' })
  : '--');

/**
 * Play Store requires an in-app account deletion path, and this app has one:
 * a request is recorded, the account is soft-deleted, and a background sweep
 * purges it permanently after the grace period.
 *
 * This screen is the part that was missing. Without it the countdown ran where
 * nobody could see it, so a coach who deleted by mistake had no way back and
 * support had nothing to act on.
 */
export default function DeletionQueuePage() {
  const { canWrite } = useAuth();
  const { showToast } = useToast();
  const [restoring, setRestoring] = useState(null);
  const [busy, setBusy] = useState(false);

  const list = useAdminList(adminApi.listDeletions, { status: 'pending' });
  const activeTab = list.filters.status;

  const runRestore = async (reason) => {
    setBusy(true);
    try {
      await adminApi.restoreDeletion(restoring.id, reason);
      showToast(`${restoring.identifier} restored.`, 'success');
      setRestoring(null);
      list.reload();
    } catch (err) {
      showToast(err.message || 'Could not restore this account.', 'error');
    } finally {
      setBusy(false);
    }
  };

  const urgency = (days) => {
    if (days == null) return {};
    if (days <= 3) return { background: '#fee2e2', color: '#b91c1c' };
    if (days <= 5) return { background: '#fef3c7', color: '#b45309' };
    return { background: '#f1f5f9', color: '#475569' };
  };

  return (
    <AdminLayout
      title="Account Deletion Queue"
      subtitle="Accounts scheduled for permanent deletion — restore before the grace period ends"
    >
      <div className="admin-callout" style={{ marginBottom: 20 }}>
        Deletion requests are held for <strong>10 days</strong>. After that the
        account and all of its data are permanently removed and{' '}
        <strong>cannot be recovered</strong>.
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div className="admin-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => list.setFilter('status', tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="admin-filter-row">
            <input
              className="admin-input"
              value={list.query}
              onChange={(e) => list.setQuery(e.target.value)}
              placeholder="Search email or phone"
            />
          </div>
        </div>

        {list.error && <ErrorState message={list.error} onRetry={list.reload} />}

        {list.loading ? (
          <LoadingState label="Loading deletion queue..." avatar={false} rows={4} />
        ) : list.items.length === 0 ? (
          <EmptyState
            title={activeTab === 'pending'
              ? 'No accounts are scheduled for deletion.'
              : 'Nothing here.'}
            hint={activeTab === 'pending'
              ? 'Requests appear here as soon as someone deletes their account in the app.'
              : undefined}
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Requested</th>
                  <th>Purge on</th>
                  <th>Time left</th>
                  <th>Status</th>
                  {canWrite && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {list.items.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>{row.identifier || `#${row.account_id}`}</strong>
                      {row.reason && <span className="admin-muted">{row.reason}</span>}
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{row.account_type}</td>
                    <td>{formatWhen(row.requested_at)}</td>
                    <td>{formatWhen(row.scheduled_purge_at)}</td>
                    <td>
                      {row.status === 'pending' && row.days_left != null ? (
                        <span className="admin-status" style={urgency(row.days_left)}>
                          {row.days_left === 0
                            ? 'Purging now'
                            : `${row.days_left} day${row.days_left === 1 ? '' : 's'}`}
                        </span>
                      ) : <span className="admin-muted">--</span>}
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {row.status === 'cancelled' ? 'Restored' : row.status}
                    </td>
                    {canWrite && (
                      <td>
                        <div className="admin-actions">
                          {row.status === 'pending' ? (
                            <button type="button" onClick={() => setRestoring(row)}>
                              Restore
                            </button>
                          ) : (
                            <span className="admin-muted">--</span>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!list.loading && list.items.length > 0 && (
          <Pagination page={list.page} totalPages={list.totalPages}
                      total={list.total} noun="requests" onChange={list.setPage} />
        )}
      </section>

      {restoring && (
        <ConfirmDialog
          title={`Restore ${restoring.identifier}?`}
          message="The account will be reactivated and removed from the deletion queue. They will be able to sign in again."
          confirmLabel="Restore Account"
          requireReason
          reasonLabel="Why (recorded in the audit log)"
          reasonPlaceholder="e.g. Coach called, deleted by mistake"
          busy={busy}
          onConfirm={runRestore}
          onCancel={() => setRestoring(null)}
        />
      )}
    </AdminLayout>
  );
}
