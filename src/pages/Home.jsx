import React from 'react';
import Carousel from '../components/Carousel';
import Card from '../components/Card';

const imagenes = [
  '/src/assets/resourses/1.jpg',
  '/src/assets/resourses/2.jpg',
  '/src/assets/resourses/3.jpg',
  '/src/assets/resourses/4.jpg',
  '/src/assets/resourses/5.jpg',
  '/src/assets/resourses/6.jpg'
];

export default function Home() {
  return (
    <>
      <Carousel images={imagenes} minHeight={320} maxHeight={320} />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0 0 0 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, maxWidth: 1200 }}>
          <Card
            img="/src/assets/resourses/1.jpg"
            title="Realizar Reservas"
            desc="Agenda fácilmente un laboratorio para tus necesidades."
          />
          <Card
            img="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
            title="Mis Reservas"
            desc="Consulta y administra tus reservas activas."
          />
        </div>
      </div>
    </>
  );
}
