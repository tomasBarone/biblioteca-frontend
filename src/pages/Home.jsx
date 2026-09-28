import React from 'react';
import Hero from '../components/Hero/Hero';
import MovimientoSection from '../components/MovimientoCard/MovimientoSection';
import { Recomendados } from '../components/Recomendados/Recomendados';
import SeccionImagenParallax from '../components/SeccionImagenParallax/SeccionImagenParallax';

import fotoHero from '../assets/libreriaHero.jpg';
import fotoHero2 from '../assets/homeFoto2.jpg';
import garden from '../assets/garden.jpg';

function Home({ onOpenSearch }) {
  return (
    <main className="home-page">
      {/* Pasa el disparador al componente Hero */}
      <Hero onOpenSearch={onOpenSearch} />

      {/* Imagen fija / Parallax */}
      <SeccionImagenParallax 
        imagenUrl={fotoHero}
        subtitulo="Archivo Académico"
      />

      {/* Sección de Movimientos */}
      <MovimientoSection />

      {/* Segunda imagen fija / Parallax */}
      <SeccionImagenParallax 
        imagenUrl={fotoHero2}
      />

      {/* Sección de Recomendados */}
      <Recomendados />

      <SeccionImagenParallax 
        imagenUrl={garden}
      />
    </main>
  );
}

export default Home;