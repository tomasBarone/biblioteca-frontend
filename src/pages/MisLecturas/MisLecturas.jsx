import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bibliotecaService from '../../services/bibliotecaService';
import LibroCard from '../../components/LibroCard/LibroCard';

const MisLecturas = () => {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarLecturas = async () => {
    setCargando(true);
    try {
      const data = await bibliotecaService.getMisLecturas();
      const lista = Array.isArray(data) ? data : (data?.content || []);
      setLibros(lista);
      setError(null);
    } catch (err) {
      console.error("Error al cargar lecturas guardadas:", err);
      setError("No se pudieron obtener tus obras guardadas.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLecturas();
  }, []);

  const handleQuitarGuardado = async (libroId) => {
    try {
      await bibliotecaService.toggleGuardado(libroId);
      // Remueve inmediatamente el libro del estado local para refrescar la vista
      setLibros((prev) => prev.filter((libro) => libro.id !== libroId));
    } catch (err) {
      console.error("Error al quitar libro:", err);
    }
  };

  if (cargando) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: 'serif' }}>
        Cargando tu biblioteca personal...
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', margin: 0 }}>
      
      {/* CABECERA HERO EDITORIAL */}
      <div style={{ backgroundColor: '#0f0e0c', color: '#fcfaf2', padding: '60px 10%' }}>
        <Link to="/libros" style={{ color: '#a8a297', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '20px', fontFamily: 'system-ui, sans-serif' }}>
          ← Volver al Catálogo
        </Link>
        
        <p style={{ color: '#a8a297', fontSize: '0.9rem', margin: '0 0 8px 0', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'system-ui, sans-serif' }}>
          Registro Personal
        </p>
        
        <h1 style={{ fontSize: '3.8rem', fontWeight: '400', margin: '0 0 16px 0', fontFamily: 'serif' }}>
          Mis Lecturas Guardadas
        </h1>
        
        <p style={{ color: '#e5dec9', fontSize: '1.1rem', fontStyle: 'italic', margin: 0, maxWidth: '600px', fontWeight: '300' }}>
          Colección privada de obras, ensayos y piezas literarias seleccionadas.
        </p>
      </div>

      {/* CUERPO DE TÍTULOS */}
      <div style={{ padding: '40px 10%' }}>
        {error && <p style={{ color: '#c62828', fontFamily: 'system-ui, sans-serif' }}>{error}</p>}

        <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#544f46', marginBottom: '30px', fontWeight: 'bold', fontFamily: 'system-ui, sans-serif' }}>
          {libros.length} {libros.length === 1 ? 'Obra guardada' : 'Obras guardadas'}
        </p>

        {libros.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#70695d', fontStyle: 'italic' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>
              No tenés títulos guardados en tu lista personal.
            </p>
            <Link to="/libros" style={{ color: '#1a1917', fontWeight: '600', textDecoration: 'underline' }}>
              Explorar el catálogo de obras
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '35px', alignItems: 'start' }}>
            {libros.map((libro) => (
              <LibroCard 
                key={libro.id}
                id={libro.id}
                titulo={libro.titulo}
                autor={libro.autor}
                precio={libro.precio}
                anioPublicacion={libro.anioPublicacion}
                ano={libro.ano}
                imagenUrl={libro.imagenUrl}
                generoNombre={libro.corrienteNombre || 'LITERATURA'}
                isSaved={true}
                /* Pasamos el handler de remoción solo en esta pantalla */
                onToggleGuardado={() => handleQuitarGuardado(libro.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisLecturas;