import React from 'react';
import { Link } from 'react-router-dom';
import './LibroCard.css';

// Paleta de colores premium y editoriales (Mantenida intacta)
const PALETA_COLORES = [
  { inicio: '#5c2c2c', fin: '#2b1414' }, // Burdeos / Vino profundo
  { inicio: '#1e323b', fin: '#0d181d' }, // Azul Biblioteca / Petróleo
  { inicio: '#243b2f', fin: '#101f18' }, // Verde Musgo / Oliva oscuro
  { inicio: '#453229', fin: '#241914' }, // Café Cuero / Tabaco antiguo
  { inicio: '#362447', fin: '#1b1026' }, // Berenjena / Púrpura Imperial
  { inicio: '#54352b', fin: '#2b1813' }  // Terracota / Óxido profundo
];

// Función matemática original (Mantenida intacta)
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

function LibroCard({ id, titulo, autor, precio, generoNombre, anioPublicacion, ano, imagenUrl, onEliminar }) {
  console.log("URL que llega a la tarjeta:", imagenUrl);
  const anioMostrado = anioPublicacion || ano || '1721';
  
  // Calculamos el degradado dinámico por si no hay portada
  const fondoDegradado = obtenerDegradadoDinamico(titulo);
  
  // Evaluamos directamente si viene la URL desde Spring Boot
  const tienePortada = imagenUrl !== null && imagenUrl !== undefined && imagenUrl !== '';

  // Definimos el estilo del contenedor de la tapa
  const estiloContenedorPortada = tienePortada
    ? { 
        backgroundImage: `url(${imagenUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : { 
        background: fondoDegradado 
      };

  return (
    <div className="libro-card-container">
      <Link to={`/libro/${id}`} className="libro-card-link">
        
        {/* Contenedor de la tapa del libro */}
        <div className="libro-card-portada" style={estiloContenedorPortada}>
          
          {/* RENDERIZADO CONDICIONAL: 
              Si NO tiene portada, mostramos el diseño de colores con los textos internos.
              Si SI tiene portada, este bloque se vacía y solo luce la imagen de fondo. */}
          {!tienePortada && (
            <>
              <div className="libro-portada-top">
                <span className="libro-portada-anio">{anioMostrado}</span>
                <h4 className="libro-portada-titulo">{titulo}</h4>
              </div>
              <span className="libro-portada-autor">{autor}</span>
            </>
          )}
        </div>

        {/* Metadatos Inferiores (Siempre visibles fuera de la tapa, ideal para cuando hay foto) */}
        <div className="libro-meta-inferior">
          <span className="libro-txt-titulo">{titulo}</span>
          <span className="libro-txt-autor">{autor}</span>
        </div>
      </Link>

      {/* Footer con precio y botón eliminar */}
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