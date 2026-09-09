import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import * as adminApi from '../api/endpoints';
import { useAdminList } from '../hooks/useAdminList';
import AdminLayout from '../components/AdminLayout';
import AssignPlanModal from '../components/AssignPlanModal';
import Pagination from '../components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';

const PLAN_LABELS = { free: 'Free', professional: 'Professional', elite: 'Elite' };

/** Tabs are the operational view: what needs chasing, not just what exists. */
const TABS = [
  { key: 'all', label: 'All', filters: { expiringDays: undefined, status: 'all' } },
  { key: '7', label: 'Expiring in 7 days', filters: { expiringDays: 7, status: 'all' } },
  { key: '30', label: 'Expiring in 30 days', filters: { expiringDays: 30, status: 'all' } },
  { key: 'expired', label: 'Expired', filters: { expiringDays: undefined, status: 'expired' } },
];

const formatDate = (value) => (value
  ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  : '--');

function daysClass(days) {
  if (days == null) return '';
  if (days <= 7) return 'admin-days-urgent';
  if (days <= 30) return 'admin-days-soon';
  return '';
}

export default function SubscriptionsPage() {
  const { canWrite } = useAuth();
  const [tab, setTab] = useState('all');
  const [assignTarget, setAssignTarget] = useState(null);

  const list = useAdminList(adminApi.listSubscriptions, {
    plan: 'all', status: 'all', expiringDays: undefined,
  });

  const selectTab = (next) => {
    setTab(next.key);
    // Applied together so the hook fires one request, not two.
    list.setFilter('status', next.filters.status);
    list.setFilter('expiringDays', next.filters.expiringDays);
  };

  const exportCsv = () => {
    const header = ['Coach', 'Email', 'Plan', 'Source', 'Status', 'Ends', 'Days left'];
    const rows = list.items.map((r) => [
      r.name, r.email, PLAN_LABELS[r.plan_code] || r.plan_code || '',
      r.plan_source || '', r.plan_status || '',
      r.plan_ends_at ? formatDate(r.plan_ends_at) : '',
      r.days_remaining ?? '',
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `myvizen-subscriptions-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout
      title="Subscriptions"
      subtitle="Every coach's plan, and who needs chasing"
    >
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div className="admin-tabs">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                className={`admin-tab ${tab === t.key ? 'active' : ''}`}
                onClick={() => selectTab(t)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="admin-filter-row">
            <input
              className="admin-input"
              value={list.query}
              onChange={(e) => list.setQuery(e.target.value)}
              placeholder="Search coach or center"
            />
            <select className="admin-input" value={list.filters.plan}
                    onChange={(e) => list.setFilter('plan', e.target.value)}>
              <option value="all">All plans</option>
              <option value="free">Free</option>
              <option value="professional">Professional</option>
              <option value="elite">Elite</option>
            </select>
            <button type="button" className="btn btn-outline"
                    onClick={exportCsv} disabled={list.items.length === 0}>
              Export CSV
            </button>
          </div>
        </div>

        {list.error && <ErrorState message={list.error} onRetry={list.reload} />}

        {list.loading ? (
          <LoadingState label="Loading subscriptions..." avatar={false} />
        ) : list.items.length === 0 ? (
          <EmptyState
            title={tab === 'all' && !list.isFiltered
              ? 'No subscriptions yet.'
              : 'Nothing here.'}
            hint={tab === '7' ? 'Nothing expires in the next 7 days.'
              : tab === '30' ? 'Nothing expires in the next 30 days.'
              : tab === 'expired' ? 'No expired plans.'
              : 'Try a different search or filter.'}
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Coach</th>
                  <th>Plan</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Ends</th>
                  <th>Days left</th>
                  {canWrite && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {list.items.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <strong>{row.name || 'Unnamed coach'}</strong>
                      <span className="admin-muted">{row.email}</span>
                    </td>
                    <td>
                      <span className="admin-pill">
                        {PLAN_LABELS[row.plan_code] || 'None'}
                      </span>
                    </td>
                    <td>{row.plan_source || '--'}</td>
                    <td>
                      <span className="admin-status" style={
                        row.plan_status === 'active'
                          ? { background: '#dcfce7', color: '#15803d' }
                          : { background: '#f1f5f9', color: '#475569' }
                      }>
                        {row.plan_status || 'none'}
                      </span>
                    </td>
                    <td>{formatDate(row.plan_ends_at)}</td>
                    <td className={daysClass(row.days_remaining)}>
                      {row.days_remaining == null ? '--' : `${row.days_remaining} days`}
                    </td>
                    {canWrite && (
                      <td>
                        <div className="admin-actions">
                          <button type="button" onClick={() => setAssignTarget(row)}>
                            Assign Plan
                          </button>
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
                      total={list.total} noun="subscriptions" onChange={list.setPage} />
        )}
      </section>

      {assignTarget && (
        <AssignPlanModal
          coach={assignTarget}
          onClose={() => setAssignTarget(null)}
          onDone={() => { setAssignTarget(null); list.reload(); }}
        />
      )}
    </AdminLayout>
  );
}
