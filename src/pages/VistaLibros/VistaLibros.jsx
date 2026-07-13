import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import libroService from '../../services/libroService';

function VistaLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const data = await libroService.getAll();
        setLibros(data);
      } catch (error) {
        console.error("Error al traer los libros del catálogo:", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerLibros();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: '#2c1810' }}>Cargando nuestro catálogo...</div>;
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
        {libros.map((libro) => (
          <Link to={`/libro/${libro.id}`} key={libro.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' }}>
              
              {/* Contenedor de la tapa del libro simulada */}
              <div style={{
                aspectRatio: '2/3',
                backgroundColor: '#f4f1ea',
                border: '1px solid #e1dacb',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Un diseño minimalista por si no tenés imágenes todavía */}
                <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#4a3525', textAlign: 'center' }}>
                  {libro.titulo}
                </span>
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
        ))}
      </div>
    </div>
  );
}

export default VistaLibros;