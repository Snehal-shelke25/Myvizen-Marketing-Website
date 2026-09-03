import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';

export default function ReviewStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const plan = location.state?.plan || { id: 'professional', name: 'Professional' };
  const durationMonths = location.state?.durationMonths || 3;
  const amount = location.state?.amount || 1497;
  const coach = location.state?.coach || { name: 'Pankaj Narwade', centre: 'Charming Aura, Pune', maskedEmail: 'pan***@example.com' };

  const [agreed, setAgreed] = useState(true);
  const [orderId] = useState('MV-2609-00123');

  const handleProceed = () => {
    if (!agreed) {
      showToast('Please agree to the Terms & Refund Policy before continuing', 'error');
      return;
    }
    navigate('/checkout/pay', {
      state: { orderId, plan, durationMonths, amount, coach }
    });
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>

        <CheckoutStepsHeader currentStep={3} />

        {/* Step Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', color: '#09381e', margin: '0 0 6px 0' }}>
            Review Order Summary
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            Please confirm your plan details before proceeding to payment
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>

          {/* Order ID Banner */}
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '12px 18px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: '#166534', fontWeight: '700' }}>Order Reference</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', color: '#09381e', fontSize: '0.95rem' }}>{orderId}</span>
          </div>

          {/* Details Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Subscription Plan</span>
              <strong style={{ color: '#09381e', fontSize: '0.95rem' }}>{plan.name}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Billing Duration</span>
              <strong style={{ color: '#09381e', fontSize: '0.95rem' }}>{durationMonths} Months</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Coach Account</span>
              <strong style={{ color: '#09381e', fontSize: '0.95rem' }}>{coach.name} ({coach.centre})</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Registered Email</span>
              <strong style={{ color: '#09381e', fontSize: '0.95rem' }}>{coach.maskedEmail}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#09381e' }}>Total Payable</span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#16a34a', fontWeight: '800' }}>₹{amount.toLocaleString()}</strong>
            </div>
          </div>

          {/* Checkbox */}
          <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <input
              type="checkbox"
              id="terms-check"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              style={{ marginTop: '3px', cursor: 'pointer', width: '18px', height: '18px', accentColor: '#22c55e' }}
            />
            <label htmlFor="terms-check" style={{ fontSize: '0.82rem', color: '#475569', cursor: 'pointer', lineHeight: 1.4 }}>
              I agree to the <Link to="/terms" target="_blank" style={{ color: '#15803d', fontWeight: '700' }}>Terms of Service</Link> & <Link to="/refund-policy" target="_blank" style={{ color: '#15803d', fontWeight: '700' }}>Refund Policy</Link> for MyVizen subscriptions.
            </label>
          </div>

          <button
            onClick={handleProceed}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '0.98rem', justifyContent: 'center' }}
          >
            Continue to Payment →
          </button>
        </div>

      </div>
    </div>
  );
}
