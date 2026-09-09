import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';
import * as checkoutApi from '../../checkout/api';
import { getCheckout, setOrderToken } from '../../checkout/session';

/**
 * Step 2 — confirm the email code.
 *
 * This is what stops a payment being applied to somebody else's account
 * through a typo, and stops anyone upgrading an account they do not own.
 */
export default function VerifyStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const session = getCheckout();
  const orderId = location.state?.orderId || session?.orderId;
  const emailMasked = location.state?.emailMasked;

  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) navigate('/pricing', { replace: true });
  }, [orderId, navigate]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = async (event) => {
    event.preventDefault();
    setVerifying(true);
    setError('');
    try {
      const order = await checkoutApi.verifyOrder(orderId, otp.trim());
      setOrderToken(order.public_token);
      navigate('/checkout/review', { state: { orderId } });
    } catch (err) {
      setError(err.message || 'That code is not correct.');
      setOtp('');
      inputRef.current?.focus();
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="checkout-page">
      <CheckoutStepsHeader currentStep={2} />

      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="checkout-card">
          <h2>Enter the 6-digit code</h2>
          <p className="checkout-help">
            Sent to {emailMasked || 'your registered email address'}. It is valid
            for 10 minutes.
          </p>

          <form onSubmit={submit}>
            <input
              ref={inputRef}
              className="admin-input checkout-otp"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="000000"
              aria-label="6-digit confirmation code"
              required
            />

            {error && <div className="checkout-error" role="alert">{error}</div>}

            <button type="submit" className="btn btn-primary checkout-continue"
                    disabled={otp.length !== 6 || verifying}>
              {verifying ? 'Checking...' : 'Confirm'}
            </button>
          </form>

          <p className="checkout-footnote">
            Order <strong>{orderId}</strong> — quote this if you contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
