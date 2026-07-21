import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import libroService from '../../services/libroService';

function VistaLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const TAMANO_PAGINA = 10; // Cantidad de libros por página

  useEffect(() => {
    const obtenerLibros = async () => {
      setLoading(true);
      try {
        // Solicitamos la página activa enviando los parámetros a Spring
        const data = await libroService.obtenerTodos(paginaActual, TAMANO_PAGINA);
        console.log("Datos recibidos de la API:", data);

        if (data && Array.isArray(data.content)) {
          setLibros(data.content);
          setTotalPaginas(data.totalPages);
        } else if (Array.isArray(data)) {
          // Fallback por si la API retorna array plano
          setLibros(data);
          setTotalPaginas(1);
        } else {
          setLibros([]);
        }
      } catch (err) {
        console.error("Error al traer los libros del catálogo:", err);
        setError("No pudimos cargar el catálogo. Por favor, intentá más tarde.");
      } finally {
        setLoading(false);
      }
    };

    obtenerLibros();
    // Scroll suave hacia arriba cada vez que cambia la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [paginaActual]); // Se ejecuta al montar y cada vez que cambia paginaActual

  if (loading && libros.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', color: '#2c1810', fontFamily: 'system-ui, sans-serif' }}>
        Cargando nuestro catálogo...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', color: '#8b0000', fontFamily: 'system-ui, sans-serif' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ 
        fontFamily: '"Playfair Display", serif', 
        fontSize: '2.8rem', 
        color: '#2c1810', 
        fontWeight: '400',
        marginBottom: '40px'
      }}>
        Catálogo Completo
      </h1>

      {/* Grilla de libros */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '40px 32px',
        opacity: loading ? 0.6 : 1, // Feedback visual mientras carga la nueva página
        transition: 'opacity 0.2s'
      }}>
        {libros.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#705c4e' }}>
            No hay libros disponibles en este momento.
          </div>
        ) : (
          libros.map((libro) => (
            <Link to={`/libro/${libro.id}`} key={libro.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' }}>
                
                {/* Portada del libro */}
                <div style={{
                  aspectRatio: '2/3',
                  backgroundColor: '#f4f1ea',
                  border: '1px solid #e1dacb',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: libro.imagenUrl ? '0' : '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s ease',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {libro.imagenUrl ? (
                    <img 
                      src={libro.imagenUrl} 
                      alt={`Portada de ${libro.titulo}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#4a3525', textAlign: 'center' }}>
                      {libro.titulo}
                    </span>
                  )}
                </div>

                {/* Info del libro */}
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontFamily: 'system-ui, sans-serif', fontSize: '1rem', color: '#2c1810', fontWeight: '600' }}>
                    {libro.titulo}
                  </h4>
                  <p style={{ margin: '0 0 8px 0', fontFamily: 'system-ui, sans-serif', fontSize: '0.85rem', color: '#705c4e' }}>
                    {libro.autor?.nombre || "Autor Desconocido"}
                  </p>
                  <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.95rem', fontWeight: '700', color: '#2c1810' }}>
                    ${libro.precio}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Control de Paginación UI (Solo se muestra si hay más de 1 página) */}
      {totalPaginas > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '60px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          {/* Botón Anterior */}
          <button
            disabled={paginaActual === 0}
            onClick={() => setPaginaActual(prev => prev - 1)}
            style={{
              padding: '8px 16px',
              border: '1px solid #e1dacb',
              backgroundColor: paginaActual === 0 ? '#f9f8f6' : '#fff',
              color: paginaActual === 0 ? '#c0b8b0' : '#2c1810',
              cursor: paginaActual === 0 ? 'not-allowed' : 'pointer',
              borderRadius: '2px',
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
          >
            ← Anterior
          </button>

          {/* Números de Página */}
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index}
              onClick={() => setPaginaActual(index)}
              style={{
                width: '38px',
                height: '38px',
                border: '1px solid',
                borderColor: paginaActual === index ? '#2c1810' : '#e1dacb',
                backgroundColor: paginaActual === index ? '#2c1810' : '#fff',
                color: paginaActual === index ? '#fff' : '#2c1810',
                borderRadius: '2px',
                cursor: 'pointer',
                fontWeight: paginaActual === index ? '600' : '400',
                fontSize: '0.9rem',
                transition: 'all 0.15s'
              }}
            >
              {index + 1}
            </button>
          ))}

          {/* Botón Siguiente */}
          <button
            disabled={paginaActual >= totalPaginas - 1}
            onClick={() => setPaginaActual(prev => prev + 1)}
            style={{
              padding: '8px 16px',
              border: '1px solid #e1dacb',
              backgroundColor: paginaActual >= totalPaginas - 1 ? '#f9f8f6' : '#fff',
              color: paginaActual >= totalPaginas - 1 ? '#c0b8b0' : '#2c1810',
              cursor: paginaActual >= totalPaginas - 1 ? 'not-allowed' : 'pointer',
              borderRadius: '2px',
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}

export default VistaLibros;