import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MOCK_PLANS } from '../mocks/plans';
import { usePlans } from '../checkout/usePlans';

export default function PricingPage() {
  const [durationMonths, setDurationMonths] = useState(3); // 1, 3, 6, 12

  const navigate = useNavigate();

  // Pricing, durations and discounts all come from the server. The local table
  // supplies only marketing copy (subtitles, feature lists).
  const {
    loading: plansLoading, error: plansError, enabled: paymentsEnabled,
    durations, priceFor, discountFor,
  } = usePlans();

  const calculatePlanAmount = (planId, months) => {
    const fromServer = priceFor(planId, months);
    if (fromServer !== null) return fromServer;
    // Before the catalogue loads, show the undiscounted figure rather than a
    // blank card — it is corrected the moment the request lands.
    const monthly = MOCK_PLANS.find((p) => p.id === planId)?.monthlyPrice || 0;
    return Math.round(monthly * months);
  };

  const proceedToCheckout = (plan) => {
    navigate('/checkout/account', {
      state: {
        planCode: plan.id,
        planName: plan.name,
        months: durationMonths,
        amount: calculatePlanAmount(plan.id, durationMonths),
      },
    });
  };

  const handleChoosePlan = (plan) => {
    if (plan.id === 'free') {
      navigate('/download');
      return;
    }
    if (!paymentsEnabled) return;
    // No sign-in gate here on purpose. This used to open the ADMIN login modal,
    // which a coach buying a plan has no credentials for. Checkout identifies
    // the account itself — lookup, then a code emailed to the registered
    // address — which is both easier and a stronger check than a password.
    proceedToCheckout(plan);
  };

  const getDiscountBadge = (months) => {
    const percent = discountFor(months);
    if (percent > 0) return `Save ${percent}%`;
    return null;
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <div className="container">

        {/* Payments are inert until a UPI id is configured on the server. Say
            so plainly rather than letting the buttons do nothing. */}
        {plansError && (
          <div className="checkout-error" role="alert" style={{ marginBottom: 20 }}>
            <strong>Could not load current pricing.</strong>{' '}
            The figures below may be out of date — please refresh before paying.
          </div>
        )}

        {!paymentsEnabled && (
          <div className="checkout-error" role="status" style={{ marginBottom: 28 }}>
            <strong>Online payment is temporarily unavailable.</strong>{' '}
            Please contact support to activate or renew your plan — we can set
            it up for you directly.
          </div>
        )}



        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <span style={{
            background: 'rgba(34, 197, 94, 0.12)',
            color: '#15803d',
            fontSize: '0.8rem',
            fontWeight: '800',
            padding: '6px 16px',
            borderRadius: '100px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'inline-block',
            marginBottom: '16px',
          }}>
            🌿 MYVIZEN SUBSCRIPTION PLANS
          </span>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: '800', color: '#09381e', lineHeight: 1.2, marginBottom: '12px' }}>
            Simple plans for wellness coaches
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>
            Start free for 90 days. No card needed. Upgrade anytime for advanced body analysis & messaging.
          </p>
        </div>

        {/* ── BILLING DURATION SELECTOR (1, 3, 6, 12 Months) ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
          <div style={{
            background: '#ffffff',
            padding: '6px',
            borderRadius: '100px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.06)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            border: '1px solid #e2e8f0',
          }}>
            {/* Durations come from the server too, so adding or removing one
                is a backend change rather than an edit in two places. */}
            {(durations.length ? durations.map((d) => d.months) : [1, 3, 6, 12]).map(m => {
              const active = durationMonths === m;
              const badge = getDiscountBadge(m);

              return (
                <button
                  key={m}
                  onClick={() => setDurationMonths(m)}
                  style={{
                    border: 'none',
                    background: active ? 'linear-gradient(135deg, #09381e 0%, #15803d 100%)' : 'transparent',
                    color: active ? '#ffffff' : '#475569',
                    padding: '10px 20px',
                    borderRadius: '100px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{m} {m === 1 ? 'Month' : 'Months'}</span>
                  {badge && (
                    <span style={{
                      background: active ? '#22c55e' : '#dcfce7',
                      color: active ? '#ffffff' : '#15803d',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '100px',
                    }}>
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PRICING CARDS GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          alignItems: 'stretch',
          marginBottom: '60px',
        }}>
          {MOCK_PLANS.map(plan => {
            const isPopular = plan.popular;
            const isElite = plan.id === 'elite';
            const totalAmount = calculatePlanAmount(plan.id, durationMonths);
            const monthlyEquivalent = Math.round(totalAmount / durationMonths);

            return (
              <div
                key={plan.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  border: isPopular
                    ? '2.5px solid #22c55e'
                    : isElite
                    ? '1.5px solid #f97316'
                    : '1px solid #e2e8f0',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isPopular
                    ? '0 16px 40px rgba(34,197,94,0.18)'
                    : '0 4px 20px rgba(15,23,42,0.04)',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isPopular ? 'scale(1.02)' : 'none',
                }}
              >
                <div>
                  {/* Badge */}
                  {plan.badge && (
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        padding: '6px 14px',
                        borderRadius: '100px',
                        background: isPopular ? '#22c55e' : isElite ? '#ffedd5' : '#f1f5f9',
                        color: isPopular ? '#ffffff' : isElite ? '#c2410c' : '#475569',
                        letterSpacing: '0.5px',
                      }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan Title & Subtitle */}
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', color: '#09381e', margin: '0 0 8px 0' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0 0 24px 0', minHeight: '42px', lineHeight: 1.5 }}>
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '800', color: isElite ? '#ea580c' : '#09381e' }}>
                        {plan.id === 'free' ? '₹0' : `₹${monthlyEquivalent}`}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '600' }}>/ month</span>
                    </div>

                    {durationMonths > 1 && plan.id !== 'free' && (
                      <p style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '700', margin: '4px 0 0 0' }}>
                        Billed as ₹{totalAmount.toLocaleString()} for {durationMonths} months
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: feat.included ? 1 : 0.4 }}>
                        <div style={{
                          width: '22px', height: '22px', borderRadius: '50%',
                          background: feat.included ? '#f0fdf4' : '#f1f5f9',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {feat.included ? (
                            <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: '800' }}>✓</span>
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>✕</span>
                          )}
                        </div>
                        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: feat.included ? '#334155' : '#94a3b8' }}>
                          {feat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleChoosePlan(plan)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '14px',
                    border: 'none',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: plan.id === 'free'
                      ? '#f1f5f9'
                      : isElite
                      ? 'linear-gradient(135deg, #d97706 0%, #c2410c 100%)'
                      : 'linear-gradient(135deg, #09381e 0%, #15803d 100%)',
                    color: plan.id === 'free' ? '#475569' : '#ffffff',
                    boxShadow: plan.id !== 'free' ? '0 8px 24px rgba(0,0,0,0.12)' : 'none',
                  }}
                >
                  {plan.id === 'free'
                    ? 'Start Free 90 Days'
                    : isPopular
                    ? 'Choose Professional →'
                    : 'Choose Elite →'}
                </button>
              </div>
            );
          })}
        </div>

        {/* ── FOOTER TRUST BANNER ── */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>⚡</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#09381e' }}>Instant Activation within 12h</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>🛡️</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#09381e' }}>Manual UPI Verification</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>💬</span>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#09381e' }}>Dedicated Coach Support</span>
          </div>
        </div>

      </div>

    </div>
  );
}
