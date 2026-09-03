import React, { useState, useEffect } from 'react';
import { statsData } from '../data/statsData';

export default function StatsBar() {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCounts((prevCounts) =>
        prevCounts.map((current, idx) => {
          const target = statsData[idx].value;
          const stepValue = Math.ceil(target / steps);
          if (current + stepValue >= target) {
            return target;
          }
          return current + stepValue;
        })
      );
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="stats-bar" style={{ backgroundColor: '#09381e', padding: '40px 0', color: '#ffffff' }}>
      <div className="container">
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
          {statsData.map((stat, idx) => (
            <div key={stat.id} className="stat-card">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-green)', margin: '0 0 4px 0' }}>
                {counts[idx].toLocaleString()}{stat.suffix}
              </h3>
              <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', margin: '0 0 2px 0' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
