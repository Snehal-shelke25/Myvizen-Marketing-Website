import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { findCoachByQuery, MOCK_COACHES } from '../../mocks/coaches';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';

export default function AccountStep() {
  const navigate = useNavigate();
  const location = useLocation();

  const plan = location.state?.plan || { id: 'professional', name: 'Professional', monthlyPrice: 499 };
  const durationMonths = location.state?.durationMonths || 3;
  const amount = location.state?.amount || 1497;

  const initialCoach = location.state?.coach || findCoachByQuery('pankaj@example.com');
  const [inputVal, setInputVal] = useState(initialCoach?.email || 'pankaj@example.com');
  const [matchedCoach, setMatchedCoach] = useState(initialCoach);

  const handleSearch = (e) => {
    e.preventDefault();
    const coach = findCoachByQuery(inputVal);
    setMatchedCoach(coach);
  };

  const handleChipSelect = (coach) => {
    setInputVal(coach.email);
    setMatchedCoach(coach);
  };

  const handleContinue = () => {
    navigate('/checkout/verify', {
      state: {
        plan,
        durationMonths,
        amount,
        coach: matchedCoach,
      }
    });
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>

        <CheckoutStepsHeader currentStep={1} />

        {/* Step Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', color: '#09381e', margin: '0 0 6px 0' }}>
            Which MyVizen account is this for?
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            Enter your registered email address or mobile number to activate your plan
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>

          <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#09381e', marginBottom: '8px' }}>
              Registered Email or Mobile Number
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                required
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="e.g. pankaj@example.com or +91 98230 11223"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button
                type="submit"
                className="btn btn-outline"
                style={{ padding: '12px 18px', fontSize: '0.85rem' }}
              >
                Search Account
              </button>
            </div>
          </form>

          {/* Quick Select Chips */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
              ⚡ Quick 1-Click Demo Accounts:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {MOCK_COACHES.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleChipSelect(c)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '100px',
                    border: matchedCoach?.id === c.id ? '1.5px solid #22c55e' : '1px solid #cbd5e1',
                    background: matchedCoach?.id === c.id ? '#f0fdf4' : '#ffffff',
                    color: matchedCoach?.id === c.id ? '#15803d' : '#475569',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  👤 {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Matched Account Card */}
          {matchedCoach && (
            <div style={{
              background: '#f0fdf4',
              border: '1.5px solid #86efac',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '28px',
              animation: 'fadeInUp 0.3s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ✓ Account Matched
                </span>
                <button
                  type="button"
                  onClick={() => setInputVal('')}
                  style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: '#16a34a', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Not you? Change
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={matchedCoach.avatar}
                  alt={matchedCoach.name}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #22c55e' }}
                />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '800', color: '#09381e', margin: '0 0 2px 0' }}>
                    {matchedCoach.name}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#334155', margin: '0 0 2px 0', fontWeight: '600' }}>
                    🏢 {matchedCoach.centre}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
                    📧 {matchedCoach.maskedEmail}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Selected Order Context Summary */}
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', marginBottom: '24px', fontSize: '0.88rem', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Selected Plan:</span>
              <strong style={{ color: '#09381e' }}>{plan.name} ({durationMonths} Months)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Total Amount:</span>
              <strong style={{ color: '#16a34a', fontSize: '1.05rem', fontWeight: '800' }}>₹{amount.toLocaleString()}</strong>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!matchedCoach}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '0.98rem', justifyContent: 'center' }}
          >
            Continue to Verification →
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/pricing" style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'none' }}>
            ← Back to Pricing Plans
          </Link>
        </div>

      </div>
    </div>
  );
}
