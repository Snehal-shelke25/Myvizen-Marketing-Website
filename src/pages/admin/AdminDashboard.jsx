import React from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { MOCK_COACHES } from '../../mocks/coaches';
import { INITIAL_PAYMENT_REQUESTS } from '../../mocks/paymentRequests';
import { INITIAL_SUBSCRIPTIONS } from '../../mocks/subscriptions';

const recentActivity = [
  { time: '11:20 AM', title: 'Coach login detected', detail: 'Pankaj Narwade opened the coach dashboard.' },
  { time: '10:35 AM', title: 'Payment waiting for review', detail: 'A Professional plan UTR was submitted for approval.' },
  { time: '09:10 AM', title: 'Report generated', detail: 'Snehal Shelke created a new body composition report.' },
  { time: 'Yesterday', title: 'Trial coach added', detail: 'Siddharth Zende started a Free trial account.' },
];

export default function AdminDashboard() {
  const pendingPayments = INITIAL_PAYMENT_REQUESTS.filter((request) => request.status === 'Under Review');
  const activeCoaches = MOCK_COACHES.filter((coach) => coach.status === 'Active');
  const dueCoaches = MOCK_COACHES.filter((coach) => coach.status === 'Payment Due' || coach.status === 'Trial');
  const monthlyRevenue = INITIAL_SUBSCRIPTIONS
    .filter((subscription) => subscription.status === 'Active' || subscription.status === 'Expiring')
    .reduce((sum, subscription) => sum + subscription.amount, 0);

  const metrics = [
    { label: 'Total Coaches', value: MOCK_COACHES.length, helper: `${activeCoaches.length} active accounts`, tone: 'green' },
    { label: 'Pending Payments', value: pendingPayments.length, helper: 'Manual UPI review queue', tone: 'amber' },
    { label: 'Renewal Attention', value: dueCoaches.length, helper: 'Trial or payment-due coaches', tone: 'blue' },
    { label: 'Tracked Revenue', value: `Rs ${monthlyRevenue.toLocaleString('en-IN')}`, helper: 'Active mock subscriptions', tone: 'purple' },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <AdminHeader
          title="Platform Dashboard"
          subtitle="Control coach accounts, plan access, payments, and MyVizen operations"
        />

        <div className="admin-page-body">
          <section className="admin-hero-panel">
            <div>
              <span className="admin-kicker">Production readiness</span>
              <h1>Manage MyVizen from one admin control panel.</h1>
              <p>
                This dashboard is now focused on platform administration: coach onboarding,
                subscription activation, payment verification, account health, and support review.
              </p>
            </div>
            <div className="admin-hero-actions">
              <Link to="/admin/coaches" className="btn btn-primary">Manage Coaches</Link>
              <Link to="/admin/payments" className="btn btn-outline">Review Payments</Link>
            </div>
          </section>

          <div className="admin-stats-grid">
            {metrics.map((metric) => (
              <div className={`admin-stat-card admin-stat-${metric.tone}`} key={metric.label}>
                <div>
                  <span>{metric.label}</span>
                  <h3>{metric.value}</h3>
                  <p>{metric.helper}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-two-column">
            <section className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h3>Priority Work</h3>
                  <p>Important admin actions before coaches lose access.</p>
                </div>
              </div>

              <div className="admin-task-list">
                {pendingPayments.map((request) => (
                  <Link to="/admin/payments" className="admin-task-item" key={request.id}>
                    <div>
                      <strong>{request.coachName}</strong>
                      <span>{request.plan} plan payment needs verification.</span>
                    </div>
                    <span>Rs {request.amount.toLocaleString('en-IN')}</span>
                  </Link>
                ))}

                {dueCoaches.map((coach) => (
                  <Link to="/admin/coaches" className="admin-task-item" key={coach.id}>
                    <div>
                      <strong>{coach.name}</strong>
                      <span>{coach.status} - renewal date {coach.renewalDate}</span>
                    </div>
                    <span>{coach.currentPlan}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h3>Recent Activity</h3>
                  <p>Frontend activity stream for the backend audit-log module.</p>
                </div>
              </div>

              <div className="admin-activity-list">
                {recentActivity.map((activity) => (
                  <div className="admin-activity-item" key={`${activity.time}-${activity.title}`}>
                    <span>{activity.time}</span>
                    <div>
                      <strong>{activity.title}</strong>
                      <p>{activity.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <h3>Admin Modules</h3>
                <p>Frontend screens prepared for backend integration.</p>
              </div>
            </div>

            <div className="admin-module-grid">
              <ModuleLink to="/admin/coaches" title="Coach Management" text="Create, activate, suspend, and review coach accounts." />
              <ModuleLink to="/admin/subscriptions" title="Subscriptions" text="Assign plans, change tiers, renew access, and check expiry." />
              <ModuleLink to="/admin/payments" title="Payment Verification" text="Approve UPI receipts and activate paid coach plans." />
              <ModuleLink to="/admin/analytics" title="Analytics" text="Track centers, clients, reports, and coach usage." />
              <ModuleLink to="/admin/guests" title="Client Review" text="Inspect client records attached to coach accounts." />
              <ModuleLink to="/admin/settings" title="Settings" text="Prepare admin profile, access rules, and future configuration." />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ModuleLink({ to, title, text }) {
  return (
    <Link to={to} className="admin-module-card">
      <strong>{title}</strong>
      <span>{text}</span>
    </Link>
  );
}
