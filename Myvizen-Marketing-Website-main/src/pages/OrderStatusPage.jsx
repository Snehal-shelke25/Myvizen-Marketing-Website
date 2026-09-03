import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function OrderStatusPage() {
  const { id } = useParams();
  const location = useLocation();
  const { showToast } = useToast();

  const orderId = id || location.state?.orderId || 'MV-2609-00123';
  const plan = location.state?.plan || { name: 'Professional' };
  const durationMonths = location.state?.durationMonths || 3;
  const amount = location.state?.amount || 1497;
  const coach = location.state?.coach || { name: 'Pankaj Narwade', centre: 'Charming Aura, Pune' };
  const utr = location.state?.utr || '987654321098';

  const [simulatedStatus, setSimulatedStatus] = useState('Verifying'); // 'Verifying' | 'Active'

  const handleSimulateActivation = () => {
    setSimulatedStatus('Active');
    showToast(`Payment #${orderId} verified & ${plan.name} plan activated!`, 'success');
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <div className="container" style={{ maxWidth: '620px' }}>

        {/* Banner */}
        <div style={{
          background: simulatedStatus === 'Active'
            ? 'linear-gradient(135deg, #166534 0%, #22c55e 100%)'
            : 'linear-gradient(135deg, #09381e 0%, #15803d 100%)',
          borderRadius: '24px',
          padding: '36px',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '32px',
          boxShadow: '0 12px 30px rgba(9,56,30,0.18)',
          transition: 'all 0.4s ease',
        }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '1.8rem' }}>
            {simulatedStatus === 'Active' ? '🎉' : '⏳'}
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', background: '#dcfce7', color: '#15803d', padding: '4px 14px', borderRadius: '100px' }}>
            Order #{orderId}
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', margin: '14px 0 8px 0' }}>
            {simulatedStatus === 'Active' ? 'Plan Successfully Activated!' : 'Payment Submitted!'}
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#dcfce7', margin: 0, opacity: 0.95, lineHeight: 1.5 }}>
            {simulatedStatus === 'Active'
              ? `Your ${plan.name} subscription plan is now active for ${coach.name} (${coach.centre}).`
              : `We are verifying your payment proof. Your plan will be active within 12 working hours.`}
          </p>
        </div>

        {/* Demo Activation Toggle Button */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          {simulatedStatus !== 'Active' ? (
            <button
              onClick={handleSimulateActivation}
              style={{
                background: '#f0fdf4',
                border: '1.5px solid #22c55e',
                color: '#15803d',
                padding: '8px 18px',
                borderRadius: '100px',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(34,197,94,0.15)',
              }}
            >
              ⚡ Demo: Click to Simulate Admin Instant Approval
            </button>
          ) : (
            <span style={{ fontSize: '0.82rem', background: '#dcfce7', color: '#15803d', padding: '6px 16px', borderRadius: '100px', fontWeight: '800' }}>
              ✓ Verified & Active Status Simulated
            </span>
          )}
        </div>

        {/* Timeline Status Tracker Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', marginBottom: '28px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '800', color: '#09381e', marginBottom: '20px' }}>
            🔄 Activation Status Timeline
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Step 1: Submitted */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', flexShrink: 0 }}>
                ✓
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#09381e', margin: '0 0 2px 0' }}>
                  Payment Submitted & UTR Uploaded
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  UTR Reference: <strong>{utr}</strong>
                </p>
              </div>
            </div>

            {/* Step 2: Verifying */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: simulatedStatus === 'Active' ? '#dcfce7' : '#fef3c7',
                color: simulatedStatus === 'Active' ? '#15803d' : '#b45309',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', flexShrink: 0
              }}>
                {simulatedStatus === 'Active' ? '✓' : '⏳'}
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: simulatedStatus === 'Active' ? '#09381e' : '#b45309', margin: '0 0 2px 0' }}>
                  {simulatedStatus === 'Active' ? 'Payment Verified by Admin' : 'Under Admin Verification'}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
                  {simulatedStatus === 'Active' ? 'UTR reference confirmed against bank statement.' : 'Our financial team is cross-checking the UTR reference.'}
                </p>
              </div>
            </div>

            {/* Step 3: Active */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', opacity: simulatedStatus === 'Active' ? 1 : 0.5 }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: simulatedStatus === 'Active' ? '#22c55e' : '#f1f5f9',
                color: simulatedStatus === 'Active' ? '#ffffff' : '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', flexShrink: 0
              }}>
                {simulatedStatus === 'Active' ? '✓' : '🔒'}
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: simulatedStatus === 'Active' ? '#15803d' : '#64748b', margin: '0 0 2px 0' }}>
                  Plan Active on Coach Portal
                </h4>
                <p style={{ fontSize: '0.82rem', color: simulatedStatus === 'Active' ? '#334155' : '#94a3b8', margin: 0 }}>
                  {plan.name} features unlocked for {coach.name}.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Order Details Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '28px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: '800', color: '#09381e', marginBottom: '16px' }}>
            📋 Order Details Summary
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Account:</span>
              <strong style={{ color: '#09381e' }}>{coach.name}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Center:</span>
              <strong style={{ color: '#09381e' }}>{coach.centre}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Selected Plan:</span>
              <strong style={{ color: '#09381e' }}>{plan.name} ({durationMonths} Months)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Amount Paid:</span>
              <strong style={{ color: '#16a34a', fontWeight: '800' }}>₹{amount.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div style={{ display: 'flex', gap: '14px' }}>
          <Link to="/" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
            🌐 Back to Home
          </Link>
          <Link to="/admin" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            🔑 Go to Coach Portal
          </Link>
        </div>

      </div>
    </div>
  );
}
