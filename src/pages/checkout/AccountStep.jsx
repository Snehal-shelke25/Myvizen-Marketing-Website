import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';
import * as checkoutApi from '../../checkout/api';
import { startCheckout } from '../../checkout/session';

const money = (n) => `Rs. ${Number(n || 0).toLocaleString('en-IN')}`;

/**
 * Step 1 — which MyVizen account is this payment for.
 *
 * The account is confirmed against the server before anything else happens.
 * Showing the matched name back to the coach is both a trust moment and an
 * error catch: someone who sees the wrong name stops before paying, which is
 * far better than us discovering the mismatch after the money has moved.
 */
export default function AccountStep() {
  const navigate = useNavigate();
  const location = useLocation();

  const planCode = location.state?.planCode;
  const months = location.state?.months;
  const amount = location.state?.amount;
  const planName = location.state?.planName;

  const [identifier, setIdentifier] = useState('');
  const [account, setAccount] = useState(null);
  const [checking, setChecking] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  // Reached directly without picking a plan — send them back rather than
  // guessing what they wanted to buy.
  useEffect(() => {
    if (!planCode || !months) navigate('/pricing', { replace: true });
  }, [planCode, months, navigate]);

  const findAccount = async (event) => {
    event.preventDefault();
    if (!identifier.trim()) return;
    setChecking(true);
    setError('');
    setAccount(null);
    try {
      setAccount(await checkoutApi.lookupAccount(identifier.trim()));
    } catch (err) {
      setError(err.message || 'We could not find that account.');
    } finally {
      setChecking(false);
    }
  };

  const startOrder = async () => {
    setCreating(true);
    setError('');
    try {
      const order = await checkoutApi.createOrder({
        identifier: identifier.trim(), planCode, months,
      });
      startCheckout(order.order_id);
      navigate('/checkout/verify', {
        state: { orderId: order.order_id, emailMasked: order.email_masked },
      });
    } catch (err) {
      setError(err.message || 'Could not start this order. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="checkout-page">
      <CheckoutStepsHeader currentStep={1} />

      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="checkout-card">
          <div className="checkout-order-summary">
            <span>{planName || 'Selected plan'}</span>
            <strong>{months} month{months > 1 ? 's' : ''} &middot; {money(amount)}</strong>
          </div>

          <h2>Which MyVizen account is this for?</h2>
          <p className="checkout-help">
            Use the same email or mobile number you sign in with in the MyVizen app.
          </p>

          <form onSubmit={findAccount} className="checkout-lookup">
            <input
              type="text"
              className="admin-input"
              value={identifier}
              onChange={(event) => { setIdentifier(event.target.value); setAccount(null); }}
              placeholder="Registered email or mobile number"
              autoComplete="email"
              required
            />
            <button type="submit" className="btn btn-outline" disabled={checking || !identifier.trim()}>
              {checking ? 'Checking...' : 'Find account'}
            </button>
          </form>

          {error && <div className="checkout-error" role="alert">{error}</div>}

          {account && (
            <div className="checkout-account-found">
              <div className="checkout-found-badge">Account found</div>
              <strong>{account.name}</strong>
              {account.centre && <span>{account.centre}</span>}
              <span className="checkout-muted">{account.email_masked}</span>
              <p className="checkout-help" style={{ marginTop: 10 }}>
                We will email a confirmation code to this address before you pay.
              </p>
            </div>
          )}

          <button
            className="btn btn-primary checkout-continue"
            onClick={startOrder}
            disabled={!account || creating}
          >
            {creating ? 'Sending code...' : 'Continue'}
          </button>

          <p className="checkout-footnote">
            No MyVizen account yet?{' '}
            <Link to="/download">Download the app and register free</Link> — it
            takes a minute, and the free plan runs for 90 days.
          </p>
        </div>
      </div>
    </div>
  );
}
