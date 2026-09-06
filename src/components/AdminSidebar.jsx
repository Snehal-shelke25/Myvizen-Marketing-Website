import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminName, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', icon: 'DB', label: 'Dashboard' },
    { path: '/admin/coaches', icon: 'CH', label: 'Coaches' },
    { path: '/admin/subscriptions', icon: 'SB', label: 'Subscriptions' },
    { path: '/admin/payments', icon: 'PY', label: 'Payment Review' },
    { path: '/admin/analytics', icon: 'AN', label: 'Analytics' },
    { path: '/admin/guests', icon: 'CL', label: 'Client Review' },
    { path: '/admin/reports', icon: 'RP', label: 'Reports' },
    { path: '/admin/diet-plans', icon: 'DT', label: 'Diet Plans' },
    { path: '/admin/visitors', icon: 'VR', label: 'Visitor Logs' },
    { path: '/admin/settings', icon: 'ST', label: 'Settings' },
  ];

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
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="admin-sidebar-footer">
        <div className="admin-profile-mini">
          <div className="admin-avatar-fallback">A</div>
          <div>
            <h5>{adminName || 'MyVizen Admin'}</h5>
            <p>Super Admin</p>
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
