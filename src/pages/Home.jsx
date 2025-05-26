import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import HomeInfo from '../components/HomeInfo';
import '../assets/Styles/home.css';

const imagenes = [
  '/resourses/uno.jpg',
  '/resourses/2.jpg',
  '/resourses/3.jpg',
  '/resourses/4.jpg',
  '/resourses/5.jpg',
  '/resourses/6.jpg'
];

export default function Home() {
  const navigate = useNavigate();



  return (
    <>
      <Carousel images={imagenes} minHeight={320} maxHeight={320} />

      <div className="home-cards-container">
        <div className="home-cards-wrapper">
          <Card
            img="/public/resourses/1.jpg"
            title="Generar Turno"
            desc="Dale click en ingresar para generar un nuevo turno"
            onClick={() => navigate('/generar-turno')}
          />
          <Card
            img="/public/resourses/2.jpg"
            title="Visualizar Turnos"
            desc="Consulta y visualiza los turnos asignados"
            onClick={() => navigate('/visualizacion-turno')}
          />
        </div>
      </div>

      <HomeInfo />
    </>
  );
}
