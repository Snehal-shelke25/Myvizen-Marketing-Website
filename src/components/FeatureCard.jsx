import React from 'react';

export default function FeatureCard({ icon, title, desc, category }) {
  return (
    <div className="feature-grid-card">
      <div className="feature-grid-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      {category && (
        <span style={{ fontSize: '0.68rem', background: 'var(--bg-light-green)', color: 'var(--primary-mid)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', marginTop: '10px', display: 'inline-block', textTransform: 'uppercase' }}>
          {category}
        </span>
      )}
    </div>
  );
}
