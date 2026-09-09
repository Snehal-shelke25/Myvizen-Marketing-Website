import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';
import * as checkoutApi from '../../checkout/api';
import { getCheckout } from '../../checkout/session';

const money = (n) => `Rs. ${Number(n || 0).toLocaleString('en-IN')}`;
const PLAN_LABELS = { professional: 'Professional', elite: 'Elite', free: 'Free' };

const formatDate = (value) => (value
  ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  : null);

/**
 * Step 3 — confirm what is being bought, read back from the server.
 *
 * Nothing here comes from the browser. If the coach still has days left on a
 * plan, we say so and show the date this purchase extends them to: paying
 * early must not look like it wastes what they already paid for, and that is
 * genuinely how grant_subscription() behaves on the server.
 */
export default function ReviewStep() {
  const navigate = useNavigate();
  const location = useLocation();

  const session = getCheckout();
  const orderId = location.state?.orderId || session?.orderId;
  const token = session?.token;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!orderId || !token) { navigate('/pricing', { replace: true }); return; }
    let active = true;
    checkoutApi.getOrder(orderId, token)
      .then((data) => { if (active) setOrder(data); })
      .catch((err) => { if (active) setError(err.message || 'Could not load this order.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [orderId, token, navigate]);

  if (loading) {
    return (
      <div className="checkout-page">
        <CheckoutStepsHeader currentStep={3} />
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="checkout-card"><p>Loading your order...</p></div>
        </div>
      </div>
    );
  }

  const extendsFrom = order?.current_plan?.status === 'active'
    && order?.current_plan?.days_remaining > 0
    ? order.current_plan
    : null;

  return (
    <div className="checkout-page">
      <CheckoutStepsHeader currentStep={3} />

      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="checkout-card">
          <h2>Confirm your order</h2>
          <p className="checkout-help">Order <strong>{orderId}</strong></p>

          {error && <div className="checkout-error" role="alert">{error}</div>}

          {order && (
            <>
              <dl className="checkout-summary">
                <div><dt>Plan</dt><dd>{PLAN_LABELS[order.plan_code] || order.plan_code}</dd></div>
                <div><dt>Duration</dt><dd>{order.months} month{order.months > 1 ? 's' : ''}</dd></div>
                <div><dt>Account</dt><dd>{order.email_masked}</dd></div>
                <div className="checkout-summary-total">
                  <dt>Amount payable</dt><dd>{money(order.amount)}</dd>
                </div>
              </dl>

              {extendsFrom && (
                <div className="checkout-note">
                  Your current plan runs to{' '}
                  <strong>{formatDate(extendsFrom.end_date)}</strong>. This
                  purchase is added on top — you lose no days by paying now.
                </div>
              )}

              <label className="checkout-agree">
                <input type="checkbox" checked={agreed}
                       onChange={(event) => setAgreed(event.target.checked)} />
                <span>
                  I agree to the <a href="/terms" target="_blank" rel="noreferrer">Terms</a>
                  {' '}and <a href="/refund-policy" target="_blank" rel="noreferrer">Refund Policy</a>.
                </span>
              </label>

              <button className="btn btn-primary checkout-continue"
                      disabled={!agreed}
                      onClick={() => navigate('/checkout/pay', { state: { orderId } })}>
                Continue to payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
