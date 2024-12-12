import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './Navbar.js';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}