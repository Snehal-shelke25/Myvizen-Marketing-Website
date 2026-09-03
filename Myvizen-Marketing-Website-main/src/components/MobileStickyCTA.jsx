import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileStickyCTA() {
  return (
    <div className="sticky-mobile-cta" id="sticky-cta">
      <div>
        <h4>Vizen</h4>
        <p>Your herbal wellness coach app</p>
      </div>
      <Link to="/download" className="btn btn-primary btn-pulse" style={{ borderRadius: '100px', fontSize: '0.85rem', padding: '8px 18px' }}>
        Download Free
      </Link>
    </div>
  );
}
