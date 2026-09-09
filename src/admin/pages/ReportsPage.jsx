import React from 'react';
import * as adminApi from '../api/endpoints';
import { useAdminList } from '../hooks/useAdminList';
import AdminLayout from '../components/AdminLayout';
import Pagination from '../components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';

const formatDate = (v) => (v
  ? new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  : '--');

/**
 * Every wellness report on the platform.
 *
 * Reports are the product's actual output, so this is the honest answer to
 * "is MyVizen being used?" — more so than coach or guest counts, which only
 * measure sign-ups.
 *
 * Rows are deliberately summary-only: client name, weight and dates. An
 * administrator does not need to read someone's body composition to run the
 * platform, and that data belongs to the coach-guest relationship.
 */
export default function ReportsPage() {
  const list = useAdminList(adminApi.listReports);

  return (
    <AdminLayout
      title="Reports"
      subtitle="Wellness reports created by coaches across the platform"
    >
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3>All Reports</h3>
            <p>{list.total} report{list.total === 1 ? '' : 's'}, newest first.</p>
          </div>
          <div className="admin-filter-row">
            <input className="admin-input" value={list.query}
                   onChange={(e) => list.setQuery(e.target.value)}
                   placeholder="Search client name or village" />
          </div>
        </div>

        {list.error && <ErrorState message={list.error} onRetry={list.reload} />}

        {list.loading ? (
          <LoadingState label="Loading reports..." avatar={false} />
        ) : list.items.length === 0 ? (
          <EmptyState
            title={list.isFiltered ? 'No reports match this search.' : 'No reports yet.'}
            hint={list.isFiltered
              ? 'Try a different client name.'
              : 'Reports appear here as coaches create them in the app.'}
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Coach</th>
                  <th>Weight</th>
                  <th>Report date</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {list.items.map((r) => (
                  <tr key={`${r.source}-${r.id}`}>
                    <td>
                      <strong>{r.client_name || `Client #${r.client_id ?? '--'}`}</strong>
                      {r.village && <span className="admin-muted">{r.village}</span>}
                    </td>
                    <td>{r.coach_name || <span className="admin-muted">--</span>}</td>
                    <td>{r.weight != null ? `${r.weight} kg` : '--'}</td>
                    <td>{formatDate(r.report_date)}</td>
                    <td>
                      {formatDate(r.created_at)}
                      {r.source === 'legacy' && (
                        <span className="admin-muted">older format</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!list.loading && list.items.length > 0 && (
          <Pagination page={list.page} totalPages={list.totalPages}
                      total={list.total} noun="reports" onChange={list.setPage} />
        )}
      </section>
    </AdminLayout>
  );
}
