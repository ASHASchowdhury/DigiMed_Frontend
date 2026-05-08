import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, logoutUser, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('digimed_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('digimed_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        const userData = {
          id: response.userId,
          email: response.email,
          fullName: response.fullName,
          role: response.role,
        };
        setUser(userData);
        localStorage.setItem('digimed_user', JSON.stringify(userData));
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    localStorage.removeItem('digimed_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};