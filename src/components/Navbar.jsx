import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/Styles/navbar.css';

export default function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

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
          <Link to="/login">
            <button className="navbar-login-btn">
              Login
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
