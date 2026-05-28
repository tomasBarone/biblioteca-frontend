import React from 'react';
import MenuOverlay from './components/MenuOverlay/MenuOverlay';
import LibroCard from './components/LibroCard/LibroCard';
import Hero from './components/Hero/Hero'; 

function App() {

  const librosRecomendados = [
    {id: 1, titulo: "Los Hermanos Karamazov", autor: "Fyodor Dostoevsky", precio: 1500, generoNombre: "Realismo Mágico"},
    {id: 2, titulo: "El Proceso", autor: "Franz Kafka", precio: 1200, generoNombre: "Narrativo"},
    {id: 3, titulo: "El Retrato de Dorian Gray", autor: "Oscar Wilde", precio: 1100, generoNombre: "Narrativo"},
    {id: 4, titulo: "Matar a un Ruiseñor", autor: "Harper Lee", precio: 1300, generoNombre: "Ficción"},
    {id: 5, titulo: "La Divina Comedia", autor: "Dante Alighieri", precio: 1400, generoNombre: "Poema"}
  ]

  return (
    

    <div>
      <MenuOverlay />

      <Hero/>

      <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style= {{color: '#ffffff', marginBottom: '24px', fontSize: '1.8rem' }}>Libros Recomendados</h2>

        <div style= {{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px' 
        }}>
          
          {librosRecomendados.map(libro => (
            <LibroCard 
              key={libro.id}
              titulo={libro.titulo}
              autor={libro.autor}
              precio={libro.precio}
              generoNombre={libro.generoNombre}
            />
          ))}
        </div>
        </main>
      </div> 
  );
}

export default App;