import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/api';

// Imports de componentes
import Button from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { Alert, AlertDescription } from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import Icons from '../components/icons/Icons';

// Componente Skeleton
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

const UserDashboard = () => {
  const navigate = useNavigate();
  const [hasReservation, setHasReservation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiService.getMyReservations();
        setHasReservation(Array.isArray(res) && res.length > 0);
        // Obtener userId del token
        const decoded = ApiService.decodeToken();
        const userId = decoded && (decoded.userId || decoded.sub || decoded.id);
        if (userId) {
          const user = await ApiService.getUserById(userId);
          setUserName(user && (user.name || user.fullName || user.userName || 'Usuario'));
        }
      } catch (err) {
        setError('No se pudo verificar reservas o usuario');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExit = () => {
    navigate('/');
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton style={{ height: '24px', width: '128px' }} />
                  <Skeleton style={{ height: '16px', width: '192px', marginTop: '8px' }} />
                </CardHeader>
                <CardContent>
                  <Skeleton style={{ height: '40px', width: '100%' }} />
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
              background: 'linear-gradient(135deg, #3B82F6, #4F46E5)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icons.User size={24} style={{ color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 4px 0'
              }}>
                ¡Bienvenido {userName}!
              </h1>
              <p style={{
                color: '#6B7280',
                margin: 0,
                fontSize: '14px'
              }}>
                Gestiona tus reservas y registros de bienestar
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleExit}>
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
        {error && (
          <Alert style={{ marginBottom: '24px' }}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Status Badge */}
        <div style={{ marginBottom: '32px' }}>
          <Badge variant={hasReservation ? 'default' : 'secondary'}>
            {hasReservation ? 'Tienes reservas activas' : 'Sin reservas activas'}
          </Badge>
        </div>

        {/* Action Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {!hasReservation ? (
            // Card para usuarios sin reservas
            <Card hover style={{
              gridColumn: '1 / -1',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <CardHeader style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #34D399, #3B82F6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <Icons.Plus size={32} style={{ color: 'white' }} />
                </div>
                <CardTitle>Reservar Horarios</CardTitle>
                <CardDescription>
                  Comienza reservando tu primer horario para acceder a nuestros servicios de bienestar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate('/ReservationsSchedules')}
                  size="lg"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #34D399, #3B82F6)',
                    border: 'none'
                  }}
                >
                  <Icons.Calendar size={20} />
                  Ir a Reservar Horarios
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Cards para usuarios con reservas
            <>
              <Card hover>
                <CardHeader>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }}>
                    <Icons.Activity size={24} style={{ color: 'white' }} />
                  </div>
                  <CardTitle>Mis Registros</CardTitle>
                  <CardDescription>
                    Revisa tu historial de actividades y rutinas registradas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/MyRoutines')} 
                    variant="outline"
                    style={{ width: '100%' }}
                  >
                    Ver mis registros
                  </Button>
                </CardContent>
              </Card>

              <Card hover>
                <CardHeader>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #FB923C, #EF4444)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }}>
                    <Icons.User size={24} style={{ color: 'white' }} />
                  </div>
                  <CardTitle>Datos Físicos</CardTitle>
                  <CardDescription>
                    Registra y actualiza tus medidas y datos físicos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/PhysicalRecords')} 
                    variant="outline"
                    style={{ width: '100%' }}
                  >
                    Registrar datos físicos
                  </Button>
                </CardContent>
              </Card>

              <Card hover>
                <CardHeader>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #60A5FA, #4F46E5)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '8px'
                  }}>
                    <Icons.Clock size={24} style={{ color: 'white' }} />
                  </div>
                  <CardTitle>Mis Horarios</CardTitle>
                  <CardDescription>
                    Consulta y gestiona tus reservas de horarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/MyReservations')} 
                    variant="outline"
                    style={{ width: '100%' }}
                  >
                    Ver mis horarios
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Info Section */}
        <div style={{ marginTop: '48px' }}>
          <Card style={{
            background: 'linear-gradient(135deg, #3B82F6, #4F46E5)',
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
                ECI Bienestar Total
              </h3>
              <p style={{
                color: '#DBEAFE',
                fontSize: '18px',
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>
                Tu plataforma integral para gestionar tu bienestar físico y mental
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '24px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>24/7</div>
                  <div style={{ color: '#DBEAFE' }}>Acceso disponible</div>
                </div>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>100%</div>
                  <div style={{ color: '#DBEAFE' }}>Seguro y confiable</div>
                </div>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>∞</div>
                  <div style={{ color: '#DBEAFE' }}>Posibilidades</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;