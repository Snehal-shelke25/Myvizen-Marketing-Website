import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">

        {/* ── COLUMN 1: Logo ── */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
          id="nav-logo"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
            <path d="M17,8C15.34,8 14,9.34 14,11C14,12.66 15.34,14 17,14C18.66,14 20,12.66 20,11C20,9.34 18.66,8 17,8M17,12C16.45,12 16,11.55 16,11C16,10.45 16.45,10 17,10C17.55,10 18,10.45 18,11C18,11.55 17.55,12 17,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,13.8 19.4,15.47 18.4,16.8L16.8,15.2C17.55,14.1 18,12.75 18,11C18,7.69 15.31,5 12,5C10.25,5 8.9,5.45 7.8,6.2L6.2,4.6C7.53,3.6 9.2,3 12,3M4,12A8,8 0 0,1 12,4C13.8,4 15.47,4.6 16.8,5.6L15.2,7.2C14.1,6.45 12.75,6 12,6C8.69,6 6,8.69 6,12C6,13.75 6.45,15.1 7.2,16.2L5.6,17.8C4.6,16.47 4,14.8 4,12Z"/>
          </svg>
          <span>MyVizen</span>
        </Link>

        {/* ── COLUMN 2: Navigation Links ── */}
        <nav
          className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}
          id="nav-menu"
        >
          <Link to="/features"        className={`nav-link ${isActive('/features') ? 'active' : ''}`}        onClick={closeMenu}>Features</Link>
          <Link to="/for-coaches"     className={`nav-link ${isActive('/for-coaches') ? 'active' : ''}`}     onClick={closeMenu}>For Coaches</Link>
          <Link to="/for-members"     className={`nav-link ${isActive('/for-members') ? 'active' : ''}`}     onClick={closeMenu}>For Members</Link>
          <Link to="/wellness-center" className={`nav-link ${isActive('/wellness-center') ? 'active' : ''}`} onClick={closeMenu}>Wellness Centers</Link>
          <a href="/#how-it-works"    className="nav-link" onClick={closeMenu}>How It Works</a>
          <Link to="/pricing"         className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}         onClick={closeMenu}>Pricing</Link>
          <a href="/#faq"             className="nav-link" onClick={closeMenu}>FAQ</a>
          <Link to="/contact"         className={`nav-link ${isActive('/contact') ? 'active' : ''}`}         onClick={closeMenu}>Contact</Link>
        </nav>

        {/* ── COLUMN 3: Action Buttons ── */}
        <div className={`navbar-actions ${mobileMenuOpen ? 'open' : ''}`}>
          <Link
            to="/admin"
            className="btn btn-outline"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            onClick={closeMenu}
            id="nav-coach-portal"
          >
            🔑 Coach Portal
          </Link>
          <Link
            to="/download"
            className="btn btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            onClick={closeMenu}
            id="nav-download"
          >
            Download App
          </Link>
        </div>

        {/* ── Hamburger (Mobile only) ── */}
        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="hamburger-menu"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}
