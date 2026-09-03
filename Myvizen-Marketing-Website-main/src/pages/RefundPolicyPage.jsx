import React from 'react';
import { Link } from 'react-router-dom';

export default function RefundPolicyPage() {
  return (
    <div style={{ paddingTop: '110px', paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '48px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>

          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#15803d', background: '#dcfce7', padding: '4px 14px', borderRadius: '100px' }}>
            MYVIZEN POLICY
          </span>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '800', color: '#09381e', margin: '16px 0 8px 0' }}>
            Subscription & Refund Policy
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '32px' }}>
            Last Updated: September 3, 2026
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.95rem', color: '#334155', lineHeight: 1.7 }}>
            <h3 style={{ color: '#09381e', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: 0 }}>1. 90-Day Free Trial</h3>
            <p style={{ margin: 0 }}>
              All new wellness coaches registering on MyVizen receive 90 days of full platform access completely free of charge. No credit card or payment details are required during the trial.
            </p>

            <h3 style={{ color: '#09381e', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: 0 }}>2. Manual UPI Payments & Activation</h3>
            <p style={{ margin: 0 }}>
              Paid subscription plans (Professional ₹499/mo, Elite ₹999/mo) are activated via manual UPI verification. After submitting your 12-digit UTR reference number and payment proof, activation completes within 12 working hours.
            </p>

            <h3 style={{ color: '#09381e', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: 0 }}>3. Cancellation & Refund Terms</h3>
            <p style={{ margin: 0 }}>
              If a payment verification fails or if an accidental duplicate payment occurs, a 100% full refund is issued within 3-5 business days upon request to <strong>support@myvizen.com</strong>.
            </p>

            <h3 style={{ color: '#09381e', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: 0 }}>4. Contact Support</h3>
            <p style={{ margin: 0 }}>
              For any questions regarding refunds or plan activation, reach out to our dedicated support team at <Link to="/contact" style={{ color: '#15803d', fontWeight: '700' }}>MyVizen Contact</Link>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
