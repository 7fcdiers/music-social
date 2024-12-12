import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { Button } from '../common/Button.js';

export default function AuthButtons() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="animate-pulse h-10 w-20 bg-gray-200 rounded" />;
  }

  if (user) {
    return (
      <Button variant="secondary" onClick={logout}>
        Log Out
      </Button>
    );
  }

  return (
    <div className="space-x-4">
      <Link to="/login">
        <Button variant="secondary">Log In</Button>
      </Link>
      <Link to="/register">
        <Button variant="primary">Sign Up</Button>
      </Link>
    </div>
  );
}