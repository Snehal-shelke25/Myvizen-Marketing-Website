import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/pages.css';

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <div className="container notfound-container">
        <div className="notfound-code">404</div>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--primary-dark)', marginBottom: '12px' }}>
          Oops! Page not found.
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', marginBottom: '32px', maxWidth: '480px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to="/download" className="btn btn-outline">
            Download App
          </Link>
        </div>
      </div>
    </main>
  );
}
