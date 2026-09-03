import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" style={{ color: '#ffffff', marginBottom: '20px' }}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
              <path d="M17,8C15.34,8 14,9.34 14,11C14,12.66 15.34,14 17,14C18.66,14 20,12.66 20,11C20,9.34 18.66,8 17,8M17,12C16.45,12 16,11.55 16,11C16,10.45 16.45,10 17,10C17.55,10 18,10.45 18,11C18,11.55 17.55,12 17,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,13.8 19.4,15.47 18.4,16.8L16.8,15.2C17.55,14.1 18,12.75 18,11C18,7.69 15.31,5 12,5C10.25,5 8.9,5.45 7.8,6.2L6.2,4.6C7.53,3.6 9.2,3 12,3M4,12A8,8 0 0,1 12,4C13.8,4 15.47,4.6 16.8,5.6L15.2,7.2C14.1,6.45 12.75,6 12,6C8.69,6 6,8.69 6,12C6,13.75 6.45,15.1 7.2,16.2L5.6,17.8C4.6,16.47 4,14.8 4,12Z"/>
            </svg>
            <span>Vizen</span>
          </Link>
          <p>Vizen is an all-in-one digital wellness platform built for herbal nutrition wellness centers and their active members.</p>

          <div className="footer-socials">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4A3.6,3.6 0 0,0 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6A3.6,3.6 0 0,0 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5Z"/></svg>
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm0 1.69c2.2 0 4.26.86 5.82 2.42 1.56 1.56 2.42 3.63 2.42 5.82 0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.3-1.25-2.82-1.25-4.37 0-4.54 3.7-8.23 8.24-8.23zm-1.89 3.75c-.2-.05-.43-.07-.63-.07-.27 0-.6.1-.85.38-.26.27-.99.97-.99 2.37s1.02 2.75 1.16 2.94c.14.19 2 3.05 4.85 4.28.68.29 1.21.47 1.62.6.69.22 1.32.19 1.81.12.55-.08 1.7-.69 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.12-.27-.19-.58-.34-.3-.15-1.79-.88-2.07-.98-.27-.1-.47-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.23-.67.07-.3-.15-1.29-.47-2.45-1.51-.9-.8-1.51-1.8-1.69-2.1-.18-.3-.02-.47.13-.62.14-.14.3-.35.46-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/wellness-center">Wellness Centers</Link></li>
            <li><a href="/#how-it-works">How It Works</a></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Deep Dives</h4>
          <ul className="footer-links-list">
            <li><Link to="/for-coaches">For Coaches</Link></li>
            <li><Link to="/for-members">For Members</Link></li>
            <li><Link to="/features">Feature Grid</Link></li>
            <li><Link to="/download">Download App</Link></li>
          </ul>
        </div>

        <div className="footer-download">
          <h4>Store Badges</h4>
          <p>Install the application on your mobile device to begin logging measurements.</p>
          <div className="footer-download-badges">
            <Link to="/download" className="btn-download-badge" style={{ padding: '6px 14px' }}>
              <svg viewBox="0 0 24 24"><path d="M17,18H7V16H17V18M10.3,14H13.7V9H16.2L12,4.8L7.8,9H10.3V14M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/></svg>
              <div>
                <span className="btn-badge-subtitle">Get it on</span>
                <span className="btn-badge-title">Google Play</span>
              </div>
            </Link>
            <Link to="/download" className="btn-download-badge" style={{ padding: '6px 14px' }}>
              <svg viewBox="0 0 24 24"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22C14.32,22.05 13.89,21.24 12.37,21.24C10.84,21.24 10.37,21.97 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z"/></svg>
              <div>
                <span className="btn-badge-subtitle">Download on the</span>
                <span className="btn-badge-title">App Store</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="container footer-divider">
        <p>© 2026 Vizen. All rights reserved. Built for Herbal Wellness Centers.</p>
        <div className="footer-legal-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
