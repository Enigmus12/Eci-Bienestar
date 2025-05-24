import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      background: '#990000',
      color: '#fff',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100vw',
      minWidth: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      height: '56px',
      boxSizing: 'border-box',
    }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: 1 }}>ECI BIENESTAR TOTAL</span>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <button style={{ background: '#fff', color: '#990000', border: 'none', borderRadius: 4, padding: '0.5rem 1.25rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Login
        </button>
      </Link>
    </nav>
  );
}
