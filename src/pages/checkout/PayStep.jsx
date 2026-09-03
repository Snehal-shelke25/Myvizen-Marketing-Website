import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';

export default function PayStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const orderId = location.state?.orderId || 'MV-2609-00123';
  const plan = location.state?.plan || { name: 'Professional' };
  const durationMonths = location.state?.durationMonths || 3;
  const amount = location.state?.amount || 1497;
  const coach = location.state?.coach || { name: 'Pankaj Narwade', centre: 'Charming Aura, Pune' };

  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`${fieldName} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedField(null), 2200);
  };

  const handleOpenUpiApp = (appName) => {
    showToast(`Simulating opening ${appName} with payment details...`, 'info');
  };

  const handleProceed = () => {
    navigate('/checkout/proof', {
      state: { orderId, plan, durationMonths, amount, coach }
    });
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <div className="container" style={{ maxWidth: '640px' }}>

        <CheckoutStepsHeader currentStep={4} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#15803d', background: '#dcfce7', padding: '4px 14px', borderRadius: '100px' }}>
            Manual UPI Payment
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', color: '#09381e', margin: '12px 0 6px 0' }}>
            Pay ₹{amount.toLocaleString()}
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            Scan the QR code below or copy the UPI ID into your payment app
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>

          {/* QR Code Placeholder Box */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '2px dashed #22c55e',
            borderRadius: '20px',
            padding: '28px 24px',
            textAlign: 'center',
            marginBottom: '28px',
          }}>
            <div style={{
              width: '190px', height: '190px', background: '#ffffff', borderRadius: '18px',
              margin: '0 auto 16px auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: '1px solid #e2e8f0', boxShadow: '0 6px 16px rgba(0,0,0,0.06)', position: 'relative'
            }}>
              {/* Styled QR Code Pattern Graphic */}
              <div style={{ width: '140px', height: '140px', background: '#09381e', borderRadius: '12px', padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} style={{ background: (i * 7) % 3 === 0 ? '#ffffff' : '#22c55e', borderRadius: '3px' }} />
                ))}
              </div>
              <span style={{ fontSize: '0.68rem', fontWeight: '800', color: '#09381e', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Scan with any UPI App
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', fontWeight: '800', color: '#166534', margin: '0 0 4px 0' }}>
              MyVizen Official Merchant QR Code
            </p>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
              Order Reference: <strong>{orderId}</strong>
            </p>
          </div>

          {/* Quick Pay via UPI Apps */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>
              📲 Quick Launch UPI App:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(app => (
                <button
                  key={app}
                  onClick={() => handleOpenUpiApp(app)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '10px 4px',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#09381e',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e0f2fe'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                >
                  ⚡ {app}
                </button>
              ))}
            </div>
          </div>

          {/* Copyable Details Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>

            {/* UPI ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>UPI VPA ID</span>
                <strong style={{ fontSize: '0.98rem', color: '#09381e', fontFamily: 'var(--font-heading)' }}>myvizen@upi</strong>
              </div>
              <button
                onClick={() => copyToClipboard('myvizen@upi', 'UPI ID')}
                style={{
                  background: copiedField === 'UPI ID' ? '#22c55e' : '#dcfce7',
                  color: copiedField === 'UPI ID' ? '#ffffff' : '#15803d',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {copiedField === 'UPI ID' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>

            {/* Merchant Name */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Account Name</span>
                <strong style={{ fontSize: '0.95rem', color: '#09381e' }}>MyVizen Wellness Technologies</strong>
              </div>
              <button
                onClick={() => copyToClipboard('MyVizen Wellness Technologies', 'Name')}
                style={{
                  background: copiedField === 'Name' ? '#22c55e' : '#dcfce7',
                  color: copiedField === 'Name' ? '#ffffff' : '#15803d',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {copiedField === 'Name' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>

            {/* Amount */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Exact Amount</span>
                <strong style={{ fontSize: '1rem', color: '#16a34a' }}>₹{amount.toLocaleString()}</strong>
              </div>
              <button
                onClick={() => copyToClipboard(String(amount), 'Amount')}
                style={{
                  background: copiedField === 'Amount' ? '#22c55e' : '#dcfce7',
                  color: copiedField === 'Amount' ? '#ffffff' : '#15803d',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {copiedField === 'Amount' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>

            {/* Order Reference */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>Order ID Reference</span>
                <strong style={{ fontSize: '0.95rem', color: '#09381e', fontFamily: 'var(--font-heading)' }}>{orderId}</strong>
              </div>
              <button
                onClick={() => copyToClipboard(orderId, 'Order ID')}
                style={{
                  background: copiedField === 'Order ID' ? '#22c55e' : '#dcfce7',
                  color: copiedField === 'Order ID' ? '#ffffff' : '#15803d',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {copiedField === 'Order ID' ? '✓ Copied!' : 'Copy'}
              </button>
            </div>

          </div>

          {/* Important Security Warning */}
          <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', borderRadius: '14px', padding: '14px 18px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <span style={{ fontSize: '0.82rem', color: '#c2410c', fontWeight: '700' }}>
              Important Security Warning: MyVizen will never ask for your UPI PIN or OTP.
            </span>
          </div>

          <button
            onClick={handleProceed}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '0.98rem', justifyContent: 'center' }}
          >
            I Have Paid — Submit UTR Proof →
          </button>
        </div>

      </div>
    </div>
  );
}
