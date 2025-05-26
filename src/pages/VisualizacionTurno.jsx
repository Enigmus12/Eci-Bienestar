import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Styles/VisualizacionTurno.css';
import BotonRegresar from '../components/BotonRegresar';

const API_BASE_URL = "https://shiftmanager-hrbgeaamdmg6ehb5.canadacentral-01.azurewebsites.net/api";

export default function VisualizacionTurno() {
  const [turnoActual, setTurnoActual] = useState(null);
  const [colaTurnos, setColaTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/shifts`);
        // Filtrar turnos activos y ordenarlos por prioridad y/o llegada
        const activos = data.filter(t => t.status === "IN_PROGRESS" || t.status === "ASSIGNED");
        if (activos.length > 0) {
          setTurnoActual(activos[0]);
          setColaTurnos(activos.slice(1, 4)); // Solo los siguientes 3 turnos
        } else {
          setTurnoActual(null);
          setColaTurnos([]);
        }
      } catch (err) {
        setError("No se pudieron cargar los turnos");
      } finally {
        setLoading(false);
      }
    };
    fetchTurnos();
  }, []);

  const manejarSiguienteTurno = () => {
    if (colaTurnos.length > 0) {
      setTurnoActual(colaTurnos[0]);
      setColaTurnos(colaTurnos.slice(1));
    } else {
      alert('No hay más turnos en la cola.');
    }
  };

  if (loading) return <div className="visualizacion-turno">Cargando turnos...</div>;
  if (error) return <div className="visualizacion-turno">{error}</div>;

  return (
    <div className="visualizacion-turno">
      <header className="header">
        <h1>SISTEMA DE TURNOS MÉDICOS</h1>
        <h2>Universidad - Servicios de Bienestar</h2>
      </header>
      <main className="main-content">
        <div className="content-wrapper">
          <section className="turno-actual">
            <div className="turno-card">
              <div className="turno">{turnoActual ? turnoActual.turnCode : '-'}</div>
              <div className="especialidad">{turnoActual ? turnoActual.specialty : '-'}</div>
              <div className="nombre">{turnoActual ? turnoActual.userId : '-'}</div>
              <div className="hora">{turnoActual && turnoActual.createdAt ? `Hora registro: ${new Date(turnoActual.createdAt + 'Z').toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}` : ''}</div>
            </div>
          </section>
          <section className="proximos-turnos">
            <h3>Próximos Turnos</h3>
            <ul>
              {colaTurnos.map((turno, index) => (
                <li key={index} className={`turno-item ${turno.specialPriority ? 'prioritario' : 'normal'}`}>
                  <div className="turno">{turno.turnCode}</div>
                  <div className="nombre">{turno.userId}</div>
                  <div className="especialidad">{turno.specialty}</div>
                  <div className="prioridad">{turno.specialPriority ? 'Prioritario' : 'Normal'}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="panel-multimedia">
          <video width="100%" autoPlay loop muted controls>
            <source src="/resourses/video1.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </aside>
      </main>
      <BotonRegresar texto="Volver al inicio" ruta="/" />
    </div>
  );
}
