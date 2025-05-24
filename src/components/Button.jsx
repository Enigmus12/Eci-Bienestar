import React from 'react';

// Ejemplo de componente reutilizable
export default function Button({ children, onClick }) {
  return <button onClick={onClick} style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }}>{children}</button>;
}
