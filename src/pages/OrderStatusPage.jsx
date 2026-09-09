import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import * as checkoutApi from '../checkout/api';
import { clearCheckout, getLastOrder, rememberOrder } from '../checkout/session';

const money = (n) => `Rs. ${Number(n || 0).toLocaleString('en-IN')}`;
const PLAN_LABELS = { professional: 'Professional', elite: 'Elite', free: 'Free' };

const formatWhen = (value) => (value
  ? new Date(value).toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  : null);

const STEPS = ['Submitted', 'Verifying', 'Active'];

/**
 * The page a coach returns to while waiting.
 *
 * Manual activation means there is a gap between paying and getting the plan.
 * A link they can reopen turns that gap from anxiety ("did my money vanish?")
 * into patience, which is why the URL carries a token and is emailed to them.
 */
export default function OrderStatusPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const remembered = getLastOrder();
  const token = searchParams.get('t') || (remembered?.orderId === id ? remembered.token : null);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!id || !token) {
      setError('This order link is incomplete. Please use the link from your confirmation email.');
      setLoading(false);
      return;
    }
    try {
      const data = await checkoutApi.getOrder(id, token);
      setOrder(data);
      rememberOrder(id, token);
      if (data.status === 'approved') clearCheckout();
    } catch (err) {
      setError(err.message || 'Could not load this order.');
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => { load(); }, [load]);

  // While a payment is being checked, refresh quietly so the coach sees the
  // result without having to reload the page themselves.
  useEffect(() => {
    if (order?.status !== 'under_review') return undefined;
    const timer = setInterval(load, 60000);
    return () => clearInterval(timer);
  }, [order?.status, load]);

  const stepIndex = order?.status === 'approved' ? 2
    : order?.status === 'under_review' ? 1
    : 0;

  return (
    <div className="checkout-page">
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="checkout-card">
          {loading ? (
            <p>Loading your order...</p>
          ) : error ? (
            <>
              <h2>We could not open this order</h2>
              <div className="checkout-error" role="alert">{error}</div>
              <Link to="/support" className="btn btn-outline checkout-continue">
                Contact support
              </Link>
            </>
          ) : order && (
            <>
              <p className="checkout-help">Order {order.order_id}</p>

              {order.status !== 'rejected' && (
                <ol className="checkout-progress" aria-label="Order progress">
                  {STEPS.map((label, index) => (
                    <li key={label}
                        className={index <= stepIndex ? 'is-done' : ''}
                        aria-current={index === stepIndex ? 'step' : undefined}>
                      <span className="checkout-progress-dot" />
                      {label}
                    </li>
                  ))}
                </ol>
              )}

              {order.status === 'under_review' && (
                <div className="checkout-status checkout-status-wait">
                  <strong>Payment submitted</strong>
                  <p>
                    We are checking your payment against our bank statement.
                    Your plan will be active within {order.sla_hours || 12} working
                    hours. There is nothing more for you to do.
                  </p>
                  <span className="checkout-muted">
                    Submitted {formatWhen(order.submitted_at)}
                  </span>
                </div>
              )}

              {order.status === 'approved' && (
                <div className="checkout-status checkout-status-ok">
                  <strong>Your plan is active</strong>
                  <p>
                    {PLAN_LABELS[order.plan_code] || order.plan_code} is now
                    active for {order.months} month{order.months > 1 ? 's' : ''}.
                    Open the MyVizen app to see it.
                  </p>
                </div>
              )}

              {order.status === 'rejected' && (
                <div className="checkout-status checkout-status-bad">
                  <strong>We could not confirm this payment</strong>
                  <p>{order.admin_note || 'We could not match this payment to our records.'}</p>
                  <p>
                    If you were charged, contact us and we will refund you in
                    full within 5 working days.
                  </p>
                </div>
              )}

              {['created', 'verified'].includes(order.status) && (
                <div className="checkout-status checkout-status-wait">
                  <strong>Payment not submitted yet</strong>
                  <p>We have not received your payment details for this order.</p>
                  <Link to="/checkout/pay" className="btn btn-primary checkout-continue">
                    Continue payment
                  </Link>
                </div>
              )}

              {order.status === 'expired' && (
                <div className="checkout-status checkout-status-bad">
                  <strong>This order has expired</strong>
                  <p>Orders stay open for 7 days. Nothing was charged.</p>
                  <Link to="/pricing" className="btn btn-primary checkout-continue">
                    Start again
                  </Link>
                </div>
              )}

              <dl className="checkout-summary">
                <div><dt>Plan</dt>
                  <dd>{PLAN_LABELS[order.plan_code] || order.plan_code}, {order.months} month{order.months > 1 ? 's' : ''}</dd></div>
                <div><dt>Amount</dt><dd>{money(order.amount)}</dd></div>
                {order.utr && <div><dt>UPI reference</dt><dd>{order.utr}</dd></div>}
                <div><dt>Account</dt><dd>{order.email_masked}</dd></div>
              </dl>

              <p className="checkout-footnote">
                Need help? <Link to="/support">Contact support</Link> quoting
                order <strong>{order.order_id}</strong>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
