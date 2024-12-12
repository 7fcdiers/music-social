import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

export const register = async (email: string, username: string, password: string) => {
  const response = await api.post('/auth/register', { email, username, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export default api;
