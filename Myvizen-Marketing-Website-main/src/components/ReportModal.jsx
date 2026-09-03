import React from 'react';

export default function ReportModal({ guest, onClose }) {
  if (!guest) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>📄 Body Composition Scorecard</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>Generated for {guest.name} · {guest.id}</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}>×</button>
        </div>

        {/* PDF Card Preview */}
        <div style={{ background: '#ffffff', border: '2px solid var(--primary-dark)', borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-md)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--accent-green)', paddingBottom: '12px', marginBottom: '16px' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', color: 'var(--primary-dark)', margin: 0, fontSize: '1.1rem' }}>🌿 Charming Aura Wellness Center</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Coach: Snehal Shelke · Date: {new Date().toLocaleDateString()}</p>
            </div>
            <span style={{ fontSize: '0.7rem', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '100px', fontWeight: '800' }}>VERIFIED SCAN</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', borderTop: '3px solid #22c55e' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>BMI Index</span>
              <strong style={{ fontSize: '1.4rem', color: 'var(--primary-dark)' }}>{guest.metrics?.bmi || 23.8}</strong>
              <span style={{ fontSize: '0.62rem', color: '#16a34a', display: 'block', fontWeight: '700' }}>Normal</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', borderTop: '3px solid #f59e0b' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Fat %</span>
              <strong style={{ fontSize: '1.4rem', color: 'var(--primary-dark)' }}>{guest.metrics?.bodyFat || 22.5}%</strong>
              <span style={{ fontSize: '0.62rem', color: '#d97706', display: 'block', fontWeight: '700' }}>Attention</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', borderTop: '3px solid #0284c7' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Muscle Mass %</span>
              <strong style={{ fontSize: '1.4rem', color: 'var(--primary-dark)' }}>{guest.metrics?.muscleMass || 44.0}%</strong>
              <span style={{ fontSize: '0.62rem', color: '#0284c7', display: 'block', fontWeight: '700' }}>Optimal</span>
            </div>
          </div>

          <div style={{ background: '#09381e', color: '#ffffff', borderRadius: '12px', padding: '14px', fontSize: '0.82rem' }}>
            <strong style={{ color: '#4ade80', display: 'block', marginBottom: '4px' }}>💡 Coach Recommendation:</strong>
            Follow the assigned Herbal Slimming & Hydration Plan. Ensure 3L water target daily and log supplement intake.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" onClick={() => alert(`Report link copied! Sent to ${guest.phone} via WhatsApp.`)}>
            💬 Share via WhatsApp
          </button>
          <button className="btn btn-primary" onClick={() => { alert('PDF Download started!'); onClose(); }}>
            📥 Download PDF Scorecard
          </button>
        </div>
      </div>
    </div>
  );
}
