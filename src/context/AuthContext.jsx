import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as adminApi from '../admin/api/endpoints';
import { getToken, setUnauthorizedHandler } from '../admin/api/client';

const AuthContext = createContext(null);

/**
 * Admin session.
 *
 * The credentials used to live in this file as constants, which meant anyone
 * could read them out of the built JavaScript. Authentication now happens on
 * the server (POST /admin/login) and this holds the resulting session.
 *
 * The token lives in sessionStorage, not localStorage: it is cleared when the
 * browser tab closes, which is the right default for a panel that can grant
 * subscriptions and suspend accounts.
 */
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [isRestoring, setIsRestoring] = useState(true);

  const signOut = useCallback(() => {
    adminApi.logout();
    setAdmin(null);
  }, []);

  // Any 401 from any request ends the session, so a stale tab cannot sit on a
  // dead token showing empty tables.
  useEffect(() => {
    setUnauthorizedHandler(() => setAdmin(null));
  }, []);

  // Restore the session on reload — without this, refreshing any admin page
  // bounced the user back to the login screen.
  useEffect(() => {
    let active = true;
    if (!getToken()) {
      setIsRestoring(false);
      return () => { active = false; };
    }
    adminApi.me()
      .then((data) => { if (active) setAdmin(data); })
      .catch(() => { if (active) signOut(); })
      .finally(() => { if (active) setIsRestoring(false); });
    return () => { active = false; };
  }, [signOut]);

  const login = useCallback(async (email, password) => {
    setLoginError('');
    try {
      const data = await adminApi.login(email, password);
      setAdmin(data.admin);
      return true;
    } catch (err) {
      setLoginError(err.message || 'Could not sign in. Please try again.');
      return false;
    }
  }, []);

  const value = {
    admin,
    isLoggedIn: !!admin,
    isRestoring,
    adminName: admin?.name || '',
    coachName: admin?.name || '',   // kept: some screens still read coachName
    role: admin?.role || null,
    canWrite: admin?.role === 'super' || admin?.role === 'support',
    isSuper: admin?.role === 'super',
    login,
    logout: signOut,
    loginError,
    setLoginError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
