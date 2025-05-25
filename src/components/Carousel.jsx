import React, { useState, useEffect } from 'react';
import '../assets/Styles/carousel.css';

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
      className="carousel-container"
      style={{ minHeight: `${minHeight}px` }}
    >
      <img
        src={images[current]}
        alt="carrusel"
        className="carousel-image"
        style={{ height: `${maxHeight}px` }}
      />
    </div>
  );
}
