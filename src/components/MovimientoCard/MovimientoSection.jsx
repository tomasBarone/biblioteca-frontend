import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovimientoCard from './MovimientoCard';
import corrienteLiterariaService from '../../services/corrienteLiterariaService'; 

function CatalogoLibros() {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarCorrientes = async () => {
      try {
        // Asumiendo que tu service expone un método para traer todas las corrientes
        const data = await corrienteLiterariaService.obtenerTodos();
        setMovimientos(data);
      } catch (error) {
        console.error("Error al cargar las corrientes literarias:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarCorrientes();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: '#2c1810' }}>Cargando corrientes...</div>;
  }

  return (
    <main style={{ padding: '6px 40px 80px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Encabezado */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'baseline', 
        marginBottom: '32px',
        marginTop: '40px'
      }}>
        <h2 style={{ 
          fontFamily: '"Playfair Display", serif', 
          fontSize: '2.2rem', 
          color: '#2c1810',
          fontWeight: '400',
          margin: 0
        }}>
          Explora por género
        </h2>
        
        {/* Ahora este span navega de verdad a la vista del catálogo general */}
        <span 
          onClick={() => navigate('/libros')}
          style={{ 
            fontFamily: 'system-ui, sans-serif', 
            fontSize: '0.75rem', 
            fontWeight: '700', 
            letterSpacing: '1.5px', 
            color: '#2c1810',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          Catálogo completo →
        </span>
      </div>

      {/* Grilla adaptativa dinámica */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
        gap: '24px' 
      }}>
        {movimientos.map((mov) => (
          <MovimientoCard 
            key={mov.id} // Usamos el ID real de la base de datos
            id={mov.id}
            epoca={mov.epoca} // Asegurate de que tu objeto del backend use estos nombres o mapealos
            nombre={mov.nombre}
            descripcion={mov.descripcion}
          />
        ))}
      </div>
    </main>
  );
}

export default CatalogoLibros;