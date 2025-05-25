import React, { useState } from 'react';
import '../assets/Styles/login.css';
import BotonRegresar from '../components/BotonRegresar.jsx';

export default function Login() {
  const [form, setForm] = useState({ usuario: '', contrasena: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.usuario || !form.contrasena) {
      setError('Por favor complete todos los campos.');
      return;
    }
    setError('');
    alert(`Bienvenido, ${form.usuario}`);
  };

  const isDisabled = !form.usuario || !form.contrasena;

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Botón regresar */}
        <div style={{ marginBottom: 16 }}>
          <BotonRegresar />
        </div>

        {/* Imagen del logo institucional */}
        <img
          src="/src/assets/resourses/LOGO.png"
          alt="Logo Institucional"
          style={{ width: 120, marginBottom: 16 }}
        />

        <div className="login-icon" />
        <h2 className="login-title">Acceso Institucional</h2>
        <p className="login-subtitle">Ingrese sus credenciales para acceder al sistema</p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Nombre de Usuario</label>
            <input
              type="text"
              name="usuario"
              value={form.usuario}
              onChange={handleChange}
              placeholder="Ingrese su usuario"
              className="login-input"
            />
          </div>

          <div className="login-field">
            <label>Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              className="login-input"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" type="submit" disabled={isDisabled}>
            Iniciar Sesión
          </button>
        </form>

        <p className="login-terms">
          Al iniciar sesión, acepta nuestros <a href="#">Términos de Servicio</a> y <a href="#">Política de Privacidad</a>
        </p>
      </div>
    </div>
  );
}
