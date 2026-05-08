import api from './api';

export const loginUser = async (credentials) => {
  try {
    console.log('📤 Login attempt with:', credentials.email);
    
    const response = await api.post('/auth/login', credentials);
    
    console.log('📥 Login response:', response.data);
    
    if (response.data.success) {
      localStorage.setItem('token', 'demo-token'); // You can change later
    }
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('digimed_user');
};

// ✅ Added this missing function
export const getCurrentUser = () => {
  const user = localStorage.getItem('digimed_user');
  return user ? JSON.parse(user) : null;
};