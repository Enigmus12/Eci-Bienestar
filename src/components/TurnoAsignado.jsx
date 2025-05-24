import React from 'react';

export default function TurnoAsignado({ turno }) {
  if (!turno) return null;
  return (
    <div style={{ marginTop: 32, textAlign: 'center', background: '#f3f3f3', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px #0001' }}>
      <h3 style={{ color: '#222', marginBottom: 8 }}>¡Turno asignado!</h3>
      <div style={{ fontSize: 38, fontWeight: 'bold', color: '#990000', letterSpacing: 2 }}>{turno}</div>
    </div>
  );
}
