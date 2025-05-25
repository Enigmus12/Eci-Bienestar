import React, { useState } from 'react';
import '../assets/Styles/VisualizacionTurno.css'; // Corregida la ruta
import BotonRegresar from '../components/BotonRegresar';

const usuarioMock = {
  nombre: 'Carlos Alberto Rodríguez',
  turno: 'P-23',
  especialidad: 'Psicología',
  hora: '10:00',
};

const proximosTurnosMock = [
  { turno: 'M-42', nombre: 'Ana Sofía Martínez', especialidad: 'Medicina General', prioridad: 'Prioritario' },
  { turno: 'M-43', nombre: 'Luis Fernando Gómez', especialidad: 'Odontología', prioridad: 'Normal' },
];

export default function VisualizacionTurno() {
  const [turnoActual, setTurnoActual] = useState(usuarioMock);
  const [colaTurnos, setColaTurnos] = useState(proximosTurnosMock);

  const manejarSiguienteTurno = () => {
    if (colaTurnos.length > 0) {
      const siguienteTurno = colaTurnos[0];
      setTurnoActual(siguienteTurno);
      setColaTurnos(colaTurnos.slice(1));
    } else {
      alert('No hay más turnos en la cola.');
    }
  };

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
              <div className="turno">{turnoActual.turno}</div>
              <div className="especialidad">{turnoActual.especialidad}</div>
              <div className="nombre">{turnoActual.nombre}</div>
              <div className="hora">Hora programada: {turnoActual.hora}</div>
            </div>
            {/* Botón SIGUIENTE TURNO eliminado */}
          </section>

          <section className="proximos-turnos">
            <h3>Próximos Turnos</h3>
            <ul>
              {colaTurnos.map((turno, index) => (
                <li key={index} className={`turno-item ${turno.prioridad.toLowerCase()}`}>
                  <div className="turno">{turno.turno}</div>
                  <div className="nombre">{turno.nombre}</div>
                  <div className="especialidad">{turno.especialidad}</div>
                  <div className="prioridad">{turno.prioridad}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="panel-multimedia">

          <video width="100%" autoPlay loop muted controls>
            <source src="/src/assets/resourses/video1.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </aside>
      </main>
      <BotonRegresar texto="Volver al inicio" ruta="/" />
    </div>
  );
}
