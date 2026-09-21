import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovimientoCard from './MovimientoCard';
import corrienteLiterariaService from '../../services/corrienteLiterariaService'; 
import './CatalogoLibros.css';

function CatalogoLibros() {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarCorrientes = async () => {
      try {
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
    return <div className="catalogo-loading">Cargando catálogo de corrientes...</div>;
  }

  return (
    <main className="catalogo-container">
      <div className="catalogo-header">
        <h2 className="catalogo-titulo">Explora por movimiento</h2>
        
        <span 
          onClick={() => navigate('/libros')}
          className="catalogo-link-all"
        >
          Catálogo completo →
        </span>
      </div>

      <div className="catalogo-grid">
        {movimientos.map((mov) => (
          <MovimientoCard 
            key={mov.id}
            id={mov.id}
            epoca={mov.epoca}
            nombre={mov.nombre}
            descripcion={mov.descripcion}
          />
        ))}
      </div>
    </main>
  );
}

export default CatalogoLibros;