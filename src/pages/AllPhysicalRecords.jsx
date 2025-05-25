
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
export default function AllPhysicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editObs, setEditObs] = useState('');
  const [editRoutine, setEditRoutine] = useState('');
  const [success, setSuccess] = useState('');
  const [routines, setRoutines] = useState([]);
  const [routineNames, setRoutineNames] = useState({});

  useEffect(() => {
    const fetchRecordsAndRoutines = async () => {
      setLoading(true);
      setError('');
      try {
        const [recordsData, routinesData] = await Promise.all([
          ApiService.getAllPhysicalRecords(),
          ApiService.getAllRoutines()
        ]);
        setRecords(recordsData);
        setRoutines(routinesData);
        // Prepara un diccionario para mostrar el nombre de la rutina por id
        const names = {};
        routinesData.forEach(r => { names[r.id] = r.name; });
        setRoutineNames(names);
      } catch (err) {
        setError('No se pudieron cargar los registros o rutinas');
      } finally {
        setLoading(false);
      }
    };
    fetchRecordsAndRoutines();
  }, []);

  const startEdit = (rec) => {
    setEditId(rec.id);
    setEditObs(rec.observations || '');
    setEditRoutine(rec.activeRoutine || '');
    setSuccess('');
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditObs('');
    setEditRoutine('');
  };

  const saveEdit = async () => {
    try {
      await ApiService.updatePhysicalRecord(editId, { observations: editObs, activeRoutine: editRoutine });
      setRecords(records.map(r => r.id === editId ? { ...r, observations: editObs, activeRoutine: editRoutine } : r));
      setSuccess('Registro actualizado correctamente');
      cancelEdit();
    } catch (err) {
      setError('No se pudo actualizar el registro');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h2>Todos los Registros Físicos</h2>
      {loading && <div>Cargando registros...</div>}
      {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
      {success && <div style={{ color: 'green', fontWeight: 600 }}>{success}</div>}
      {records.length === 0 && !loading && <div>No hay registros.</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {records.map((rec) => (
          <li key={rec.id} style={{ background: '#f8f8f8', margin: '12px 0', borderRadius: 8, padding: 16 }}>
            <div><b>Usuario:</b> {rec.userName}</div>
            <div><b>Peso:</b> {rec.weight} kg</div>
            <div><b>Meta física:</b> {rec.physicalGoal}</div>
            <div><b>Observaciones:</b> {editId === rec.id ? (
              <input value={editObs} onChange={e => setEditObs(e.target.value)} />
            ) : (rec.observations || '-')}
            </div>
            <div><b>Rutina activa:</b> {editId === rec.id ? (
              <select value={editRoutine} onChange={e => setEditRoutine(e.target.value)}>
                <option value=''>Sin rutina</option>
                {routines.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            ) : (
              rec.activeRoutine
                ? <RoutineDetail routineId={rec.activeRoutine} />
                : '-')}
            </div>
            {editId === rec.id ? (
              <>
                <button onClick={saveEdit} style={{ marginRight: 8 }}>Guardar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              <button onClick={() => startEdit(rec)}>Modificar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
