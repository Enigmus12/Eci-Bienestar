import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/boton-flotante-regresar.css';

export default function BotonRegresar({ texto = 'Volver al inicio', ruta = '/' }) {
  const navigate = useNavigate();
  return (
    <button
      className="boton-flotante-regresar"
      onClick={() => navigate(ruta)}
      type="button"
    >
      {texto}
    </button>
  );
}
