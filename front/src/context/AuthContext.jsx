import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserSession(token);
    }
  }, []);

  const setUserSession = (token) => {
    try {
      const decoded = jwtDecode(token); // Corrected function call
      setUser(decoded);
      setRole(decoded.role); // Assuming 'role' is in your JWT payload
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Invalid token:', error);
      clearUserSession();
    }
  };

  const clearUserSession = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  const login = (token) => {
    setUserSession(token);
  };

  const logout = () => {
    clearUserSession();
  };

  const value = {
    user,
    role,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;