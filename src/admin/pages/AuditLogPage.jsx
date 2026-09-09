import React from 'react';
import * as adminApi from '../api/endpoints';
import { useAdminList } from '../hooks/useAdminList';
import AdminLayout from '../components/AdminLayout';
import Pagination from '../components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';

const ACTION_LABELS = {
  'admin.login': 'Signed in',
  'coach.created': 'Created coach',
  'coach.suspended': 'Suspended coach',
  'coach.activated': 'Reactivated coach',
  'subscription.granted': 'Assigned plan',
  'admin.created': 'Created admin',
  'admin.deactivated': 'Deactivated admin',
  'admin.activated': 'Reactivated admin',
};

const ACTION_TONE = {
  'coach.suspended': { background: '#fee2e2', color: '#b91c1c' },
  'admin.deactivated': { background: '#fee2e2', color: '#b91c1c' },
  'subscription.granted': { background: '#dcfce7', color: '#15803d' },
  'coach.created': { background: '#e0f2fe', color: '#0369a1' },
  'admin.created': { background: '#e0f2fe', color: '#0369a1' },
};

function formatWhen(value) {
  if (!value) return '--';
  return new Date(value).toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/** The detail column stores JSON; show it as readable key: value pairs. */
function Detail({ raw }) {
  if (!raw) return <span className="admin-muted">--</span>;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return <span className="admin-muted">{raw}</span>;
  }
  const entries = Object.entries(parsed).filter(([, v]) => v !== null && v !== undefined);
  if (entries.length === 0) return <span className="admin-muted">--</span>;
  return (
    <div className="admin-audit-detail">
      {entries.map(([key, value]) => (
        <span key={key}>
          <em>{key.replace(/_/g, ' ')}:</em> {String(value)}
        </span>
      ))}
    </div>
  );
}

export default function AuditLogPage() {
  const list = useAdminList(adminApi.listAudit, { action: '' }, { pageSize: 50 });

  return (
    <AdminLayout
      title="Audit Log"
      subtitle="Every change made in this panel — who, what, and when"
    >
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3>Activity</h3>
            <p>Records are written automatically and cannot be edited.</p>
          </div>
          <div className="admin-filter-row">
            <input
              className="admin-input"
              value={list.query}
              onChange={(e) => list.setQuery(e.target.value)}
              placeholder="Search by admin email"
            />
            <select className="admin-input" value={list.filters.action}
                    onChange={(e) => list.setFilter('action', e.target.value)}>
              <option value="">All actions</option>
              {Object.entries(ACTION_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {list.error && <ErrorState message={list.error} onRetry={list.reload} />}

        {list.loading ? (
          <LoadingState label="Loading audit log..." avatar={false} rows={8} />
        ) : list.items.length === 0 ? (
          <EmptyState
            title={list.isFiltered ? 'No matching entries.' : 'Nothing recorded yet.'}
            hint={list.isFiltered
              ? 'Try a different admin or action.'
              : 'Actions taken in this panel will appear here.'}
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Target</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {list.items.map((row) => (
                  <tr key={row.id}>
                    <td>{formatWhen(row.created_at)}</td>
                    <td>
                      <strong>{row.actor || '--'}</strong>
                      {row.ip && <span className="admin-muted">{row.ip}</span>}
                    </td>
                    <td>
                      <span className="admin-status"
                            style={ACTION_TONE[row.action] || { background: '#f1f5f9', color: '#475569' }}>
                        {ACTION_LABELS[row.action] || row.action}
                      </span>
                    </td>
                    <td>
                      {row.target_type
                        ? <>{row.target_type} #{row.target_id}</>
                        : <span className="admin-muted">--</span>}
                    </td>
                    <td><Detail raw={row.detail} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!list.loading && list.items.length > 0 && (
          <Pagination page={list.page} totalPages={list.totalPages}
                      total={list.total} noun="entries" onChange={list.setPage} />
        )}
      </section>
    </AdminLayout>
  );
}
