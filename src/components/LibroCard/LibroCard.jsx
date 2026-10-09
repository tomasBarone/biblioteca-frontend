import React from 'react';
import { Link } from 'react-router-dom';
import BotonGuardarLectura from '../Guardar/BotonGuardarLectura';
import './LibroCard.css';

// Paleta de colores premium y editoriales intacta
const PALETA_COLORES = [
  { inicio: '#5c2c2c', fin: '#2b1414' }, // Burdeos / Vino profundo
  { inicio: '#1e323b', fin: '#0d181d' }, // Azul Biblioteca / Petróleo
  { inicio: '#243b2f', fin: '#101f18' }, // Verde Musgo / Oliva oscuro
  { inicio: '#453229', fin: '#241914' }, // Café Cuero / Tabaco antiguo
  { inicio: '#362447', fin: '#1b1026' }, // Berenjena / Púrpura Imperial
  { inicio: '#54352b', fin: '#2b1813' }  // Terracota / Óxido profundo
];

// Función matemática original intacta
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

// Ícono SVG de Máquina de Escribir (Tipo SVG/Lucide)
const TypewriterIcon = ({ active = false, size = 15 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={active ? "#1a1917" : "none"} 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="12" width="20" height="9" rx="2" />
    <path d="M6 12V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8" />
    <path d="M4 17h16" />
    <path d="M9 15v2" />
    <path d="M15 15v2" />
  </svg>
);

function LibroCard({ 
  id, 
  titulo, 
  autor, 
  precio, 
  generoNombre, 
  corrienteNombre, 
  anioPublicacion, 
  ano, 
  imagenUrl, 
  onEliminar,
  isSaved = false,
  onToggleGuardado 
}) {
  const anioMostrado = anioPublicacion || ano || '1721';
  const tienePortada = Boolean(imagenUrl && imagenUrl.trim() !== '');
  const fondoDegradado = obtenerDegradadoDinamico(titulo);


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
      <div className="libro-card-wrapper-relativo">
        
     {/* Renderiza el botón solo si la vista provee la función de remover/guardar */}
{onToggleGuardado && (
  <div className="libro-guardar-wrapper">
    <button 
      className={`btn-maquina-escribir ${isSaved ? 'guardado' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleGuardado(id);
      }}
      title="Quitar de mis lecturas"
    >
      <TypewriterIcon active={isSaved} size={15} />
    </button>
  </div>
)}

        {/* ENLACE Y PORTADA FÍSICA 3D */}
        <Link to={`/libro/${id}`} className="libro-card-link">
          <div className="libro-card-portada" style={estiloContenedorPortada}>
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
        </Link>
      </div>

      {/* METADATOS INFERIORES CON SUBRAYADO PROGRESIVO */}
      <div className="libro-meta-inferior">
        <Link to={`/libro/${id}`} className="libro-link-titulo">
          <span className="libro-txt-titulo">{titulo}</span>
        </Link>
        <span className="libro-txt-autor">{autor}</span>
      </div>

      {/* FOOTER (Precio y Botón Eliminar) */}
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
              if (window.confirm(`¿Seguro que querés eliminar "${titulo}"?`)) {
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