import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import CreateRoutine from './pages/CreateRoutine';
import Coaches from './pages/Coaches';
import Schedule from './pages/Schedule';
import Navbar from './components/Navbar';
import ReservationsSchedules from './pages/ReservationsSchedules';
import MyRoutines from './pages/MyRoutines';
import GenerarTurnoPage from './pages/GenerarTurnoPage';
import AdminTurno from './pages/AdminTurno';
import ProfesionalTurnos from './pages/ProfesionalTurnos';
import VisualizacionTurno from './pages/VisualizacionTurno';
import PhysicalRecords from './pages/PhysicalRecords';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f8f8f8' }}>
        {/* Barra roja superior fija */}
        <div style={{ width: '100vw', height: 56, background: '#990000', position: 'fixed', top: 0, left: 0, zIndex: 2000, display: 'flex', alignItems: 'center' }}>
          <Navbar />
        </div>
        {/* Contenido principal con margen superior para la barra */}
        <div style={{ maxWidth: '100vw', margin: '72px auto 0 auto', padding: '1rem', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/ReservationsSchedules" element={<ReservationsSchedules />} />
            <Route path="/CreateRoutine" element={<CreateRoutine />} />
            <Route path="/MyRoutines" element={<MyRoutines />} />
            <Route path="/PhysicalRecords" element={<PhysicalRecords />} />
            <Route path="/generar-turno" element={<GenerarTurnoPage />} />
            <Route path="/admin-turno" element={<AdminTurno />} />
            <Route path="/profesional-turnos" element={<ProfesionalTurnos />} />
            <Route path="/visualizacion-turno" element={<VisualizacionTurno />} />
            {/* Agrega más rutas aquí */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
