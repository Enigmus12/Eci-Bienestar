import React from 'react';
import LOGO from '../assets/resourses/LOGO.png';

export default function LogoHeader() {
  return (
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <img src={LOGO} alt="Logo ECIBIENESTAR" style={{ width: 80, marginBottom: 8 }} />
      <h2 style={{ color: '#FFFFFF', margin: 0, fontWeight: 700, fontSize: 28 }}>ECIBIENESTAR</h2>
      <p style={{ color: '#444', fontSize: 16, marginTop: 8 }}>Solicita tu turno para atención médica</p>
    </div>
  );
}
