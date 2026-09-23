import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recomendados.css'; 
import libroService from '../../services/libroService';

export const Recomendados = () => {
  const [librosRec, setLibrosRec] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const cargarRecomendados = async () => {
      try {
        const response = await libroService.obtenerTodos();
        let listaLibros = response?.content || (Array.isArray(response) ? response : []);
        
        // Tomamos únicamente 6 libros
        setLibrosRec(listaLibros.slice(0, 6));
      } catch (error) {
        console.error("Error al cargar los recomendados:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarRecomendados();
  }, []);

  const totalLibros = librosRec.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalLibros - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalLibros - 1 ? 0 : prev + 1));
  };

  const obtenerLibrosVisibles = () => {
    if (totalLibros === 0) return [];
    if (totalLibros <= 3) {
      return librosRec.map((libro, idx) => ({ libro, isCenter: idx === 1 || totalLibros === 1 }));
    }

    const prevIndex = (currentIndex - 1 + totalLibros) % totalLibros;
    const nextIndex = (currentIndex + 1) % totalLibros;

    return [
      { libro: librosRec[prevIndex], isCenter: false },
      { libro: librosRec[currentIndex], isCenter: true },
      { libro: librosRec[nextIndex], isCenter: false }
    ];
  };

  const obtenerNombreAutor = (autor) => {
    if (!autor) return "Autor Destacado";
    if (typeof autor === 'string') return autor;
    return autor.nombre || autor.nombreCompleto || "Autor Destacado";
  };

  const formatearPrecio = (precio) => {
    if (precio === undefined || precio === null) return null;
    const numero = typeof precio === 'string' ? parseFloat(precio) : precio;
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(numero);
  };

  const librosVisibles = obtenerLibrosVisibles();

  return (
    <section className="recomendados-section">
      <div className="recomendados-container">
        <h2 className="section-title">Recomendados de la casa</h2>

        {loading ? (
          <div className="carousel-stage">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`libro-card-horizontal skeleton-card ${n === 2 ? 'card-center' : ''}`}>
                <div className="card-media-side skeleton-media" />
                <div className="card-info-side">
                  <div className="skeleton-text skeleton-tag" />
                  <div className="skeleton-text skeleton-title-text" />
                  <div className="skeleton-text skeleton-autor-text" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="carousel-wrapper">
            <div className="carousel-stage">
              {librosVisibles.map(({ libro, isCenter }, idx) => {
                const nombreAutor = obtenerNombreAutor(libro.autor);
                const precioFormateado = formatearPrecio(libro.precio);
                const imagenSrc = libro.imagenPortada || libro.imagenUrl;

                return (
                  <Link 
                    to={`/libro/${libro.id}`} 
                    key={`${libro.id}-${idx}`} 
                    className={`libro-card-link ${isCenter ? 'card-center' : 'card-side'}`}
                  >
                    <article className="libro-card-horizontal">
                      {/* LADO IZQUIERDO: PORTADA (Con object-fit: contain para no cortar nunca) */}
                      <div className="card-media-side">
                        {imagenSrc ? (
                          <img 
                            src={imagenSrc} 
                            alt={libro.titulo} 
                            className="portada-img-contain"
                          />
                        ) : (
                          <div className="portada-fallback">
                            <span className="fallback-titulo">{libro.titulo}</span>
                          </div>
                        )}
                      </div>

                      {/* LADO DERECHO: PANEL INFORMATIVO */}
                      <div className="card-info-side">
                        <span className="card-tag">
                          {libro.categoria?.nombre || "NOVEDAD EDITORIAL"}
                        </span>
                        
                        <h3 className="card-title">{libro.titulo}</h3>
                        
                        <p className="card-author">{nombreAutor}</p>

                        {libro.sinopsis && (
                          <p className="card-synopsis">{libro.sinopsis}</p>
                        )}

                        {precioFormateado && (
                          <div className="card-price-tag">{precioFormateado}</div>
                        )}
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* CONTROLES INFERIORES */}
            {totalLibros > 1 && (
              <div className="carousel-controls-bottom">
                <button className="carousel-arrow-btn" onClick={handlePrev} aria-label="Anterior">
                  &#8249;
                </button>

                <div className="carousel-dots">
                  {librosRec.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Ir al elemento ${index + 1}`}
                    />
                  ))}
                </div>

                <button className="carousel-arrow-btn" onClick={handleNext} aria-label="Siguiente">
                  &#8250;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};