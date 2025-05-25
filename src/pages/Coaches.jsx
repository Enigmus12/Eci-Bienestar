import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Coaches() {
  const navigate = useNavigate();
  const handleCreateSchedule = () => {
    navigate('/schedule');
  };
  const handleViewSchedules = () => {
    navigate('/coach-schedules');
  };
  const handleCreateRoutine = () => {
    navigate('/CreateRoutine');
  };
  const handleGetRoutines = () => {
    navigate('/getroutines');
  };
  const handleGetAllPhysicalRecords = () => {
    navigate('/all-physical-records');
  };
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Bienvenido Coach</h2>
      <Button onClick={handleCreateSchedule} style={{ marginTop: 24 }}>Crear horarios</Button>
      <Button onClick={handleViewSchedules} style={{ marginTop: 24, marginLeft: 16 }}>Ver y modificar horarios</Button>
      <Button onClick={handleCreateRoutine} style={{ marginTop: 24, marginLeft: 16 }}>Crear Rutina</Button>
      <Button onClick={handleGetRoutines} style={{ marginTop: 24, marginLeft: 16 }}>Ver Rutinas</Button>
      <Button onClick={handleGetAllPhysicalRecords} style={{ marginTop: 24, marginLeft: 16 }}>Ver todos los registros físicos</Button>
    </div>
  );
}
