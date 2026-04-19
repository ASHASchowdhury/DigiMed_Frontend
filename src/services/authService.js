import api from './api';

export const loginUser = async (credentials) => {
  try {
    console.log('📤 Login attempt with:', credentials.email);
    
    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
    
    console.log('📥 Login response:', response.data);
    
    // Store token if returned
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    console.log('📤 Logout request');
    const response = await api.post('/auth/logout');
    console.log('📥 Logout response:', response.data);
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    localStorage.removeItem('token');
    return { success: true };
  }
};

export const getCurrentUser = async () => {
  try {
    console.log('📤 Fetching current user');
    const response = await api.get('/auth/me');
    console.log('📥 Current user:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
    throw error;
  }
};
