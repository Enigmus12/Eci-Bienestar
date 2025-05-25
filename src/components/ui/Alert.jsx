// components/ui/Alert.jsx
import React from 'react';

export const Alert = ({ children, className = '', variant = 'default', style = {} }) => {
  const variants = {
    default: {
      backgroundColor: '#FEF2F2',
      border: '1px solid #FECACA',
      color: '#991B1B'
    }
  };

  return (
    <div style={{
      padding: '16px',
      borderRadius: '8px',
      ...variants[variant],
      ...style
    }} className={className}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children, className = '' }) => (
  <div style={{ fontSize: '14px' }} className={className}>
    {children}
  </div>
);