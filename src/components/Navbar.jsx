import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      width: '100%',
      background: 'transparent',
      color: '#fff',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: 0,
      position: 'relative',
      zIndex: 1000,
      height: '56px',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: 1, color: '#fff' }}>ECI BIENESTAR TOTAL</span>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: 17, marginLeft: 32 }}>Inicio</Link>
        <Link to="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: 17, marginLeft: 16 }}>Nosotros</Link>
        <Link to="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: 17, marginLeft: 16 }}>Contáctanos</Link>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/login">
          <button style={{ background: '#fff', color: '#990000', border: 'none', borderRadius: 8, padding: '0.5rem 1.25rem', fontWeight: 'bold', cursor: 'pointer', fontSize: 15 }}>Login</button>
        </Link>
      </div>
    </nav>
  );
}
