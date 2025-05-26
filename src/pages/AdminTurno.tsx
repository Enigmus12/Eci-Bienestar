import React, { useEffect, useState } from 'react';
import ApiService from '../service/apiM1';

const especialidadesIniciales = [
  { nombre: 'Medicina General', disponible: true },
  { nombre: 'Psicología', disponible: false },
  { nombre: 'Odontología', disponible: true },
];

// Inicializar especialidades desde localStorage si existe
const getEspecialidadesInicial = () => {
  const saved = localStorage.getItem('especialidadesDisponibles');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return especialidadesIniciales;
    }
  }
  return especialidadesIniciales;
};

export default function AdminTurno() {
  const [especialidades, setEspecialidades] = useState(getEspecialidadesInicial);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('Todos');
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTurnos = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await ApiService.getTurnos();
        // Enriquecer turnos con nombre y rol de usuario
        const userCache = {};
        const turnosEnriquecidos = await Promise.all(data.map(async (turno) => {
          if (userCache[turno.userId]) {
            return { ...turno, nombre: userCache[turno.userId].username, rol: userCache[turno.userId].userRole };
          }
          try {
            // Si el backend ya retorna username y userRole, úsalo directamente
            if (turno.username && turno.userRole) {
              userCache[turno.userId] = { username: turno.username, userRole: turno.userRole };
              return { ...turno, nombre: turno.username, rol: turno.userRole };
            }
            // Si no, consulta el servicio de usuario
            const user = await ApiService.getUserById(turno.userId);
            userCache[turno.userId] = user;
            return { ...turno, nombre: user.username || user.name, rol: user.userRole || user.role };
          } catch {
            return { ...turno, nombre: 'Sin nombre', rol: 'Sin rol' };
          }
        }));
        setTurnos(turnosEnriquecidos);
      } catch (err) {
        setError('No se pudieron cargar los turnos');
      } finally {
        setLoading(false);
      }
    };
    fetchTurnos();
  }, []);

  // Guardar y cargar disponibilidad de especialidades en localStorage
  useEffect(() => {
    localStorage.setItem('especialidadesDisponibles', JSON.stringify(especialidades));
  }, [especialidades]);

  const handleDisponibilidad = (index, disponible) => {
    setEspecialidades(prev => prev.map((esp, i) => i === index ? { ...esp, disponible } : esp));
  };

  // Eliminar turno por turnCode
  const handleEliminarTurno = async (turnCode) => {
    if (!turnCode) {
      setError('No se pudo eliminar el turno: código de turno inválido');
      return;
    }
    if (!window.confirm('¿Seguro que deseas eliminar este turno?')) return;
    setLoading(true);
    setError('');
    try {
      await ApiService.deleteTurnByCode(turnCode);
      setTurnos(prev => prev.filter(t => t.turnCode !== turnCode));
    } catch (err) {
      setError('No se pudo eliminar el turno');
    } finally {
      setLoading(false);
    }
  };

  // Agrupar turnos por especialidad
  const turnosPorEspecialidad = turnos.reduce((acc, turno) => {
    const esp = turno.especialidad || turno.specialty || 'Sin Especialidad';
    if (!acc[esp]) acc[esp] = [];
    acc[esp].push(turno);
    return acc;
  }, {});

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh', padding: 32 }}>
      <h1 style={{ textAlign: 'center', fontSize: 48, fontWeight: 700, marginBottom: 32 }}>Administrar Turnos</h1>
      <table style={{ width: '100%', maxWidth: 1000, margin: '0 auto', borderCollapse: 'collapse', marginBottom: 40 }}>
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
          style={{
            fontSize: 18,
            padding: '8px 10px',
            borderRadius: 6,
            border: '1px solid #888',
            minWidth: 180,
            maxWidth: 240,
            width: '100%',
            background: '#fff',
            color: '#222', // color de letra oscuro
            margin: '0 auto',
            display: 'block',
            textAlign: 'center',
            boxShadow: '0 1px 4px #0001'
          }}
        >
          <option value="Todos">Todos</option>
          {Object.keys(turnosPorEspecialidad).map(esp => (
            <option key={esp} value={esp}>{esp}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#990000', fontWeight: 600, fontSize: 20 }}>Cargando turnos...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: '#990000', fontWeight: 600, fontSize: 20 }}>{error}</div>
      ) : (
        <table style={{ width: '100%', maxWidth: 1000, margin: '0 auto', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr style={{ background: '#900', color: '#fff', fontSize: 18 }}>
              <th style={{ padding: 10 }}>Número de Documento</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Especialidad</th>
              <th>Prioridad</th>
              <th>Número de Turno</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(especialidadSeleccionada === 'Todos'
              ? Object.values(turnosPorEspecialidad).flat()
              : (turnosPorEspecialidad[especialidadSeleccionada] || [])
            ).length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 16, color: '#888' }}>No hay turnos para esta especialidad.</td></tr>
            ) : (
              (especialidadSeleccionada === 'Todos'
                ? Object.values(turnosPorEspecialidad).flat()
                : (turnosPorEspecialidad[especialidadSeleccionada] || [])
              ).map((turno, idx) => (
                <tr key={turno.id || turno.numero || idx} style={{ background: idx % 2 ? '#fff' : '#f5f5f5', fontSize: 16 }}>
                  <td>{turno.userId || turno.documento || '-'}</td>
                  <td>{turno.nombre && turno.nombre !== '-' ? turno.nombre : (turno.name && turno.name !== '-' ? turno.name : 'Sin nombre')}</td>
                  <td>{turno.rol && turno.rol !== '-' ? turno.rol : (turno.role && turno.role !== '-' ? turno.role : 'Sin rol')}</td>
                  <td>{turno.especialidad || turno.specialty || '-'}</td>
                  <td>{turno.specialPriority ? 'Prioritario' : (turno.prioridad || 'Normal')}</td>
                  <td>{turno.numero || turno.turnCode || '-'}</td>
                  <td>{turno.status || '-'}</td>
                  <td>
                    <button onClick={() => handleEliminarTurno(turno.turnCode)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 600, cursor: 'pointer' }} disabled={!turno.turnCode}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
