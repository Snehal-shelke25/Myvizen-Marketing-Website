import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import CheckoutStepsHeader from '../../components/CheckoutStepsHeader';
import * as checkoutApi from '../../checkout/api';
import { getCheckout } from '../../checkout/session';

const money = (n) => `Rs. ${Number(n || 0).toLocaleString('en-IN')}`;

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked — the value is on screen to type */ }
  };
  return (
    <div className="checkout-copy-row">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <button type="button" className="btn btn-outline" onClick={copy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

/**
 * Step 4 — pay.
 *
 * The whole order is re-read from the server on mount. This screen is the one
 * the coach leaves (to open GPay/PhonePe) and returns to, and on mobile that
 * round trip frequently reloads the tab. Anything held only in memory would be
 * gone exactly when the amount on screen matters most.
 *
 * The QR and the button encode the same upi:// URI the server built, with the
 * amount and the order reference already filled in, so neither can be mistyped.
 */
export default function PayStep() {
  const navigate = useNavigate();
  const location = useLocation();

  const session = getCheckout();
  const orderId = location.state?.orderId || session?.orderId;
  const token = session?.token;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isMobile = typeof navigator !== 'undefined'
    && /android|iphone|ipad|ipod/i.test(navigator.userAgent);

  useEffect(() => {
    if (!orderId || !token) { navigate('/pricing', { replace: true }); return; }
    let active = true;
    checkoutApi.getOrder(orderId, token)
      .then((data) => {
        if (!active) return;
        setOrder(data);
        // Coming back after already submitting proof should not offer to pay
        // again — send them to the status page instead.
        if (['under_review', 'approved', 'rejected'].includes(data.status)) {
          navigate(`/order/${orderId}?t=${token}`, { replace: true });
        }
      })
      .catch((err) => { if (active) setError(err.message || 'Could not load this order.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [orderId, token, navigate]);

  if (loading) {
    return (
      <div className="checkout-page">
        <CheckoutStepsHeader currentStep={4} />
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="checkout-card"><p>Loading payment details...</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <CheckoutStepsHeader currentStep={4} />

      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="checkout-card">
          {error && <div className="checkout-error" role="alert">{error}</div>}

          {order && (
            <>
              <p className="checkout-help">Order {order.order_id}</p>
              <h2 className="checkout-amount">Pay {money(order.amount)}</h2>

              {order.upi_link ? (
                <>
                  {isMobile ? (
                    <>
                      <a href={order.upi_link} className="btn btn-primary checkout-continue">
                        Pay with your UPI app
                      </a>
                      <p className="checkout-help checkout-centered">
                        Opens GPay, PhonePe, Paytm or any UPI app you have installed.
                      </p>
                      <details className="checkout-details">
                        <summary>Show QR code instead</summary>
                        <div className="checkout-qr">
                          <QRCodeCanvas value={order.upi_link} size={200} level="M" includeMargin />
                        </div>
                      </details>
                    </>
                  ) : (
                    <>
                      <div className="checkout-qr">
                        <QRCodeCanvas value={order.upi_link} size={220} level="M" includeMargin />
                      </div>
                      <p className="checkout-help checkout-centered">
                        Scan with any UPI app on your phone
                      </p>
                    </>
                  )}

                  <div className="checkout-divider"><span>or pay manually</span></div>

                  <CopyField label="UPI ID" value={order.upi_vpa} />
                  <CopyField label="Amount" value={String(order.amount)} />
                  <CopyField label="Payment note" value={order.order_id} />

                  <div className="checkout-payee">
                    Payment is received by <strong>{order.payee_name}</strong> —
                    this is the name your UPI app will show.
                  </div>

                  <div className="checkout-warning">
                    Pay the exact amount and, if your app allows it, include the
                    order number in the note.
                  </div>

                  <button className="btn btn-primary checkout-continue"
                          onClick={() => navigate('/checkout/proof', { state: { orderId } })}>
                    I have paid — submit details
                  </button>

                  <p className="checkout-security">
                    MyVizen will never ask for your UPI PIN or an OTP from your bank.
                  </p>
                </>
              ) : (
                <div className="checkout-error">
                  Online payment is not available right now. Please contact
                  support to complete your subscription.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
