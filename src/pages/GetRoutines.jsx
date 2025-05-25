import React, { useEffect, useState } from 'react';
import ApiService from '../service/api';

export default function GetRoutines() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoutines = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await ApiService.getAllRoutines();
        setRoutines(data);
      } catch (err) {
        setError('No se pudieron cargar las rutinas');
      } finally {
        setLoading(false);
      }
    };
    fetchRoutines();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h2>Rutinas Registradas</h2>
      {loading && <div>Cargando rutinas...</div>}
      {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
      {routines.length === 0 && !loading && <div>No hay rutinas registradas.</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {routines.map((routine, idx) => (
          <li key={routine.id || idx} style={{ background: '#f8f8f8', margin: '12px 0', borderRadius: 8, padding: 16 }}>
            {/* No mostrar el campo id */}
            <div><b>Nombre:</b> {routine.name}</div>
            <div><b>Objetivo:</b> {routine.objective}</div>
            <div><b>Descripción:</b> {routine.description}</div>
            <div><b>Duración:</b> {routine.duration}</div>
            <div><b>Frecuencia:</b> {routine.frequency}</div>
            <div><b>Ejercicios:</b>
              <ul>
                {routine.exercises && routine.exercises.map((ex, i) => (
                  <li key={i}>
                    <b>{ex.name}</b> - Series: {ex.sets}, Repeticiones: {ex.repetitions}
                    {ex.description && <div>Descripción: {ex.description}</div>}
                    {ex.instructions && <div>Instrucciones: {ex.instructions}</div>}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
