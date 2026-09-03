import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import GuestModal from '../../components/GuestModal';
import AddGuestModal from '../../components/AddGuestModal';
import ReportModal from '../../components/ReportModal';
import { initialGuests } from '../../data/guestsData';

export default function GuestManagement() {
  const [guests, setGuests] = useState(initialGuests);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [reportGuest, setReportGuest] = useState(null);
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);

  const filteredGuests = guests.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.phone.includes(searchQuery);
    const matchesStatus = activeFilter === 'all' || g.status === activeFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddGuest = (newGuest) => {
    setGuests([newGuest, ...guests]);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <AdminHeader 
          title="Guest Directory & Client Profiles" 
          subtitle="Manage active members, intake logs, baseline metrics & body transformation progress"
          onAddGuest={() => setIsAddGuestOpen(true)}
        />

        <div className="admin-page-body">
          {/* Controls Bar */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <input 
              type="text" 
              placeholder="🔍 Search client by name or phone..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              style={{ padding: '10px 18px', borderRadius: '100px', border: '1px solid #cbd5e1', minWidth: '280px', outline: 'none' }}
            />

            <div style={{ display: 'flex', gap: '6px' }}>
              {['all', 'excellent', 'on-track', 'at-risk', 'no-log'].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    border: '1px solid var(--primary-mid)',
                    background: activeFilter === status ? 'var(--primary-mid)' : '#ffffff',
                    color: activeFilter === status ? '#ffffff' : 'var(--primary-dark)',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {status.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Cards Table */}
          <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th style={{ padding: '14px 18px', color: 'var(--primary-dark)' }}>Client Name</th>
                  <th style={{ padding: '14px 18px', color: 'var(--primary-dark)' }}>Phone / Contact</th>
                  <th style={{ padding: '14px 18px', color: 'var(--primary-dark)' }}>BMI / Body Fat</th>
                  <th style={{ padding: '14px 18px', color: 'var(--primary-dark)' }}>Compliance</th>
                  <th style={{ padding: '14px 18px', color: 'var(--primary-dark)' }}>Status</th>
                  <th style={{ padding: '14px 18px', color: 'var(--primary-dark)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((g) => (
                  <tr key={g.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <img src={g.avatar} alt={g.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <strong style={{ color: 'var(--primary-dark)', display: 'block' }}>{g.name}</strong>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{g.age} yrs · {g.gender}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--text-body)' }}>{g.phone}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>{g.metrics.bmi} BMI</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>{g.metrics.bodyFat}% Fat</span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ fontWeight: '800', color: g.complianceRate > 80 ? '#16a34a' : '#d97706' }}>{g.complianceRate}%</span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        background: g.status === 'excellent' ? '#dcfce7' : g.status === 'on-track' ? '#fef3c7' : '#fee2e2',
                        color: g.status === 'excellent' ? '#15803d' : g.status === 'on-track' ? '#b45309' : '#dc2626'
                      }}>
                        {g.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.75rem', marginRight: '6px' }} onClick={() => setSelectedGuest(g)}>
                        View Profile
                      </button>
                      <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => setReportGuest(g)}>
                        📄 Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <GuestModal guest={selectedGuest} onClose={() => setSelectedGuest(null)} onGenerateReport={(g) => setReportGuest(g)} />
        <ReportModal guest={reportGuest} onClose={() => setReportGuest(null)} />
        <AddGuestModal isOpen={isAddGuestOpen} onClose={() => setIsAddGuestOpen(false)} onAddGuest={handleAddGuest} />
      </div>
    </div>
  );
}
