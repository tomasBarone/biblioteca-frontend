import React from 'react';
import './Recomendados.css'; // Importa sus propios estilos

const RECOMENDADOS_MOCK = [
  {
    id: 1,
    idAnio: "1605",
    titulo: "El Quijote",
    autor: "MIGUEL DE CERVANTES",
    precio: 22.50,
    colorPortada: "linear-gradient(135deg, #5c3a21, #4a2e1b)"
  },
  {
    id: 2,
    idAnio: "1759",
    titulo: "Cándido",
    autor: "VOLTAIRE",
    precio: 12.50,
    colorPortada: "linear-gradient(135deg, #615c43, #4f4b36)"
  },
  {
    id: 3,
    idAnio: "1847",
    titulo: "Cumbres borrascosas",
    autor: "EMILY BRONTË",
    precio: 18.90,
    colorPortada: "linear-gradient(135deg, #3d3543, #2d2633)"
  }
];

export const Recomendados = () => {
  return (
    <section className="recomendados-section">
      <h2 className="section-title">Recomendados de la casa</h2>
      
      <div className="libros-grid">
        {RECOMENDADOS_MOCK.map((libro) => (
          <div key={libro.id} className="libro-card-rec">
            <div className="libro-portada" style={{ background: libro.colorPortada }}>
              <span className="libro-anio-top">{libro.idAnio}</span>
              <h3 className="libro-titulo-cover">{libro.titulo}</h3>
              <span className="libro-autor-bottom">{libro.autor}</span>
            </div>

            <div className="libro-info-footer">
              <h4 className="libro-titulo-text">{libro.titulo}</h4>
              <p className="libro-autor-text">{libro.autor}</p>
              <span className="libro-precio">{libro.precio.toFixed(2)} €</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};