import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/api';

// Imports de componentes
import Button from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { Alert, AlertDescription } from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import { Icons } from '../components/ui/Icon';

// Componente Skeleton
const TrainerSkeleton = ({ className = '', style = {} }) => (
  <div
    style={{
      backgroundColor: '#F3F4F6',
      borderRadius: '4px',
      animation: 'pulseTrainer 2s infinite',
      ...style
    }}
    className={className}
  />
);

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const [hasSchedules, setHasSchedules] = useState(false);
  const [loadingCoach, setLoadingCoach] = useState(true);
  const [errorCoach, setErrorCoach] = useState('');

  const [coachName, setCoachName] = useState('');
  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        // Verificar si el coach tiene horarios creados
        const schedulesRes = await ApiService.getCoachSchedules();
        setHasSchedules(Array.isArray(schedulesRes) && schedulesRes.length > 0);
        
        // Obtener información del coach
        const decoded = ApiService.decodeToken();
        const coachId = decoded && (decoded.userId || decoded.sub || decoded.id);
        if (coachId) {
          const coach = await ApiService.getUserById(coachId);
          setCoachName(coach && (coach.name || coach.fullName || coach.userName || 'Coach'));
        }
      } catch (err) {
        setErrorCoach('');
      } finally {
        setLoadingCoach(false);
      }
    };
    fetchCoachData();
  }, []);

  const handleCoachExit = () => {
    navigate('/');
  };

  if (loadingCoach) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
        padding: '24px'
      }}>
        <style>
          {`
            @keyframes pulseTrainer {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <TrainerSkeleton style={{ height: '32px', width: '256px', marginBottom: '8px' }} />
            <TrainerSkeleton style={{ height: '16px', width: '384px' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <TrainerSkeleton style={{ height: '24px', width: '128px' }} />
                  <TrainerSkeleton style={{ height: '16px', width: '192px', marginTop: '8px' }} />
                </CardHeader>
                <CardContent>
                  <TrainerSkeleton style={{ height: '40px', width: '100%' }} />
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
      background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)'
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
              background: 'linear-gradient(135deg, #10B981, #059669)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icons.Target size={24} style={{ color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 4px 0'
              }}>
                ¡Bienvenido Coach {coachName}!
              </h1>
              <p style={{
                color: '#6B7280',
                margin: 0,
                fontSize: '14px'
              }}>
                Gestiona horarios, rutinas y supervisa el progreso de tus estudiantes
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleCoachExit}>
            <Icons.ArrowLeft size={16} />
            Volver al inicio
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {errorCoach && (
          <Alert style={{ marginBottom: '24px' }}>
            <AlertDescription>{errorCoach}</AlertDescription>
          </Alert>
        )}

        {/* Action Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {/* Card Crear Horarios */}
          <Card hover>
            <CardHeader>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icons.Calendar size={24} style={{ color: 'white' }} />
              </div>
              <CardTitle>Crear Horarios</CardTitle>
              <CardDescription>
                Crea nuevos horarios para el uso del GYM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/Schedule')} 
                variant="default"
                style={{ 
                  width: '100%',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  border: 'none'
                }}
              >
                <Icons.Calendar size={20} />
                Crear horarios
              </Button>
            </CardContent>
          </Card>

          {/* Card Ver y Modificar Horarios */}
          <Card hover>
            <CardHeader>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icons.Clock size={24} style={{ color: 'white' }} />
              </div>
              <CardTitle>Gestionar Horarios</CardTitle>
              <CardDescription>
                Consulta y modifica la capacidad de los horarios del GYM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/coach-schedules')} 
                variant="outline"
                style={{ width: '100%' }}
              >
                Ver y modificar horarios
              </Button>
            </CardContent>
          </Card>

          {/* Card Crear Rutina */}
          <Card hover>
            <CardHeader>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icons.Dumbbell size={24} style={{ color: 'white' }} />
              </div>
              <CardTitle>Crear Rutina</CardTitle>
              <CardDescription>
                Diseña nuevas rutinas de entrenamiento personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/CreateRoutine')} 
                variant="outline"
                style={{ width: '100%' }}
              >
                Crear rutina
              </Button>
            </CardContent>
          </Card>

          {/* Card Ver Rutinas */}
          <Card hover>
            <CardHeader>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icons.FileText size={24} style={{ color: 'white' }} />
              </div>
              <CardTitle>Rutinas</CardTitle>
              <CardDescription>
                Revisa y gestiona todas las rutinas creadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/getroutines')} 
                variant="outline"
                style={{ width: '100%' }}
              >
                Ver rutinas
              </Button>
            </CardContent>
          </Card>

          {/* Card Ver Registros Físicos */}
          <Card hover>
            <CardHeader>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #06B6D4, #0891B2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px'
              }}>
                <Icons.TrendingUp size={24} style={{ color: 'white' }} />
              </div>
              <CardTitle>Registros Físicos</CardTitle>
              <CardDescription>
                Supervisa el progreso físico de todos tus estudiantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/all-physical-records')} 
                variant="outline"
                style={{ width: '100%' }}
              >
                Ver todos los registros
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div style={{ marginTop: '48px' }}>
          <Card style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            border: 'none',
            color: 'white'
          }}>
            <CardContent style={{ padding: '32px', textAlign: 'center' }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: 'white',
                margin: '0 0 16px 0'
              }}>
              </h3>
              <p style={{
                color: '#D1FAE5',
                fontSize: '18px',
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>
                Herramientas profesionales para gestionar entrenamientos y supervisar el progreso
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '24px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>∞</div>
                  <div style={{ color: '#D1FAE5' }}>Rutinas personalizadas</div>
                </div>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>24/7</div>
                  <div style={{ color: '#D1FAE5' }}>Seguimiento continuo</div>
                </div>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>100%</div>
                  <div style={{ color: '#D1FAE5' }}>Control total</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
