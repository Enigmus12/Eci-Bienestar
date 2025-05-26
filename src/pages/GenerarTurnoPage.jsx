import React from 'react';
import { useNavigate } from 'react-router-dom';
import TurnoForm from '../components/TurnoForm';
import BotonRegresar from '../components/BotonRegresar';

export default function GenerarTurnoPage() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: '2rem 1.5rem', marginTop: 32, position: 'relative' }}>
      <h2 style={{ color: '#990000', textAlign: 'center', marginBottom: 24 }}>Generar Turno</h2>
      <TurnoForm apiBaseUrl="https://shiftmanager-hrbgeaamdmg6ehb5.canadacentral-01.azurewebsites.net/api/shifts" />
      <BotonRegresar texto="Volver al inicio" ruta="/" />
    </div>
  );
}
