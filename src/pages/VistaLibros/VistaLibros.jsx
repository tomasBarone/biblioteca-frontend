import React, { useState, useEffect } from 'react';
import libroService from '../../services/libroService';
import LibroCard from '../../components/LibroCard/LibroCard';

const VistaLibros = () => {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarLibros = async () => {
      setCargando(true);
      try {
        const data = await libroService.obtenerTodos();
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

  if (cargando) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', background: '#fcfaf2', minHeight: '100vh', fontFamily: 'serif' }}>
        Cargando catálogo de obras...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', background: '#fcfaf2', minHeight: '100vh', fontFamily: 'serif', color: '#c62828' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', padding: '40px 8%', color: '#1a1917' }}>
      
      {/* CABECERA */}
      <div style={{ marginBottom: '40px', borderBottom: '1px solid #e5dec9', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '400', margin: '0 0 10px 0' }}>Catálogo de Obras</h1>
        <p style={{ color: '#70695d', margin: 0, fontSize: '1rem' }}>Explorá nuestra colección académica y literaria</p>
      </div>

      {/* GRILLA DE LIBROS USANDO TU COMPONENTE 3D UNIFICADO */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '35px',
        alignItems: 'start'
      }}>
        {libros.map((libro) => (
          <LibroCard 
            key={libro.id}
            id={libro.id}
            titulo={libro.titulo}
            autor={libro.autor}
            precio={libro.precio}
            imagenUrl={libro.imagenUrl}
            corrienteNombre={libro.corrienteNombre}
            generoNombre={libro.generoNombre}
            anioPublicacion={libro.anioPublicacion}
            ano={libro.ano}
          />
        ))}
      </div>
    </div>
  );
};

export default VistaLibros;