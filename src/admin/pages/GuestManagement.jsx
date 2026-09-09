import React from 'react';
import * as adminApi from '../api/endpoints';
import { useAdminList } from '../hooks/useAdminList';
import AdminLayout from '../components/AdminLayout';
import Avatar from '../components/Avatar';
import Pagination from '../components/Pagination';
import { EmptyState, ErrorState, LoadingState } from '../components/StateBlock';

/**
 * Guest directory — read-only on purpose.
 *
 * An administrator needs to answer "which coach owns this guest, and how do I
 * reach them". Weight, BMI and body measurements belong to the coach-guest
 * relationship and are deliberately not shown here.
 */
export default function GuestManagement() {
  const list = useAdminList(adminApi.listGuests);

  return (
    <AdminLayout
      title="Guest Directory"
      subtitle="Find a guest and see which coach they belong to"
    >
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3>All Guests</h3>
            <p>{list.total} guest{list.total === 1 ? '' : 's'} across every coach.</p>
          </div>
          <div className="admin-filter-row">
            <input
              className="admin-input"
              value={list.query}
              onChange={(event) => list.setQuery(event.target.value)}
              placeholder="Search name, phone or email"
            />
          </div>
        </div>

        {list.error && <ErrorState message={list.error} onRetry={list.reload} />}

        {list.loading ? (
          <LoadingState label="Loading guests..." />
        ) : list.items.length === 0 ? (
          <EmptyState
            title={list.isFiltered ? 'No guests match this search.' : 'No guests registered yet.'}
            hint={list.isFiltered
              ? 'Try a name, phone number or email.'
              : 'Guests appear here once a coach adds them in the app.'}
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Coach</th>
                </tr>
              </thead>
              <tbody>
                {list.items.map((guest) => (
                  <tr key={guest.id}>
                    <td>
                      <div className="admin-person">
                        <Avatar src={guest.photo} name={guest.name} />
                        <div>
                          <strong>{guest.name || 'Unnamed guest'}</strong>
                          <span className="admin-muted">ID #{guest.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>{guest.phone || '--'}</td>
                    <td>{guest.email || '--'}</td>
                    <td>
                      {guest.coach_name
                        ? <strong>{guest.coach_name}</strong>
                        : <span className="admin-muted">Unassigned</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!list.loading && list.items.length > 0 && (
          <Pagination page={list.page} totalPages={list.totalPages}
                      total={list.total} noun="guests" onChange={list.setPage} />
        )}
      </section>
    </AdminLayout>
  );
}
