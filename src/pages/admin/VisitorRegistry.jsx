import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { initialVisitors } from '../../data/visitorsData';

export default function VisitorRegistry() {
  const [visitors, setVisitors] = useState(initialVisitors);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('Weight Loss Program Query');

  const handleAddVisitor = (e) => {
    e.preventDefault();
    const newV = {
      id: `V${Date.now().toString().slice(-3)}`,
      name,
      phone,
      visitTime: 'Just now',
      purpose,
      status: 'Follow-up',
      assignedCoach: 'Snehal Shelke',
      notes: 'New walk-in visitor entry.'
    };
    setVisitors([newV, ...visitors]);
    setName('');
    setPhone('');
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <AdminHeader 
          title="Physical Center Visitor Registry" 
          subtitle="Log daily walk-in guests, track visit reasons, and convert walk-ins to active members" 
        />

        <div className="admin-page-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            {/* Quick Walk-in Entry Form */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '14px' }}>
                🏪 Quick Walk-in Entry
              </h3>

              <form onSubmit={handleAddVisitor} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Visitor Name</label>
                  <input type="text" required placeholder="e.g. Priya Mehta" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Phone Number</label>
                  <input type="tel" required placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Visit Purpose</label>
                  <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '6px' }}>
                  + Log Visitor Entry
                </button>
              </form>
            </div>

            {/* Visitor Table */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '14px' }}>
                📋 Today's Visitor Diary
              </h3>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <tr>
                    <th style={{ padding: '10px 12px', color: 'var(--primary-dark)' }}>Name</th>
                    <th style={{ padding: '10px 12px', color: 'var(--primary-dark)' }}>Phone</th>
                    <th style={{ padding: '10px 12px', color: 'var(--primary-dark)' }}>Purpose</th>
                    <th style={{ padding: '10px 12px', color: 'var(--primary-dark)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((v) => (
                    <tr key={v.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 12px', fontWeight: '700', color: 'var(--primary-dark)' }}>{v.name}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--text-body)' }}>{v.phone}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{v.purpose}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '100px', fontWeight: '700', background: v.status === 'Converted' ? '#dcfce7' : '#fef3c7', color: v.status === 'Converted' ? '#15803d' : '#b45309' }}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
