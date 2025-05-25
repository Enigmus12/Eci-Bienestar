// components/ui/Button.jsx
import React from 'react';

const Button = ({
  onClick,
  children,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
  style = {},
  ...props
}) => {
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '8px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    fontSize: '14px',
    opacity: disabled ? 0.5 : 1
  };

  const variants = {
    default: {
      backgroundColor: '#3B82F6',
      color: 'white',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#374151',
      border: '1px solid #D1D5DB',
    }
  };

  const sizes = {
    default: {
      padding: '8px 16px',
      height: '40px'
    },
    lg: {
      padding: '12px 24px',
      height: '48px',
      fontSize: '16px'
    }
  };

  const buttonStyle = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...style // Permite sobrescribir estilos
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      if (variant === 'default') {
        e.target.style.backgroundColor = '#2563EB';
      } else {
        e.target.style.backgroundColor = '#F9FAFB';
      }
      e.target.style.transform = 'translateY(-1px)';
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled) {
      if (variant === 'default') {
        e.target.style.backgroundColor = buttonStyle.backgroundColor;
      } else {
        e.target.style.backgroundColor = 'transparent';
      }
      e.target.style.transform = 'translateY(0)';
    }
  };

  return (
    <button
      style={buttonStyle}
      className={className}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;