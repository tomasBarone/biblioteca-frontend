import React from 'react';
import './SeccionImagenParallax.css';

function SeccionImagenParallax({ imagenUrl, titulo, subtitulo, altText }) {
  return (
    <div className="parallax-section-container">
      {/* Imagen fija al fondo */}
      <div 
        className="parallax-bg-fixed" 
        style={{ backgroundImage: `url(${imagenUrl})` }}
        role="img"
        aria-label={altText || titulo || 'Sección visual'}
      >
        {(titulo || subtitulo) && (
          <div className="parallax-overlay-content reveal-on-scroll">
            {subtitulo && <span className="parallax-subtitle">{subtitulo}</span>}
            {titulo && <h2 className="parallax-title">{titulo}</h2>}
          </div>
        )}
      </div>
    </div>
  );
}

export default SeccionImagenParallax;