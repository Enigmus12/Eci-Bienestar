import React, { useState, useEffect } from 'react';
import ApiService from '../service/api';

export default function ReservationsSchedules() {
  const [scheduleGroupId, setScheduleGroupId] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await ApiService.getAllSchedules();
        setSchedules(data);
      } catch (err) {
        setError('No se pudieron cargar los horarios');
      }
    };
    fetchSchedules();
  }, []);

  const handleReserve = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await ApiService.reserveGymGroup(scheduleGroupId);
      setResult(res);
      // Refrescar los horarios para actualizar la capacidad
      const data = await ApiService.getAllSchedules();
      setSchedules(data);
    } catch (err) {
      setError(err.message || 'Error al reservar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
      <h2>Reservar Grupo de Horarios</h2>
      <form onSubmit={handleReserve} style={{ marginBottom: 24 }}>
        <select
          value={scheduleGroupId}
          onChange={e => setScheduleGroupId(e.target.value)}
          required
          style={{ padding: 8, width: '80%', borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        >
          <option value="">Selecciona un grupo de horarios</option>
          {Array.from(new Set(schedules.map(s => s.scheduleGroupId))).map(groupId => (
            <option key={groupId} value={groupId}>{groupId}</option>
          ))}
        </select>
        <button type="submit" style={{ marginLeft: 12, background: '#990000', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, fontSize: 16 }} disabled={loading}>
          Reservar
        </button>
      </form>
      {scheduleGroupId && (
        <div style={{ marginBottom: 16, background: '#f8f8f8', borderRadius: 8, padding: 12, fontSize: 15 }}>
          <b>Horarios del grupo seleccionado:</b>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
            <thead>
              <tr style={{ background: '#eee' }}>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Día</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Hora inicio</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Hora fin</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Capacidad</th>
              </tr>
            </thead>
            <tbody>
              {schedules.filter(s => s.scheduleGroupId === scheduleGroupId).map(s => (
                <tr key={s.id}>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{s.dayOfWeek}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{s.startTime}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{s.endTime}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{s.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {loading && <div>Procesando reserva...</div>}
      {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
      {result && (
        <div style={{ color: 'green', fontWeight: 600, marginTop: 16 }}>
          Reserva realizada con éxito.
          <pre style={{ textAlign: 'left', background: '#f3f3f3', padding: 12, borderRadius: 8, marginTop: 8, fontSize: 14 }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
