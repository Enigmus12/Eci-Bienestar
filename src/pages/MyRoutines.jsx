

import React, { useEffect, useState } from 'react';
import ApiService from '../service/api';

function RoutineDetail({ routineId }) {
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!routineId) return;
    setLoading(true);
    ApiService.getRoutineById(routineId).then(r => {
      setRoutine(r);
      setLoading(false);
    });
  }, [routineId]);
  if (!routineId) return <>-</>;
  if (loading) return <>Cargando rutina...</>;
  if (!routine) return <>Rutina no encontrada</>;
  const { name, objective, description, exercises, duration, frequency } = routine;
  return (
    <div style={{ background: '#f0f0f0', borderRadius: 6, padding: 10, marginTop: 6 }}>
      <div><b>Nombre:</b> {name}</div>
      <div><b>Objetivo:</b> {objective}</div>
      <div><b>Descripción:</b> {description}</div>
      <div><b>Duración:</b> {duration}</div>
      <div><b>Frecuencia:</b> {frequency}</div>
      <div><b>Ejercicios:</b>
        <ul>
          {exercises && exercises.map((ex, i) => (
            <li key={i}>
              <b>{ex.name}</b> - Series: {ex.sets}, Repeticiones: {ex.repetitions}
              {ex.description && <div>Descripción: {ex.description}</div>}
              {ex.instructions && <div>Instrucciones: {ex.instructions}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function MyRoutines() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      setError('');
      setSuccess('');
      setLoading(true);
      try {
        const decoded = ApiService.decodeToken();
        const userId = decoded && (decoded.userId || decoded.sub || decoded.id);
        if (!userId) {
          setError('No se pudo obtener el usuario autenticado');
          setLoading(false);
          return;
        }
        const data = await ApiService.getPhysicalHistoryByUserId(userId);
        setRecords(data);
      } catch (err) {
        setError('No se pudieron cargar los registros físicos');
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  // Si quieres permitir eliminar registros físicos, implementa aquí

  return (
    <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <h2>Mi Historial Físico</h2>
      {loading && <div>Cargando registros...</div>}
      {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
      {success && <div style={{ color: 'green', fontWeight: 600 }}>{success}</div>}
      {records.length === 0 && !loading && <div>No tienes registros físicos.</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {records.map((rec, idx) => (
          <li key={rec.id || idx} style={{ background: '#f8f8f8', margin: '12px 0', borderRadius: 8, padding: 16 }}>
            <div><b>Fecha:</b> {rec.registrationDate ? new Date(rec.registrationDate).toLocaleString() : '-'}</div>
            <div><b>Peso:</b> {rec.weight} kg</div>
            <div><b>Medidas corporales:</b> 
              {rec.bodyMeasurements && (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li><b>Pecho:</b> {rec.bodyMeasurements.chest} cm</li>
                  <li><b>Cintura:</b> {rec.bodyMeasurements.waist} cm</li>
                  <li><b>Brazos:</b> {rec.bodyMeasurements.arms} cm</li>
                  <li><b>Piernas:</b> {rec.bodyMeasurements.legs} cm</li>
                </ul>
              )}
            </div>
            <div><b>Meta física:</b> {rec.physicalGoal}</div>
            <div><b>Observaciones:</b> {rec.observations || '-'}</div>
            <div><b>Rutina activa:</b> {rec.activeRoutine
              ? <RoutineDetail routineId={rec.activeRoutine} />
              : '-'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
