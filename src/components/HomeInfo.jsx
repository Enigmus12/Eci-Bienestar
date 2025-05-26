import React from 'react';
import "../assets/Styles/QuienesSomos.css";

export default function HomeInfo() {
  return (
    <div className="quienes-somos-container">
      <div className="quienes-somos-texto">
        <h2>Bienvenido a Eci-Bienestar</h2>
        <p>
          En esta plataforma podrás gestionar tus turnos y reservas de manera eficiente y rápida.
        </p>
        <p>
          Nuestro objetivo es brindarte una experiencia sencilla y accesible para que puedas enfocarte en lo que realmente importa.
        </p>
        <button 
          className="quienes-somos-boton"
          onClick={() => window.open('https://www.escuelaing.edu.co/es/programas/ingenieria-de-sistemas/', '_blank')}
        >
          Explorar más
        </button>
      </div>
      <div className="quienes-somos-imagen">
        <img src="/resourses/LogoEscuela.jpg" alt="Bienestar ECI" />
      </div>
    </div>
  );
}
