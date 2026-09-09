import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLastOrder } from './session';

/**
 * "Check my order" — what someone returning to the site actually wants.
 *
 * This replaces a "Coach Login" button that opened a modal backed by mock data
 * and called the ADMIN login endpoint with a hardcoded demo password. Coaches
 * have no web account by design: checkout identifies them by email plus a code
 * sent to their registered address, which is both easier and a stronger check
 * than a password they would have to remember.
 */
export default function OrderLookupModal({ onClose }) {
  const navigate = useNavigate();
  const remembered = getLastOrder();

  const [orderId, setOrderId] = useState(remembered?.orderId || '');
  const [token, setToken] = useState(remembered?.token || '');
  const [error, setError] = useState('');

  const open = (event) => {
    event.preventDefault();
    const id = orderId.trim().toUpperCase();
    if (!id) { setError('Enter your order number.'); return; }
    if (!token.trim()) {
      setError('Open your order using the link in your confirmation email — it carries the code that unlocks the page.');
      return;
    }
    onClose();
    navigate(`/order/${id}?t=${token.trim()}`);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal-card" style={{ maxWidth: '460px' }}
           onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <h3>Check your order</h3>
        <p className="checkout-help">
          Your order number is in the confirmation email we sent when you
          submitted your payment.
        </p>

        {remembered && (
          <button type="button" className="btn btn-primary checkout-continue"
                  style={{ marginTop: 0, marginBottom: 16 }}
                  onClick={() => {
                    onClose();
                    navigate(`/order/${remembered.orderId}?t=${remembered.token}`);
                  }}>
            Open my last order ({remembered.orderId})
          </button>
        )}

        <form onSubmit={open}>
          <label className="checkout-label" htmlFor="lookup-order">Order number</label>
          <input id="lookup-order" className="admin-input" value={orderId}
                 placeholder="MV-2609-00123"
                 onChange={(e) => { setOrderId(e.target.value); setError(''); }} />

          <label className="checkout-label" htmlFor="lookup-token">
            Access code <span className="checkout-optional">(from your email link)</span>
          </label>
          <input id="lookup-token" className="admin-input" value={token}
                 onChange={(e) => { setToken(e.target.value); setError(''); }} />

          {error && <div className="checkout-error" role="alert">{error}</div>}

          <div className="admin-modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Open order</button>
          </div>
        </form>

        <p className="checkout-footnote">
          Signing in to manage clients happens in the MyVizen app, not here.
        </p>
      </div>
    </div>
  );
}
