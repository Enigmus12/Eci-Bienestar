import React from 'react';
import Carousel from '../components/Carousel';

const imagenes = [
  '/src/assets/resourses/1.jpg',
  '/src/assets/resourses/2.jpg',
  '/src/assets/resourses/3.jpg',
  '/src/assets/resourses/4.jpg',
  '/src/assets/resourses/5.jpg',
  '/src/assets/resourses/6.jpg'
];

function Card({ img, title, desc }) {
  return (
    <div style={{
      border: '2px solid #2222',
      borderRadius: 16,
      background: '#fff',
      boxShadow: '0 2px 12px #0001',
      padding: '1.5rem 1rem 2rem 1rem',
      textAlign: 'center',
      width: 320,
      margin: '0 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 340,
    }}>
      <img src={img} alt={title} style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 8, marginBottom: 18 }} />
      <h2 style={{ fontWeight: 700, fontSize: 22, margin: 0, marginBottom: 10 }}>{title}</h2>
      <p style={{ fontSize: 16, color: '#222', marginBottom: 18 }}>{desc}</p>
      <button style={{ background: '#000', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Ingresar</button>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Carousel images={imagenes} minHeight={320} maxHeight={320} />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2.5rem 0 0 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, maxWidth: 1200 }}>
          <Card
            img="https://www.escuelaing.edu.co/uploads/images/2022/10/25/edificio-h-escuela-colombiana-de-ingenieria-julio-garavito-2-1920x1080.jpg"
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
