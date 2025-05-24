import React, { useState } from 'react';

export default function Card({ img, title, desc, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        border: '2px solid #000', // borde negro
        borderRadius: 16,
        background: '#fff',
        boxShadow: '0 2px 12px #0001',
        padding: '1.2rem 1rem 1.2rem 1rem', // menos padding abajo
        textAlign: 'center',
        width: 240, // más angosta
        margin: '0 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 260, // menos alto
        transition: 'transform 0.2s cubic-bezier(.4,2,.6,1)',
        transform: hover ? 'scale(1.045)' : 'scale(1)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={img} alt={title} style={{ width: 90, height: 70, objectFit: 'cover', borderRadius: 8, marginBottom: 14 }} />
      <h2 style={{ fontWeight: 700, fontSize: 18, margin: 0, marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 14, color: '#222', marginBottom: 14 }}>{desc}</p>
      <button
        onClick={onClick}
        style={{
          background: hover ? '#e60000' : '#000',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.4rem 1.1rem',
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        Ingresar
      </button>
    </div>
  );
}
