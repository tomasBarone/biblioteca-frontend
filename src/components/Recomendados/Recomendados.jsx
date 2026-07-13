import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Recomendados.css'; 
import libroService from '../../services/libroService';


export const Recomendados = () => {
  const [librosRec, setLibrosRec] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const cargarRecomendados = async () => {
      try {
        const response = await libroService.obtenerTodos();

        // Al usar Pageable, los libros viven en response.content
        const listaLibros = response?.content || [];

        // Tomamos los 3 primeros para la sección de la Home
        setLibrosRec(listaLibros.slice(0, 3));
      } catch (error) {
        console.error("Error al cargar los recomendados de la casa:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarRecomendados();
  }, []);

  // Función auxiliar para asignar fondos elegantes dinámicamente si el backend no provee color
  const obtenerGradienteEstilo = (index) => {
    const gradientes = [
      "linear-gradient(135deg, #5c3a21, #4a2e1b)", // Marrón editorial
      "linear-gradient(135deg, #615c43, #4f4b36)", // Olivo antiguo
      "linear-gradient(135deg, #3d3543, #2d2633)"  // Berenjena/Pizarra oscuro
    ];
    return gradientes[index % gradientes.length];
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#2c1810' }}>Cargando sugerencias...</div>;
  }

  return (
    <section className="recomendados-section">
      <h2 className="section-title">Recomendados de la casa</h2>
      
      <div className="libros-grid">
        {librosRec.map((libro, index) => (
          <Link 
            to={`/libro/${libro.id}`} 
            key={libro.id} 
            className="libro-card-rec-link"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="libro-card-rec">
              {/* Portada abstracta/editorial basada en datos reales */}
              <div className="libro-portada" style={{ background: libro.colorPortada || obtenerGradienteEstilo(index) }}>
                {/* Mostramos el año de publicación si tu entidad 'Libro' lo expone (ej: libro.anioPublicacion o libro.fecha?.substring(0,4)) */}
                <span className="libro-anio-top">{libro.anioPublicacion || "Clásico"}</span>
                <h3 className="libro-titulo-cover">{libro.titulo}</h3>
                <span className="libro-autor-bottom">{libro.autor?.nombre || "Autor Destacado"}</span>
              </div>

              {/* Información de pie de tarjeta */}
              <div className="libro-info-footer">
                <h4 className="libro-titulo-text">{libro.titulo}</h4>
                <p className="libro-autor-text">{libro.autor?.nombre || "Autor"}</p>
                <span className="libro-precio">
                  {typeof libro.precio === 'number' ? libro.precio.toFixed(2) : libro.precio} €
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};