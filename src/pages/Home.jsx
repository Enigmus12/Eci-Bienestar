import React, { useState } from 'react';

const especialidades = [
  { nombre: 'Medicina General', clave: 'M' },
  { nombre: 'Odontología', clave: 'O' },
  { nombre: 'Psicología', clave: 'P' },
];

const roles = [
  'Estudiante',
  'Docente',
  'Administrativo',
  'Servicios Generales',
];

// Ejemplo de página principal
export default function Home() {
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [rol, setRol] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [prioridad, setPrioridad] = useState(false);
  const [turno, setTurno] = useState(null);
  const [emergencia, setEmergencia] = useState(false); // Simulación de emergencia
  const [contador, setContador] = useState({ M: 10, O: 15, P: 8 }); // Ejemplo de contadores

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!especialidad) return;
    // Generar turno
    const clave = especialidades.find(e => e.nombre === especialidad)?.clave;
    const numero = contador[clave] + 1;
    setContador({ ...contador, [clave]: numero });
    setTurno(`${clave}-${numero}`);
  };

  // Simulación: Si emergencia, deshabilitar turnos
  const turnosHabilitados = !emergencia;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px #0002',
      padding: '2.5rem 1.5rem 2rem 1.5rem',
      maxWidth: 420,
      margin: '0 auto',
      marginTop: '2rem',
      marginBottom: '2rem',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      position: 'relative',
      minHeight: 480,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img src="/vite.svg" alt="Logo" style={{ width: 60, marginBottom: 8 }} />
        <h2 style={{ color: '#990000', margin: 0, fontWeight: 700, fontSize: 28 }}>Bienvenido a ECI Bienestar Total</h2>
        <p style={{ color: '#444', fontSize: 16, marginTop: 8 }}>Solicita tu turno para atención médica</p>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#222' }}>Nombre completo</label>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#222' }}>Número de documento</label>
          <input type="text" value={documento} onChange={e => setDocumento(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#222' }}>Rol</label>
          <select value={rol} onChange={e => setRol(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }}>
            <option value="">Seleccione...</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#222' }}>Especialidad</label>
          <select value={especialidad} onChange={e => setEspecialidad(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }}>
            <option value="">Seleccione...</option>
            {especialidades.map(e => <option key={e.clave} value={e.nombre}>{e.nombre}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#222' }}>
            <input type="checkbox" checked={prioridad} onChange={e => setPrioridad(e.target.checked)} style={{ marginRight: 8 }} />
            Prioridad especial (discapacidad o embarazo)
          </label>
        </div>
        <button type="submit" disabled={!turnosHabilitados} style={{ width: '100%', background: turnosHabilitados ? '#990000' : '#ccc', color: '#fff', padding: 12, border: 'none', borderRadius: 6, fontWeight: 'bold', fontSize: 17, cursor: turnosHabilitados ? 'pointer' : 'not-allowed', boxShadow: turnosHabilitados ? '0 2px 8px #99000033' : 'none', transition: 'background 0.2s' }}>
          Solicitar turno
        </button>
        {!turnosHabilitados && (
          <div style={{ color: '#990000', marginTop: 14, textAlign: 'center', fontWeight: 600 }}>
            Turnos deshabilitados por emergencia
          </div>
        )}
      </form>
      {turno && (
        <div style={{ marginTop: 32, textAlign: 'center', background: '#f3f3f3', padding: 20, borderRadius: 10, boxShadow: '0 2px 8px #0001' }}>
          <h3 style={{ color: '#222', marginBottom: 8 }}>¡Turno asignado!</h3>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#990000', letterSpacing: 2 }}>{turno}</div>
        </div>
      )}
      {/* Simulación: Botón para activar/desactivar emergencia (solo para demo) */}
      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <button type="button" onClick={() => setEmergencia(e => !e)} style={{ background: emergencia ? '#990000' : '#ccc', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.25rem', fontWeight: 'bold', cursor: 'pointer', fontSize: 15 }}>
          {emergencia ? 'Desactivar emergencia' : 'Activar emergencia'}
        </button>
      </div>
    </div>
  );
}
