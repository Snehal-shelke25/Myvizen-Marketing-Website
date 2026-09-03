import React from 'react';
import { Link } from 'react-router-dom';

export default function SupportPage() {
  return (
    <div style={{ paddingTop: '110px', paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#15803d', background: '#dcfce7', padding: '4px 14px', borderRadius: '100px' }}>
            MYVIZEN HELP CENTER
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '800', color: '#09381e', marginTop: '12px' }}>
            Coach Support & Knowledge Base
          </h1>
          <p style={{ fontSize: '1rem', color: '#64748b' }}>
            Need help with subscription activation, body reports, or client onboarding?
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }}>💳</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '800', color: '#09381e', margin: '0 0 6px 0' }}>Subscription Help</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 16px 0' }}>Learn how to activate plans via UPI or assign client subscriptions.</p>
            <Link to="/pricing" style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: '700', textDecoration: 'none' }}>View Pricing →</Link>
          </div>

          <div style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }}>📄</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '800', color: '#09381e', margin: '0 0 6px 0' }}>Body Composition Reports</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 16px 0' }}>Generate PDF scorecards with 9 health metrics instantly.</p>
            <Link to="/features" style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: '700', textDecoration: 'none' }}>Learn Features →</Link>
          </div>

          <div style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }}>💬</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '800', color: '#09381e', margin: '0 0 6px 0' }}>Direct Coach Assistance</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 16px 0' }}>Our team is online to assist with center setups.</p>
            <Link to="/contact" style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: '700', textDecoration: 'none' }}>Contact Us →</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
