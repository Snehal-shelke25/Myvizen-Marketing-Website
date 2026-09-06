import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LegalTabs() {
  return (
    <nav className="legal-tabs" aria-label="Legal pages">
      <NavLink to="/privacy" className={({ isActive }) => `legal-tab ${isActive ? 'active' : ''}`}>
        Privacy Policy
      </NavLink>
      <NavLink to="/terms" className={({ isActive }) => `legal-tab ${isActive ? 'active' : ''}`}>
        Terms & Conditions
      </NavLink>
    </nav>
  );
}
