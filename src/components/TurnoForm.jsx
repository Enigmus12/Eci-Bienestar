import React, { useState } from 'react';
import "../assets/Styles/form-turno.css";
import TurnoAsignado from './TurnoAsignado';
import ApiService from '../service/apiM1';

export default function TurnoForm() {
  const [prioridadActiva, setPrioridadActiva] = useState(false);
  const [showAsignado, setShowAsignado] = useState(false);
  const [turnoInfo, setTurnoInfo] = useState({
    turno: '',
    especialidad: '',
    documento: '',
    rol: '',
  });
  const [form, setForm] = useState({
    documento: '',
    rol: '',
    especialidad: '',
  });
  const [errorMsg, setErrorMsg] = useState("");

  // Obtener especialidades habilitadas desde localStorage
  const especialidadesDisponibles = (() => {
    const saved = localStorage.getItem('especialidadesDisponibles');
    if (saved) {
      try {
        return JSON.parse(saved).filter(e => e.disponible).map(e => e.nombre);
      } catch {
        return [
          'Medicina General',
          'Psicologia',
          'Odontología'
        ];
      }
    }
    return [
      'Medicina General',
      'Psicologia',
      'Odontología'
    ];
  })();

  const handlePrioridad = () => {
    setPrioridadActiva(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.documento.trim() === '' ||
      form.rol.trim() === '' ||
      form.especialidad.trim() === ''
    ) {
      setErrorMsg("Por favor, complete todos los campos antes de continuar.");
      return;
    }

    setErrorMsg("");

    try {
      const dto = {
        userId: form.documento,
        specialty: form.especialidad,
        specialPriority: prioridadActiva
      };

      console.log("DTO enviado:", dto);

      // Paso 1: Crear turno
      await ApiService.createTurno(dto);

      // Paso 2: Obtener los turnos del usuario
      const turnosUsuario = await ApiService.getShiftsByUserId(form.documento);
      console.log("Turnos recibidos:", turnosUsuario);

      // Paso 3: Filtrar el turno más reciente con turnCode válido
      const turnoMasReciente = turnosUsuario
        .filter(t =>
          (t.status === "IN_PROGRESS" || t.status === "ASSIGNED") &&
          /^(OD|MG|PS)-\d+$/.test(t.turnCode) // turnCode debe ser como OD-1, MG-2...
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      if (!turnoMasReciente) throw new Error("No se pudo encontrar el turno creado con código válido.");

      setTurnoInfo({
        turno: turnoMasReciente.turnCode,
        especialidad: turnoMasReciente.specialty,
        documento: form.documento,
        rol: form.rol,
      });

      setShowAsignado(true);
    } catch (err) {
      console.error("Error al crear turno:", err);
      setErrorMsg(err.message || 'No se pudo crear el turno');
    }
  };

  if (showAsignado) {
    return <TurnoAsignado {...turnoInfo} onNuevo={() => setShowAsignado(false)} />;
  }

  return (
    <form className="form-turno" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Número de documento</label>
          <input type="text" name="documento" value={form.documento} onChange={handleChange} placeholder="Número de documento" />
        </div>
        <div className="form-group">
          <label>Rol</label>
          <select name="rol" value={form.rol} onChange={handleChange}>
            <option value="">Seleccione...</option>
            <option>Estudiante</option>
            <option>Docente</option>
          </select>
        </div>
        <div className="form-group">
          <label>Especialidad</label>
          <select name="especialidad" value={form.especialidad} onChange={handleChange}>
            <option value="">Seleccione...</option>
            {especialidadesDisponibles.map(esp => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="prioridad-btn-wrapper">
        <button
          type="button"
          className="btn-prioridad"
          onClick={handlePrioridad}
        >
          {prioridadActiva ? 'Desactivar prioridad especial' : 'Activar prioridad especial'}
        </button>

        <p className="texto-prioridad">(discapacidad o embarazo)</p>

        {prioridadActiva && (
          <div className="mensaje-prioridad">
            La prioridad ha sido activada
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="error-msg">{errorMsg}</div>
      )}

      <button type="submit" className="submit-button">
        Solicitar turno
      </button>
    </form>
  );
}
