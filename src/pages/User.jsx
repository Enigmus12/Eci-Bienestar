import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function User() {
  const navigate = useNavigate();
  const handleExit = () => {
    navigate('/');
  };
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Bienvenido Usuario</h2>
      <p>Esta es la ventana de usuario después de iniciar sesión.</p>
    </div>
  );
}
