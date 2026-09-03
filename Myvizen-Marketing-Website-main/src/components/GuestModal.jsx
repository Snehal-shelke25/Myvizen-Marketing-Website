import React from 'react';

export default function GuestModal({ guest, onClose, onGenerateReport }) {
  if (!guest) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #22c55e' }}>
              <img src={guest.avatar} alt={guest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>{guest.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{guest.age} yrs · {guest.gender} · {guest.phone}</p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>BMI</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{guest.metrics.bmi}</strong>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Body Fat %</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{guest.metrics.bodyFat}%</strong>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Muscle Mass</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{guest.metrics.muscleMass}%</strong>
          </div>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Compliance</span>
            <strong style={{ fontSize: '1.1rem', color: '#16a34a' }}>{guest.complianceRate}%</strong>
          </div>
        </div>

        <div style={{ background: 'var(--bg-light-green)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <h5 style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary-dark)', marginBottom: '4px' }}>🎯 Target Transformation Goal</h5>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', margin: 0 }}>{guest.goal}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={() => { onClose(); onGenerateReport(guest); }}>Generate PDF Report</button>
        </div>
      </div>
    </div>
  );
}
