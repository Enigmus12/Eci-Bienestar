import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/api';

// Imports de componentes
import Button from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { Alert, AlertDescription } from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import Icons from '../components/icons/Icons';

// Componente Skeleton para loading
const Skeleton = ({ className = '', style = {} }) => (
  <div
    style={{
      backgroundColor: '#F3F4F6',
      borderRadius: '4px',
      animation: 'pulse 2s infinite',
      ...style
    }}
    className={className}
  />
);

// Funciones auxiliares
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

const dayTranslations = {
  'MONDAY': 'Lunes',
  'TUESDAY': 'Martes', 
  'WEDNESDAY': 'Miércoles',
  'THURSDAY': 'Jueves',
  'FRIDAY': 'Viernes',
  'SATURDAY': 'Sábado',
  'SUNDAY': 'Domingo'
};

export default function MyReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [schedules, setSchedules] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [rescheduled, setRescheduled] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  // Función para cancelar reserva por fecha
  // Guardar referencia a fetchReservations para usarla en handleCancelReservation
  const [fetchReservationsRef] = useState({ current: null });

  const handleCancelReservation = async (date) => {
    setCancelLoading(true);
    setError("");
    try {
      await ApiService.cancelScheduleByDate(date);
      setSelectedDate(null);
      // Llama a fetchReservations para refrescar la UI sin recargar la página
      if (fetchReservationsRef.current) {
        await fetchReservationsRef.current();
      }
    } catch (err) {
      setError("No se pudo cancelar la reserva: " + (err?.response?.data || err.message));
    } finally {
      setCancelLoading(false);
    }
  };

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
    fetchReservationsRef.current = fetchReservations;
    fetchReservations();
  }, []);

  const handleBack = () => {
    navigate('/UserDashboard');
  };

  // Lógica de semanas (preservada)
  let weeks = [];
  let sched = null;
  let resList = [];
  let hasWeeks = false;
  
  if (reservations.length > 0) {
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

  // Función para reprogramaciones (preservada)
  function getRescheduledForWeek(week) {
    return rescheduled.filter(r => {
      const reschedDate = new Date(r.date);
      return reschedDate >= week.start && reschedDate <= week.end;
    });
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)',
        padding: '24px'
      }}>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <Skeleton style={{ height: '32px', width: '256px', marginBottom: '8px' }} />
            <Skeleton style={{ height: '16px', width: '384px' }} />
          </div>
          <Card>
            <CardContent style={{ padding: '32px' }}>
              <Skeleton style={{ height: '200px', width: '100%' }} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)'
    }}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>

      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #60A5FA, #4F46E5)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icons.Clock size={24} style={{ color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 4px 0'
              }}>
                Mis Horarios Reservados
              </h1>
              <p style={{
                color: '#6B7280',
                margin: 0,
                fontSize: '14px'
              }}>
                Consulta y gestiona tus reservas de horarios
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleBack}>
            <Icons.ArrowLeft size={16} />
            Volver al dashboard
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {/* Error Alert */}
        {error && (
          <Alert style={{ marginBottom: '24px' }}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* No reservations state */}
        {!hasWeeks && !loading && (
          <Card style={{
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <CardContent style={{ padding: '48px 24px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #D1D5DB, #9CA3AF)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto'
              }}>
                <Icons.Calendar size={40} style={{ color: 'white' }} />
              </div>
              <CardTitle style={{ marginBottom: '12px' }}>
                No tienes reservas activas
              </CardTitle>
              <CardDescription style={{ marginBottom: '24px' }}>
                Parece que aún no has reservado ningún horario. ¡Comienza ahora!
              </CardDescription>
              <Button
                onClick={() => navigate('/ReservationsSchedules')}
                style={{
                  background: 'linear-gradient(135deg, #60A5FA, #4F46E5)',
                  border: 'none'
                }}
              >
                <Icons.Plus size={16} />
                Reservar Horarios
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Reservations Content */}
        {hasWeeks && weeks.length > 0 && (
          <Card>
            <CardHeader>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icons.Calendar size={24} />
                    Semana del Programa
                  </CardTitle>
                  <CardDescription>
                    {weeks[currentIdx] ? 
                      `${weeks[currentIdx].start.toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} - ${weeks[currentIdx].end.toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}` 
                      : 'Cargando...'}
                  </CardDescription>
                </div>

                {/* Navigation Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Badge variant="secondary">
                    Semana {currentIdx + 1} de {weeks.length}
                  </Badge>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
                      disabled={currentIdx === 0}
                      style={{ padding: '8px 12px' }}
                    >
                      <Icons.ArrowLeft size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentIdx(i => Math.min(weeks.length - 1, i + 1))}
                      disabled={currentIdx === weeks.length - 1}
                      style={{ padding: '8px 12px' }}
                    >
                      <Icons.ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Schedule Table */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 120px',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  {/* Table Header */}
                  <div style={{
                    fontWeight: '600',
                    color: '#374151',
                    padding: '12px 16px',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    Día de la Semana
                  </div>
                  <div style={{
                    fontWeight: '600',
                    color: '#374151',
                    padding: '12px 16px',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    Hora Inicio
                  </div>
                  <div style={{
                    fontWeight: '600',
                    color: '#374151',
                    padding: '12px 16px',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    Hora Fin
                  </div>
                </div>

                {/* Table Rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {weeks.length > 0 && resList.length > 0 && (() => {
                    const week = weeks[currentIdx];
                    
                    // Obtener fechas reprogramadas originales
                    const reschedOriginalDates = rescheduled
                      .map(r => r.originalDate)
                      .filter(dateStr => {
                        const orig = new Date(dateStr);
                        return orig >= week.start && orig <= week.end;
                      });

                    // Filas normales
                    const normalRows = resList
                      .sort((a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek))
                      .map((res, idx) => {
                        const dayOffset = dayOrder.indexOf(res.dayOfWeek);
                        const date = new Date(week.start);
                        date.setDate(date.getDate() + dayOffset);
                        const dateStr = date.toISOString().slice(0, 10);
                        if (reschedOriginalDates.includes(dateStr)) return null;
                        const isSelected = selectedDate === dateStr;
                        return (
                          <div
                            key={res.id || idx}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: isSelected ? '1fr 120px 120px 120px' : '1fr 120px 120px',
                              gap: '12px',
                              backgroundColor: isSelected ? '#DBEAFE' : 'white',
                              padding: '16px',
                              borderRadius: '8px',
                              border: isSelected ? '2px solid #2563EB' : '1px solid #E5E7EB',
                              alignItems: 'center',
                              cursor: 'pointer',
                              transition: 'background 0.2s, border 0.2s'
                            }}
                            onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                          >
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              fontWeight: '500',
                              color: '#1F2937'
                            }}>
                              <div style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#3B82F6',
                                borderRadius: '50%'
                              }} />
                              {dayTranslations[res.dayOfWeek] || capitalize(res.dayOfWeek)}
                            </div>
                            <div style={{
                              textAlign: 'center',
                              fontWeight: '600',
                              color: '#059669',
                              backgroundColor: '#ECFDF5',
                              padding: '8px',
                              borderRadius: '6px',
                              fontSize: '14px'
                            }}>
                              {res.startTime}
                            </div>
                            <div style={{
                              textAlign: 'center',
                              fontWeight: '600',
                              color: '#DC2626',
                              backgroundColor: '#FEF2F2',
                              padding: '8px',
                              borderRadius: '6px',
                              fontSize: '14px'
                            }}>
                              {res.endTime}
                            </div>
                            {isSelected && (
                              <div style={{ textAlign: 'center' }}>
                                <Button
                                  variant="destructive"
                                  style={{ minWidth: 90, fontSize: 13, padding: '8px 12px' }}
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleCancelReservation(dateStr);
                                  }}
                                  disabled={cancelLoading}
                                >
                                  {cancelLoading ? 'Cancelando...' : 'Cancelar'}
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })
                      .filter(row => row !== null);

                    // Filas reprogramadas
                    const reschedRows = getRescheduledForWeek(week)
                      .sort((a, b) => dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek))
                      .map((re, idx) => (
                        <div key={re.id + '-resched-' + idx} style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 120px 120px',
                          gap: '12px',
                          backgroundColor: '#FEF2F2',
                          padding: '16px',
                          borderRadius: '8px',
                          border: '2px solid #FECACA',
                          alignItems: 'center'
                        }}>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              fontWeight: '500',
                              color: '#1F2937'
                            }}>
                              <div style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#EF4444',
                                borderRadius: '50%'
                              }} />
                              {dayTranslations[re.dayOfWeek] || capitalize(re.dayOfWeek)}
                              <Badge variant="secondary" style={{
                                backgroundColor: '#FCA5A5',
                                color: '#7F1D1D',
                                fontSize: '11px',
                                padding: '2px 6px'
                              }}>
                                Reprogramado
                              </Badge>
                            </div>
                            {re.holidayDescription && (
                              <div style={{
                                fontSize: '12px',
                                color: '#DC2626',
                                fontStyle: 'italic'
                              }}>
                                {re.holidayDescription}
                              </div>
                            )}
                          </div>
                          <div style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            color: '#059669',
                            backgroundColor: '#ECFDF5',
                            padding: '8px',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}>
                            {re.startTime}
                          </div>
                          <div style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            color: '#DC2626',
                            backgroundColor: '#FEF2F2',
                            padding: '8px',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}>
                            {re.endTime}
                          </div>
                        </div>
                      ));

                    return [...normalRows, ...reschedRows];
                  })()}
                </div>

                {/* Empty state for week */}
                {weeks.length > 0 && resList.length === 0 && (
                  <div style={{
                    textAlign: 'center',
                    padding: '32px',
                    color: '#6B7280'
                  }}>
                    <Icons.Calendar size={48} style={{ color: '#D1D5DB', marginBottom: '16px' }} />
                    <p>No hay horarios programados para esta semana</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <div style={{ marginTop: '32px' }}>
          <Card style={{
            background: 'linear-gradient(135deg, #60A5FA, #4F46E5)',
            border: 'none',
            color: 'white'
          }}>
            <CardContent style={{ padding: '24px', textAlign: 'center' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'white',
                margin: '0 0 12px 0'
              }}>
                📅 Gestión de Horarios
              </h3>
              <p style={{
                color: '#DBEAFE',
                fontSize: '14px',
                margin: '0'
              }}>
                Navega entre las semanas para ver todos tus horarios programados. Los días reprogramados aparecen destacados con información adicional.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}