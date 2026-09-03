import React from 'react';

export default function TestimonialCard({ name, role, club, quote, avatar, rating }) {
  return (
    <div className="testimonial-card" style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(22,101,52,0.06)' }}>
      <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '12px', fontSize: '0.9rem' }}>
        {[...Array(rating || 5)].map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', fontStyle: 'italic', marginBottom: '18px' }}>
        "{quote}"
      </p>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {avatar && (
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-green)' }}>
            <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>{name}</h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{role} · {club}</p>
        </div>
      </div>
    </div>
  );
}
