import React, { useEffect, useState } from 'react';

const especialidades = [
  'Medicina General',
  'Psicología',
  'Nutrición',
  'Fisioterapia',
];

const mockTurnos = [
  { id: 'M-01', paciente: 'Ana María Rodríguez', doc: '1020304050', estado: 'Pendiente', hora: '16:24' },
  { id: 'M-02', paciente: 'Carlos Jiménez', doc: '1122334455', estado: 'Pendiente', hora: '16:29' },
  { id: 'M-03', paciente: 'Laura Martínez', doc: '9988776655', estado: 'Pendiente', hora: '16:34' },
];

export default function ProfesionalTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [especialidad, setEspecialidad] = useState(especialidades[0]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('lista');
  const [estadoFiltro, setEstadoFiltro] = useState('Todos los estados');

  useEffect(() => {
    setTurnos(mockTurnos);
  }, []);

  const turnoActual = turnos.length > 0 ? turnos[0] : null;

  const handleLlamarSiguiente = () => {
    if (turnos.length > 0) {
      setTurnos((prev) => prev.slice(1));
    }
  };

  const handleLlamar = (id) => {
    // Aquí podrías agregar lógica para notificar al paciente
    alert('Llamando al paciente del turno ' + id);
  };

  const handleCancelar = (id) => {
    setTurnos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: '32px 0', background: '#f7f8fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 0 }}>Panel de Profesional</h1>
        <div style={{ color: '#555', marginBottom: 32 }}>Bienestar Universitario - Escuela Colombiana de Ingeniería Julio Garavito</div>
        <div style={{ display: 'flex', gap: 32 }}>
          {/* Columna izquierda */}
          <div style={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px #0001' }}>
              <div style={{ fontWeight: 600, fontSize: 22 }}>Especialidad</div>
              <div style={{ color: '#888', fontSize: 15, marginBottom: 12 }}>Seleccione su especialidad</div>
              <select value={especialidad} onChange={e => setEspecialidad(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}>
                {especialidades.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px #0001', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 8 }}>Turno Actual</div>
              <div style={{ color: '#888', fontSize: 15, marginBottom: 24 }}>Paciente en atención</div>
              {turnoActual ? (
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#990000' }}>{turnoActual.id}</div>
                  <div style={{ fontWeight: 600 }}>{turnoActual.paciente}</div>
                  <div style={{ color: '#888', fontSize: 15 }}>{turnoActual.doc}</div>
                </div>
              ) : (
                <div style={{ color: '#bbb', textAlign: 'center', margin: '32px 0' }}>
                  <span style={{ fontSize: 48, display: 'block', marginBottom: 8 }}>⏰</span>
                  No hay paciente en atención
                </div>
              )}
              <button onClick={handleLlamarSiguiente} disabled={turnos.length === 0} style={{ marginTop: 12, width: '100%', padding: '12px 0', background: '#111', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span role="img" aria-label="bell">🔔</span> Llamar Siguiente Turno
              </button>
            </div>
          </div>
          {/* Columna derecha */}
          <div style={{ flex: 2, minWidth: 400 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px #0001' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 22 }}>Gestión de Turnos</div>
                  <div style={{ color: '#888', fontSize: 15 }}>{turnos.length} turnos pendientes para {especialidad}</div>
                </div>
                <select value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 15 }}>
                  <option>Todos los estados</option>
                  <option>Pendiente</option>
                  <option>Atendido</option>
                  <option>Cancelado</option>
                </select>
              </div>
              <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: 16 }}>
                <button onClick={() => setTab('lista')} style={{ flex: 1, padding: 12, background: tab === 'lista' ? '#f7f8fa' : 'transparent', border: 'none', borderBottom: tab === 'lista' ? '2px solid #990000' : 'none', fontWeight: 600, fontSize: 16 }}>Lista de Turnos</button>
                <button onClick={() => setTab('proximos')} style={{ flex: 1, padding: 12, background: tab === 'proximos' ? '#f7f8fa' : 'transparent', border: 'none', borderBottom: tab === 'proximos' ? '2px solid #990000' : 'none', fontWeight: 600, fontSize: 16, color: '#888' }}>Próximos Turnos</button>
              </div>
              {/* Tabla de turnos */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fafbfc' }}>
                      <th style={{ textAlign: 'left', padding: 8, fontWeight: 600 }}>Turno</th>
                      <th style={{ textAlign: 'left', padding: 8, fontWeight: 600 }}>Paciente</th>
                      <th style={{ textAlign: 'left', padding: 8, fontWeight: 600 }}>Estado</th>
                      <th style={{ textAlign: 'left', padding: 8, fontWeight: 600 }}>Hora Registro</th>
                      <th style={{ textAlign: 'left', padding: 8, fontWeight: 600 }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turnos.length === 0 ? (
                      <tr><td colSpan={5} style={{ textAlign: 'center', color: '#bbb', padding: 24 }}>No hay turnos pendientes.</td></tr>
                    ) : (
                      turnos.map((turno, idx) => (
                        <tr key={turno.id} style={{ background: idx % 2 === 0 ? '#fff' : '#f7f8fa' }}>
                          <td style={{ padding: 8, fontWeight: 600 }}>
                            {turno.id} {idx === 0 && <span style={{ color: '#d00', fontWeight: 700, marginLeft: 4 }}>P</span>}
                          </td>
                          <td style={{ padding: 8 }}>
                            <div style={{ fontWeight: 600 }}>{turno.paciente}</div>
                            <div style={{ color: '#888', fontSize: 13 }}>{turno.doc}</div>
                          </td>
                          <td style={{ padding: 8 }}>
                            <span style={{ background: '#eaf1ff', color: '#2563eb', borderRadius: 12, padding: '2px 12px', fontWeight: 600, fontSize: 14 }}>{turno.estado}</span>
                          </td>
                          <td style={{ padding: 8 }}>{turno.hora}</td>
                          <td style={{ padding: 8, display: 'flex', gap: 8 }}>
                            <button onClick={() => handleLlamar(turno.id)} style={{ background: '#fff', border: '1px solid #bbb', borderRadius: 6, padding: '6px 14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                              <span role="img" aria-label="bell">🔔</span> Llamar
                            </button>
                            <button onClick={() => handleCancelar(turno.id)} style={{ background: '#fff', border: '1px solid #d00', color: '#d00', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>
                              <span role="img" aria-label="cancel">❌</span> Cancelar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
