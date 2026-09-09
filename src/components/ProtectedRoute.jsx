import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, isRestoring } = useAuth();
  const location = useLocation();

  // On a page reload the session is restored asynchronously. Redirecting
  // during that window would bounce a signed-in admin to the login screen
  // every time they refresh.
  if (isRestoring) {
    return (
      <div style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: '#64748b', fontSize: 14,
      }}>
        Loading your session...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
