import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login, loginError, setLoginError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) navigate(from, { replace: true });
  };

  const handleChange = () => {
    if (loginError) setLoginError('');
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <div className="admin-brand-mark">M</div>
          <h1>MyVizen Admin</h1>
          <p>Sign in to manage coaches, subscriptions, payments, and platform activity.</p>
        </div>

        {loginError && (
          <div className="admin-error-alert">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label>
            Email address
            <input
              type="email"
              required
              placeholder="admin@myvizen.in"
              value={email}
              onChange={(event) => { setEmail(event.target.value); handleChange(); }}
            />
          </label>

          <label>
            Password
            <div className="admin-password-field">
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="Enter admin password"
                value={password}
                onChange={(event) => { setPassword(event.target.value); handleChange(); }}
              />
              <button type="button" onClick={() => setShowPass((current) => !current)}>
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="admin-login-note">
          Authorised personnel only. Every action in this panel is recorded.
        </p>

        <Link to="/" className="admin-back-link">Back to MyVizen website</Link>
      </div>
    </div>
  );
}
