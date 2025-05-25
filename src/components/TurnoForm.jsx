// src/components/TurnoForm.jsx
import React, { useState } from 'react';
import "../assets/Styles/form-turno.css";
import TurnoAsignado from './TurnoAsignado';

export default function TurnoForm() {
  const [showPrioridadMsg, setShowPrioridadMsg] = useState(false);
  const [showAsignado, setShowAsignado] = useState(false);
  const [turnoInfo, setTurnoInfo] = useState({
    turno: '',
    especialidad: '',
    nombre: '',
    documento: '',
    rol: '',
  });
  const [form, setForm] = useState({
    nombre: '',
    documento: '',
    rol: '',
    especialidad: '',
  });

  const handlePrioridad = () => {
    setShowPrioridadMsg(true);
    setTimeout(() => setShowPrioridadMsg(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de asignación de turno
    setTurnoInfo({
      turno: 'O-69',
      especialidad: form.especialidad || 'Odontología',
      nombre: form.nombre,
      documento: form.documento,
      rol: form.rol,
    });
    setShowAsignado(true);
  };

  if (showAsignado) {
    return <TurnoAsignado {...turnoInfo} onNuevo={() => setShowAsignado(false)} />;
  }

  return (
    <form className="form-turno" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Nombre completo</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo" style={{ color: '#111' }} />
        </div>
        <div className="form-group">
          <label>Número de documento</label>
          <input type="text" name="documento" value={form.documento} onChange={handleChange} placeholder="Número de documento" style={{ color: '#111' }} />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <select name="rol" value={form.rol} onChange={handleChange} style={{ color: '#111' }}>
            <option value="">Seleccione...</option>
            <option>Estudiante</option>
            <option>Docente</option>
          </select>
        </div>
        <div className="form-group">
          <label>Especialidad</label>
          <select name="especialidad" value={form.especialidad} onChange={handleChange} style={{ color: '#111' }}>
            <option value="">Seleccione...</option>
            <option>Medicina</option>
            <option>Psicología</option>
            <option>Odontología</option>
          </select>
        </div>
      </div>

      <div className="prioridad-btn-wrapper">
        <button type="button" className="btn-prioridad" onClick={handlePrioridad}>
          Activar prioridad especial
        </button>
        <p className="texto-prioridad">(discapacidad o embarazo)</p>
        {showPrioridadMsg && (
          <div style={{ color: '#fff', background: '#2563eb', borderRadius: 8, padding: '8px 16px', marginTop: 10, fontWeight: 600, textAlign: 'center' }}>
            La prioridad ha sido activada
          </div>
        )}
      </div>

      <button type="submit" className="submit-button">
        Solicitar turno
      </button>
    </form>
  );
}
