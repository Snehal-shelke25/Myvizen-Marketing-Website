import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Demo credentials — change as needed
const VALID_EMAIL    = 'coach@myvizen.com';
const VALID_PASSWORD = 'myvizen123';

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coachName, setCoachName] = useState('');
  const [loginError, setLoginError] = useState('');

  const login = (email, password) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsLoggedIn(true);
      setCoachName('Snehal Shelke');
      setLoginError('');
      return true;
    } else {
      setLoginError('Invalid email or password. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCoachName('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, coachName, login, logout, loginError, setLoginError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
