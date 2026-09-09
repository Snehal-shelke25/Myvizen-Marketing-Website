import React, { useMemo, useState } from 'react';

/**
 * Daily activity as a small stacked bar chart.
 *
 * Inline SVG rather than a charting library: it is one chart, and pulling in
 * Recharts for it would cost more in bundle size than the whole admin module.
 */
const SERIES = [
  { key: 'reports', label: 'Reports', color: '#15803d' },
  { key: 'guests', label: 'Guests', color: '#0ea5e9' },
  { key: 'coaches', label: 'Coaches', color: '#f59e0b' },
];

export default function TrendChart({ data = [], height = 150 }) {
  const [hover, setHover] = useState(null);

  const max = useMemo(
    () => Math.max(1, ...data.map((d) => d.reports + d.guests + d.coaches)),
    [data],
  );

  if (data.length === 0) return null;

  const totals = SERIES.map((s) => ({
    ...s, total: data.reduce((sum, d) => sum + (d[s.key] || 0), 0),
  }));

  const barWidth = 100 / data.length;

  return (
    <div>
      <div className="admin-trend-legend">
        {totals.map((s) => (
          <span key={s.key}>
            <i style={{ background: s.color }} />
            {s.label} <strong>{s.total}</strong>
          </span>
        ))}
      </div>

      <div className="admin-trend" style={{ height }}
           onMouseLeave={() => setHover(null)}>
        <svg width="100%" height={height} preserveAspectRatio="none"
             viewBox={`0 0 100 ${height}`} role="img"
             aria-label={`Activity over the last ${data.length} days`}>
          {data.map((day, index) => {
            const x = index * barWidth;
            let y = height;
            return (
              <g key={day.date}
                 onMouseEnter={() => setHover({ ...day, index })}>
                {/* Full-height hit area so thin bars are still hoverable. */}
                <rect x={x} y={0} width={barWidth} height={height} fill="transparent" />
                {SERIES.map((s) => {
                  const value = day[s.key] || 0;
                  if (!value) return null;
                  const h = (value / max) * (height - 4);
                  y -= h;
                  return (
                    <rect key={s.key} x={x + barWidth * 0.15} y={y}
                          width={barWidth * 0.7} height={h} fill={s.color} rx={0.6} />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {hover && (
          <div className="admin-trend-tip"
               style={{ left: `${Math.min(88, hover.index * barWidth)}%` }}>
            <strong>
              {new Date(hover.date).toLocaleDateString('en-IN',
                { day: 'numeric', month: 'short' })}
            </strong>
            {SERIES.map((s) => (
              <span key={s.key}>{s.label}: {hover[s.key] || 0}</span>
            ))}
          </div>
        )}
      </div>

      <div className="admin-trend-axis">
        <span>{new Date(data[0].date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        <span>Today</span>
      </div>
    </div>
  );
}
