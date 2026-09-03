import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';

export default function ProofStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const orderId = location.state?.orderId || 'MV-2609-00123';
  const plan = location.state?.plan || { name: 'Professional' };
  const durationMonths = location.state?.durationMonths || 3;
  const amount = location.state?.amount || 1497;
  const coach = location.state?.coach || { name: 'Pankaj Narwade', centre: 'Charming Aura, Pune' };

  const [utr, setUtr] = useState('987654321098');
  const [payerName, setPayerName] = useState(coach.name || 'Pankaj Narwade');
  const [fileName, setFileName] = useState('payment_receipt_upi.jpg');
  const [note, setNote] = useState('Paid via PhonePe App');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!utr || utr.length < 6) {
      showToast('Please enter a valid 12-digit UTR reference number', 'error');
      return;
    }
    showToast('Payment proof submitted successfully!', 'success');
    navigate(`/order/${orderId}`, {
      state: { orderId, plan, durationMonths, amount, coach, utr, payerName }
    });
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <div className="container" style={{ maxWidth: '580px' }}>

        <CheckoutStepsHeader currentStep={5} />

        {/* Step Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', color: '#09381e', margin: '0 0 6px 0' }}>
            Submit Payment Details
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            Enter your UTR transaction ID and upload a screenshot to activate your plan
          </p>
        </div>

        {/* Form Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* UTR Number */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                12-Digit UPI Reference / UTR Number *
              </label>
              <input
                type="text"
                required
                value={utr}
                onChange={e => setUtr(e.target.value)}
                placeholder="e.g. 987654321098"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }}
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                Found in your UPI transaction receipt details
              </span>
            </div>

            {/* Screenshot Dropzone Upload Mock */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                Payment Screenshot *
              </label>
              <div style={{
                border: '2px dashed #22c55e',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                background: '#f0fdf4',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '6px' }}>📸</span>
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#15803d', display: 'block' }}>
                  {fileName ? `✓ Selected: ${fileName}` : 'Click to Upload Payment Screenshot'}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  PNG, JPG or WEBP up to 5MB
                </span>
              </div>
            </div>

            {/* Payer Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                Payer Name (Name registered on UPI App)
              </label>
              <input
                type="text"
                required
                value={payerName}
                onChange={e => setPayerName(e.target.value)}
                placeholder="e.g. Pankaj Narwade"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }}
              />
            </div>

            {/* Optional Note */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#09381e', marginBottom: '6px' }}>
                Optional Note / Remarks
              </label>
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="e.g. Paid from HDFC Bank UPI"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.98rem', justifyContent: 'center', marginTop: '10px' }}
            >
              Submit Proof for Review →
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
