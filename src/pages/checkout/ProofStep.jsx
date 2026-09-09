import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';
import * as checkoutApi from '../../checkout/api';
import { getCheckout, rememberOrder } from '../../checkout/session';

const money = (n) => `Rs. ${Number(n || 0).toLocaleString('en-IN')}`;

/**
 * Step 5 — report the payment.
 *
 * The UTR is the value that appears identically in the coach's UPI app and in
 * our bank statement, so it is what actually lets an operator match the money
 * to this order. "Where do I find it?" is the most common question in this
 * whole flow, so the answer is on the page rather than in a support message.
 */
export default function ProofStep() {
  const navigate = useNavigate();
  const location = useLocation();

  const session = getCheckout();
  const orderId = location.state?.orderId || session?.orderId;
  const token = session?.token;

  const [order, setOrder] = useState(null);
  const [utr, setUtr] = useState('');
  const [payerName, setPayerName] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId || !token) { navigate('/pricing', { replace: true }); return; }
    let active = true;
    checkoutApi.getOrder(orderId, token)
      .then((data) => { if (active) setOrder(data); })
      .catch(() => { /* the form still works; the header just shows less */ });
    return () => { active = false; };
  }, [orderId, token, navigate]);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      await checkoutApi.submitProof(orderId, {
        token, utr: utr.trim(), payerName: payerName.trim(), note: note.trim(),
      });
      rememberOrder(orderId, token);
      navigate(`/order/${orderId}?t=${token}`, { replace: true });
    } catch (err) {
      setError(err.message || 'Could not submit your payment details.');
    } finally {
      setSaving(false);
    }
  };

  const cleanedUtr = utr.replace(/\s/g, '');

  return (
    <div className="checkout-page">
      <CheckoutStepsHeader currentStep={5} />

      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="checkout-card">
          <h2>Confirm your payment</h2>
          <p className="checkout-help">
            Order {orderId}{order ? ` · ${money(order.amount)}` : ''}
          </p>

          <form onSubmit={submit}>
            <label className="checkout-label" htmlFor="utr">
              UPI reference / UTR number
            </label>
            <input
              id="utr"
              className="admin-input"
              value={utr}
              onChange={(event) => setUtr(event.target.value)}
              placeholder="e.g. 452988110034"
              inputMode="numeric"
              required
            />
            <details className="checkout-details">
              <summary>Where do I find this?</summary>
              <ul className="checkout-hint-list">
                <li><strong>Google Pay</strong> — open the payment, tap it, look for "UPI transaction ID".</li>
                <li><strong>PhonePe</strong> — History, tap the payment, "Transaction ID".</li>
                <li><strong>Paytm</strong> — Balance &amp; History, tap the payment, "UPI Ref No".</li>
              </ul>
            </details>
            {cleanedUtr && cleanedUtr.length < 12 && (
              <p className="checkout-soft-warning">
                That looks short — most UPI references are 12 digits. Send it
                anyway if it matches your app.
              </p>
            )}

            <label className="checkout-label" htmlFor="payer">
              Name shown in your UPI app <span className="checkout-optional">(optional)</span>
            </label>
            <input
              id="payer"
              className="admin-input"
              value={payerName}
              onChange={(event) => setPayerName(event.target.value)}
              placeholder="Only if different from your MyVizen name"
            />

            <label className="checkout-label" htmlFor="note">
              Anything we should know? <span className="checkout-optional">(optional)</span>
            </label>
            <input
              id="note"
              className="admin-input"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />

            {error && <div className="checkout-error" role="alert">{error}</div>}

            <button type="submit" className="btn btn-primary checkout-continue"
                    disabled={saving || cleanedUtr.length < 8}>
              {saving ? 'Submitting...' : 'Submit for review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
