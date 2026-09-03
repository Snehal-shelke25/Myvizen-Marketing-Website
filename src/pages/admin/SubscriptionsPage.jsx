import React, { useState, useMemo } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { useToast } from '../../context/ToastContext';
import { MOCK_PLANS, calculatePlanAmount } from '../../mocks/plans';
import { INITIAL_SUBSCRIPTIONS, calculateEndDate } from '../../mocks/subscriptions';
import { MOCK_COACHES } from '../../mocks/coaches';
import { initialGuests } from '../../data/guestsData';

export default function SubscriptionsPage() {
  const { showToast } = useToast();

  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [currentCenterPlan, setCurrentCenterPlan] = useState('free');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [durationFilter, setDurationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Active Modals State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewDrawer, setShowViewDrawer] = useState(false);

  const [selectedSub, setSelectedSub] = useState(null);

  // Combine Coaches & Guests for User Selection
  const allUsers = useMemo(() => [
    ...MOCK_COACHES.map(c => ({ id: c.id, name: c.name, email: c.email, type: 'Coach' })),
    ...initialGuests.map(g => ({ id: g.id, name: g.name, email: g.email || `${g.name.toLowerCase().replace(/\s+/g,'')}@example.com`, type: 'Client' }))
  ], []);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    userId: allUsers[0]?.id || '',
    plan: 'Professional',
    duration: '3 Months',
    durationMonths: 3,
    startDate: new Date().toISOString().split('T')[0],
    endDate: calculateEndDate(new Date().toISOString().split('T')[0], 3),
    status: 'Active',
    source: 'Paid',
    amount: 1497,
    notes: '',
  });

  // Change Plan State
  const [changePlanNewPlan, setChangePlanNewPlan] = useState('Elite');

  // ── FILTERING & SORTING LOGIC ──
  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        sub.userName.toLowerCase().includes(q) ||
        sub.userEmail.toLowerCase().includes(q) ||
        sub.id.toLowerCase().includes(q);

      const matchesPlan = planFilter === 'All' || sub.plan === planFilter;
      const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
      const matchesSource = sourceFilter === 'All' || sub.source === sourceFilter;
      const matchesDuration = durationFilter === 'All' || sub.duration === durationFilter;

      return matchesSearch && matchesPlan && matchesStatus && matchesSource && matchesDuration;
    }).sort((a, b) => {
      if (sortBy === 'Newest') return new Date(b.startDate) - new Date(a.startDate);
      if (sortBy === 'Oldest') return new Date(a.startDate) - new Date(b.startDate);
      if (sortBy === 'End Date') return new Date(a.endDate) - new Date(b.endDate);
      if (sortBy === 'Amount') return b.amount - a.amount;
      return 0;
    });
  }, [subscriptions, searchQuery, planFilter, statusFilter, sourceFilter, durationFilter, sortBy]);

  // ── HANDLERS ──

  // 1. Add Subscription
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const user = allUsers.find(u => u.id === formData.userId) || allUsers[0];
    const newSub = {
      id: `SUB-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userType: user.type,
      plan: formData.plan,
      duration: formData.duration,
      durationMonths: formData.durationMonths,
      amount: Number(formData.amount),
      startDate: formData.startDate,
      endDate: formData.endDate || calculateEndDate(formData.startDate, formData.durationMonths),
      status: formData.status,
      source: formData.source,
      notes: formData.notes || 'Created via admin console',
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    setSubscriptions([newSub, ...subscriptions]);
    setShowAddModal(false);
    showToast('Subscription created successfully.', 'success');
  };

  // 2. Edit Subscription
  const handleOpenEdit = (sub) => {
    setSelectedSub(sub);
    setFormData({
      userId: sub.userId,
      plan: sub.plan,
      duration: sub.duration,
      durationMonths: sub.durationMonths || 3,
      startDate: sub.startDate,
      endDate: sub.endDate,
      status: sub.status,
      source: sub.source,
      amount: sub.amount,
      notes: sub.notes || '',
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedSub) return;
    const user = allUsers.find(u => u.id === formData.userId) || { name: selectedSub.userName, email: selectedSub.userEmail };

    const updated = subscriptions.map(sub => {
      if (sub.id === selectedSub.id) {
        return {
          ...sub,
          userName: user.name,
          userEmail: user.email,
          plan: formData.plan,
          duration: formData.duration,
          durationMonths: formData.durationMonths,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: formData.status,
          source: formData.source,
          amount: Number(formData.amount),
          notes: formData.notes,
          updatedAt: new Date().toLocaleString(),
        };
      }
      return sub;
    });

    setSubscriptions(updated);
    setShowEditModal(false);
    showToast('Subscription updated successfully.', 'success');
  };

  // 3. Assign Subscription
  const handleOpenAssign = (sub = null) => {
    const defaultUser = allUsers[0];
    setSelectedSub(sub);
    setFormData({
      userId: sub ? sub.userId : defaultUser.id,
      plan: sub ? sub.plan : 'Professional',
      duration: '3 Months',
      durationMonths: 3,
      startDate: new Date().toISOString().split('T')[0],
      endDate: calculateEndDate(new Date().toISOString().split('T')[0], 3),
      status: 'Active',
      source: 'Manual',
      amount: 1497,
      notes: 'Assigned by Admin',
    });
    setShowAssignModal(true);
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    const user = allUsers.find(u => u.id === formData.userId) || allUsers[0];
    const newSub = {
      id: `SUB-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userType: user.type,
      plan: formData.plan,
      duration: formData.duration,
      durationMonths: formData.durationMonths,
      amount: calculatePlanAmount(formData.plan.toLowerCase(), formData.durationMonths),
      startDate: formData.startDate,
      endDate: calculateEndDate(formData.startDate, formData.durationMonths),
      status: 'Active',
      source: 'Manual',
      notes: formData.notes || `Assigned ${formData.plan} plan`,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    setSubscriptions([newSub, ...subscriptions]);
    setShowAssignModal(false);
    showToast('Subscription assigned successfully.', 'success');
  };

  // 4. Delete Subscription
  const handleOpenDelete = (sub) => {
    setSelectedSub(sub);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedSub) return;
    setSubscriptions(subscriptions.filter(s => s.id !== selectedSub.id));
    setShowDeleteModal(false);
    setShowViewDrawer(false);
    showToast('Subscription deleted successfully.', 'success');
  };

  // 5. Change Plan
  const handleOpenChangePlan = (sub) => {
    setSelectedSub(sub);
    setChangePlanNewPlan(sub.plan === 'Professional' ? 'Elite' : 'Professional');
    setShowChangePlanModal(true);
  };

  const handleChangePlanSubmit = (e) => {
    e.preventDefault();
    if (!selectedSub) return;
    const newEndDate = calculateEndDate(selectedSub.startDate, selectedSub.durationMonths || 3);

    const updated = subscriptions.map(s => {
      if (s.id === selectedSub.id) {
        return {
          ...s,
          plan: changePlanNewPlan,
          amount: calculatePlanAmount(changePlanNewPlan.toLowerCase(), s.durationMonths || 3),
          endDate: newEndDate,
          updatedAt: new Date().toLocaleString(),
        };
      }
      return s;
    });

    setSubscriptions(updated);
    setShowChangePlanModal(false);
    setShowViewDrawer(false);
    showToast('Plan changed successfully.', 'success');
  };

  // Helper for Duration Change in Forms
  const handleDurationChange = (months) => {
    const durationText = `${months} Month${months > 1 ? 's' : ''}`;
    const planId = formData.plan.toLowerCase();
    const calculatedAmount = calculatePlanAmount(planId, months);
    const newEnd = calculateEndDate(formData.startDate, months);

    setFormData(prev => ({
      ...prev,
      durationMonths: months,
      duration: durationText,
      amount: calculatedAmount,
      endDate: newEnd,
    }));
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <AdminHeader
          title="Subscriptions & Plan Management"
          subtitle="Manage center tier pricing, client assignments, renewals, and manual activations"
        />

        <div className="admin-page-body">

          {/* ── TOP ACTION BAR & TITLE ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#09381e', margin: '0 0 4px 0' }}>
                💳 Subscription Plans & Accounts
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                {subscriptions.length} total subscriptions registered • {subscriptions.filter(s => s.status === 'Active').length} active
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => handleOpenAssign()}
                className="btn btn-outline"
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                👤 Assign Subscription
              </button>
              <button
                onClick={() => {
                  setFormData({
                    userId: allUsers[0]?.id || '',
                    plan: 'Professional',
                    duration: '3 Months',
                    durationMonths: 3,
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: calculateEndDate(new Date().toISOString().split('T')[0], 3),
                    status: 'Active',
                    source: 'Paid',
                    amount: 1497,
                    notes: '',
                  });
                  setShowAddModal(true);
                }}
                className="btn btn-primary"
                style={{ padding: '10px 22px', fontSize: '0.88rem' }}
              >
                + Add Subscription
              </button>
            </div>
          </div>

          {/* ── PLAN CARDS DISPLAY (REFINED POLISHED DESIGN) ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}>
            {MOCK_PLANS.map(plan => {
              const isSelected = currentCenterPlan === plan.id;
              const isPopular = plan.popular;
              const isElite = plan.id === 'elite';

              return (
                <div
                  key={plan.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    border: isPopular
                      ? '2.5px solid #22c55e'
                      : isElite
                      ? '1.5px solid #f97316'
                      : '1px solid #e2e8f0',
                    padding: '32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isPopular
                      ? '0 12px 30px rgba(34,197,94,0.14)'
                      : '0 4px 16px rgba(15,23,42,0.03)',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div>
                    {/* Badge */}
                    {plan.badge && (
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          padding: '5px 12px',
                          borderRadius: '100px',
                          background: isPopular ? '#22c55e' : isElite ? '#ffedd5' : '#dcfce7',
                          color: isPopular ? '#ffffff' : isElite ? '#c2410c' : '#15803d',
                        }}>
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 20px 0', minHeight: '38px', lineHeight: 1.4 }}>
                      {plan.subtitle}
                    </p>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '800', color: isElite ? '#ea580c' : '#09381e' }}>
                        {plan.id === 'free' ? '₹0' : `₹${plan.monthlyPrice}`}
                      </span>
                      <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: '600' }}>/mo</span>
                    </div>

                    {/* Features list short preview */}
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {plan.features.slice(0, 4).map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: f.included ? '#334155' : '#94a3b8' }}>
                          <span>{f.included ? '✓' : '🔒'}</span>
                          <span>{f.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentCenterPlan(plan.id)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '12px',
                      border: 'none',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '800',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      background: isSelected
                        ? '#f0fdf4'
                        : isElite
                        ? 'linear-gradient(135deg, #d97706, #c2410c)'
                        : isPopular
                        ? '#22c55e'
                        : '#e2e8f0',
                      color: isSelected ? '#15803d' : isElite || isPopular ? '#ffffff' : '#334155',
                    }}
                  >
                    {isSelected ? '✓ Current Active Tier' : 'Select Tier'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ── SEARCH & MULTI-FILTER BAR ── */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
            border: '1px solid #f1f5f9',
            marginBottom: '28px',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', alignItems: 'center' }}>

              {/* Search */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Search Subscription
                </label>
                <input
                  type="text"
                  placeholder="Search by Coach, Client name, Email, or Sub ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Filter: Plan */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Filter Plan
                </label>
                <select
                  value={planFilter}
                  onChange={e => setPlanFilter(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                >
                  <option value="All">All Plans</option>
                  <option value="Free">Free</option>
                  <option value="Professional">Professional</option>
                  <option value="Elite">Elite</option>
                </select>
              </div>

              {/* Filter: Status */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Filter Status
                </label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Trial">Trial</option>
                  <option value="Expiring">Expiring</option>
                  <option value="Expired">Expired</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Filter: Source */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Source
                </label>
                <select
                  value={sourceFilter}
                  onChange={e => setSourceFilter(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                >
                  <option value="All">All Sources</option>
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
                  <option value="Manual">Manual</option>
                  <option value="Trial">Trial</option>
                </select>
              </div>

              {/* Filter: Duration */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Duration
                </label>
                <select
                  value={durationFilter}
                  onChange={e => setDurationFilter(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                >
                  <option value="All">All Durations</option>
                  <option value="1 Month">1 Month</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                >
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                  <option value="End Date">End Date</option>
                  <option value="Amount">Amount (High to Low)</option>
                </select>
              </div>

            </div>
          </div>

          {/* ── SUBSCRIPTIONS MANAGEMENT TABLE ── */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
            border: '1px solid #f1f5f9',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f1f5f9', background: '#f8fafc' }}>
                    <th style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>User</th>
                    <th style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Plan</th>
                    <th style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Duration</th>
                    <th style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Amount</th>
                    <th style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Start Date</th>
                    <th style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>End Date</th>
                    <th style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Status</th>
                    <th style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Source</th>
                    <th style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                        No subscriptions matched your search or filters.
                      </td>
                    </tr>
                  ) : (
                    filteredSubscriptions.map(sub => {
                      const isExpired = sub.status === 'Expired';
                      const isExpiring = sub.status === 'Expiring';

                      return (
                        <tr key={sub.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>

                          {/* User */}
                          <td style={{ padding: '14px 16px' }}>
                            <div>
                              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', display: 'block' }}>
                                {sub.userName}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                {sub.userEmail} • <span style={{ color: '#15803d', fontWeight: '700' }}>{sub.userType}</span>
                              </span>
                            </div>
                          </td>

                          {/* Plan */}
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              borderRadius: '100px',
                              fontSize: '0.75rem',
                              fontWeight: '800',
                              background: sub.plan === 'Elite' ? '#ffedd5' : sub.plan === 'Professional' ? '#dcfce7' : '#f1f5f9',
                              color: sub.plan === 'Elite' ? '#c2410c' : sub.plan === 'Professional' ? '#15803d' : '#475569',
                            }}>
                              {sub.plan}
                            </span>
                          </td>

                          {/* Duration */}
                          <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#475569', fontWeight: '600' }}>
                            {sub.duration}
                          </td>

                          {/* Amount */}
                          <td style={{ padding: '14px 16px', fontSize: '0.9rem', fontWeight: '800', color: '#09381e' }}>
                            {sub.amount === 0 ? 'Free' : `₹${sub.amount.toLocaleString()}`}
                          </td>

                          {/* Start Date */}
                          <td style={{ padding: '14px 16px', fontSize: '0.82rem', color: '#64748b' }}>
                            {sub.startDate}
                          </td>

                          {/* End Date */}
                          <td style={{ padding: '14px 16px', fontSize: '0.82rem', color: isExpiring ? '#d97706' : '#64748b', fontWeight: isExpiring ? '700' : 'normal' }}>
                            {sub.endDate}
                          </td>

                          {/* Status */}
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '4px 10px',
                              borderRadius: '100px',
                              fontSize: '0.72rem',
                              fontWeight: '800',
                              background: isExpired ? '#fef2f2' : isExpiring ? '#fff7ed' : '#dcfce7',
                              color: isExpired ? '#dc2626' : isExpiring ? '#c2410c' : '#15803d',
                            }}>
                              {isExpired ? '🔴 Expired' : isExpiring ? '🟠 Expiring' : '🟢 Active'}
                            </span>
                          </td>

                          {/* Source */}
                          <td style={{ padding: '14px 16px', fontSize: '0.82rem', color: '#475569', fontWeight: '600' }}>
                            {sub.source}
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              {/* View */}
                              <button
                                onClick={() => { setSelectedSub(sub); setShowViewDrawer(true); }}
                                title="View Details"
                                style={{ background: '#f1f5f9', border: 'none', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#334155', fontWeight: '700' }}
                              >
                                👁️ View
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => handleOpenEdit(sub)}
                                title="Edit Subscription"
                                style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#15803d', fontWeight: '700' }}
                              >
                                ✏️ Edit
                              </button>

                              {/* Change Plan */}
                              <button
                                onClick={() => handleOpenChangePlan(sub)}
                                title="Change Plan"
                                style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#1d4ed8', fontWeight: '700' }}
                              >
                                🔄 Change
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleOpenDelete(sub)}
                                title="Delete Subscription"
                                style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', color: '#dc2626', fontWeight: '700' }}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── MODAL 1: ADD SUBSCRIPTION ── */}
          {showAddModal && (
            <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
              <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '800', color: '#09381e', margin: 0 }}>
                    + Add New Subscription
                  </h3>
                  <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
                </div>

                <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  {/* Select User */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                      Select Coach / Client *
                    </label>
                    <select
                      value={formData.userId}
                      onChange={e => setFormData({ ...formData, userId: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                    >
                      {allUsers.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.type}) — {u.email}</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Plan & Duration */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                        Select Plan *
                      </label>
                      <select
                        value={formData.plan}
                        onChange={e => {
                          const p = e.target.value;
                          const calculatedAmount = calculatePlanAmount(p.toLowerCase(), formData.durationMonths);
                          setFormData({ ...formData, plan: p, amount: calculatedAmount });
                        }}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                      >
                        <option value="Free">Free</option>
                        <option value="Professional">Professional</option>
                        <option value="Elite">Elite</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                        Duration *
                      </label>
                      <select
                        value={formData.durationMonths}
                        onChange={e => handleDurationChange(Number(e.target.value))}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                      >
                        <option value={1}>1 Month</option>
                        <option value={3}>3 Months</option>
                        <option value={6}>6 Months</option>
                        <option value={12}>12 Months</option>
                      </select>
                    </div>
                  </div>

                  {/* Start Date & End Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={e => {
                          const start = e.target.value;
                          const end = calculateEndDate(start, formData.durationMonths);
                          setFormData({ ...formData, startDate: start, endDate: end });
                        }}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Status & Payment Source */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                      >
                        <option value="Active">Active</option>
                        <option value="Trial">Trial</option>
                        <option value="Expiring">Expiring</option>
                        <option value="Expired">Expired</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                        Payment Source
                      </label>
                      <select
                        value={formData.source}
                        onChange={e => setFormData({ ...formData, source: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                      >
                        <option value="Free">Free</option>
                        <option value="Paid">Paid</option>
                        <option value="Manual">Manual</option>
                        <option value="Trial">Trial</option>
                      </select>
                    </div>
                  </div>

                  {/* Amount & Notes */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                        Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                        Notes / Remarks
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Created via admin console"
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline" style={{ flex: 1 }}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                      Create Subscription
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── MODAL 2: EDIT SUBSCRIPTION ── */}
          {showEditModal && selectedSub && (
            <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
              <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '800', color: '#09381e', margin: 0 }}>
                    ✏️ Edit Subscription ({selectedSub.id})
                  </h3>
                  <button onClick={() => setShowEditModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
                </div>

                <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                      Coach / Client
                    </label>
                    <input
                      type="text"
                      disabled
                      value={`${selectedSub.userName} (${selectedSub.userEmail})`}
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', background: '#f8fafc' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>Plan</label>
                      <select
                        value={formData.plan}
                        onChange={e => setFormData({ ...formData, plan: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      >
                        <option value="Free">Free</option>
                        <option value="Professional">Professional</option>
                        <option value="Elite">Elite</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>Status</label>
                      <select
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      >
                        <option value="Active">Active</option>
                        <option value="Trial">Trial</option>
                        <option value="Expiring">Expiring</option>
                        <option value="Expired">Expired</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>Amount (₹)</label>
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>Notes</label>
                      <input
                        type="text"
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── MODAL 3: ASSIGN SUBSCRIPTION (WITH LIVE SUMMARY PREVIEW) ── */}
          {showAssignModal && (
            <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
              <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '800', color: '#09381e', margin: 0 }}>
                    👤 Assign Subscription to User
                  </h3>
                  <button onClick={() => setShowAssignModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
                </div>

                <form onSubmit={handleAssignSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Select User */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                      Select User (Coach / Client)
                    </label>
                    <select
                      value={formData.userId}
                      onChange={e => setFormData({ ...formData, userId: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                    >
                      {allUsers.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.type}) — {u.email}</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Plan & Duration */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>Select Plan</label>
                      <select
                        value={formData.plan}
                        onChange={e => {
                          const p = e.target.value;
                          const calculatedAmount = calculatePlanAmount(p.toLowerCase(), formData.durationMonths);
                          setFormData({ ...formData, plan: p, amount: calculatedAmount });
                        }}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      >
                        <option value="Free">Free</option>
                        <option value="Professional">Professional</option>
                        <option value="Elite">Elite</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>Select Duration</label>
                      <select
                        value={formData.durationMonths}
                        onChange={e => handleDurationChange(Number(e.target.value))}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      >
                        <option value={1}>1 Month</option>
                        <option value={3}>3 Months</option>
                        <option value={6}>6 Months</option>
                        <option value={12}>12 Months</option>
                      </select>
                    </div>
                  </div>

                  {/* Start & End Dates */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={e => {
                          const start = e.target.value;
                          const end = calculateEndDate(start, formData.durationMonths);
                          setFormData({ ...formData, startDate: start, endDate: end });
                        }}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>End Date</label>
                      <input
                        type="date"
                        disabled
                        value={formData.endDate}
                        style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', background: '#f8fafc' }}
                      />
                    </div>
                  </div>

                  {/* ── LIVE SUMMARY BOX (Exact Prompt Spec) ── */}
                  <div style={{
                    background: '#f0fdf4',
                    border: '1.5px solid #86efac',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    color: '#166534',
                    lineHeight: 1.6,
                  }}>
                    <div>--------------------------------</div>
                    <div>User: <strong>{allUsers.find(u => u.id === formData.userId)?.name || 'Pankaj Narwade'}</strong></div>
                    <div>Plan: <strong>{formData.plan}</strong></div>
                    <div>Duration: <strong>{formData.durationMonths} Months</strong></div>
                    <div>Amount: <strong>₹{calculatePlanAmount(formData.plan.toLowerCase(), formData.durationMonths).toLocaleString()}</strong></div>
                    <div>Start: <strong>{formData.startDate}</strong></div>
                    <div>End: <strong>{formData.endDate}</strong></div>
                    <div>--------------------------------</div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <button type="button" onClick={() => setShowAssignModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Assign Subscription</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── MODAL 4: CHANGE PLAN PREVIEW ── */}
          {showChangePlanModal && selectedSub && (
            <div className="modal-overlay" onClick={() => setShowChangePlanModal(false)}>
              <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: '#09381e', margin: 0 }}>
                    🔄 Change Plan Preview
                  </h3>
                  <button onClick={() => setShowChangePlanModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
                </div>

                <form onSubmit={handleChangePlanSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                      Select New Plan
                    </label>
                    <select
                      value={changePlanNewPlan}
                      onChange={e => setChangePlanNewPlan(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem' }}
                    >
                      <option value="Free">Free</option>
                      <option value="Professional">Professional</option>
                      <option value="Elite">Elite</option>
                    </select>
                  </div>

                  {/* Plan Change Comparison Preview Box */}
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '16px', fontSize: '0.85rem' }}>
                    <div style={{ marginBottom: '10px', borderBottom: '1px solid #dbeafe', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748b', display: 'block' }}>Current Plan:</span>
                      <strong style={{ color: '#1e40af', fontSize: '0.95rem' }}>{selectedSub.plan}</strong>
                      <span style={{ color: '#64748b', fontSize: '0.78rem', display: 'block' }}>Current End Date: {selectedSub.endDate}</span>
                    </div>

                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>New Plan:</span>
                      <strong style={{ color: '#15803d', fontSize: '0.95rem' }}>{changePlanNewPlan}</strong>
                      <span style={{ color: '#15803d', fontSize: '0.78rem', fontWeight: '700', display: 'block' }}>
                        New End Date: {calculateEndDate(selectedSub.startDate, selectedSub.durationMonths || 3)}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                    <button type="button" onClick={() => setShowChangePlanModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm Change Plan</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── MODAL 5: DELETE CONFIRMATION (DANGER STYLE) ── */}
          {showDeleteModal && selectedSub && (
            <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
              <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', fontSize: '1.8rem' }}>
                    🗑️
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '800', color: '#991b1b', margin: '0 0 8px 0' }}>
                    Delete Subscription?
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                    Are you sure you want to delete subscription <strong>{selectedSub.id}</strong> for <strong>{selectedSub.userName}</strong>? This action cannot be undone.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setShowDeleteModal(false)} className="btn btn-outline" style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: '#dc2626',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Delete Subscription
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── MODAL 6: VIEW DETAILS DRAWER / MODAL ── */}
          {showViewDrawer && selectedSub && (
            <div className="modal-overlay" onClick={() => setShowViewDrawer(false)}>
              <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: '#09381e', margin: 0 }}>
                    📄 Subscription Details ({selectedSub.id})
                  </h3>
                  <button onClick={() => setShowViewDrawer(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>User Name:</span>
                    <strong style={{ color: '#0f172a' }}>{selectedSub.userName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>User Email:</span>
                    <strong style={{ color: '#0f172a' }}>{selectedSub.userEmail}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Plan Tier:</span>
                    <strong style={{ color: '#15803d' }}>{selectedSub.plan}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Duration:</span>
                    <strong style={{ color: '#0f172a' }}>{selectedSub.duration}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Amount:</span>
                    <strong style={{ color: '#16a34a' }}>₹{selectedSub.amount.toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Start Date:</span>
                    <strong style={{ color: '#0f172a' }}>{selectedSub.startDate}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>End Date:</span>
                    <strong style={{ color: '#0f172a' }}>{selectedSub.endDate}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Status:</span>
                    <strong style={{ color: '#15803d' }}>{selectedSub.status}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Payment Source:</span>
                    <strong style={{ color: '#0f172a' }}>{selectedSub.source}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ color: '#64748b' }}>Last Updated:</span>
                    <strong style={{ color: '#64748b' }}>{selectedSub.updatedAt}</strong>
                  </div>
                  {selectedSub.notes && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Notes:</span>
                      <strong style={{ color: '#334155' }}>{selectedSub.notes}</strong>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { handleOpenEdit(selectedSub); setShowViewDrawer(false); }} className="btn btn-outline" style={{ flex: 1, fontSize: '0.82rem' }}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => { handleOpenChangePlan(selectedSub); setShowViewDrawer(false); }} className="btn btn-outline" style={{ flex: 1, fontSize: '0.82rem' }}>
                    🔄 Change Plan
                  </button>
                  <button onClick={() => { handleOpenDelete(selectedSub); setShowViewDrawer(false); }} style={{ flex: 1, background: '#dc2626', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer' }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
