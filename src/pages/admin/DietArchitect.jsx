import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { dietTemplates } from '../../data/dietPlansData';

export default function DietArchitect() {
  const [templates, setTemplates] = useState(dietTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState(dietTemplates[0]);

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <AdminHeader 
          title="Diet Plan Architect & Herbal Templates" 
          subtitle="Build meal-by-meal structures, specify portions, set herbal supplements & assign to clients" 
        />

        <div className="admin-page-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            {/* Template Selector */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '14px' }}>
                📋 Active Templates
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl)}
                    style={{
                      background: selectedTemplate.id === tpl.id ? 'var(--bg-light-green)' : '#ffffff',
                      border: selectedTemplate.id === tpl.id ? '2px solid var(--accent-green)' : '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                      {tpl.category}
                    </span>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--primary-dark)', margin: '6px 0 2px 0' }}>{tpl.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{tpl.calories} kcal · {tpl.protein} protein</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Detail View */}
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>{selectedTemplate.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{selectedTemplate.description}</p>
                </div>
                <button className="btn btn-primary" onClick={() => alert(`Assigned ${selectedTemplate.name} to client!`)}>
                  Assign to Guest
                </button>
              </div>

              <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '12px' }}>
                🍽️ Daily Meal Blueprint
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedTemplate.meals.map((m, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', borderLeft: '4px solid var(--accent-green)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--primary-dark)' }}>{m.title}</strong>
                      <span style={{ fontSize: '0.72rem', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', color: '#475569', fontWeight: '700' }}>{m.time}</span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', margin: 0 }}>{m.items}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
