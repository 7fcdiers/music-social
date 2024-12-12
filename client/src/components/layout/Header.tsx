import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../utils/constants.js';
import AuthButtons from '../auth/AuthButtons.js';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            {APP_NAME}
          </Link>
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}

export default Header;