import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero-section">
      {/* COLUMNA IZQUIERDA: Textos y Acciones */}
      <div className="hero-content-left">
        <span className="hero-badge">Desde 1978 · Madrid</span>
        
        <h1 className="hero-main-title">
          Una librería <span className="title-italic">para lectores</span> curiosos.
        </h1>
        
        <p className="hero-description">
          Recorremos cuatro siglos de literatura organizados por movimientos. 
          Del barroco al realismo mágico, cada estantería cuenta una época.
        </p>
        
        <div className="hero-cta-group">
          <button className="btn-primary">
            Ver Catálogo <span className="btn-arrow">→</span>
          </button>
          <button className="btn-secondary">
            Novedades Contemporáneas
          </button>
        </div>
      </div>

      {/* COLUMNA DERECHA: Estantería Flotante */}
      <div className="hero-books-right">
        {/* Libro 1: El Quijote */}
        <div className="book-card-spine book-quijote">
          <span className="book-year">1605</span>
          <h4 className="book-title">El Quijote</h4>
          <span className="book-author">Miguel de Cervantes</span>
        </div>

        {/* Libro 2: Cándido */}
        <div className="book-card-spine book-candido">
          <span className="book-year">1759</span>
          <h4 className="book-title">Cándido</h4>
          <span className="book-author">Voltaire</span>
        </div>

        {/* Libro 3: Cumbres Borrascosas */}
        <div className="book-card-spine book-cumbres">
          <span className="book-year">1847</span>
          <h4 className="book-title">Cumbres borrascosas</h4>
          <span className="book-author">Emily Brontë</span>
        </div>
      </div>
    </div>
  );
}

export default Hero;