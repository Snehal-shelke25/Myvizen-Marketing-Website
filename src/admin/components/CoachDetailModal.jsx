import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Avatar from './Avatar';
import * as adminApi from '../api/endpoints';
import { EmptyState, LoadingState } from './StateBlock';

const PLAN_LABELS = { free: 'Free', professional: 'Professional', elite: 'Elite' };

const formatDate = (v) => (v
  ? new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  : '--');

function Detail({ label, value }) {
  return (
    <div className="admin-detail-item">
      <span>{label}</span>
      <strong>{value ?? '--'}</strong>
    </div>
  );
}

/**
 * One coach, with their guests and reports.
 *
 * The counts were visible before but nothing could be opened, so "24 guests"
 * was a number you had to take on trust. Each tab loads only when it is first
 * opened — a coach with 200 guests should not slow down viewing their profile.
 */
export default function CoachDetailModal({ coach, onClose }) {
  const [tab, setTab] = useState('overview');
  const [guests, setGuests] = useState(null);
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tab === 'guests' && guests === null) load('guests');
    if (tab === 'reports' && reports === null) load('reports');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const load = async (which) => {
    setLoading(true);
    setError('');
    try {
      if (which === 'guests') {
        const data = await adminApi.listGuests({ coachId: coach.id, pageSize: 100 });
        setGuests(data.items || []);
      } else {
        const data = await adminApi.listReports({ coachId: coach.id, pageSize: 100 });
        setReports(data.items || []);
      }
    } catch (err) {
      setError(err.message || 'Could not load this list.');
    } finally {
      setLoading(false);
    }
  };

  const TABS = [
    { key: 'overview', label: 'Overview' },
    { key: 'guests', label: `Guests${coach.guest_count != null ? ` (${coach.guest_count})` : ''}` },
    { key: 'reports', label: 'Reports' },
    { key: 'plan', label: 'Plan history' },
  ];

  return (
    <Modal title={coach.name} onClose={onClose} maxWidth="760px">
      <div className="admin-person" style={{ marginBottom: 16 }}>
        <Avatar src={coach.photo} name={coach.name} size={48} />
        <div>
          <strong>{coach.email}</strong>
          <span className="admin-muted">
            {coach.centre || 'No wellness centre set'}
            {coach.phone ? ` · ${coach.phone}` : ''}
          </span>
        </div>
      </div>

      <div className="admin-tabs" style={{ marginBottom: 16 }}>
        {TABS.map((t) => (
          <button key={t.key} type="button"
                  className={`admin-tab ${tab === t.key ? 'active' : ''}`}
                  onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {error && <div className="admin-error-alert" role="alert">{error}</div>}

      {tab === 'overview' && (
        <div className="admin-detail-grid">
          <Detail label="Plan" value={PLAN_LABELS[coach.plan_code] || 'None'} />
          <Detail label="Plan status" value={coach.plan_status} />
          <Detail label="Plan ends" value={formatDate(coach.plan_ends_at)} />
          <Detail label="Days remaining" value={coach.days_remaining} />
          <Detail label="Guests" value={coach.guest_count} />
          <Detail label="Experience" value={coach.experience} />
          <Detail label="Account" value={coach.status === 'suspended' ? 'Suspended' : 'Active'} />
          <Detail label="Joined" value={formatDate(coach.joined_at)} />
          <Detail label="Email verified" value={coach.email_verified ? 'Yes' : 'No'} />
          <Detail label="Phone verified" value={coach.phone_verified ? 'Yes' : 'No'} />
          <Detail label="Address" value={coach.address} />
          <Detail label="Zoom link" value={coach.zoom_link} />
        </div>
      )}

      {tab === 'guests' && (
        loading ? <LoadingState label="Loading guests..." rows={4} />
        : !guests?.length ? <EmptyState title="This coach has no guests yet."
                                        hint="Guests appear once the coach adds them in the app." />
        : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Guest</th><th>Phone</th><th>Email</th></tr></thead>
              <tbody>
                {guests.map((g) => (
                  <tr key={g.id}>
                    <td>
                      <div className="admin-person">
                        <Avatar src={g.photo} name={g.name} size={32} />
                        <div>
                          <strong>{g.name || 'Unnamed guest'}</strong>
                          <span className="admin-muted">ID #{g.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>{g.phone || '--'}</td>
                    <td>{g.email || '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {tab === 'reports' && (
        loading ? <LoadingState label="Loading reports..." rows={4} avatar={false} />
        : !reports?.length ? <EmptyState title="This coach has not created any reports."
                                         hint="This is the clearest sign an account is signed up but not being used." />
        : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Client</th><th>Weight</th><th>Report date</th><th>Created</th></tr></thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={`${r.source}-${r.id}`}>
                    <td>
                      <strong>{r.client_name || `Client #${r.client_id ?? '--'}`}</strong>
                      {r.village && <span className="admin-muted">{r.village}</span>}
                    </td>
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
        )
      )}

      {tab === 'plan' && (
        !coach.subscription_history?.length
          ? <EmptyState title="No plan history yet." />
          : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Plan</th><th>Source</th><th>Status</th><th>Start</th><th>End</th></tr></thead>
                <tbody>
                  {coach.subscription_history.map((row, i) => (
                    <tr key={row.id || i}>
                      <td>{PLAN_LABELS[row.plan_code] || row.plan_code}</td>
                      <td>{row.source}</td>
                      <td>{row.status}</td>
                      <td>{formatDate(row.start_date)}</td>
                      <td>{formatDate(row.end_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      )}

      <div className="admin-modal-actions">
        <button type="button" className="btn btn-outline" onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}
