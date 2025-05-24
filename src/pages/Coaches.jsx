import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Coaches() {
  const navigate = useNavigate();
  const handleCreateSchedule = () => {
    navigate('/schedule');
  };
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Bienvenido Coach</h2>
      <Button onClick={handleCreateSchedule} style={{ marginTop: 24 }}>Crear horarios</Button>
    </div>
  );
}
