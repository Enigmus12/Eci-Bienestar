import React from 'react';

export default function TurnoAsignado({ turno, especialidad, onNuevo }) {
  if (!turno) return null;

  console.log("TurnoAsignado props:", { turno, especialidad }); // 👈 Verificación en consola

  return (
    <div style={{
      marginTop: 32,
      textAlign: 'center',
      background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)',
      padding: 32,
      borderRadius: 16,
      boxShadow: '0 2px 12px #0001',
      maxWidth: 420,
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <h2 style={{ color: '#1a2a3a', fontWeight: 700, fontSize: 28, marginBottom: 0 }}>
        Bienestar Universitario
      </h2>
      <div style={{ color: '#555', fontSize: 15, marginBottom: 24 }}>
        Escuela Colombiana de Ingeniería Julio Garavito
      </div>

      <div style={{
        background: '#e8fbe8',
        borderRadius: '50%',
        width: 64,
        height: 64,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
      }}>
        <span style={{ color: '#22bb33', fontSize: 40 }}>✔️</span>
      </div>

      <div style={{ fontWeight: 700, fontSize: 26, color: '#1a3', marginBottom: 12 }}>
        ¡Turno Asignado!
      </div>

      <div style={{
        border: '3px dashed #990000',
        borderRadius: 12,
        padding: '16px 48px',
        fontSize: 36,
        fontWeight: 800,
        background: '#fff0f0',
        letterSpacing: 2,
        color: '#990000',
        marginBottom: 16
      }}>
        {turno}
      </div>

      <div style={{ fontSize: 17, marginBottom: 8 }}>
        Su turno para <span style={{ fontWeight: 700 }}>{especialidad}</span> ha sido registrado
      </div>

      <div style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>
        Por favor, espere a ser llamado. El tiempo de espera puede variar según la demanda del servicio.
      </div>

      <button onClick={onNuevo} style={{
        padding: '10px 24px',
        borderRadius: 8,
        border: '1px solid #222',
        background: '#fff',
        fontWeight: 600,
        fontSize: 16,
        cursor: 'pointer'
      }}>
        Solicitar Nuevo Turno
      </button>
    </div>
  );
}
