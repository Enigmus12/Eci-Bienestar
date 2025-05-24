import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import Button from '../components/Button';
import ApiService from '../service/api';

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !password) {
      setError('Por favor ingresa ambos campos.');
      return;
    }
    setError('');
    try {
      const res = await ApiService.login(nombre, password);
      // El token debe tener el role en el payload (JWT)
      const token = res.token;
      if (token) {
        // Decodificar el JWT para obtener el role
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === 'Student') {
          navigate('/user');
        } else if (payload.role === 'Coache') {
          navigate('/coaches');
        } else {
          setError('Solo los usuarios con rol Student o Coache pueden ingresar aquí.');
        }
      } else {
        setError('Respuesta inválida del servidor.');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={{
      maxWidth: 380,
      margin: '0 auto',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 12px #0001',
      padding: '2.5rem 2rem',
      marginTop: 40,
      textAlign: 'center',
    }}>
      <h2 style={{ color: '#990000', fontWeight: 700, marginBottom: 18 }}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontWeight: 500, color: '#222' }}>Nombre de usuario</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 10,
              marginTop: 4,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 15,
              background: '#fff',
              color: '#222',
            }}
            placeholder="Ingresa tu nombre"
          />
        </div>
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontWeight: 500, color: '#222' }}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 10,
              marginTop: 4,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 15,
              background: '#fff',
              color: '#222',
            }}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        {error && <div style={{ color: '#990000', fontWeight: 600, marginTop: -8 }}>{error}</div>}
        <Button type="submit">Ingresar</Button>
      </form>
    </div>
  );
};

export default Login;
