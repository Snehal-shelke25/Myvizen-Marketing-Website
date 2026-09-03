import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { coachFeatures, memberFeatures } from '../data/featuresData';
import FeatureCard from '../components/FeatureCard';

export default function Features() {
  const [activeTab, setActiveTab] = useState('coaches');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const currentList = activeTab === 'coaches' ? coachFeatures : memberFeatures;

  const filteredFeatures = currentList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategoryFilter === 'all' || item.category === activeCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-header reveal active">
          <div className="section-badge"><span className="badge-dot"></span> Capabilities</div>
          <h2>Everything MyVizen <span>Can Do</span></h2>
          <p>Equipped with state-of-the-art tools tailored for coaches and members. Search or filter features dynamically.</p>
        </div>

        <div className="features-tabs-nav">
          <button 
            className={`features-tab-btn ${activeTab === 'coaches' ? 'active' : ''}`}
            onClick={() => { setActiveTab('coaches'); setActiveCategoryFilter('all'); }}
          >
            For Wellness Coaches ({coachFeatures.length})
          </button>
          <button 
            className={`features-tab-btn ${activeTab === 'members' ? 'active' : ''}`}
            onClick={() => { setActiveTab('members'); setActiveCategoryFilter('all'); }}
          >
            For Members / Clients ({memberFeatures.length})
          </button>
        </div>

        {/* Dynamic Search & Category Filter */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <input 
            type="text" 
            placeholder="🔍 Search features dynamically..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '100px', border: '1.5px solid var(--primary-mid)', fontSize: '0.88rem', outline: 'none', minWidth: '260px' }}
          />

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['all', 'analytics', 'nutrition', 'management', 'communication'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  border: '1px solid var(--primary-mid)',
                  background: activeCategoryFilter === cat ? 'var(--primary-mid)' : 'transparent',
                  color: activeCategoryFilter === cat ? '#fff' : 'var(--primary-dark)',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-pane active" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {filteredFeatures.map((item) => (
            <FeatureCard 
              key={item.id}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              category={item.category}
            />
          ))}

          {filteredFeatures.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: '#f8fafc', borderRadius: '16px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No features match your search query "{searchQuery}".</p>
              <button className="btn btn-outline" style={{ marginTop: '10px' }} onClick={() => { setSearchQuery(''); setActiveCategoryFilter('all'); }}>Reset Search</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/features" className="btn btn-primary">Deeper Features Breakdown</Link>
        </div>
      </div>
    </section>
  );
}
