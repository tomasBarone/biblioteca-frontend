import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import libroService from '../../services/libroService';
import './SearchOverlay.css';



function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Enfocar el input automáticamente al abrir el overlay
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.style.overflow = 'hidden'; // Evita scroll de fondo
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Lógica de búsqueda en tiempo real (Debounce de 300ms)
  useEffect(() => {
    if (query.trim().length < 2) {
      setResultados([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      
      setCargando(true);
      
      try {

        // El backend hace la consulta SQL optimizada buscando en ambos campos
      const resultadosBusqueda = await libroService.buscar(query);
      setResultados(resultadosBusqueda);

      } catch (error) {

        console.error("Error buscando libros:", error);
      } 
      finally {
        setCargando(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const manejarClickLibro = (id) => {
    onClose();
    setQuery('');
    navigate(`/libro/${id}`);
  };

  return (
    <div className="search-overlay">
      {/* Botón Cerrar en la esquina superior */}
      <button className="search-close-btn" onClick={onClose} aria-label="Cerrar búsqueda">
        ✕
      </button>

      <div className="search-container">
        {/* Barra de entrada principal */}
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="Escribí el título, autor o movimiento..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-large-input"
          />
          {cargando && <div className="search-spinner"></div>}
        </div>

        {/* Sección de Resultados */}
        <div className="search-results-section">
          {query.trim().length >= 2 && resultados.length === 0 && !cargando && (
            <p className="search-no-results">
              No encontramos coincidencias para "<span className="query-highlight">{query}</span>"
            </p>
          )}

          {resultados.length > 0 && (
            <div className="search-results-grid">
              {resultados.map((libro) => (
                <div 
                  key={libro.id} 
                  className="search-result-item"
                  onClick={() => manejarClickLibro(libro.id)}
                >
                  <div className="search-mini-portada">
                    {libro.imagenUrl ? (
                      <img src={libro.imagenUrl} alt={libro.titulo} />
                    ) : (
                      <div className="search-portada-fallback">📚</div>
                    )}
                  </div>
                  <div className="search-result-info">
                    <h4 className="search-result-title">{libro.titulo}</h4>
                    <p className="search-result-author">{libro.autor?.nombre || 'Autor desconocido'}</p>
                    <span className="search-result-price">${libro.precio}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sugerencias rápidas cuando el input está vacío */}
          {query.length === 0 && (
            <div className="search-suggestions">
              <span className="suggestions-label">Búsquedas sugeridas</span>
              <div className="suggestions-tags">
                <button onClick={() => setQuery('Quijote')}>El Quijote</button>
                <button onClick={() => setQuery('Novela')}>Novelas</button>
                <button onClick={() => setQuery('Realismo')}>Realismo Mágico</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;