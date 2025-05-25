import React from 'react';

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

export default Skeleton;
