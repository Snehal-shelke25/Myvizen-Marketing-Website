import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login, remembering where the user wanted to go
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
