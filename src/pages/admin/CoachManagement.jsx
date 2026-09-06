import React, { useMemo, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { useToast } from '../../context/ToastContext';
import { MOCK_COACHES } from '../../mocks/coaches';

const statusStyles = {
  Active: { background: '#dcfce7', color: '#15803d' },
  Trial: { background: '#e0f2fe', color: '#0369a1' },
  Suspended: { background: '#fee2e2', color: '#b91c1c' },
  'Payment Due': { background: '#fef3c7', color: '#b45309' },
};

export default function CoachManagement() {
  const { showToast } = useToast();
  const [coaches, setCoaches] = useState(MOCK_COACHES);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCoach, setNewCoach] = useState({
    name: '',
    email: '',
    phone: '',
    centre: '',
    city: '',
    currentPlan: 'Free',
  });

  const filteredCoaches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return coaches.filter((coach) => {
      const matchesSearch = !q ||
        coach.name.toLowerCase().includes(q) ||
        coach.email.toLowerCase().includes(q) ||
        coach.phone.toLowerCase().includes(q) ||
        coach.centre.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || coach.status === statusFilter;
      const matchesPlan = planFilter === 'All' || coach.currentPlan === planFilter;
      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [coaches, query, statusFilter, planFilter]);

  const totals = useMemo(() => ({
    total: coaches.length,
    active: coaches.filter((coach) => coach.status === 'Active').length,
    trial: coaches.filter((coach) => coach.status === 'Trial').length,
    due: coaches.filter((coach) => coach.status === 'Payment Due').length,
    clients: coaches.reduce((sum, coach) => sum + coach.clients, 0),
  }), [coaches]);

  const updateCoachStatus = (coachId, status) => {
    setCoaches((current) => current.map((coach) => (
      coach.id === coachId ? { ...coach, status } : coach
    )));
    const coach = coaches.find((item) => item.id === coachId);
    showToast(`${coach?.name || 'Coach'} marked as ${status}.`, 'success');
  };

  const handleCreateCoach = (event) => {
    event.preventDefault();
    const created = {
      ...newCoach,
      id: `COACH-${Math.floor(200 + Math.random() * 700)}`,
      maskedEmail: newCoach.email.replace(/^(.{3}).*(@.*)$/, '$1***$2'),
      avatar: 'https://images.unsplash.com/photo-1573497019236-61f323342eb2?q=80&w=150&auto=format&fit=crop',
      status: 'Trial',
      clients: 0,
      reportsThisMonth: 0,
      lastActive: 'Not logged in yet',
      renewalDate: 'Trial pending',
    };

    setCoaches((current) => [created, ...current]);
    setNewCoach({ name: '', email: '', phone: '', centre: '', city: '', currentPlan: 'Free' });
    setShowCreateForm(false);
    showToast('Coach account created in demo state.', 'success');
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <AdminHeader
          title="Coach Management"
          subtitle="Create coach accounts, review activity, and control subscription access"
          actionLabel="Create Coach"
          onPrimaryAction={() => setShowCreateForm(true)}
        />

        <div className="admin-page-body">
          <div className="admin-stats-grid">
            <MetricCard label="Total Coaches" value={totals.total} tone="green" />
            <MetricCard label="Active Coaches" value={totals.active} tone="blue" />
            <MetricCard label="Trial Coaches" value={totals.trial} tone="amber" />
            <MetricCard label="Managed Clients" value={totals.clients} tone="purple" />
          </div>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Coach Directory</h3>
                <p>Search by coach, center, phone, email, plan, or account status.</p>
              </div>
              <div className="admin-filter-row">
                <input
                  className="admin-input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search coach or center"
                />
                <select className="admin-input" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option>All</option>
                  <option>Active</option>
                  <option>Trial</option>
                  <option>Payment Due</option>
                  <option>Suspended</option>
                </select>
                <select className="admin-input" value={planFilter} onChange={(event) => setPlanFilter(event.target.value)}>
                  <option>All</option>
                  <option>Free</option>
                  <option>Professional</option>
                  <option>Elite</option>
                </select>
              </div>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Coach</th>
                    <th>Center</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Clients</th>
                    <th>Reports</th>
                    <th>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoaches.map((coach) => (
                    <tr key={coach.id}>
                      <td>
                        <div className="admin-person">
                          <img src={coach.avatar} alt={coach.name} />
                          <div>
                            <strong>{coach.name}</strong>
                            <span>{coach.email}</span>
                            <span>{coach.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>{coach.centre}</strong>
                        <span className="admin-muted">{coach.city}</span>
                      </td>
                      <td>
                        <span className="admin-pill">{coach.currentPlan}</span>
                        <span className="admin-muted">Renewal: {coach.renewalDate}</span>
                      </td>
                      <td>
                        <span className="admin-status" style={statusStyles[coach.status] || statusStyles.Active}>
                          {coach.status}
                        </span>
                      </td>
                      <td>{coach.clients}</td>
                      <td>{coach.reportsThisMonth}</td>
                      <td>{coach.lastActive}</td>
                      <td>
                        <div className="admin-actions">
                          <button type="button" onClick={() => setSelectedCoach(coach)}>View</button>
                          <button type="button" onClick={() => updateCoachStatus(coach.id, 'Active')}>Activate</button>
                          <button type="button" className="danger" onClick={() => updateCoachStatus(coach.id, 'Suspended')}>Suspend</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '640px' }}>
            <h3>Create Coach Account</h3>
            <p className="admin-muted">Frontend demo form for the future backend create-coach workflow.</p>
            <form className="admin-form-grid" onSubmit={handleCreateCoach}>
              <input className="admin-input" required placeholder="Coach name" value={newCoach.name} onChange={(event) => setNewCoach({ ...newCoach, name: event.target.value })} />
              <input className="admin-input" required type="email" placeholder="Email address" value={newCoach.email} onChange={(event) => setNewCoach({ ...newCoach, email: event.target.value })} />
              <input className="admin-input" required placeholder="Phone number" value={newCoach.phone} onChange={(event) => setNewCoach({ ...newCoach, phone: event.target.value })} />
              <input className="admin-input" required placeholder="Wellness center" value={newCoach.centre} onChange={(event) => setNewCoach({ ...newCoach, centre: event.target.value })} />
              <input className="admin-input" required placeholder="City" value={newCoach.city} onChange={(event) => setNewCoach({ ...newCoach, city: event.target.value })} />
              <select className="admin-input" value={newCoach.currentPlan} onChange={(event) => setNewCoach({ ...newCoach, currentPlan: event.target.value })}>
                <option>Free</option>
                <option>Professional</option>
                <option>Elite</option>
              </select>
              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowCreateForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Coach</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedCoach && (
        <div className="modal-overlay" onClick={() => setSelectedCoach(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '560px' }}>
            <div className="admin-person" style={{ marginBottom: '18px' }}>
              <img src={selectedCoach.avatar} alt={selectedCoach.name} />
              <div>
                <h3 style={{ margin: 0 }}>{selectedCoach.name}</h3>
                <span>{selectedCoach.centre}</span>
              </div>
            </div>
            <div className="admin-detail-grid">
              <Detail label="Email" value={selectedCoach.email} />
              <Detail label="Phone" value={selectedCoach.phone} />
              <Detail label="Plan" value={selectedCoach.currentPlan} />
              <Detail label="Status" value={selectedCoach.status} />
              <Detail label="Clients" value={selectedCoach.clients} />
              <Detail label="Reports this month" value={selectedCoach.reportsThisMonth} />
              <Detail label="Renewal date" value={selectedCoach.renewalDate} />
              <Detail label="Last active" value={selectedCoach.lastActive} />
            </div>
            <div className="admin-modal-actions">
              <button type="button" className="btn btn-outline" onClick={() => setSelectedCoach(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
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
