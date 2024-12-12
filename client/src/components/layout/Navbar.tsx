import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth/AuthContext.js';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Music Social
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                  Profile
                </Link>
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}