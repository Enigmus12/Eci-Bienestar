import React, { useState } from 'react';
import ApiService from '../service/api';

export default function PhysicalRecords() {
  const [weight, setWeight] = useState('');
  const [bodyMeasurements, setBodyMeasurements] = useState('');
  const [physicalGoal, setPhysicalGoal] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const dto = {
        weight,
        bodyMeasurements,
        physicalGoal,
      };
      await ApiService.registerAutoPhysicalData(dto);
      setSuccess('Registro físico guardado exitosamente');
      setWeight('');
      setBodyMeasurements('');
      setPhysicalGoal('');
    } catch (err) {
      setError(err.message || 'Error al guardar el registro');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 500, margin: '0 auto' }}>
      <h2>Registrar Datos Físicos</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input placeholder="Peso (kg)" value={weight} onChange={e => setWeight(e.target.value)} required />
        <input placeholder="Medidas corporales" value={bodyMeasurements} onChange={e => setBodyMeasurements(e.target.value)} required />
        <input placeholder="Meta física" value={physicalGoal} onChange={e => setPhysicalGoal(e.target.value)} required />
        {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
        {success && <div style={{ color: 'green', fontWeight: 600 }}>{success}</div>}
        <button type="submit" style={{ background: '#990000', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 600, fontSize: 16, marginTop: 12 }}>Registrar</button>
      </form>
    </div>
  );
}
