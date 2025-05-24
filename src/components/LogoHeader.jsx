import React from 'react';

export default function LogoHeader() {
  return (
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <img src="/vite.svg" alt="Logo" style={{ width: 60, marginBottom: 8 }} />
      <h2 style={{ color: '#990000', margin: 0, fontWeight: 700, fontSize: 28 }}>Bienvenido a ECI Bienestar Total</h2>
      <p style={{ color: '#444', fontSize: 16, marginTop: 8 }}>Solicita tu turno para atención médica</p>
    </div>
  );
}
