import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { APP_NAME, APP_DESCRIPTION } from '../../utils/constants.js';

function Hero() {
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <h2 className="text-4xl font-bold text-gray-900">{APP_NAME}</h2>
      <p className="mt-4 text-xl text-gray-600">{APP_DESCRIPTION}</p>
      
      {!user && (
        <div className="mt-8">
          <Link
            to="/register"
            className="btn btn-primary px-8 py-3 text-lg"
          >
            Get Started
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Join our community of music lovers today!
          </p>
        </div>
      )}
    </div>
  );
}

export default Hero;