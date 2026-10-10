import React, { useState, useEffect } from 'react';
import libroService from '../../services/libroService';
import LibroCard from '../../components/LibroCard/LibroCard';

const VistaLibros = () => {
  // Filtros
  const [queryText, setQueryText] = useState('');
  const [anioInicio, setAnioInicio] = useState('');
  const [anioFin, setAnioFin] = useState('');

  // Paginación y Estado
  const [librosPage, setLibrosPage] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Consulta paginada al backend
  const fetchLibros = async (page = 0) => {
    setCargando(true);
    try {
      
      let data;
      if (libroService.filtrarAvanzado) {
        data = await libroService.filtrarAvanzado(queryText, anioInicio, anioFin, page);
      } else {
        data = await libroService.obtenerTodos(page);
      }

      setLibrosPage(data);
      setPaginaActual(page);
      setError(null);
    } catch (err) {
      console.error("Error al cargar libros:", err);
      setError("No se pudieron cargar los libros del catálogo.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchLibros(0);
  }, []);

  const handleFiltrar = (e) => {
    e.preventDefault();
    fetchLibros(0);
  };

  const handleLimpiar = () => {
    setQueryText('');
    setAnioInicio('');
    setAnioFin('');
    setTimeout(() => {
      fetchLibros(0);
    }, 0);
  };

  const listaLibros = librosPage?.content || (Array.isArray(librosPage) ? librosPage : []);
  const totalPaginas = librosPage?.totalPages || 1;

  return (
    <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', padding: '40px 8%', color: '#1a1917' }}>

      {/* CABECERA EDITORIAL */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #e5dec9', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '400', margin: '0 0 10px 0' }}>Catálogo de Obras</h1>
        <p style={{ color: '#70695d', margin: 0, fontSize: '1rem', fontFamily: 'system-ui, sans-serif' }}>
          Explorá nuestra colección académica y literaria
        </p>
      </div>

      {/* PANEL DE FILTROS APLICADOS */}
      <form 
        onSubmit={handleFiltrar}
        style={{ 
          backgroundColor: '#efebe0', 
          padding: '20px 24px', 
          borderRadius: '6px', 
          marginBottom: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'flex-end',
          border: '1px solid #e5dec9',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 250px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1a1917', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Buscar por texto
          </label>
          <input 
            type="text" 
            placeholder="Título o Autor..." 
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '4px', border: '1px solid #d4cebd', fontSize: '0.95rem', backgroundColor: '#fcfaf2' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '0 1 130px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1a1917', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Año desde
          </label>
          <input 
            type="number" 
            placeholder="Ej: 1950" 
            value={anioInicio}
            onChange={(e) => setAnioInicio(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '4px', border: '1px solid #d4cebd', fontSize: '0.95rem', backgroundColor: '#fcfaf2' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '0 1 130px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1a1917', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Año hasta
          </label>
          <input 
            type="number" 
            placeholder="Ej: 2000" 
            value={anioFin}
            onChange={(e) => setAnioFin(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '4px', border: '1px solid #d4cebd', fontSize: '0.95rem', backgroundColor: '#fcfaf2' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#5c3a21', 
              color: '#fcfaf2', 
              border: 'none', 
              padding: '11px 22px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            Aplicar Filtros
          </button>

          <button 
            type="button"
            onClick={handleLimpiar}
            style={{ 
              backgroundColor: 'transparent', 
              color: '#1a1917', 
              border: '1px solid #1a1917', 
              padding: '11px 18px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            Limpiar
          </button>
        </div>
      </form>

      {/* ESTADOS DE CARGA Y ERROR */}
      {cargando ? (
        <div style={{ padding: '60px', textAlign: 'center', minHeight: '40vh', fontFamily: 'serif' }}>
          Cargando catálogo de obras...
        </div>
      ) : error ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#c62828', fontFamily: 'serif' }}>
          {error}
        </div>
      ) : (
        <>
          {/* GRILLA UNIFICADA CON TARJETAS 3D */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '35px',
            alignItems: 'start'
          }}>
            {listaLibros.length > 0 ? (
              listaLibros.map((libro) => (
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
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#70695d', padding: '60px 0', fontStyle: 'italic' }}>
                No se encontraron obras que coincidan con los criterios ingresados.
              </p>
            )}
          </div>

          {/* CONTROLES DE PAGINACIÓN */}
          {totalPaginas > 1 && (
            <div style={{ 
              marginTop: '50px', 
              paddingTop: '20px',
              borderTop: '1px solid #e5dec9',
              display: 'flex', 
              justify: 'center', 
              alignItems: 'center', 
              gap: '20px',
              fontFamily: 'system-ui, sans-serif'
            }}>
              <button 
                disabled={paginaActual === 0}
                onClick={() => fetchLibros(paginaActual - 1)}
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: paginaActual === 0 ? '#e5dec9' : '#1a1917',
                  color: '#fcfaf2',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: paginaActual === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}
              >
                ← Anterior
              </button>

              <span style={{ fontSize: '0.9rem', color: '#544f46', fontWeight: '500' }}>
                Página <strong>{paginaActual + 1}</strong> de <strong>{totalPaginas}</strong>
              </span>

              <button 
                disabled={paginaActual + 1 >= totalPaginas}
                onClick={() => fetchLibros(paginaActual + 1)}
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: (paginaActual + 1 >= totalPaginas) ? '#e5dec9' : '#1a1917',
                  color: '#fcfaf2',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: (paginaActual + 1 >= totalPaginas) ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VistaLibros;