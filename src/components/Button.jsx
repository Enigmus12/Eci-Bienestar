import React from 'react';

// Componente reutilizable de botón con soporte para estilos y eventos personalizados
export default function Button({ children, onClick, style, onMouseOver, onMouseOut }) {
  return (
    <button
      onClick={onClick}
      style={style}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </button>
  );
}
