import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/api';
import { Icons } from '../components/ui/Icon';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { Alert, AlertDescription } from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';



// Componente para mostrar detalles de rutina
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

  if (!routineId) return <span style={{ color: '#6B7280' }}>No asignada</span>;
  
  if (loading) return (
    <div style={{ marginTop: '8px' }}>
      <Skeleton style={{ height: '16px', width: '120px', marginBottom: '4px' }} />
      <Skeleton style={{ height: '12px', width: '200px' }} />
    </div>
  );
  
  if (!routine) return <span style={{ color: '#EF4444' }}>Rutina no encontrada</span>;

  const { name, objective, description, exercises, duration, frequency } = routine;

  return (
    <Card style={{ marginTop: '12px', backgroundColor: '#F8FAFC' }}>
      <CardContent style={{ padding: '16px' }}>
        <div style={{ marginBottom: '12px' }}>
          <h4 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#111827', 
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Icons.Dumbbell size={16} style={{ color: '#3B82F6' }} />
            {name}
          </h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <Badge variant="secondary">{duration}</Badge>
            <Badge variant="secondary">{frequency}</Badge>
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <div style={{ 
            fontSize: '14px', 
            color: '#374151', 
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Icons.Target size={14} style={{ color: '#10B981' }} />
            <strong>Objetivo:</strong> {objective}
          </div>
          {description && (
            <div style={{ 
              fontSize: '14px', 
              color: '#6B7280', 
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '6px'
            }}>
              <Icons.FileText size={14} style={{ color: '#6B7280', marginTop: '2px' }} />
              {description}
            </div>
          )}
        </div>

        {exercises && exercises.length > 0 && (
          <div>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Icons.Activity size={14} style={{ color: '#A855F7' }} />
              Ejercicios ({exercises.length}):
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {exercises.map((ex, i) => (
                <div key={i} style={{
                  backgroundColor: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB'
                }}>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#111827', 
                    marginBottom: '4px' 
                  }}>
                    {ex.name}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6B7280',
                    display: 'flex',
                    gap: '12px'
                  }}>
                    <span>Series: {ex.sets}</span>
                    <span>Repeticiones: {ex.repetitions}</span>
                  </div>
                  {ex.description && (
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#6B7280', 
                      marginTop: '4px',
                      fontStyle: 'italic'
                    }}>
                      {ex.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MyRoutines() {
  const navigate = useNavigate();
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

  const handleBack = () => {
    navigate('/user');
  };

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
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <Skeleton style={{ height: '32px', width: '256px', marginBottom: '8px' }} />
            <Skeleton style={{ height: '16px', width: '384px' }} />
          </div>
          <div style={{ display: 'grid', gap: '24px' }}>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton style={{ height: '24px', width: '128px' }} />
                  <Skeleton style={{ height: '16px', width: '192px', marginTop: '8px' }} />
                </CardHeader>
                <CardContent>
                  <Skeleton style={{ height: '60px', width: '100%' }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)'
    }}>
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
              background: 'linear-gradient(135deg, #A855F7, #EC4899)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icons.TrendingUp size={24} style={{ color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 4px 0'
              }}>
                Mi Historial Físico
              </h1>
              <p style={{
                color: '#6B7280',
                margin: 0,
                fontSize: '14px'
              }}>
                Revisa tu progreso y registros de bienestar físico
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleBack}>
            <Icons.ArrowLeft size={16} />
            Volver al Dashboard
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {/* Alerts */}
        {error && (
          <Alert style={{ marginBottom: '24px' }}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" style={{ marginBottom: '24px' }}>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Stats */}
        <div style={{ marginBottom: '32px' }}>
          <Card style={{
            background: 'linear-gradient(135deg, #A855F7, #EC4899)',
            border: 'none',
            color: 'white'
          }}>
            <CardContent style={{ padding: '24px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '24px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                    {records.length}
                  </div>
                  <div style={{ color: '#F3E8FF' }}>Registros totales</div>
                </div>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                    {records.filter(r => r.activeRoutine).length}
                  </div>
                  <div style={{ color: '#F3E8FF' }}>Con rutinas activas</div>
                </div>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                    {records.length > 0 ? records[records.length - 1].weight || '-' : '-'}
                  </div>
                  <div style={{ color: '#F3E8FF' }}>Último peso (kg)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Records List */}
        {records.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '48px 0' }}>
            <CardContent>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <Icons.FileText size={32} style={{ color: '#6B7280' }} />
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 8px 0'
              }}>
                No hay registros físicos
              </h3>
              <p style={{
                color: '#6B7280',
                margin: '0 0 24px 0'
              }}>
                Comienza registrando tus datos físicos para hacer seguimiento de tu progreso
              </p>
              <Button 
                onClick={() => navigate('/PhysicalRecords')}
                style={{
                  background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                  border: 'none'
                }}
              >
                <Icons.User size={16} />
                Registrar datos físicos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div style={{ display: 'grid', gap: '24px' }}>
            {records.map((rec, idx) => (
              <Card key={rec.id || idx} hover>
                <CardContent style={{ padding: '24px' }}>
                  {/* Header del registro */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #3B82F6, #4F46E5)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icons.Calendar size={20} style={{ color: 'white' }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#111827',
                          margin: '0 0 4px 0'
                        }}>
                          Registro #{idx + 1}
                        </h3>
                        <p style={{
                          fontSize: '14px',
                          color: '#6B7280',
                          margin: 0
                        }}>
                          {rec.registrationDate 
                            ? new Date(rec.registrationDate).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'Fecha no disponible'
                          }
                        </p>
                      </div>
                    </div>
                    <Badge variant="success">Activo</Badge>
                  </div>

                  {/* Contenido del registro */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px'
                  }}>
                    {/* Información básica */}
                    <div>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 12px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Información General
                      </h4>
                      <div style={{ display: 'grid', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#6B7280', fontSize: '14px' }}>Peso:</span>
                          <span style={{ fontWeight: '600', color: '#111827' }}>{rec.weight} kg</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#6B7280', fontSize: '14px' }}>Meta física:</span>
                          <span style={{ fontWeight: '500', color: '#111827' }}>{rec.physicalGoal}</span>
                        </div>
                      </div>
                    </div>

                    {/* Medidas corporales */}
                    {rec.bodyMeasurements && (
                      <div>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#374151',
                          margin: '0 0 12px 0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Medidas Corporales
                        </h4>
                        <div style={{ display: 'grid', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6B7280', fontSize: '14px' }}>Pecho:</span>
                            <span style={{ fontWeight: '600', color: '#111827' }}>{rec.bodyMeasurements.chest} cm</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6B7280', fontSize: '14px' }}>Cintura:</span>
                            <span style={{ fontWeight: '600', color: '#111827' }}>{rec.bodyMeasurements.waist} cm</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6B7280', fontSize: '14px' }}>Brazos:</span>
                            <span style={{ fontWeight: '600', color: '#111827' }}>{rec.bodyMeasurements.arms} cm</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#6B7280', fontSize: '14px' }}>Piernas:</span>
                            <span style={{ fontWeight: '600', color: '#111827' }}>{rec.bodyMeasurements.legs} cm</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Observaciones */}
                  {rec.observations && (
                    <div style={{ marginTop: '20px' }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Icons.FileText size={14} style={{ color: '#6B7280' }} />
                        Observaciones
                      </h4>
                      <p style={{
                        fontSize: '14px',
                        color: '#6B7280',
                        margin: 0,
                        padding: '12px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB'
                      }}>
                        {rec.observations}
                      </p>
                    </div>
                  )}

                  {/* Rutina activa */}
                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      margin: '0 0 8px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Icons.Dumbbell size={14} style={{ color: '#A855F7' }} />
                      Rutina Activa
                    </h4>
                    {rec.activeRoutine ? (
                      <RoutineDetail routineId={rec.activeRoutine} />
                    ) : (
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        textAlign: 'center'
                      }}>
                        <Icons.Target size={24} style={{ color: '#9CA3AF', margin: '0 auto 8px' }} />
                        <p style={{
                          fontSize: '14px',
                          color: '#6B7280',
                          margin: 0
                        }}>
                          No hay rutina asignada para este registro
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Action Button */}
        {records.length > 0 && (
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Button 
              onClick={() => navigate('/PhysicalRecords')}
              size="lg"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #4F46E5)',
                border: 'none'
              }}
            >
              <Icons.User size={20} />
              Agregar nuevo registro
            </Button>
          </div>
        )}

        {/* Footer Info */}
        <div style={{ marginTop: '48px' }}>
          <Card style={{
            background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)',
            border: 'none'
          }}>
            <CardContent style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <Icons.TrendingUp size={20} style={{ color: '#6B7280' }} />
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  margin: 0
                }}>
                  Seguimiento de Progreso
                </h4>
              </div>
              <p style={{
                color: '#6B7280',
                fontSize: '14px',
                margin: 0
              }}>
                Mantén un registro constante de tus datos físicos para monitorear tu progreso y alcanzar tus metas de bienestar
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}