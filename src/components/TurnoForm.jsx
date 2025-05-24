// src/components/TurnoForm.jsx
import React from 'react';
import "../assets/Styles/form-turno.css";

export default function TurnoForm() {
  return (
    <form className="form-turno">
      <div className="form-grid">
        <div className="form-group">
          <label>Nombre completo</label>
          <input type="text" placeholder="Nombre completo" />
        </div>
        <div className="form-group">
          <label>Número de documento</label>
          <input type="text" placeholder="Número de documento" />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <select>
            <option>Seleccione...</option>
            <option>Estudiante</option>
            <option>Docente</option>
          </select>
        </div>
        <div className="form-group">
          <label>Especialidad</label>
          <select>
            <option>Seleccione...</option>
            <option>Medicina</option>
            <option>Psicología</option>
          </select>
        </div>
      </div>

      <div className="prioridad-btn-wrapper">
        <button type="button" className="btn-prioridad">
          Activar prioridad especial
        </button>
        <p className="texto-prioridad">(discapacidad o embarazo)</p>
      </div>

      <button type="submit" className="submit-button">
        Solicitar turno
      </button>
    </form>
  );
}
