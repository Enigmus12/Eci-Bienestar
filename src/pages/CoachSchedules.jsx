import React, { useEffect, useState } from 'react';
import ApiService from '../service/api';

export default function CoachSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [capacity, setCapacity] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await ApiService.getAllSchedules();
        setSchedules(data);
      } catch (err) {
        setError('No se pudieron cargar los horarios');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  // Agrupar de a 3
  const grouped = [];
  for (let i = 0; i < schedules.length; i += 3) {
    grouped.push(schedules.slice(i, i + 3));
  }

  // Obtener el scheduleGroupId del grupo seleccionado
  const getSelectedGroupId = () => {
    if (selected == null) return null;
    const group = grouped[selected];
    return group && group[0] && group[0].scheduleGroupId;
  };

  const handleModify = () => {
    setShowModal(true);
    setCapacity('');
    setSuccessMsg('');
  };

  const handleSaveCapacity = async () => {
    setSaving(true);
    setSuccessMsg('');
    try {
      const groupId = getSelectedGroupId();
      if (!groupId) throw new Error('No se encontró el scheduleGroupId');
      await ApiService.updateGroupCapacity(groupId, parseInt(capacity, 10));
      setSuccessMsg('Capacidad actualizada correctamente');
      setShowModal(false);
      // Refrescar horarios
      const data = await ApiService.getAllSchedules();
      setSchedules(data);
    } catch (err) {
      setError(err.message || 'Error al modificar la capacidad');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h2>Horarios de Gimnasio</h2>
      {loading && <div>Cargando horarios...</div>}
      {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th style={{ padding: 6 }}>Día</th>
            <th style={{ padding: 6 }}>Hora inicio</th>
            <th style={{ padding: 6 }}>Hora fin</th>
            <th style={{ padding: 6 }}>Capacidad</th>
            <th style={{ padding: 6 }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map((group, idx) => (
            <React.Fragment key={idx}>
              {group.map((sch, j) => (
                <tr key={sch.id} style={{ background: selected === idx ? '#d0eaff' : undefined }}>
                  <td style={{ padding: 6 }}>{sch.dayOfWeek}</td>
                  <td style={{ padding: 6 }}>{sch.startTime}</td>
                  <td style={{ padding: 6 }}>{sch.endTime}</td>
                  <td style={{ padding: 6 }}>{sch.capacity}</td>
                  {j === 0 && (
                    <td style={{ padding: 6 }} rowSpan={group.length}>
                      <button onClick={() => setSelected(idx)} style={{ background: selected === idx ? '#007bff' : '#eee', color: selected === idx ? '#fff' : '#333', border: 'none', padding: '6px 12px', borderRadius: 4, marginBottom: 8 }}>
                        Seleccionar
                      </button>
                      {selected === idx && (
                        <button onClick={handleModify} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 4 }}>
                          Modify
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {/* Modal para modificar capacidad */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: '#fff', padding: 32, borderRadius: 8, minWidth: 320 }}>
            <h3>Modificar capacidad del grupo</h3>
            <input
              type="number"
              min="1"
              value={capacity}
              onChange={e => setCapacity(e.target.value)}
              placeholder="Nueva capacidad"
              style={{ padding: 8, width: '100%', marginBottom: 16 }}
              disabled={saving}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button onClick={() => setShowModal(false)} disabled={saving}>Cancelar</button>
              <button onClick={handleSaveCapacity} disabled={saving || !capacity}>Guardar</button>
            </div>
            {saving && <div style={{ color: '#888', marginTop: 8 }}>Guardando...</div>}
            {successMsg && <div style={{ color: '#28a745', marginTop: 8 }}>{successMsg}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
