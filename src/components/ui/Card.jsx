// components/ui/Card.jsx
import React from 'react';

export const Card = ({ children, className = '', hover = false, style = {}, ...props }) => {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    border: '1px solid #E5E7EB',
    transition: hover ? 'box-shadow 0.2s ease' : 'none',
    ...style // Permite sobrescribir estilos
  };

  const handleMouseEnter = (e) => {
    if (hover) {
      e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)';
    }
  };

  const handleMouseLeave = (e) => {
    if (hover) {
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
    }
  };

  return (
    <div
      style={cardStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', style = {} }) => (
  <div style={{ padding: '24px 24px 0 24px', ...style }} className={className}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '', style = {} }) => (
  <div style={{ padding: '16px 24px 24px 24px', ...style }} className={className}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 style={{
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 8px 0'
  }} className={className}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p style={{
    fontSize: '14px',
    color: '#6B7280',
    margin: '0',
    lineHeight: '1.5'
  }} className={className}>
    {children}
  </p>
);