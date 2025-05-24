import React from 'react';
import { Link } from 'react-router-dom';
import LOGOESCUELA from '../assets/resourses/LogoEscuela.jpg';
import Button from './Button';

export default function Navbar() {
  return (
    <nav style={{
      width: '100%',
      background: 'transparent',
      color: '#000000',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={LOGOESCUELA} alt="Logo Escuela" style={{ width: 100, height: 54, objectFit: 'cover', marginRight: 14, background: 'transparent', borderRadius: 0, boxShadow: 'none', padding: 0 }} />
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: 1, color: '#fff', display: 'flex', alignItems: 'center' }}>
          ECI BIENESTAR TOTAL
        </span>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: 17, marginLeft: 32 }}>Inicio</Link>
        <Link to="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: 17, marginLeft: 16 }}>Nosotros</Link>
        <Link to="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, fontSize: 17, marginLeft: 16 }}>Contáctanos</Link>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/login">
          <Button
            style={{
              background: '#fff',
              color: '#990000',
              border: 'none',
              borderRadius: 8,
              padding: '0.5rem 1.25rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: 15,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={e => {
              e.target.style.background = '#000';
              e.target.style.color = '#e53935';
            }}
            onMouseOut={e => {
              e.target.style.background = '#fff';
              e.target.style.color = '#990000';
            }}
          >
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}