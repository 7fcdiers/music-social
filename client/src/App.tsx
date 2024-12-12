import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout.js';
import { Home } from './pages/Home.js';
import { Login } from './pages/auth/Login.js';
import { Register } from './pages/auth/Register.js';
import { Profile } from './pages/auth/Profile.js';
import { PrivateRoute } from './components/auth/PrivateRoute.js';

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;