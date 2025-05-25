import React, { useEffect, useState } from 'react';
import ApiService from '../service/api';

export default function MyRoutines() {
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRoutines = async () => {
      setError('');
      setSuccess('');
      setLoading(true);
      try {
        const data = await ApiService.getMyRoutines();
        setRoutines(data);
      } catch (err) {
        setError('No se pudieron cargar las rutinas');
      } finally {
        setLoading(false);
      }
    };
    fetchRoutines();
  }, []);

  const handleDelete = async (id) => {
    setError('');
    setSuccess('');
    try {
      await ApiService.deleteRoutine(id);
      setRoutines(routines.filter(r => r.id !== id));
      setSuccess('Rutina eliminada correctamente');
    } catch (err) {
      setError('No se pudo eliminar la rutina');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h2>Mis Rutinas</h2>
      {loading && <div>Cargando rutinas...</div>}
      {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
      {success && <div style={{ color: 'green', fontWeight: 600 }}>{success}</div>}
      {routines.length === 0 && !loading && <div>No tienes rutinas registradas.</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {routines.map(routine => (
          <li key={routine.id} style={{ background: '#f8f8f8', margin: '12px 0', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <b>{routine.name}</b> <br />
              <span style={{ fontSize: 14 }}>{routine.objective}</span>
            </div>
            <button onClick={() => handleDelete(routine.id)} style={{ background: '#990000', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600 }}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
