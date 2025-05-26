import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../service/api';
import '../assets/Styles/navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";
  const isAuthenticated = !!ApiService.getToken();

  const handleLogout = () => {
    ApiService.removeToken();
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
      <div className="navbar-right">
        {/* Show 'Login' only on Home if not authenticated */}
        {isHomePage && !isAuthenticated && (
          <Link to="/login">
            <button className="navbar-login-btn">Login</button>
          </Link>
        )}
        {/* Show 'Salida Segura' on all authenticated pages except login */}
        {!isLoginPage && isAuthenticated && (
          <button className="navbar-login-btn" onClick={handleLogout}>
            Salida Segura
          </button>
        )}
      </div>
    </nav>
  );
}
