import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ApiService from '../service/api';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [hasReservation, setHasReservation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkReservations = async () => {
      try {
        const res = await ApiService.getMyReservations();
        setHasReservation(Array.isArray(res) && res.length > 0);
      } catch (err) {
        setError('No se pudo verificar reservas');
      } finally {
        setLoading(false);
      }
    };
    checkReservations();
  }, []);

  const handleExit = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Bienvenido Usuario</h2>
      <p>Esta es la ventana de usuario después de iniciar sesión.</p>
      <Button onClick={() => navigate('/ReservationsSchedules')} style={{ marginTop: 24 }}>
        Ir a Reservar Horarios
      </Button>
      {!loading && hasReservation && (
        <>
          <Button onClick={() => navigate('/MyRoutines')} style={{ marginTop: 24, marginLeft: 16 }}>
            Ver mis registros
          </Button>
          <Button onClick={() => navigate('/PhysicalRecords')} style={{ marginTop: 24, marginLeft: 16 }}>
            Registrar datos físicos
          </Button>
        </>
      )}
      {error && <div style={{ color: '#990000', marginTop: 12 }}>{error}</div>}
    </div>
  );
};

export default UserDashboard;
