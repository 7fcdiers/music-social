import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.js';
import { Container } from '../common/Container.js';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-8">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}