import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      {/* COLUMNA IZQUIERDA: Textos y Acciones */}
      <div className="hero-content-left">
        
        {/* BADGE */}
        <div className="reveal-wrapper">
          <span className="hero-badge reveal-item delay-1">
            Desde 1978 · Madrid
          </span>
        </div>
        
        {/* TÍTULO PRINCIPAL */}
        <h1 className="hero-main-title">
          <span className="reveal-wrapper">
            <span className="reveal-item delay-2">
              Una librería <span className="title-italic">para lectores</span> curiosos.
            </span>
          </span>
        </h1>
        
        {/* DESCRIPCIÓN */}
        <p className="hero-description">
          <span className="reveal-wrapper">
            <span className="reveal-item delay-3">
              Recorremos cuatro siglos de literatura organizados por movimientos. 
              Del barroco al realismo mágico, cada estantería cuenta una época.
            </span>
          </span>
        </p>
        
        {/* BOTONES */}
        <div className="hero-cta-group reveal-wrapper">
          <div className="reveal-item delay-4 flex-cta">
            <button className="btn-primary" onClick={() => navigate('/libros')}>
              Ver Catálogo <span className="btn-arrow">→</span>
            </button>
            
            <button className="btn-secondary" onClick={() => navigate('/libros?orden=novedades')}>
              Novedades Contemporáneas
            </button>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: Estantería Flotante */}
      <div className="hero-books-right reveal-wrapper">
        <div className="reveal-item delay-3 flex-books">
          <div className="book-card-spine book-quijote">
            <span className="book-year">1605</span>
            <h4 className="book-title">El Quijote</h4>
            <span className="book-author">Miguel de Cervantes</span>
          </div>

          <div className="book-card-spine book-candido">
            <span className="book-year">1759</span>
            <h4 className="book-title">Cándido</h4>
            <span className="book-author">Voltaire</span>
          </div>

          <div className="book-card-spine book-cumbres">
            <span className="book-year">1847</span>
            <h4 className="book-title">Cumbres borrascosas</h4>
            <span className="book-author">Emily Brontë</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;