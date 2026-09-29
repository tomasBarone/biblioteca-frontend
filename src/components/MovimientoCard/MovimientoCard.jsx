import React from 'react';
import './MovimientoCard.css';
import { Link } from 'react-router-dom';

// Importás las imágenes de tu carpeta assets
import clasicismoImg from '../../assets/Clasicismo/mitologia1.jpg';
import medievalImg from '../../assets/Medieval/arteGotico.jpg';
import renacimientoImg from '../../assets/Renacimiento/renacimiento.jpg';
import barrocoImg from '../../assets/Barroco/barroco.jpg';
import neoclasicismoImg from '../../assets/Neoclasicismo/neoclasicismo.jpg';
import romanticismoImg from '../../assets/Romanticismo/romanticismo.jpg';
import realismoImg from '../../assets/Realismo y Naturalismo/realismo.jpg';
import modernismoImg from '../../assets/Modernismo/modernismo.jpg';
import vanguardismoImg from '../../assets/Vanguardismo/vanguardismo.jpg';
import posmodernidadImg from '../../assets/Siglo XX y Posmodernidad/posmodernidad3.jpg';


// Diccionario de imágenes por nombre exacto o slug
const IMAGENES_MOVIMIENTOS = {
  'Clasicismo': clasicismoImg,
  'Literatura Medieval': medievalImg,
  'Renacimiento': renacimientoImg,
  'Barroco': barrocoImg,
  'Neoclasicismo': neoclasicismoImg,
  'Romanticismo': romanticismoImg,
  'Realismo y Naturalismo': realismoImg,
  'Modernismo': modernismoImg,
  'Vanguardismo': vanguardismoImg,
  'Siglo XX y Posmodernidad': posmodernidadImg,
};

function MovimientoCard({ id, epoca, nombre, descripcion }) {
  // Busca la imagen por el nombre del movimiento o usa la default
  const bgImage = IMAGENES_MOVIMIENTOS[nombre];

  return (
    <Link to={`/corriente/${id}`} className="movimiento-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="movimiento-card">
        
        {/* Contenedor de la Imagen (sufre el efecto ZOOM al hacer hover) */}
        <div className="movimiento-card-image-wrapper">
          <img src={bgImage} alt={nombre} className="movimiento-card-image" />
        </div>

        {/* Gradiente oscuro y contenido en primer plano */}
        <div className="movimiento-card-overlay">
          <div className="movimiento-card-header">
            {epoca && <span className="movimiento-badge">{epoca}</span>}
          </div>

          <div className="movimiento-card-body">
            <h3 className="movimiento-nombre">{nombre}</h3>
            {descripcion && <p className="movimiento-descripcion">{descripcion}</p>}
            
            <div className="movimiento-link">
              EXPLORAR OBRAS <span className="flecha">→</span>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default MovimientoCard;