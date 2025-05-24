import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f8f8f8' }}>
        <Navbar />
        <div style={{ maxWidth: 600, margin: '72px auto 0 auto', padding: '1rem', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* Agrega más rutas aquí */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
