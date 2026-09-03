import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { coachName, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', icon: '📊', label: 'Dashboard Hub' },
    { path: '/admin/guests', icon: '👥', label: 'Guest Directory' },
    { path: '/admin/reports', icon: '📄', label: 'Body Reports' },
    { path: '/admin/diet-plans', icon: '🍎', label: 'Diet Architect' },
    { path: '/admin/visitors', icon: '🏪', label: 'Visitor Registry' },
    { path: '/admin/payments', icon: '🔍', label: 'Payment Verification' },
    { path: '/admin/subscriptions', icon: '💳', label: 'Subscriptions' },
    { path: '/admin/analytics', icon: '📈', label: 'Center Analytics' },
    { path: '/admin/settings', icon: '⚙️', label: 'Center Settings' }
  ];

  return (
    <aside className="admin-sidebar">
      <div>
        <div className="admin-sidebar-header">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#ffffff' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#22c55e', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
              🌿
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>MyVizen Admin</h3>
              <p style={{ fontSize: '0.62rem', color: '#4ade80', margin: 0 }}>Coach Portal</p>
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
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Center & Coach badge footer */}
      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #22c55e' }}>
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" alt={coachName || "Snehal Shelke"} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>{coachName || 'Snehal Shelke'}</h5>
            <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0 }}>🏢 Charming Aura</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to="/" className="btn btn-outline" style={{ flex: 1, fontSize: '0.72rem', padding: '6px 8px', borderColor: '#22c55e', color: '#4ade80', textAlign: 'center' }}>
            🌐 Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              flex: 1,
              fontSize: '0.72rem',
              padding: '6px 8px',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
