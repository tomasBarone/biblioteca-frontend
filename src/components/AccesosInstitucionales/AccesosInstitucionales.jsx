import React from 'react';
import { Link } from 'react-router-dom';
import './AccesosInstitucionales.css';

function AccesosInstitucionales({ 
  tituloSeccion = "SERVICIOS & RECURSOS ACADÉMICOS", 
  items = [] 
}) {

  if (!items || items.length === 0) return null;

  return (
    <section className="accesos-institucionales-section">
      <div className="accesos-header">
       
        <h2 className="infinita-deriva-heading">{tituloSeccion}</h2>
      </div>

      <div className="accesos-grid">
        {items.map((item, index) => (
          <Link to={item.link} key={item.id || index} className="acceso-card-link">
            <article className="acceso-card">
              <div className="acceso-image-wrapper">
                <img src={item.imagen} alt={item.alt || item.titulo} loading="lazy" />
              </div>
              <div className="acceso-card-content">
                <h3 className="acceso-card-title">{item.titulo}</h3>
                <p className="acceso-card-description">{item.descripcion}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default AccesosInstitucionales;