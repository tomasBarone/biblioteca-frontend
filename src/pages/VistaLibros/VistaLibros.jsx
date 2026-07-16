import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import libroService from '../../services/libroService';

function VistaLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const data = await libroService.obtenerTodos();
        console.log("Datos recibidos de la API:", data); // Para debuggear en consola

        // Validamos la estructura de la respuesta
        if (Array.isArray(data)) {
          setLibros(data);
        } else if (data && Array.isArray(data.content)) {
          // Por si el backend devuelve una respuesta paginada de Spring Data (Page<Libro>)
          setLibros(data.content);
        } else if (data && typeof data === 'object') {
          // Por si viene envuelto en un objeto genérico tipo Response<T> con un campo 'data' o 'libros'
          const posibleArray = data.data || data.libros || [];
          setLibros(Array.isArray(posibleArray) ? posibleArray : []);
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
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: '#2c1810' }}>Cargando nuestro catálogo...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '100px', color: '#8b0000' }}>{error}</div>;
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

      {/* Grilla de libros de corte editorial */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '40px 32px'
      }}>
        {/* Usamos un fallback seguro por si libros queda vacío */}
        {libros.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#705c4e' }}>
            No hay libros disponibles en este momento.
          </div>
        ) : (
          libros.map((libro) => (
            <Link to={`/libro/${libro.id}`} key={libro.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' }}>
                
                {/* Contenedor de la tapa del libro (Soporta imagen real o diseño minimalista de fallback) */}
                <div style={{
                  aspectRatio: '2/3',
                  backgroundColor: '#f4f1ea',
                  border: '1px solid #e1dacb',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: libro.imagenUrl ? '0' : '20px', // Sin padding si hay foto para que ocupe todo el espacio
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
                    /* Fallback minimalista por si no tiene imagen cargada */
                    <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#4a3525', textAlign: 'center' }}>
                      {libro.titulo}
                    </span>
                  )}
                </div>

                {/* Información del libro */}
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
    </div>
  );
}

export default VistaLibros;