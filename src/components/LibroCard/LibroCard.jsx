import React from 'react';
import { Link } from 'react-router-dom';
import './LibroCard.css';

// Paleta de colores premium y editoriales 
const PALETA_COLORES = [
  { inicio: '#5c2c2c', fin: '#2b1414' }, // Burdeos / Vino profundo
  { inicio: '#1e323b', fin: '#0d181d' }, // Azul Biblioteca / Petróleo
  { inicio: '#243b2f', fin: '#101f18' }, // Verde Musgo / Oliva oscuro
  { inicio: '#453229', fin: '#241914' }, // Café Cuero / Tabaco antiguo
  { inicio: '#362447', fin: '#1b1026' }, // Berenjena / Púrpura Imperial
  { inicio: '#54352b', fin: '#2b1813' }  // Terracota / Óxido profundo
];

// Función matemática para asignar siempre el mismo color al mismo libro basándose en las letras del título
const obtenerDegradadoDinamico = (titulo) => {
  if (!titulo) return 'linear-gradient(135deg, #5c2c2c 0%, #2b1414 100%)';
  
  let hash = 0;
  for (let i = 0; i < titulo.length; i++) {
    hash = titulo.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const indice = Math.abs(hash) % PALETA_COLORES.length;
  const color = PALETA_COLORES[indice];
  
  return `linear-gradient(135deg, ${color.inicio} 0%, ${color.fin} 100%)`;
};

function LibroCard({ id, titulo, autor, precio, generoNombre, anioPublicacion, ano, onEliminar }) {
  const anioMostrado = anioPublicacion || ano || '1721';
  
  // Calculamos el degradado cromático único para este libro
  const fondoPortada = obtenerDegradadoDinamico(titulo);

  return (
    <div className="libro-card-container">
      <Link to={`/libro/${id}`} className="libro-card-link">
        
        {/* CRUCIAL: Aplicamos el background dinámico aquí con style */}
        <div className="libro-card-portada" style={{ background: fondoPortada }}>
          
          {/* Bloque Superior Interno */}
          <div className="libro-portada-top">
            <span className="libro-portada-anio">{anioMostrado}</span>
            <h4 className="libro-portada-titulo">{titulo}</h4>
          </div>

          {/* Bloque Inferior Interno */}
          <span className="libro-portada-autor">{autor}</span>
        </div>

        {/* Metadatos Inferiores (Fuera del libro) */}
        <div className="libro-meta-inferior">
          <span className="libro-txt-titulo">{titulo}</span>
          <span className="libro-txt-autor">{autor}</span>
        </div>
      </Link>

      {/* Footer con precio */}
      <div className="libro-footer">
        <span className="libro-precio">
          {precio != null && typeof precio === 'number' 
            ? precio.toFixed(2) 
            : (Number(precio) ? Number(precio).toFixed(2) : "0.00")} €
        </span>
        
        {onEliminar && (
          <button 
            className="libro-btn-eliminar"
            onClick={(e) => {
              e.preventDefault();
              if(window.confirm(`¿Seguro que querés eliminar "${titulo}"?`)) {
                onEliminar(id);
              }
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

export default LibroCard;