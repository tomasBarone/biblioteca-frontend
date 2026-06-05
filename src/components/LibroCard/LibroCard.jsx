import React from 'react';
import './LibroCard.css'; // Usamos las clases de este archivo para moldear la estética

function LibroCard({ id, titulo, autor, precio, generoNombre, onEliminar }) {
  return (
    <div className="libro-card">
      <div>
        {/* Etiqueta del Género / Corriente literaria */}
        <span className="libro-genero">
          {generoNombre}
        </span>
        
        {/* Título y Autor */}
        <h3 className="libro-titulo">{titulo}</h3>
        <p className="libro-autor">{autor}</p>
      </div>

      {/* Footer de la tarjeta con precio y acciones */}
      <div className="libro-footer">
        <span className="libro-precio">
          ${precio}
        </span>
        
        {/* CONTROL DE SEGURIDAD VISUAL: El botón solo existe si se pasa la función onEliminar */}
        {onEliminar && (
          <button 
            onClick={() => {
              if(window.confirm(`¿Seguro que querés eliminar "${titulo}" del catálogo central?`)) {
                onEliminar(id);
              }
            }}
            style={{
              background: '#f38ba8', // Color rojizo suave para acciones destructivas en el ABM
              color: '#11111b',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              fontFamily: 'system-ui, sans-serif',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#e78284'}
            onMouseOut={(e) => e.target.style.background = '#f38ba8'}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

export default LibroCard;