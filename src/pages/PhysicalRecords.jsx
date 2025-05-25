

import React, { useState } from 'react';
import ApiService from '../service/api';

export default function PhysicalRecords() {
  const [weight, setWeight] = useState('');
  const [bodyMeasurements, setBodyMeasurements] = useState({ chest: '', waist: '', arms: '', legs: '' });
  const [physicalGoal, setPhysicalGoal] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleMeasurementChange = (key, value) => {
    setBodyMeasurements(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const measurements = {};
      Object.entries(bodyMeasurements).forEach(([k, v]) => {
        if (v !== '' && !isNaN(parseFloat(v))) measurements[k] = parseFloat(v);
      });
      const dto = {
        weight: parseFloat(weight),
        bodyMeasurements: measurements,
        physicalGoal,
      };
      await ApiService.registerAutoPhysicalData(dto);
      setSuccess('Registro físico guardado exitosamente');
      setWeight('');
      setBodyMeasurements({ chest: '', waist: '', arms: '', legs: '' });
      setPhysicalGoal('');
    } catch (err) {
      setError(err.message || 'Error al guardar el registro');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 500, margin: '0 auto' }}>
      <h2>Registrar Datos Físicos</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input placeholder="Peso (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} required />
        <div style={{ background: '#f8f8f8', borderRadius: 8, padding: 10 }}>
          <b>Medidas corporales</b>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <input placeholder="Pecho (cm)" type="number" value={bodyMeasurements.chest} onChange={e => handleMeasurementChange('chest', e.target.value)} />
            <input placeholder="Cintura (cm)" type="number" value={bodyMeasurements.waist} onChange={e => handleMeasurementChange('waist', e.target.value)} />
            <input placeholder="Brazos (cm)" type="number" value={bodyMeasurements.arms} onChange={e => handleMeasurementChange('arms', e.target.value)} />
            <input placeholder="Piernas (cm)" type="number" value={bodyMeasurements.legs} onChange={e => handleMeasurementChange('legs', e.target.value)} />
          </div>
        </div>
        <input placeholder="Meta física" value={physicalGoal} onChange={e => setPhysicalGoal(e.target.value)} required />
        {error && <div style={{ color: '#990000', fontWeight: 600 }}>{error}</div>}
        {success && <div style={{ color: 'green', fontWeight: 600 }}>{success}</div>}
        <button type="submit" style={{ background: '#990000', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 600, fontSize: 16, marginTop: 12 }}>Registrar</button>
      </form>
    </div>
  );
}
