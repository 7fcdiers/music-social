import React from 'react';
import { useAuth } from '../contexts/auth/AuthContext.js';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Music Social
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Connect with other music lovers and share your favorite tunes!
      </p>
      {user ? (
        <p className="text-lg text-gray-700">Welcome back, {user.username}!</p>
      ) : (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Please log in or register to get started.
          </p>
        </div>
      )}
    </div>
  );
}