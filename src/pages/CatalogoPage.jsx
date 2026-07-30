import React, { useState, useEffect } from 'react';
import { libroService } from '../services/libroService';

export default function CatalogoPage() {
  // 1. Estados para los filtros de año y texto libre
  const [queryText, setQueryText] = useState('');
  const [anioInicio, setAnioInicio] = useState('');
  const [anioFin, setAnioFin] = useState('');

  // 2. Estado para la respuesta paginada de Spring Boot
  const [librosPage, setLibrosPage] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);
  const [loading, setLoading] = useState(true);

  // Función que hace la petición a Spring Boot según los filtros aplicados
  const fetchLibros = async (page = 0) => {
    setLoading(true);
    try {
      // Llamamos al service que armará la URL a /api/libros/filtrar-avanzado
      const data = await libroService.filtrarAvanzado(queryText, anioInicio, anioFin, page);
      setLibrosPage(data);
      setPaginaActual(page);
    } catch (error) {
      console.error("Error al cargar el catálogo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial al entrar a /libros
  useEffect(() => {
    fetchLibros(0);
  }, []);

  // Manejador del botón "Buscar / Filtrar"
  const handleFiltrar = (e) => {
    e.preventDefault();
    fetchLibros(0); // Reiniciamos a la primera página al filtrar
  };

  // Limpiar filtros y restablecer el catálogo
  const handleLimpiar = () => {
    setQueryText('');
    setAnioInicio('');
    setAnioFin('');
    // Ejecutamos la búsqueda limpia en el siguiente ciclo
    setTimeout(() => {
      libroService.filtrarAvanzado('', '', '', 0).then(data => {
        setLibrosPage(data);
        setPaginaActual(0);
      });
    }, 0);
  };

  return (
    <main style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* 1. ENCABEZADO DE LA PÁGINA */}
      <div style={{ marginBottom: '32px', marginTop: '20px' }}>
        <h1 style={{ 
          fontFamily: '"Playfair Display", serif', 
          fontSize: '2.5rem', 
          color: '#2c1810',
          fontWeight: '400',
          margin: '0 0 8px 0'
        }}>
          Catálogo de Libros
        </h1>
        <p style={{ fontFamily: 'system-ui, sans-serif', color: '#666', margin: 0 }}>
          Explora nuestra colección o filtra por período de publicación y título.
        </p>
      </div>

      {/* 2. PANEL DE FILTROS APLICADOS */}
      <form 
        onSubmit={handleFiltrar}
        style={{ 
          backgroundColor: '#f9f6f0', 
          padding: '24px', 
          borderRadius: '8px', 
          marginBottom: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'flex-end'
        }}
      >
        {/* Filtro por Título o Autor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 250px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2c1810' }}>Buscar por texto</label>
          <input 
            type="text" 
            placeholder="Título o Autor..." 
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem' }}
          />
        </div>

        {/* Filtro Año Desde */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '0 1 140px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2c1810' }}>Año desde</label>
          <input 
            type="number" 
            placeholder="Ej: 1950" 
            value={anioInicio}
            onChange={(e) => setAnioInicio(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem' }}
          />
        </div>

        {/* Filtro Año Hasta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '0 1 140px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2c1810' }}>Año hasta</label>
          <input 
            type="number" 
            placeholder="Ej: 2000" 
            value={anioFin}
            onChange={(e) => setAnioFin(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.95rem' }}
          />
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#2c1810', 
              color: '#fff', 
              border: 'none', 
              padding: '11px 24px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: '600' 
            }}
          >
            Aplicar Filtros
          </button>

          <button 
            type="button"
            onClick={handleLimpiar}
            style={{ 
              backgroundColor: 'transparent', 
              color: '#2c1810', 
              border: '1px solid #2c1810', 
              padding: '11px 18px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Limpiar
          </button>
        </div>
      </form>

      {/* 3. GRILLA DE RESULTADOS */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#2c1810' }}>Cargando libros...</div>
      ) : (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {librosPage?.content && librosPage.content.length > 0 ? (
              librosPage.content.map((libro) => (
                <div 
                  key={libro.id || libro.titulo} 
                  style={{ 
                    border: '1px solid #e2ded7', 
                    borderRadius: '6px', 
                    padding: '20px', 
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}
                >
                  <h3 style={{ fontFamily: '"Playfair Display", serif', margin: '0 0 8px 0', fontSize: '1.25rem', color: '#2c1810' }}>
                    {libro.titulo}
                  </h3>
                  <p style={{ margin: '0 0 12px 0', color: '#555', fontSize: '0.9rem' }}>
                    <strong>Autor:</strong> {libro.autor}
                  </p>
                  <span style={{ 
                    fontSize: '0.8rem', 
                    backgroundColor: '#f0ebe1', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    color: '#2c1810',
                    fontWeight: '600'
                  }}>
                    Publicación: {libro.anioPublicacion}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#777', padding: '40px 0' }}>
                No se encontraron libros que coincidan con los criterios ingresados.
              </p>
            )}
          </div>

          {/* 4. PAGINACIÓN DE SPRING BOOT */}
          {librosPage && librosPage.totalPages > 1 && (
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <button 
                disabled={paginaActual === 0}
                onClick={() => fetchLibros(paginaActual - 1)}
                style={{ padding: '8px 16px', cursor: paginaActual === 0 ? 'not-allowed' : 'pointer' }}
              >
                ← Anterior
              </button>
              
              <span>Página {paginaActual + 1} de {librosPage.totalPages}</span>

              <button 
                disabled={paginaActual + 1 >= librosPage.totalPages}
                onClick={() => fetchLibros(paginaActual + 1)}
                style={{ padding: '8px 16px', cursor: (paginaActual + 1 >= librosPage.totalPages) ? 'not-allowed' : 'pointer' }}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}