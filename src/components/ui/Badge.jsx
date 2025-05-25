// components/ui/Badge.jsx
import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: {
      backgroundColor: '#3B82F6',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#F3F4F6',
      color: '#374151'
    }
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '500',
      padding: '4px 12px',
      ...variants[variant]
    }} className={className}>
      {children}
    </span>
  );
};

export default Badge;