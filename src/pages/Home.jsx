import React from 'react';
import Hero from '../components/Hero/Hero';
import MovimientoSection from '../components/MovimientoCard/MovimientoSection';
import { Recomendados } from '../components/Recomendados/Recomendados';
import SeccionImagenParallax from '../components/SeccionImagenParallax/SeccionImagenParallax';


import fotoHero from '../assets/libreriaHero.jpg';
import fotoHero2 from '../assets/homeFoto2.jpg';

function Home() {
  return (
    <main className="home-page">
      {/* 1. Tu Hero tal cual como está definido */}
      <Hero />

      {/* 2. Primera imagen fijada / Parallax */}
      <SeccionImagenParallax 
        imagenUrl={fotoHero}
        subtitulo="Archivo Académico"
        
      />

      {/* 3. Tu sección de Movimientos intacta */}
      <MovimientoSection />

      {/* 4. Segunda imagen fijada / Parallax */}
      <SeccionImagenParallax 
        imagenUrl={fotoHero2}
      />

      {/* 5. Tu sección de Recomendados intacta */}
      <Recomendados />
    </main>
  );
}

export default Home;