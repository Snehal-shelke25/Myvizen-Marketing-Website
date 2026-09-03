import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

export default function AdminSettings() {
  const [centerName, setCenterName] = useState('Charming Aura Wellness Center');
  const [coachName, setCoachName] = useState('Snehal Shelke');
  const [phone, setPhone] = useState('+91 87880 84735');
  const [city, setCity] = useState('Pune');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <AdminHeader 
          title="Center Administration & Coach Settings" 
          subtitle="Configure physical center details, coach roles, partner access & branding logo" 
        />

        <div className="admin-page-body">
          <div style={{ maxWidth: '600px', background: '#ffffff', borderRadius: '20px', padding: '30px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '20px' }}>
              🏢 Center Profile Settings
            </h3>

            {saved && (
              <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', fontWeight: '700' }}>
                ✓ Settings saved successfully!
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Wellness Center Name</label>
                <input type="text" value={centerName} onChange={(e) => setCenterName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Coach / Owner Name</label>
                <input type="text" value={coachName} onChange={(e) => setCoachName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>Phone</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary-dark)' }}>City</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                Save Profile Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
