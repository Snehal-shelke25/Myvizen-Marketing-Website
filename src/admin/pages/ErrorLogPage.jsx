import React, { useState } from 'react';
import * as adminApi from '../api/endpoints';
import { useAdminList } from '../hooks/useAdminList';
import AdminLayout from '../components/AdminLayout';
import Pagination from '../components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';

const formatWhen = (value) => (value
  ? new Date(value).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    })
  : '--');

export default function ErrorLogPage() {
  const [expanded, setExpanded] = useState(null);
  const list = useAdminList(adminApi.listErrors, {}, { pageSize: 50 });

  // The endpoint tells us whether database logging is switched on, so an empty
  // table can say WHY it is empty instead of implying nothing has failed.
  const [loggingOn, setLoggingOn] = useState(null);
  React.useEffect(() => {
    adminApi.listErrors({ pageSize: 1 })
      .then((d) => setLoggingOn(!!d.db_logging_enabled))
      .catch(() => setLoggingOn(null));
  }, []);

  return (
    <AdminLayout
      title="Error Log"
      subtitle="Server-side failures recorded by the API"
    >
      {loggingOn === false && (
        <div className="admin-callout" style={{ marginBottom: 20 }}>
          <strong>Database error logging is off.</strong> Errors are only printed
          to the server console, so this page will stay empty. To record them
          here, set <code>ERROR_LOG_TO_DB=1</code> in the server environment and
          restart the service.
        </div>
      )}

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3>Recent errors</h3>
            <p>Newest first. Click a row to see the payload and traceback.</p>
          </div>
          <div className="admin-filter-row">
            <input
              className="admin-input"
              value={list.query}
              onChange={(e) => list.setQuery(e.target.value)}
              placeholder="Search file, function or message"
            />
          </div>
        </div>

        {list.error && <ErrorState message={list.error} onRetry={list.reload} />}

        {list.loading ? (
          <LoadingState label="Loading errors..." avatar={false} rows={6} />
        ) : list.items.length === 0 ? (
          <EmptyState
            title={list.isFiltered ? 'No matching errors.' : 'No errors recorded.'}
            hint={loggingOn === false
              ? 'Database logging is disabled — see the note above.'
              : 'Nothing has failed since logging was enabled.'}
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Where</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {list.items.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                        style={{ cursor: 'pointer' }}>
                      <td>{formatWhen(row.created_at)}</td>
                      <td>
                        <strong>{row.function || '--'}</strong>
                        <span className="admin-muted">{row.file}</span>
                      </td>
                      <td>
                        <span className="admin-error-message">
                          {(row.error || '').split('\n')[0]}
                        </span>
                      </td>
                    </tr>
                    {expanded === row.id && (
                      <tr>
                        <td colSpan={3}>
                          <pre className="admin-pre">
{row.payload ? `Payload:\n${row.payload}\n\n` : ''}{row.error}
                          </pre>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!list.loading && list.items.length > 0 && (
          <Pagination page={list.page} totalPages={list.totalPages}
                      total={list.total} noun="errors" onChange={list.setPage} />
        )}
      </section>
    </AdminLayout>
  );
}
