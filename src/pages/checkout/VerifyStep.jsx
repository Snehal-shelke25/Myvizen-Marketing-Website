import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';

export default function VerifyStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const plan = location.state?.plan || { id: 'professional', name: 'Professional' };
  const durationMonths = location.state?.durationMonths || 3;
  const amount = location.state?.amount || 1497;
  const coach = location.state?.coach || { name: 'Pankaj Narwade', maskedEmail: 'pan***@example.com' };

  const [otp, setOtp] = useState(['5', '8', '2', '9', '1', '0']);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleFillDemoOtp = () => {
    setOtp(['5', '8', '2', '9', '1', '0']);
    showToast('Demo OTP 582910 filled!', 'info');
  };

  const handleResend = () => {
    showToast('A new 6-digit verification code has been sent to ' + coach.maskedEmail, 'info');
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.some(d => !d)) {
      showToast('Please enter all 6 digits of the code', 'error');
      return;
    }
    showToast('Account verified successfully!', 'success');
    navigate('/checkout/review', {
      state: { plan, durationMonths, amount, coach }
    });
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <div className="container" style={{ maxWidth: '580px' }}>

        <CheckoutStepsHeader currentStep={2} />

        {/* Step Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', color: '#09381e', margin: '0 0 6px 0' }}>
            Enter the 6-digit code
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            We sent a verification code to <strong>{coach.maskedEmail}</strong>
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>

          <form onSubmit={handleVerify}>
            {/* 6 Digit Inputs */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  style={{
                    width: '46px',
                    height: '54px',
                    borderRadius: '12px',
                    border: '2px solid #22c55e',
                    fontSize: '1.4rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '800',
                    textAlign: 'center',
                    color: '#09381e',
                    outline: 'none',
                    background: '#f0fdf4',
                  }}
                />
              ))}
            </div>

            {/* Quick Fill & Resend Links */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', fontSize: '0.85rem' }}>
              <button
                type="button"
                onClick={handleFillDemoOtp}
                style={{ background: '#dcfce7', border: 'none', color: '#15803d', padding: '4px 12px', borderRadius: '100px', fontWeight: '700', cursor: 'pointer' }}
              >
                ⚡ Fill Demo OTP
              </button>

              <button
                type="button"
                onClick={handleResend}
                style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Resend Code
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.98rem', justifyContent: 'center' }}
            >
              Verify & Proceed →
            </button>
          </form>

        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/checkout/account" style={{ fontSize: '0.85rem', color: '#64748b', textDecoration: 'none' }}>
            ← Back to Account Identification
          </Link>
        </div>

      </div>
    </div>
  );
}
