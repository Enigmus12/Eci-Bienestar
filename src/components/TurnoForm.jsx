import React from 'react';

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

export default function TurnoForm({
  nombre, setNombre,
  documento, setDocumento,
  rol, setRol,
  especialidad, setEspecialidad,
  prioridad, setPrioridad,
  turnosHabilitados,
  handleSubmit
}) {
  return (
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
  );
}
