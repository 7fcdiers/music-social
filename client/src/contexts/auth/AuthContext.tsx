import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../../types/auth.js';
import { authService } from '../../services/auth.service';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const user = await authService.getCurrentUser();
          setUser(user);
        }
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

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

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}