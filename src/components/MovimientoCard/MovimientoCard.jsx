import React from 'react';
import './MovimientoCard.css';
import { Link } from 'react-router-dom';

function MovimientoCard({ id, epoca, nombre, descripcion }) {
  return (
    // Redirecciona dinámicamente usando el ID real
    <Link to={`/corriente/${id}`} className="movimiento-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="movimiento-card">
        <div>
          <span className="movimiento-epoca">{epoca}</span>
          <h3 className="movimiento-nombre">{nombre}</h3>
          <p className="movimiento-descripcion">{descripcion}</p>
        </div>

        <div className="movimiento-link">
          VER LIBROS <span className="flecha">→</span>
        </div>
      </div>
    </Link>
  );
}

export default MovimientoCard;