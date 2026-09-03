import React from 'react';

export default function MarqueeTicker() {
  const items = [
    '🍃 Body Composition Reports',
    '📊 Instant PDF Download',
    '🥗 Diet Blueprint Architect',
    '🔔 Hydration & Supplement Alarms',
    '👥 Physical Center Visitor Registry',
    '💬 1-on-1 & Group Broadcasts',
    '⚡ 100% Free Member Access',
    '🏆 Transformation Progress Charts'
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-light-green)', borderTop: '1px solid rgba(34, 197, 94, 0.15)', borderBottom: '1px solid rgba(34, 197, 94, 0.15)', padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-flex', gap: '40px', animation: 'marquee 25s linear infinite' }}>
        {[...items, ...items, ...items].map((text, idx) => (
          <span key={idx} style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '0.88rem', color: 'var(--primary-dark)', display: 'inline-flex', alignItems: 'center' }}>
            {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
