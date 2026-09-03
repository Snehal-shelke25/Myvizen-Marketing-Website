import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

export default function CenterAnalytics() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <AdminHeader 
          title="Center Analytics & Retention Metrics" 
          subtitle="Track walk-in conversions, active member growth, and report generation volumes" 
        />

        <div className="admin-page-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Walk-in Conversion</span>
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: '4px 0' }}>68%</h3>
              <p style={{ fontSize: '0.78rem', color: '#16a34a', margin: 0 }}>High conversion from visitor scans</p>
            </div>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Average Retention</span>
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: '4px 0' }}>94 days</h3>
              <p style={{ fontSize: '0.78rem', color: '#16a34a', margin: 0 }}>Active streak with habit alarms</p>
            </div>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Reports Generated</span>
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: '4px 0' }}>3.2x</h3>
              <p style={{ fontSize: '0.78rem', color: '#16a34a', margin: 0 }}>More PDFs created vs last quarter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
