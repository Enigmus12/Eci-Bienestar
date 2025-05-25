import React, { useEffect, useState } from 'react';
import ApiService from '../service/api';

function groupByScheduleId(reservations) {
  const grouped = {};
  reservations.forEach(res => {
    if (!grouped[res.scheduleId]) grouped[res.scheduleId] = [];
    grouped[res.scheduleId].push(res);
  });
  return grouped;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const dayOrder = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [schedules, setSchedules] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await ApiService.getMyReservations();
        setReservations(data);
        // Obtener todos los horarios y mapear por id
        const allSchedules = await ApiService.getAllSchedules();
        const scheduleMap = {};
        allSchedules.forEach(s => { scheduleMap[s.id] = s; });
        setSchedules(scheduleMap);

        // Obtener userId del token
        const decoded = ApiService.decodeToken();
        const userId = decoded && (decoded.userId || decoded.sub || decoded.id);
        if (userId) {
          const rescheduled = await ApiService.getRescheduledByUser(userId);
          setRescheduled(rescheduled);
        }
      } catch (err) {
        setError('No se pudieron cargar las reservas');
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);
  // Estado para los días reprogramados
  const [rescheduled, setRescheduled] = useState([]);

  // Agrupar reservas por scheduleId (una semana por grupo de reservas)
  // Pero mostrar todas las semanas entre startDate y endDate del horario, con los mismos días reservados
  let weeks = [];
  let sched = null;
  let resList = [];
  let hasWeeks = false;
  if (reservations.length > 0) {
    // Tomar el primer scheduleId (todas las reservas del usuario son para el mismo grupo de horario)
    const scheduleId = reservations[0].scheduleId;
    sched = schedules[scheduleId];
    resList = reservations;
    if (sched && sched.startDate && sched.endDate) {
      const start = new Date(sched.startDate);
      const end = new Date(sched.endDate);
      let weekStart = new Date(start);
      let weekIdx = 0;
      while (weekStart <= end) {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weeks.push({
          weekNumber: weekIdx + 1,
          start: new Date(weekStart),
          end: new Date(Math.min(weekEnd, end)),
        });
        weekStart.setDate(weekStart.getDate() + 7);
        weekIdx++;
      }
      hasWeeks = weeks.length > 0;
    }
  }


  // Agrupar reprogramaciones por semana
  function getRescheduledForWeek(week) {
    // Devuelve todas las reprogramaciones cuya fecha reprogramada cae en la semana actual
    return rescheduled.filter(r => {
      const reschedDate = new Date(r.date);
      return reschedDate >= week.start && reschedDate <= week.end;
    });
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
      <h2>Mis Horarios Reservados</h2>
      {loading && <div>Cargando reservas...</div>}
      {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
      {!hasWeeks && !loading && <div>No tienes reservas activas.</div>}
      {hasWeeks && weeks.length > 0 && (
        <div style={{ background: '#f8f8f8', margin: '18px 0', borderRadius: 8, padding: 18 }}>
          <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>
              <b>Semana:</b> {weeks[currentIdx] ? `${weeks[currentIdx].start.toLocaleDateString()} - ${weeks[currentIdx].end.toLocaleDateString()}` : 'Cargando...'}
            </span>
            <span>
              <button onClick={() => setCurrentIdx(i => Math.max(0, i - 1))} disabled={currentIdx === 0} style={{ marginRight: 8 }}>&lt; Anterior</button>
              <button onClick={() => setCurrentIdx(i => Math.min(weeks.length - 1, i + 1))} disabled={currentIdx === weeks.length - 1}>Siguiente &gt;</button>
            </span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 6 }}>
            <thead>
              <tr style={{ background: '#eee' }}>
                <th style={{ padding: 6, borderRadius: 6  }}>Día</th>
                <th style={{ padding: 6 }}>Hora inicio</th>
                <th style={{ padding: 6 }}>Hora fin</th>
              </tr>
            </thead>
            <tbody>
      {weeks.length > 0 && resList.length > 0 && (() => {
        const week = weeks[currentIdx];
        // Días normales de la semana

        // Ocultar el día original en la semana donde estaba, si existe una reprogramación para ese día
        // Obtener todas las fechas originales reprogramadas de esta semana
        const reschedOriginalDates = rescheduled
          .map(r => r.originalDate)
          .filter(dateStr => {
            const orig = new Date(dateStr);
            return orig >= week.start && orig <= week.end;
          });

        const normalRows = resList
          .sort((a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek))
          .map((res, idx) => {
            const dayOffset = dayOrder.indexOf(res.dayOfWeek);
            const date = new Date(week.start);
            date.setDate(date.getDate() + dayOffset);
            const dateStr = date.toISOString().slice(0, 10);
            // Si la fecha de este día está en la lista de originales reprogramados de esta semana, ocultar
            if (reschedOriginalDates.includes(dateStr)) return null;
            return (
              <tr key={res.id || idx}>
                <td style={{ padding: 6 }}>{capitalize(res.dayOfWeek)}</td>
                <td style={{ padding: 6 }}>{res.startTime}</td>
                <td style={{ padding: 6 }}>{res.endTime}</td>
              </tr>
            );
          });

        // Días reprogramados de la semana
        const reschedRows = getRescheduledForWeek(week)
          .sort((a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek))
          .map((re, idx) => (
            <tr key={re.id + '-resched-' + idx} style={{ background: '#ffe0e0' }}>
              <td style={{ padding: 6 }}>{capitalize(re.dayOfWeek)} (Reprogramado)<br/><span style={{fontSize:'0.9em',color:'#b00'}}>{re.holidayDescription}</span></td>
              <td style={{ padding: 6 }}>{re.startTime}</td>
              <td style={{ padding: 6 }}>{re.endTime}</td>
            </tr>
          ));

        return [...normalRows, ...reschedRows];
      })()}
            </tbody>
          </table>
          <div style={{ marginTop: 10, textAlign: 'center', color: '#888' }}>
            Semana {currentIdx + 1} de {weeks.length}
          </div>
        </div>
      )}
    </div>
  );
}