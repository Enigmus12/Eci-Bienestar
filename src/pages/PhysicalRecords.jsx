import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/api';

// Imports de componentes
import Button from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import { Alert, AlertDescription } from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import Icons from '../components/icons/Icons';

// Componente Skeleton para loading
const Skeleton = ({ className = '', style = {} }) => (
  <div
    style={{
      backgroundColor: '#F3F4F6',
      borderRadius: '4px',
      animation: 'pulse 2s infinite',
      ...style
    }}
    className={className}
  />
);

export default function PhysicalRecords() {
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [bodyMeasurements, setBodyMeasurements] = useState({ 
    chest: '', 
    waist: '', 
    arms: '', 
    legs: '' 
  });
  const [physicalGoal, setPhysicalGoal] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMeasurementChange = (key, value) => {
    setBodyMeasurements(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
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
      
      // Reset form
      setWeight('');
      setBodyMeasurements({ chest: '', waist: '', arms: '', legs: '' });
      setPhysicalGoal('');
      
    } catch (err) {
      setError(err.message || 'Error al guardar el registro');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/user');
  };

  // Componente Input personalizado
  const CustomInput = ({ label, value, onChange, placeholder, type = "text", required = false }) => (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '6px'
      }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        inputMode={type === 'number' ? 'decimal' : undefined}
        pattern={type === 'number' ? '[0-9]*[.,]?[0-9]*' : undefined}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          fontSize: '14px',
          transition: 'border-color 0.2s ease',
          backgroundColor: 'white',
          boxSizing: 'border-box',
          color: '#111827'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#3B82F6';
          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#D1D5DB';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)'
    }}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>

      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #FB923C, #EF4444)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icons.User size={24} style={{ color: 'white' }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                margin: '0 0 4px 0'
              }}>
                Registro de Datos Físicos
              </h1>
              <p style={{
                color: '#6B7280',
                margin: 0,
                fontSize: '14px'
              }}>
                Registra tus medidas corporales y objetivos físicos
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleBack}>
            <Icons.ArrowLeft size={16} />
            Volver al dashboard
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {/* Alerts */}
        {error && (
          <Alert style={{ marginBottom: '24px' }}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <div style={{
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#15803D',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        {/* Form Card */}
        <Card>
          <CardHeader style={{ textAlign: 'center', paddingBottom: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #FB923C, #EF4444)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Icons.Activity size={32} style={{ color: 'white' }} />
            </div>
            <CardTitle>Información Física</CardTitle>
            <CardDescription>
              Completa tu información física para un mejor seguimiento de tus objetivos
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Peso */}
              <div style={{
                backgroundColor: '#F8FAFC',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px',
                border: '1px solid #E2E8F0'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#3B82F6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    1
                  </div>
                  Peso Corporal
                </h3>
                <CustomInput
                  label="Peso"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Ingresa tu peso en kg"
                  type="number"
                  required
                />
              </div>

              {/* Medidas Corporales */}
              <div style={{
                backgroundColor: '#F8FAFC',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px',
                border: '1px solid #E2E8F0'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#10B981',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    2
                  </div>
                  Medidas Corporales
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  <CustomInput
                    label="Pecho"
                    value={bodyMeasurements.chest}
                    onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                    placeholder="cm"
                    type="number"
                  />
                  <CustomInput
                    label="Cintura"
                    value={bodyMeasurements.waist}
                    onChange={(e) => handleMeasurementChange('waist', e.target.value)}
                    placeholder="cm"
                    type="number"
                  />
                  <CustomInput
                    label="Brazos"
                    value={bodyMeasurements.arms}
                    onChange={(e) => handleMeasurementChange('arms', e.target.value)}
                    placeholder="cm"
                    type="number"
                  />
                  <CustomInput
                    label="Piernas"
                    value={bodyMeasurements.legs}
                    onChange={(e) => handleMeasurementChange('legs', e.target.value)}
                    placeholder="cm"
                    type="number"
                  />
                </div>
              </div>

              {/* Objetivo Físico */}
              <div style={{
                backgroundColor: '#F8FAFC',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '32px',
                border: '1px solid #E2E8F0'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#8B5CF6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    3
                  </div>
                  Objetivo Físico
                </h3>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Describe tu objetivo <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <textarea
                    value={physicalGoal}
                    onChange={(e) => setPhysicalGoal(e.target.value)}
                    placeholder="Describe tu objetivo físico (ej: perder peso, ganar masa muscular, mantenerse en forma...)"
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '14px',
                      transition: 'border-color 0.2s ease',
                      backgroundColor: 'white',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      color: '#111827' // Cambia el color del texto a gris oscuro
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3B82F6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#D1D5DB';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                style={{
                  width: '100%',
                  background: loading 
                    ? '#9CA3AF' 
                    : 'linear-gradient(135deg, #FB923C, #EF4444)',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Icons.Activity size={20} />
                    Registrar Datos Físicos
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>


      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}