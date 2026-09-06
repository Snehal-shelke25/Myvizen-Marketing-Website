import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" style={{ color: '#ffffff', marginBottom: '20px' }}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
              <path d="M12,2C7.58,2 4,5.58 4,10C4,15.25 10.25,21.08 11.26,21.98C11.68,22.35 12.32,22.35 12.74,21.98C13.75,21.08 20,15.25 20,10C20,5.58 16.42,2 12,2M12,4C15.31,4 18,6.69 18,10C18,13.43 14.47,17.59 12,19.86C9.53,17.59 6,13.43 6,10C6,6.69 8.69,4 12,4M12,6.5C10.07,6.5 8.5,8.07 8.5,10C8.5,11.93 10.07,13.5 12,13.5C13.93,13.5 15.5,11.93 15.5,10C15.5,8.07 13.93,6.5 12,6.5Z" />
            </svg>
            <span>MyVizen</span>
          </Link>
          <p>
            MyVizen is an all-in-one digital wellness platform built for herbal nutrition wellness
            centers, coaches, and their active members.
          </p>

          <div className="footer-socials">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4A3.6,3.6 0 0,0 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6A3.6,3.6 0 0,0 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5Z"/></svg>
            </a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm0 1.69c2.2 0 4.26.86 5.82 2.42 1.56 1.56 2.42 3.63 2.42 5.82 0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.3-1.25-2.82-1.25-4.37 0-4.54 3.7-8.23 8.24-8.23z"/></svg>
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
          <h4>App</h4>
          <ul className="footer-links-list">
            <li><Link to="/for-coaches">For Coaches</Link></li>
            <li><Link to="/for-members">For Members</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/download">Download App</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Legal</h4>
          <ul className="footer-links-list">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-divider">
        <p>© 2026 MyVizen. All rights reserved. Built for Herbal Wellness Centers.</p>
        <div className="footer-legal-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
