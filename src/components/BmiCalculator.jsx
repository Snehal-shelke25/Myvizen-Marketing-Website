import React, { useState } from 'react';

export default function BmiCalculator() {
  const [height, setHeight] = useState(168);
  const [weight, setWeight] = useState(63.5);
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState('female');

  // Dynamic calculations
  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
  
  // Estimated metrics calculation
  const genderFactor = gender === 'female' ? 5.4 : 16.2;
  const estimatedFat = Math.max(10, Math.min(45, (1.20 * bmi) + (0.23 * age) - genderFactor)).toFixed(1);
  const visceralFat = (bmi * 0.28).toFixed(1);
  const skeletalMuscle = Math.max(30, Math.min(55, 100 - estimatedFat - 33)).toFixed(1);
  const bodyWater = (100 - estimatedFat - 15).toFixed(1);

  // Status badge calculation
  let statusText = 'Normal';
  let statusColor = '#22c55e';
  let statusBg = 'rgba(34,197,94,0.15)';

  if (bmi < 18.5) {
    statusText = 'Underweight';
    statusColor = '#f59e0b';
    statusBg = 'rgba(245,158,11,0.15)';
  } else if (bmi >= 25 && bmi < 30) {
    statusText = 'Overweight';
    statusColor = '#f97316';
    statusBg = 'rgba(249,115,22,0.15)';
  } else if (bmi >= 30) {
    statusText = 'Obese';
    statusColor = '#ef4444';
    statusBg = 'rgba(239,68,68,0.15)';
  }

  return (
    <div style={{ background: '#ffffff', borderRadius: '20px', padding: '28px', boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(22,101,52,0.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', color: 'var(--primary-dark)', fontSize: '1.25rem', margin: 0 }}>
            🧮 Live Body Composition Simulator
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Adjust height and weight sliders to calculate metrics in real-time
          </p>
        </div>
        <span style={{ fontSize: '0.7rem', background: statusBg, color: statusColor, padding: '4px 12px', borderRadius: '100px', fontWeight: '800', textTransform: 'uppercase' }}>
          {statusText}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Sliders Control */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '4px' }}>
              <span>Height (cm)</span>
              <span style={{ color: 'var(--primary-mid)' }}>{height} cm</span>
            </div>
            <input 
              type="range" 
              min="130" 
              max="210" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))} 
              style={{ width: '100%', accentColor: '#166534', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '4px' }}>
              <span>Weight (kg)</span>
              <span style={{ color: 'var(--primary-mid)' }}>{weight} kg</span>
            </div>
            <input 
              type="range" 
              min="35" 
              max="150" 
              step="0.5"
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))} 
              style={{ width: '100%', accentColor: '#166534', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '4px' }}>
              <span>Age (years)</span>
              <span style={{ color: 'var(--primary-mid)' }}>{age} yrs</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="80" 
              value={age} 
              onChange={(e) => setAge(Number(e.target.value))} 
              style={{ width: '100%', accentColor: '#166534', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Live Result Scorecard */}
        <div style={{ background: 'linear-gradient(135deg, #09381e 0%, #15803d 100%)', borderRadius: '16px', padding: '20px', color: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.7rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>Body Mass Index</span>
            <div style={{ fontSize: '2.8rem', fontWeight: '800', color: '#4ade80', lineHeight: 1.1 }}>{bmi}</div>
            <span style={{ fontSize: '0.72rem', background: statusBg, color: statusColor, padding: '2px 10px', borderRadius: '100px', fontWeight: '700' }}>
              {statusText} Range
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.72rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '6px 8px', borderRadius: '8px' }}>
              <span style={{ opacity: 0.8, display: 'block' }}>Fat %</span>
              <strong style={{ fontSize: '0.95rem', color: '#4ade80' }}>{estimatedFat}%</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '6px 8px', borderRadius: '8px' }}>
              <span style={{ opacity: 0.8, display: 'block' }}>Visceral Fat</span>
              <strong style={{ fontSize: '0.95rem', color: '#4ade80' }}>{visceralFat}</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '6px 8px', borderRadius: '8px' }}>
              <span style={{ opacity: 0.8, display: 'block' }}>Muscle %</span>
              <strong style={{ fontSize: '0.95rem', color: '#4ade80' }}>{skeletalMuscle}%</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.12)', padding: '6px 8px', borderRadius: '8px' }}>
              <span style={{ opacity: 0.8, display: 'block' }}>Water %</span>
              <strong style={{ fontSize: '0.95rem', color: '#4ade80' }}>{bodyWater}%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
