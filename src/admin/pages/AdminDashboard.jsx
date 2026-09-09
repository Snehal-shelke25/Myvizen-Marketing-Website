import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as adminApi from '../api/endpoints';
import AdminLayout from '../components/AdminLayout';
import TrendChart from '../components/TrendChart';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';

const PLAN_LABELS = { free: 'Free', professional: 'Professional', elite: 'Elite' };

const formatDate = (v) => (v
  ? new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  : 'never');

export default function AdminDashboard() {
  const { adminName } = useAuth();
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [expiring, setExpiring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // One pass, in parallel — the dashboard should not load in stages.
      const [s, act, exp] = await Promise.all([
        adminApi.getStats(),
        adminApi.getActivity(30),
        adminApi.listSubscriptions({ expiringDays: 30, pageSize: 6 }),
      ]);
      setStats(s);
      setActivity(act);
      setExpiring(exp.items || []);
    } catch (err) {
      setError(err.message || 'Could not load the dashboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const planTotal = stats
    ? Object.values(stats.plan_mix || {}).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <AdminLayout
      title={`Welcome back${adminName ? `, ${adminName}` : ''}`}
      subtitle="Coaches, guests, reports and subscriptions across MyVizen"
    >
      {error && <ErrorState message={error} onRetry={load} />}

      {/* Things that are time-boxed and irreversible interrupt; everything
          else waits in a card. */}
      {stats?.payments_awaiting > 0 && (
        <div className="admin-alert-strip admin-alert-info">
          <div>
            <strong>
              {stats.payments_awaiting} payment{stats.payments_awaiting === 1 ? '' : 's'} waiting for review
            </strong>
            <span>
              {stats.payments_overdue > 0
                ? `${stats.payments_overdue} past the 12-hour activation window.`
                : 'Coaches are waiting for their plan to be activated.'}
            </span>
          </div>
          <Link to="/admin/payments" className="btn btn-primary">Review payments</Link>
        </div>
      )}

      {stats?.deletions_urgent > 0 && (
        <div className="admin-alert-strip">
          <div>
            <strong>
              {stats.deletions_urgent} account{stats.deletions_urgent === 1 ? '' : 's'} will be permanently deleted within 3 days
            </strong>
            <span>Restore them now if this was not intended — after the grace period the data cannot be recovered.</span>
          </div>
          <Link to="/admin/deletions" className="btn btn-primary">Review queue</Link>
        </div>
      )}

      {loading ? (
        <LoadingState label="Loading dashboard..." avatar={false} rows={3} />
      ) : stats ? (
        <>
          <div className="admin-stats-grid">
            <StatCard label="Coaches" value={stats.coaches}
                      hint={`+${stats.coaches_new_7d} in 7 days`} tone="green" to="/admin/coaches" />
            <StatCard label="Guests" value={stats.guests} tone="blue" to="/admin/guests" />
            <StatCard label="Reports" value={stats.reports ?? 0}
                      hint={`+${stats.reports_new_7d ?? 0} in 7 days`} tone="teal" to="/admin/reports" />
            <StatCard label="Payments to review" value={stats.payments_awaiting ?? 0}
                      hint={stats.payments_overdue ? `${stats.payments_overdue} overdue` : undefined}
                      tone="amber" to="/admin/payments" />
            <StatCard label="Expiring in 30 days" value={stats.expiring_30d ?? 0}
                      tone="purple" to="/admin/subscriptions" />
            <StatCard label="Pending deletions" value={stats.deletions_pending ?? 0}
                      tone={stats.deletions_pending ? 'red' : 'grey'} to="/admin/deletions" />
          </div>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Activity — last 30 days</h3>
                <p>New coaches, guests and reports per day.</p>
              </div>
            </div>
            <TrendChart data={activity?.trend || []} />
          </section>

          <div className="admin-grid-2">
            <section className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h3>Plan mix</h3>
                  <p>How your {planTotal} coaches are distributed.</p>
                </div>
              </div>
              <div className="admin-planmix">
                {Object.entries(stats.plan_mix || {}).map(([code, count]) => {
                  const pct = planTotal ? Math.round((count / planTotal) * 100) : 0;
                  return (
                    <div key={code} className="admin-planmix-row">
                      <span className="admin-planmix-label">{PLAN_LABELS[code] || code}</span>
                      <div className="admin-planmix-track">
                        <div className={`admin-planmix-fill admin-planmix-${code}`}
                             style={{ width: `${pct}%` }} />
                      </div>
                      <span className="admin-planmix-value">{count} ({pct}%)</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h3>Expiring soon</h3>
                  <p>Plans ending within 30 days.</p>
                </div>
                <Link to="/admin/subscriptions" className="btn btn-outline">View all</Link>
              </div>

              {expiring.length === 0 ? (
                <EmptyState title="Nothing expiring in the next 30 days." />
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead><tr><th>Coach</th><th>Plan</th><th>Days left</th></tr></thead>
                    <tbody>
                      {expiring.map((row) => (
                        <tr key={row.id}>
                          <td>
                            <strong>{row.name}</strong>
                            <span className="admin-muted">{row.email}</span>
                          </td>
                          <td><span className="admin-pill">{PLAN_LABELS[row.plan_code] || row.plan_code}</span></td>
                          <td className={row.days_remaining <= 7 ? 'admin-days-urgent' : ''}>
                            {row.days_remaining} days
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Coaches not creating reports</h3>
                <p>
                  Active accounts with no report in the last 30 days — signed up,
                  but not yet using the platform.
                </p>
              </div>
              <Link to="/admin/coaches" className="btn btn-outline">All coaches</Link>
            </div>

            {!activity?.dormant_coaches?.length ? (
              <EmptyState title="Every coach has created a report recently."
                          hint="That is a good sign — the platform is being used." />
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr><th>Coach</th><th>Centre</th><th>Joined</th><th>Last report</th></tr>
                  </thead>
                  <tbody>
                    {activity.dormant_coaches.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <strong>{c.name || 'Unnamed coach'}</strong>
                          <span className="admin-muted">{c.email}</span>
                        </td>
                        <td>{c.centre || '--'}</td>
                        <td>{formatDate(c.joined_at)}</td>
                        <td className={!c.last_report_at ? 'admin-days-urgent' : ''}>
                          {c.last_report_at ? formatDate(c.last_report_at) : 'never'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      ) : null}
    </AdminLayout>
  );
}

function StatCard({ label, value, hint, tone, to }) {
  const card = (
    <div className={`admin-stat-card admin-stat-${tone}`}>
      <div>
        <span>{label}</span>
        <h3>{value}</h3>
        {hint && <small className="admin-muted">{hint}</small>}
      </div>
    </div>
  );
  return to ? <Link to={to} className="admin-stat-link">{card}</Link> : card;
}
