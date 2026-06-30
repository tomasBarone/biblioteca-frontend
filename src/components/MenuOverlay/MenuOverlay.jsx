import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import corrienteLiterariaService from '../../services/corrienteLiterariaService';
import libroService from '../../services/libroService'; // <-- Asegúrate de importar tu libroService acá
import './MenuOverlay.css';

function MenuOverlay({ isOpen, onClose }) {
  const [movimientosData, setMovimientosData] = useState([]);
  const [movimientoActivo, setMovimientoActivo] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setCargando(true);
      corrienteLiterariaService.obtenerTodos()
        .then(data => {
          setMovimientosData(data);
          if (data.length > 0) {
            // Seteamos la primera corriente por defecto y cargamos sus libros
            setMovimientoActivo(data[0]);
            cargarLibrosPrevisualizacion(data[0]);
          }
        })
        .catch(err => console.error("Error al sincronizar el menú overlay con la DB:", err))
        .finally(() => setCargando(false));
    }
  }, [isOpen]);

  // FUNCIÓN MÁGICA: Busca los libros en tiempo real al pasar el mouse
  const cargarLibrosPrevisualizacion = async (mov) => {
    setMovimientoActivo(mov);
    
    // Si la corriente actual no tiene la propiedad 'libros' cargada, la vamos a buscar al backend
    if (!mov.libros) {
      try {
        const librosDeEstaCorriente = await libroService.getLibrosPorCorriente(mov.id);
        
        // Inyectamos los libros dentro de la corriente en nuestro estado de React
        setMovimientosData(prevData => 
          prevData.map(item => 
            item.id === mov.id ? { ...item, libros: librosDeEstaCorriente } : item
          )
        );
        
        // Actualizamos también el foco del panel derecho
        setMovimientoActivo(prev => ({ ...prev, libros: librosDeEstaCorriente }));
      } catch (error) {
        console.error("Error al recuperar libros para la vista previa:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fullscreen-menu-overlay ${isOpen ? 'is-open' : ''}`}>
      <header className="menu-overlay-header">
        <span className="menu-logo">Librería Albatros</span>
        <button className="menu-close-btn" onClick={onClose}>
          CERRAR <span>×</span>
        </button>
      </header>

      <div className="menu-overlay-body">
        <div className="menu-col-left">
          <span className="menu-section-subtitle">Géneros Literarios</span>
          
          {cargando ? (
            <div style={{ color: '#a8a297', padding: '20px 0' }}>Sincronizando catálogo...</div>
          ) : (
            <nav className="menu-nav-list">
              {movimientosData.map((mov) => (
                <div 
                  key={mov.id}
                  className={`menu-nav-item ${movimientoActivo?.id === mov.id ? 'active' : ''}`}
                  onMouseEnter={() => cargarLibrosPrevisualizacion(mov)} // <-- Cambiado por la nueva función reactiva
                >
                  <Link to={`/corriente/${mov.id}`} onClick={onClose} className="menu-nav-link">
                    {mov.nombre}
                  </Link>
                  <span className="menu-nav-year">{mov.periodo || mov.epoca || 'S. Época'}</span>
                </div>
              ))}
            </nav>
          )}

          <footer className="menu-col-footer-links">
            <Link to="/" onClick={onClose}>INICIO</Link>
            <Link to="/catalogo" onClick={onClose}>CATÁLOGO</Link>
            <Link to="/login" onClick={onClose}>MI CUENTA</Link>
            <Link to="/admin" onClick={onClose} style={{ color: '#f38ba8' }}>⚙️ ADMIN</Link>
          </footer>
        </div>

        {/* COLUMNA DERECHA: Renderizado dinámico exacto */}
        <div className="menu-col-right">
          {movimientoActivo && (
            <>
              <div className="preview-movement-info">
                <span className="preview-epoca">{movimientoActivo.periodo || movimientoActivo.epoca || 'S. Época'}</span>
                <h2 className="preview-nombre">{movimientoActivo.nombre}</h2>
                <p className="preview-descripcion">{movimientoActivo.fundamentos || 'Sin descripción disponible por el momento.'}</p>
              </div>

              <div className="preview-books-list">
                {movimientoActivo.libros && movimientoActivo.libros.slice(0, 3).map((libro, idx) => (
                  <div key={idx} className="preview-book-row">
                    <div className="book-row-left">
                      <h4 className="preview-book-title">{libro.titulo}</h4>
                      <p className="preview-book-meta">
                        {libro.autor} · {libro.anioPublicacion || libro.ano}
                      </p>
                    </div>
                    <span className="book-row-arrow">↗</span>
                  </div>
                ))}
                
                {/* Modificado para asegurar que detecte la carga asíncrona */}
                {movimientoActivo.libros && movimientoActivo.libros.length === 0 && (
                  <p style={{ color: '#a8a297', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    No hay títulos registrados en esta corriente.
                  </p>
                )}
              </div>

              <Link to={`/corriente/${movimientoActivo.id}`} onClick={onClose} className="view-all-movement-btn">
                VER TODO {movimientoActivo.nombre.toUpperCase()} <span>↗</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuOverlay;