import { useState, useCallback } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth.js';
import { authService } from '../services/auth.service';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.register(credentials);
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Logout failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };
}