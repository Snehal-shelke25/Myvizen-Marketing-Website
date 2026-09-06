import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const VALID_EMAIL = 'admin@myvizen.in';
const VALID_PASSWORD = 'myvizen123';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [loginError, setLoginError] = useState('');

  const login = (email, password) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsLoggedIn(true);
      setAdminName('MyVizen Admin');
      setLoginError('');
      return true;
    }

    setLoginError('Invalid admin email or password. Please try again.');
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAdminName('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, adminName, coachName: adminName, login, logout, loginError, setLoginError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
