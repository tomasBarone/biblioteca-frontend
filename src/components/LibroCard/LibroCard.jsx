import React from 'react';
import './LibroCard.css';

function LibroCard({ id, titulo, autor, precio, generoNombre, onEliminar }) {
  return (
    <div style={{
      background: '#1e1e2e',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'between',
      border: '1px solid #313244'
    }}>
      <div>
        <span style={{ 
          background: '#cba6f7', 
          color: '#11111b', 
          padding: '4px 8px', 
          borderRadius: '6px', 
          fontSize: '0.75rem', 
          fontWeight: 'bold' 
        }}>
          {generoNombre}
        </span>
        <h3 style={{ color: '#cdd6f4', marginTop: '12px', marginBottom: '4px', fontSize: '1.2rem' }}>{titulo}</h3>
        <p style={{ color: '#a6adc8', fontSize: '0.9rem', marginBottom: '16px' }}>{autor}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span style={{ color: '#a6e3a1', fontWeight: 'bold', fontSize: '1.1rem' }}>
          ${precio}
        </span>
        
        {/* Botón de eliminación */}
        <button 
          onClick={() => {

            if(window.confirm(`¿Seguro que querés eliminar "${titulo}"?`)) {
              onEliminar(id);
            }
          }}
          style={{
            background: '#f38ba8',
            color: '#11111b',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#e78284'}
          onMouseOut={(e) => e.target.style.background = '#f38ba8'}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default LibroCard;