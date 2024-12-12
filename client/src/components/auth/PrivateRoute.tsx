import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext.js';
import { LoadingSpinner } from '../common/LoadingSpinner.js';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}