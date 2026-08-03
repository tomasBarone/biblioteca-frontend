import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import libroService from '../../services/libroService';

const VistaLibros = () => {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // URL Base del Backend para archivos locales
  const BASE_URL_BACKEND = 'http://localhost:8080';

  useEffect(() => {
    const cargarLibros = async () => {
      setCargando(true);
      try {
        const data = await libroService.obtenerTodos();
        // Soportamos respuesta paginada (data.content) o lista directa (data)
        const listaLibros = data.content ? data.content : data;
        setLibros(listaLibros);
        setError(null);
      } catch (err) {
        console.error("Error al cargar la lista de libros:", err);
        setError("No se pudieron cargar los libros del catálogo.");
      } finally {
        setCargando(false);
      }
    };

    cargarLibros();
  }, []);

 const resolverUrlImagen = (libro) => {
  if (!libro) return null;

  // 1. Evaluamos todos los posibles campos donde el backend mueva la imagen
  let path = libro.imagenUrl || libro.imagenNombre || libro.imagen || libro.portada;

  if (!path) return null;

  // 2. Si el string contiene la estructura de Cloudinary o arranca con res.cloudinary
  if (path.includes('cloudinary.com') || path.includes('res.cloudinary')) {
    // Caso A: Si arranca con "https:/" o "http:/" (le falta una barra)
    if (path.startsWith('https:/') && !path.startsWith('https://')) {
      return path.replace('https:/', 'https://');
    }
    if (path.startsWith('http:/') && !path.startsWith('http://')) {
      return path.replace('http:/', 'http://');
    }
    // Caso B: Si viene sin protocolo ("res.cloudinary.com/...")
    if (!path.startsWith('http')) {
      return `https://${path}`;
    }
    // Caso C: Viene perfecta con "https://"
    return path;
  }

  // 3. Si es cualquier otra URL absoluta válida (S3, externa, etc.)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 4. Si es un archivo local alojado en Spring Boot (ej: "portada123.jpg")
  return `${BASE_URL_BACKEND}/uploads/${path}`;
};
  return (
    <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', padding: '40px 8%', color: '#1a1917' }}>
      
      {/* CABECERA DE LA VISTA */}
      <div style={{ marginBottom: '40px', borderBottom: '1px solid #e5dec9', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '400', margin: '0 0 10px 0' }}>Catálogo de Obras</h1>
        <p style={{ color: '#70695d', margin: 0, fontSize: '1rem' }}>Explorá nuestra colección académica y literaria</p>
      </div>

      {/* GRILLA DE LIBROS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '35px',
        alignItems: 'start'
      }}>
        {libros.map((libro) => {

          console.log("DATOS DEL LIBRO EN CATALOGO:", {
    id: libro.id,
    titulo: libro.titulo,
    imagenUrl: libro.imagenUrl,
    imagenNombre: libro.imagenNombre,
    objetoCompleto: libro
  });
          const urlFinalImagen = resolverUrlImagen(libro);

          return (
            <div 
              key={libro.id} 
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <Link 
                to={`/libro/${libro.id}`} 
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                {/* PORTADA DEL LIBRO */}
                <div style={{
                  aspectRatio: '2/3',
                  backgroundColor: '#f4f1ea',
                  border: '1px solid #e1dacb',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: urlFinalImagen ? '0' : '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  overflow: 'hidden',
                  marginBottom: '15px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }}
                >
                  {urlFinalImagen ? (
                    <img 
                      src={urlFinalImagen} 
                      alt={`Portada de ${libro.titulo}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        // Fallback si la imagen rompe al cargar
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: '#4a3525', textAlign: 'center' }}>
                      {libro.titulo}
                    </span>
                  )}
                </div>

                {/* METADATOS Y TITULO */}
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '4px' }}>
                  {libro.corrienteNombre || 'LITERATURA'}
                </span>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: '0 0 6px 0', lineHeight: '1.3', color: '#1a1917' }}>
                  {libro.titulo}
                </h3>

                <p style={{ fontSize: '0.85rem', color: '#544f46', margin: '0 0 10px 0' }}>
                  {libro.autor}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '6px', fontSize: '1.05rem', fontWeight: '500' }}>
                  $ {Number(libro.precio).toLocaleString('es-AR')}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VistaLibros;