import React from 'react';
import '../assets/Styles/card.css';

export default function Card({ img, title, desc, onClick }) {
  return (
    <div className="card-container">
      <img src={img} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-desc">{desc}</p>
      <button className="card-button" onClick={onClick}>
        Ingresar
      </button>
    </div>
  );
}
