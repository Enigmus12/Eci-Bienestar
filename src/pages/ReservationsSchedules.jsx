
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/api';
import Button from '../components/ui/Button';

export default function ReservationsSchedules() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [holidaysLoading, setHolidaysLoading] = useState(false);
  const [holidaysError, setHolidaysError] = useState('');

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const dayLabels = {
    'MONDAY': 'Lunes',
    'TUESDAY': 'Martes', 
    'WEDNESDAY': 'Miércoles',
    'THURSDAY': 'Jueves',
    'FRIDAY': 'Viernes',
    'SATURDAY': 'Sábado'
  };

  // Generar horas de 7:00 a 17:00
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await ApiService.getAllSchedules();
      setSchedules(data);
    } catch (err) {
      setError('No se pudieron cargar los horarios');
    }
  };

  const handleReserve = async () => {
    if (!selectedGroup) return;
    setError('');
    setResult(null);
    setLoading(true);
    try {
      await ApiService.reserveGymGroup(selectedGroup.scheduleGroupId);
      setShowModal(false);
      setSelectedGroup(null);
      navigate('/user');
    } catch (err) {
      setError(err.message || 'Error al reservar');
    } finally {
      setLoading(false);
    }
  };

  const getScheduleForSlot = (day, time) => {
    return schedules.find(schedule => 
      schedule.dayOfWeek === day && schedule.startTime === time
    );
  };

  const getGroupSchedules = (scheduleGroupId) => {
    return schedules.filter(s => s.scheduleGroupId === scheduleGroupId);
  };

  const handleSlotClick = async (schedule) => {
    if (schedule) {
      const groupSchedules = getGroupSchedules(schedule.scheduleGroupId);
      setSelectedGroup({
        ...schedule,
        groupSchedules
      });
      setHolidays([]);
      setHolidaysError('');
      setHolidaysLoading(true);
      setShowModal(true);
      try {
        const res = await ApiService.getHolidaySchedulesByGroup(schedule.scheduleGroupId);
        setHolidays(res);
      } catch (err) {
        setHolidaysError('No se pudieron cargar los días festivos/reprogramados');
      } finally {
        setHolidaysLoading(false);
      }
    }
  };

  const getCapacityColor = (capacity) => {
    if (capacity >= 20) return '#4ade80'; // Verde
    if (capacity >= 10) return '#facc15'; // Amarillo
    return '#f87171'; // Rojo
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
        <Button onClick={() => navigate('/user')} variant="outline">
          <span style={{ fontSize: '18px', marginRight: 6 }}>←</span> Volver al inicio
        </Button>
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
        Horarios del Gimnasio
      </h2>
      
      {error && (
        <div style={{
          color: '#dc2626',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{
          color: '#059669',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          ¡Reserva realizada con éxito!
        </div>
      )}

      {/* Calendario de horarios */}
      <div style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header con días */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '100px repeat(6, 1fr)',
          background: '#f9fafb',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <div style={{
            padding: '1rem',
            fontWeight: 'bold',
            textAlign: 'center',
            borderRight: '1px solid #e5e7eb'
          }}>
            Hora
          </div>
          {days.map(day => (
            <div key={day} style={{
              padding: '1rem',
              fontWeight: 'bold',
              textAlign: 'center',
              borderRight: day !== 'SATURDAY' ? '1px solid #e5e7eb' : 'none'
            }}>
              {dayLabels[day]}
            </div>
          ))}
        </div>

        {/* Filas de horarios */}
        {timeSlots.map(time => (
          <div key={time} style={{
            display: 'grid',
            gridTemplateColumns: '100px repeat(6, 1fr)',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{
              padding: '1rem',
              textAlign: 'center',
              fontWeight: '500',
              background: '#f9fafb',
              borderRight: '1px solid #e5e7eb'
            }}>
              {time}
            </div>
            {days.map(day => {
              const schedule = getScheduleForSlot(day, time);
              return (
                <div
                  key={`${day}-${time}`}
                  onClick={() => handleSlotClick(schedule)}
                  style={{
                    padding: '0.5rem',
                    borderRight: day !== 'SATURDAY' ? '1px solid #e5e7eb' : 'none',
                    cursor: schedule ? 'pointer' : 'default',
                    background: schedule ? '#fff' : '#f9fafb',
                    transition: 'all 0.2s ease',
                    minHeight: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (schedule) {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (schedule) {
                      e.target.style.background = '#fff';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {schedule && (
                    <>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '4px'
                      }}>
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      <div style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '12px',
                        background: getCapacityColor(schedule.capacity),
                        color: 'white',
                        fontWeight: '500'
                      }}>
                        {schedule.capacity} cupos
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        fontSize: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#4ade80'
          }}></div>
          <span>Alta disponibilidad (20+ cupos)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#facc15'
          }}></div>
          <span>Media disponibilidad (10-19 cupos)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#f87171'
          }}></div>
          <span>Baja disponibilidad (&lt;10 cupos)</span>
        </div>
      </div>

      {/* Modal de detalles y reserva */}
      {showModal && selectedGroup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>
              Detalles del Grupo de Horarios
            </h3>
            
            <div style={{
              background: '#f9fafb',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                <strong>ID del Grupo:</strong> {selectedGroup.scheduleGroupId}
              </p>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                <strong>Fechas:</strong> {selectedGroup.startDate} - {selectedGroup.endDate}
              </p>
            </div>

            {/* Mostrar días festivos/reprogramados */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#dc2626', margin: '0 0 0.5rem 0' }}>Días festivos o reprogramados</h4>
              {holidaysLoading && <div>Cargando días festivos/reprogramados...</div>}
              {holidaysError && <div style={{ color: '#dc2626' }}>{holidaysError}</div>}
              {!holidaysLoading && holidays.length === 0 && !holidaysError && (
                <div style={{ color: '#6b7280', fontSize: '14px' }}>No hay días festivos ni reprogramados en este grupo.</div>
              )}
              {!holidaysLoading && holidays.length > 0 && (
                <ul style={{ paddingLeft: 18, margin: 0 }}>
                  {holidays.map((h, idx) => {
                    let dayName = '';
                    try {
                      const dateObj = new Date(h.date);
                      dayName = dateObj.toLocaleDateString('es-ES', { weekday: 'long' });
                    } catch {}
                    return (
                      <li key={h.id || idx} style={{ marginBottom: 4 }}>
                        <span style={{ fontWeight: 500 }}>{h.date}</span>
                        {dayName && (
                          <span style={{ color: '#6b7280', marginLeft: 8 }}>({dayName})</span>
                        )}
                        {h.originalDate && h.originalDate !== h.date && (
                          <span style={{ color: '#f59e42', marginLeft: 8 }}>Original: {h.originalDate}</span>
                        )}
                        {h.holidayDescription && (
                          <span style={{ color: '#ef4444', marginLeft: 8 }}>{h.holidayDescription}</span>
                        )}
                        {h.rescheduled && (
                          <span style={{ color: '#f59e42', marginLeft: 8 }}>[Reprogramado]</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <h4 style={{ margin: '1rem 0', color: '#374151' }}>
              Horarios incluidos en este grupo:
            </h4>
            <div style={{ marginBottom: '2rem' }}>
              {selectedGroup.groupSchedules.map(schedule => (
                <div key={schedule.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                  background: '#fff'
                }}>
                  <div>
                    <strong>{dayLabels[schedule.dayOfWeek]}</strong>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '16px',
                    background: getCapacityColor(schedule.capacity),
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {schedule.capacity} cupos
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedGroup(null);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleReserve}
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: loading ? '#9ca3af' : '#dc2626',
                  color: 'white',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                {loading ? 'Reservando...' : 'Confirmar Reserva'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}