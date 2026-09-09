import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavIcon from './NavIcon';

const ROLE_LABELS = { super: 'Super Admin', support: 'Support', viewer: 'Viewer' };

/**
 * Navigation, grouped and role-aware.
 *
 * It used to be a flat list of ten links, and the footer said "Super Admin" for
 * everyone regardless of their actual role. A Viewer could see links to actions
 * the server would refuse — a menu that lies about what you can do.
 *
 * `roles` on an item means "only these roles see it"; omitted means everyone.
 */
const NAV_GROUPS = [
  {
    title: 'Overview',
    items: [{ path: '/admin', icon: 'dashboard', label: 'Dashboard', exact: true }],
  },
  {
    title: 'People',
    items: [
      { path: '/admin/coaches', icon: 'coaches', label: 'Coaches' },
      { path: '/admin/guests', icon: 'guests', label: 'Guests' },
      { path: '/admin/reports', icon: 'reports', label: 'Reports' },
    ],
  },
  {
    title: 'Billing',
    items: [
      { path: '/admin/subscriptions', icon: 'subscriptions', label: 'Subscriptions' },
      { path: '/admin/payments', icon: 'payments', label: 'Payment Review', roles: ['super', 'support'] },
    ],
  },
  {
    title: 'Compliance',
    items: [
      { path: '/admin/deletions', icon: 'deletions', label: 'Deletion Queue' },
      { path: '/admin/audit', icon: 'audit', label: 'Audit Log' },
    ],
  },
  {
    title: 'System',
    items: [
      { path: '/admin/errors', icon: 'errors', label: 'Error Log', roles: ['super', 'support'] },
      { path: '/admin/settings', icon: 'settings', label: 'Settings', roles: ['super'] },
    ],
  },
];

export default function AdminSidebar({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminName, role, logout } = useAuth();

  const isActive = (item) => (item.exact
    ? location.pathname === item.path
    : location.pathname.startsWith(item.path));

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const visibleGroups = NAV_GROUPS
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => !item.roles || item.roles.includes(role)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside className="admin-sidebar">
      <div>
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-brand">
            <div className="admin-brand-mark">M</div>
            <div>
              <h3>MyVizen Admin</h3>
              <p>Platform control panel</p>
            </div>
          </Link>
        </div>

        <nav className="admin-sidebar-nav">
          {visibleGroups.map((group) => (
            <div key={group.title} className="admin-nav-group">
              <span className="admin-nav-group-title">{group.title}</span>
              {group.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`admin-nav-item ${isActive(item) ? 'active' : ''}`}
                  aria-current={isActive(item) ? 'page' : undefined}
                  onClick={onNavigate}
                >
                  <span className="admin-nav-icon"><NavIcon name={item.icon} /></span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="admin-sidebar-footer">
        <div className="admin-profile-mini">
          <div className="admin-avatar-fallback">
            {(adminName || 'A').charAt(0).toUpperCase()}
          </div>
          <div>
            <h5>{adminName || 'Admin'}</h5>
            <p>{ROLE_LABELS[role] || 'Admin'}</p>
          </div>
        </div>

        <div className="admin-sidebar-actions">
          <Link to="/" className="btn btn-outline">Website</Link>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </aside>
  );
}
