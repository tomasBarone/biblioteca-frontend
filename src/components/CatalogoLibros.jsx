import React from 'react';
import MovimientoCard from './MovimientoCard/MovimientoCard';

function CatalogoLibros() {
  // Hardcodeamos momentáneamente los datos de tu captura para clavar el diseño visual
  const movimientos = [
    { epoca: "S. XVII", nombre: "Barroco", descripcion: "Ingenio, conceptismo y desengaño." },
    { epoca: "S. XVIII", nombre: "Ilustración", descripcion: "Razón, sátira y enciclopedia." },
    { epoca: "1800 - 1850", nombre: "Romanticismo", descripcion: "Pasión, libertad y naturaleza." },
    { epoca: "1850 - 1900", nombre: "Realismo", descripcion: "La vida cotidiana sin adornos." },
    { epoca: "1880 - 1920", nombre: "Modernismo", descripcion: "Belleza, exotismo y musicalidad." },
    { epoca: "1910 - 1940", nombre: "Vanguardia", descripcion: "Ruptura y experimentación." },
    { epoca: "S. XX - XXI", nombre: "Contemporáneo", descripcion: "Voces actuales del mundo." }
  ];

  return (
    <main style={{ padding: '6px 40px 80px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Encabezado de la sección */}
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
        
        <span style={{ 
          fontFamily: 'system-ui, sans-serif', 
          fontSize: '0.75rem', 
          fontWeight: '700', 
          letterSpacing: '1.5px', 
          color: '#2c1810',
          textTransform: 'uppercase',
          cursor: 'pointer'
        }}>
          Catálogo completo →
        </span>
      </div>

      {/* Grilla adaptativa idéntica al layout de 3 columnas de tu foto */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
        gap: '24px' 
      }}>
        {movimientos.map((mov, index) => (
          <MovimientoCard 
            key={index}
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