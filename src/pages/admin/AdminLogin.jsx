import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login, loginError, setLoginError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  // Redirect to original destination or dashboard after login
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a tiny network delay for realism
    await new Promise(r => setTimeout(r, 600));
    const success = login(email, password);
    setLoading(false);
    if (success) navigate(from, { replace: true });
  };

  const handleChange = () => {
    if (loginError) setLoginError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #09381e 0%, #166534 50%, #15803d 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'var(--font-body)',
    }}>

      {/* Decorative background circles */}
      <div style={{ position: 'fixed', top: '-120px', right: '-120px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(34,197,94,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(34,197,94,0.06)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>

        {/* ── Card ── */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '44px 40px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
        }}>

          {/* ── Brand Header ── */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '18px',
              background: 'linear-gradient(135deg, #09381e, #22c55e)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 8px 24px rgba(34,197,94,0.3)',
            }}>
              <svg viewBox="0 0 24 24" width="30" height="30" fill="#ffffff">
                <path d="M17,8C15.34,8 14,9.34 14,11C14,12.66 15.34,14 17,14C18.66,14 20,12.66 20,11C20,9.34 18.66,8 17,8M17,12C16.45,12 16,11.55 16,11C16,10.45 16.45,10 17,10C17.55,10 18,10.45 18,11C18,11.55 17.55,12 17,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,13.8 19.4,15.47 18.4,16.8L16.8,15.2C17.55,14.1 18,12.75 18,11C18,7.69 15.31,5 12,5C10.25,5 8.9,5.45 7.8,6.2L6.2,4.6C7.53,3.6 9.2,3 12,3M4,12A8,8 0 0,1 12,4C13.8,4 15.47,4.6 16.8,5.6L15.2,7.2C14.1,6.45 12.75,6 12,6C8.69,6 6,8.69 6,12C6,13.75 6.45,15.1 7.2,16.2L5.6,17.8C4.6,16.47 4,14.8 4,12Z"/>
              </svg>
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '800', color: '#09381e', margin: '0 0 6px 0' }}>
              MyVizen Coach Portal
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
              Sign in to access your wellness dashboard
            </p>
          </div>

          {/* ── Error Alert ── */}
          {loginError && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeIn 0.3s ease',
            }}>
              <span style={{ fontSize: '1.1rem' }}>⚠️</span>
              <span style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: '600' }}>{loginError}</span>
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' }}>📧</span>
                <input
                  type="email"
                  required
                  placeholder="coach@myvizen.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); handleChange(); }}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 40px',
                    borderRadius: '10px',
                    border: loginError ? '1.5px solid #fca5a5' : '1.5px solid #e2e8f0',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'var(--font-body)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = '#22c55e'}
                  onBlur={e => e.target.style.borderColor = loginError ? '#fca5a5' : '#e2e8f0'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' }}>🔒</span>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); handleChange(); }}
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 40px',
                    borderRadius: '10px',
                    border: loginError ? '1.5px solid #fca5a5' : '1.5px solid #e2e8f0',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'var(--font-body)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = '#22c55e'}
                  onBlur={e => e.target.style.borderColor = loginError ? '#fca5a5' : '#e2e8f0'}
                />
                {/* Show/Hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '2px',
                  }}
                  title={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                background: loading
                  ? '#86efac'
                  : 'linear-gradient(135deg, #09381e 0%, #15803d 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(22,101,52,0.3)',
                marginTop: '4px',
              }}
            >
              {loading ? (
                <>
                  <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Signing in…
                </>
              ) : (
                '🔑 Sign In to Coach Portal'
              )}
            </button>
          </form>

          {/* ── Demo Credentials Hint ── */}
          <div style={{
            marginTop: '24px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '14px 16px',
          }}>
            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#15803d', margin: '0 0 6px 0' }}>
              🌿 Demo Credentials
            </p>
            <p style={{ fontSize: '0.78rem', color: '#374151', margin: '0 0 2px 0' }}>
              <strong>Email:</strong> coach@myvizen.com
            </p>
            <p style={{ fontSize: '0.78rem', color: '#374151', margin: 0 }}>
              <strong>Password:</strong> myvizen123
            </p>
          </div>

          {/* ── Back to Website ── */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link
              to="/"
              style={{ fontSize: '0.82rem', color: '#64748b', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              ← Back to MyVizen Website
            </Link>
          </div>
        </div>

      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
