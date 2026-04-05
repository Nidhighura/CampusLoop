import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);
const DUMMY_TOKEN = 'dummy_token';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('campusloop_token');
    const storedUser = localStorage.getItem('campusloop_user');
    if (token && token !== DUMMY_TOKEN && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.removeItem('campusloop_token');
      localStorage.removeItem('campusloop_user');
    }
  }, []);

  const login = (userData, token) => {
    if (!token || token === DUMMY_TOKEN) {
      throw new Error('A valid login token was not received from the server.');
    }
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('campusloop_token', token);
    localStorage.setItem('campusloop_user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('campusloop_token');
    localStorage.removeItem('campusloop_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
