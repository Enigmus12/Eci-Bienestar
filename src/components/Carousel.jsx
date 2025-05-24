import React, { useState, useEffect } from 'react';

export default function Carousel({ images, minHeight = 220, maxHeight = 200 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{
        width: '100vw',
        background: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight,
        boxShadow: '0 2px 8px #0001',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        overflow: 'hidden',
      }}
    >
      <img
        src={images[current]}
        alt="carrusel"
        style={{
          width: '100%',
          maxWidth: 600,
          height: 'auto',
          maxHeight,
          objectFit: 'contain',
          margin: 16,
          display: 'block',
        }}
      />
    </div>
  );
}
