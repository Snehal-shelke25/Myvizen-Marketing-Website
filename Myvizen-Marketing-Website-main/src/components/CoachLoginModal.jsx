import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { MOCK_COACHES } from '../mocks/coaches';

export default function CoachLoginModal({ onClose, onSuccess }) {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('coach@myvizen.com');
  const [password, setPassword] = useState('myvizen123');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      showToast('Logged in successfully as Coach!', 'success');
      if (onSuccess) onSuccess();
      onClose();
    } else {
      showToast('Invalid credentials. Use coach@myvizen.com / myvizen123', 'error');
    }
  };

  const handleQuickCoachSelect = (coach) => {
    login(coach.email, 'myvizen123');
    showToast(`Logged in as Coach: ${coach.name} (${coach.centre})`, 'success');
    if (onSuccess) onSuccess(coach);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
              🔑
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', color: '#09381e', margin: 0 }}>
                Coach Portal Login
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Log in to select plan for your center</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#94a3b8' }}>✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#09381e', marginBottom: '4px' }}>Coach Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#09381e', marginBottom: '4px' }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.92rem', justifyContent: 'center' }}
          >
            Sign In to Proceed →
          </button>
        </form>

        {/* 1-Click Demo Coach Quick Selection Cards */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#15803d', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ⚡ Or 1-Click Select Demo Coach:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {MOCK_COACHES.map(c => (
              <div
                key={c.id}
                onClick={() => handleQuickCoachSelect(c)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#f0fdf4';
                  e.currentTarget.style.borderColor = '#22c55e';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <img src={c.avatar} alt={c.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', display: 'block' }}>{c.name}</span>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{c.centre}</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: '700', background: '#dcfce7', padding: '2px 8px', borderRadius: '100px' }}>
                  Select
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
