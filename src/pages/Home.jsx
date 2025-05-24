import React from 'react';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const imagenes = [
  '/src/assets/resourses/1.jpg',
  '/src/assets/resourses/2.jpg',
  '/src/assets/resourses/3.jpg',
  '/src/assets/resourses/4.jpg',
  '/src/assets/resourses/5.jpg',
  '/src/assets/resourses/6.jpg'
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Carousel images={imagenes} minHeight={320} maxHeight={320} />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0 0 0 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, maxWidth: 1200 }}>
          <Card
            img="/src/assets/resourses/1.jpg"
            title="Generar Turno"
            desc="Dale click en ingresar para generar un nuevo turno"
            onClick={() => navigate('/generar-turno')}
          />
          <Card
            img = "/src/assets/resourses/2.jpg"
            title="Visualizar Turnos"
            desc="Consulta y visualiza los turnos asignados"
          />
        </div>
      </div>
    </>
  );
}
