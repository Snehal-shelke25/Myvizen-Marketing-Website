import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OrderLookupModal from '../checkout/OrderLookupModal';

export default function PricingNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLookup, setShowLookup] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: '14px 0',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* ── Logo ── */}
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              fontFamily: 'var(--font-heading)',
              fontWeight: '800',
              fontSize: '1.35rem',
              color: '#09381e',
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #09381e, #22c55e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '0.95rem',
            }}>
              🌿
            </div>
            <span>MyVizen <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: '700', background: '#dcfce7', padding: '2px 8px', borderRadius: '100px', marginLeft: '4px' }}>Pricing Portal</span></span>
          </Link>

          {/* ── Pricing Portal Links ── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link
              to="/pricing"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: '700',
                color: isActive('/pricing') ? '#15803d' : '#334155',
                textDecoration: 'none',
              }}
            >
              🏷️ Plans & Billing
            </Link>
            <Link
              to="/features"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#334155',
                textDecoration: 'none',
              }}
            >
              ✨ Feature Comparison
            </Link>
            <Link
              to="/support"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#334155',
                textDecoration: 'none',
              }}
            >
              ❓ Activation Help
            </Link>
          </nav>

          {/* ── Order lookup ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* No signed-in state here on purpose. This used to read the
                ADMIN session and label whoever it found as "Coach: Snehal
                Shelke" with a link into the admin panel — on a page meant for
                coaches buying a plan, who have no web account at all. */}
            <button
              onClick={() => setShowLookup(true)}
              className="btn btn-outline"
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              Check my order
            </button>
          </div>

        </div>
      </header>

      {/* Order status lookup */}
      {showLookup && (
        <OrderLookupModal onClose={() => setShowLookup(false)} />
      )}
    </>
  );
}
