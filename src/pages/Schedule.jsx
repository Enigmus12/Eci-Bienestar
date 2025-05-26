import React, { useState } from 'react';
import ApiService from '../service/api';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function Schedule() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [dayTimeMap, setDayTimeMap] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mensaje, setMensaje] = useState('');

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  // Solo permite seleccionar hasta 3 días
  const handleDayCheck = (day, checked) => {
    const selectedDays = Object.keys(dayTimeMap).filter(d => dayTimeMap[d]);
    if (checked && selectedDays.length >= 3) return;
    setDayTimeMap(prev => {
      const copy = { ...prev };
      if (checked) {
        copy[day] = ['07:00', '08:00'];
      } else {
        delete copy[day];
      }
      return copy;
    });
  };

  // Solo permite seleccionar una hora exacta (de 7 a 17, bloques de 1 hora)
  const handleHourChange = (day, value) => {
    const start = value;
    const endHour = String(Number(start.split(':')[0]) + 1).padStart(2, '0') + ':00';
    setDayTimeMap(prev => ({
      ...prev,
      [day]: [start, endHour],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setMensaje('');
    if (Object.keys(dayTimeMap).length !== 3) {
      setError('Debes seleccionar exactamente 3 días.');
      return;
    }
    try {
      // Convertir los horarios a formato LocalTime (HH:mm:ss)
      const formattedDayTimeMap = {};
      for (const day of Object.keys(dayTimeMap)) {
        formattedDayTimeMap[day] = [
          dayTimeMap[day][0] + ':00',
          dayTimeMap[day][1] + ':00',
        ];
      }
      const dto = {
        startDate,
        endDate,
        dayTimeMap: formattedDayTimeMap,
        capacity: Number(capacity),
      };
      const res = await ApiService.createSemestralSchedule(dto);
      setSuccess('Horario creado exitosamente');
      if (res && res.mensaje) {
        setMensaje(res.mensaje);
      }
    } catch (err) {
      setError(err.message || 'Error al crear el horario');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
        <Button onClick={() => navigate('/coaches')} variant="outline">
          <span style={{ fontSize: '18px', marginRight: 6 }}>←</span> Volver al inicio
        </Button>
      </div>
      <h2>Crear Horarios</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        <div>
          <label>Fecha inicio: </label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>Fecha fin: </label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
        </div>
        <div>
          <label>Capacidad: </label>
          <input type="number" min={1} value={capacity} onChange={e => setCapacity(e.target.value)} required />
        </div>
        <div>
          <label>Selecciona 3 días y una hora para cada uno (de 7:00 a 16:00):</label>
          {days.map(day => {
            const selected = !!dayTimeMap[day];
            return (
              <div key={day} style={{ margin: '8px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={e => handleDayCheck(day, e.target.checked)}
                  disabled={!selected && Object.keys(dayTimeMap).length >= 3}
                />
                <span style={{ width: 90, textAlign: 'right' }}>{day}:</span>
                <input
                  type="time"
                  min="07:00"
                  max="16:00"
                  step="3600"
                  value={dayTimeMap[day]?.[0] || ''}
                  onChange={e => handleHourChange(day, e.target.value)}
                  disabled={!selected}
                  required={selected}
                />
                <span>a</span>
                <input
                  type="time"
                  value={dayTimeMap[day]?.[1] || ''}
                  disabled
                  style={{ background: '#eee' }}
                />
              </div>
            );
          })}
        </div>
        {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
        {success && <div style={{ color: 'green', fontWeight: 600 }}>{success}</div>}
        {mensaje && <div style={{ color: '#007bff', fontWeight: 600, marginTop: 8, whiteSpace: 'pre-line' }}>{mensaje}</div>}
        <button type="submit" style={{ background: '#990000', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 600, fontSize: 16, marginTop: 12 }}>Crear horario</button>
      </form>
    </div>
  );
}
