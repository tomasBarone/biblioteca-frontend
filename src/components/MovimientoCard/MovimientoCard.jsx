import React from 'react';
import './MovimientoCard.css';

function MovimientoCard({ epoca, nombre, descripcion}){

      return (
        <div className="movimiento-card">
          <div>
            <span className= "movimiento-epoca">{epoca}</span>
            <h3 className="movimiento-nombre">{nombre}</h3>
            <p className="movimiento-descripcion">{descripcion}</p>
          </div>

          <div className="movimiento-link">
            VER LIBROS <span className= "flecha">→</span>
          </div>
        </div>
      );

}

export default MovimientoCard;