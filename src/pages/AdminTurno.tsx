import React, { useState } from 'react';

const especialidadesIniciales = [
  { nombre: 'Medicina General', disponible: true },
  { nombre: 'Psicología', disponible: false },
  { nombre: 'Odontología', disponible: true },
];

const turnosPorEspecialidad = {
  'Psicología': [
    {
      nombre: 'Ana Gómez',
      documento: '87654321',
      rol: 'Docente',
      especialidad: 'Psicología',
      prioridad: 'Media',
      numero: 2,
    },
  ],
  'Medicina General': [],
  'Odontología': [],
};

export default function AdminTurno() {
  const [especialidades, setEspecialidades] = useState(especialidadesIniciales);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('Todos');

  const handleDisponibilidad = (index, disponible) => {
    setEspecialidades(prev => prev.map((esp, i) => i === index ? { ...esp, disponible } : esp));
  };

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh', padding: 32 }}>
      <h1 style={{ textAlign: 'center', fontSize: 48, fontWeight: 700, marginBottom: 32 }}>Administrar Turnos</h1>
      <table style={{ width: '100%', maxWidth: 800, margin: '0 auto', borderCollapse: 'collapse', marginBottom: 40 }}>
        <thead>
          <tr style={{ background: '#900', color: '#fff', fontSize: 20 }}>
            <th style={{ padding: 12 }}>Especialidad</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((esp, i) => (
            <tr key={esp.nombre} style={{ background: i % 2 ? '#fff' : '#fafafa', fontSize: 18 }}>
              <td style={{ padding: 12 }}>{esp.nombre}</td>
              <td style={{ color: esp.disponible ? 'green' : 'red', fontWeight: 500 }}>
                {esp.disponible ? 'Disponible' : 'No Disponible'}
              </td>
              <td>
                {esp.disponible ? (
                  <button
                    style={{ background: '#ff5c5c', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontSize: 16, cursor: 'pointer' }}
                    onClick={() => handleDisponibilidad(i, false)}
                  >
                    Deshabilitar
                  </button>
                ) : (
                  <button
                    style={{ background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontSize: 16, cursor: 'pointer' }}
                    onClick={() => handleDisponibilidad(i, true)}
                  >
                    Habilitar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ textAlign: 'center', margin: '40px 0 16px 0', fontWeight: 600 }}>Consultar Turnos por Especialidad</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <select
          value={especialidadSeleccionada}
          onChange={e => setEspecialidadSeleccionada(e.target.value)}
          style={{ fontSize: 18, padding: '8px 16px', borderRadius: 6, border: '1px solid #888', minWidth: 200 }}
        >
          <option value="Todos">Todos</option>
          {especialidades.map(esp => (
            <option key={esp.nombre} value={esp.nombre}>{esp.nombre}</option>
          ))}
        </select>
      </div>

      <table style={{ width: '100%', maxWidth: 1000, margin: '0 auto', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr style={{ background: '#900', color: '#fff', fontSize: 18 }}>
            {/* <th style={{ padding: 10 }}>Nombre Completo</th> */}
            <th style={{ padding: 10 }}>Número de Documento</th>
            <th>Rol</th>
            <th>Especialidad</th>
            <th>Prioridad</th>
            <th>Número de Turno</th>
          </tr>
        </thead>
        <tbody>
          {(especialidadSeleccionada === 'Todos'
            ? Object.values(turnosPorEspecialidad).flat()
            : (turnosPorEspecialidad[especialidadSeleccionada] || [])
          ).length === 0 ? (
            <tr><td colSpan={5} style={{ textAlign: 'center', padding: 16, color: '#888' }}>No hay turnos para esta especialidad.</td></tr>
          ) : (
            (especialidadSeleccionada === 'Todos'
              ? Object.values(turnosPorEspecialidad).flat()
              : (turnosPorEspecialidad[especialidadSeleccionada] || [])
            ).map((turno, idx) => (
              <tr key={idx} style={{ background: idx % 2 ? '#fff' : '#f5f5f5', fontSize: 16 }}>
                {/* <td style={{ padding: 10 }}>{turno.nombre || '-'}</td> */}
                <td>{turno.userId || turno.documento || '-'}</td>
                <td>{turno.rol || '-'}</td>
                <td>{turno.specialty || '-'}</td>
                <td>{turno.specialPriority ? 'Prioritario' : (turno.prioridad || 'Normal')}</td>
                <td>{turno.turnCode || turno.numero || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
