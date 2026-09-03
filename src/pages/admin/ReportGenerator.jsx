import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import ReportModal from '../../components/ReportModal';
import { initialGuests } from '../../data/guestsData';

export default function ReportGenerator() {
  const [selectedGuest, setSelectedGuest] = useState(initialGuests[0]);
  const [weight, setWeight] = useState(78.5);
  const [height, setHeight] = useState(175);
  const [bodyFat, setBodyFat] = useState(24.5);
  const [visceralFat, setVisceralFat] = useState(7.5);
  const [muscleMass, setMuscleMass] = useState(42.0);
  const [previewGuest, setPreviewGuest] = useState(null);

  const bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);

  const handleGenerate = (e) => {
    e.preventDefault();
    const updated = {
      ...selectedGuest,
      metrics: { height, weight, bmi, bodyFat, visceralFat, muscleMass, bodyWater: 56.5, metabolicRate: 1720 }
    };
    setPreviewGuest(updated);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <AdminHeader 
          title="Smart Body Composition Report Generator" 
          subtitle="Generate color-coded PDF scorecards with height, weight, body fat %, and visceral fat indices" 
        />

        <div className="admin-page-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Input Form */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '18px' }}>
                ✏️ Client Scan Measurements
              </h3>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Select Client</label>
                  <select 
                    value={selectedGuest.id} 
                    onChange={(e) => setSelectedGuest(initialGuests.find(g => g.id === e.target.value))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    {initialGuests.map(g => (
                      <option key={g.id} value={g.id}>{g.name} ({g.phone})</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Weight (kg)</label>
                    <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Height (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Body Fat %</label>
                    <input type="number" step="0.1" value={bodyFat} onChange={(e) => setBodyFat(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Visceral Fat Index</label>
                    <input type="number" step="0.5" value={visceralFat} onChange={(e) => setVisceralFat(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                  📄 Generate PDF Preview Scorecard
                </button>
              </form>
            </div>

            {/* Live Scorecard Preview */}
            <div style={{ background: '#09381e', borderRadius: '20px', padding: '24px', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.15)', color: '#4ade80', padding: '4px 10px', borderRadius: '100px', fontWeight: '800' }}>
                  LIVE PREVIEW SCORECARD
                </span>

                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '14px', color: '#ffffff' }}>{selectedGuest.name}</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0 }}>🏢 Charming Aura Wellness Center</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '20px 0', textAlign: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.65rem', opacity: 0.8, display: 'block' }}>BMI</span>
                    <strong style={{ fontSize: '1.2rem', color: '#4ade80' }}>{bmi}</strong>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.65rem', opacity: 0.8, display: 'block' }}>Fat %</span>
                    <strong style={{ fontSize: '1.2rem', color: '#4ade80' }}>{bodyFat}%</strong>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px' }}>
                    <span style={{ fontSize: '0.65rem', opacity: 0.8, display: 'block' }}>Muscle %</span>
                    <strong style={{ fontSize: '1.2rem', color: '#4ade80' }}>{muscleMass}%</strong>
                  </div>
                </div>
              </div>

              <button className="btn btn-secondary" onClick={() => setPreviewGuest({ ...selectedGuest, metrics: { height, weight, bmi, bodyFat, visceralFat, muscleMass } })}>
                Preview Full PDF Document
              </button>
            </div>
          </div>
        </div>

        <ReportModal guest={previewGuest} onClose={() => setPreviewGuest(null)} />
      </div>
    </div>
  );
}
