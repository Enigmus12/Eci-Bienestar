import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../service/api';
import '../assets/Styles/navbar.css';

function getUserRole() {
  try {
    const token = ApiService.getToken && ApiService.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    ApiService.removeToken && ApiService.removeToken();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/resourses/LogoEscuela.jpg" alt="Logo Escuela" className="navbar-logo" />
        <span className="navbar-title">ECI BIENESTAR TOTAL</span>
        <Link to="/" className="navbar-link">Inicio</Link>
        <Link to="#" className="navbar-link">Nosotros</Link>
        <Link to="#" className="navbar-link">Contáctanos</Link>
      </div>

      {!isLoginPage && (
        <div className="navbar-right">
          {role === 'Admin' ? (
            <button className="navbar-login-btn" onClick={handleLogout}>
              Salida Segura
            </button>
          ) : (
            <Link to="/login">
              <button className="navbar-login-btn">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
