import React from 'react';
import Hero from '../components/Hero/Hero';
import MovimientoSection from '../components/MovimientoCard/MovimientoSection';
import { Recomendados } from '../components/Recomendados/Recomendados';
import SeccionImagenParallax from '../components/SeccionImagenParallax/SeccionImagenParallax';
import AccesosInstitucionales from '../components/AccesosInstitucionales/AccesosInstitucionales';


import fotoHero from '../assets/libreriaHero.jpg';
import fotoHero2 from '../assets/homeFoto2.jpg';
import garden from '../assets/garden.jpg';
import personal from '../assets/Salas/personal.jpg';
import papers from '../assets/Salas/papers.jpg';

//fotos bloque 1
import fotoGeneral from '../assets/Salas/hallInfinitaDeriva.jpg';
import pausaCafe from '../assets/Salas/cafePausa.jpg';
import paseLector from '../assets/Salas/estanterias.jpg';

//fotos bloque 2
import manuscritos from '../assets/Salas/manuscritos.jpg';
import reglamento from '../assets/Salas/fondo.jpg';
import sede from '../assets/Salas/sedeSanIsidro.jpg';

// bloque 1: Servicios principales 
  const serviciosPrincipales = [
    {
      titulo: 'SALAS & SEDE SAN ISIDRO',
      descripcion: 'Consulta las instalaciones de la Sede, horarios de atención presencial y las salas generales de estudio.',
      link: 'salas/generales',
      imagen: fotoGeneral,
    },
    {
      titulo: 'PASE LECTOR & ACREDITACIÓN',
      descripcion: 'Conoce los requisitos para tramitar la credencial oficial de lector, el reglamento de préstamos y la consulta en sala.',
      link: '/pase-lector',
      imagen: paseLector,
    },
    {
      titulo: 'LA PAUSA DEL CAFÉ & ESPACIO DE ESTUDIO',
      descripcion: 'Un momento de quietud para la reflexión y la conexión entre mente, cuerpo y espíritu.',
      link: 'salas/cafe',
      imagen: pausaCafe,
    }
  ];

  const normativasYArchivo = [
    {
      titulo: 'FONDOS & MANUSCRITOS RAROS',
      descripcion: 'Acceso a colecciones especiales, documentos de archivo y reserva de fuentes primarias para investigadores.',
      link: '/pase-lector/manuscritos',
      imagen: manuscritos,
    },
    {
      titulo: 'REGLAMENTO DE PRÉSTAMOS',
      descripcion: 'Bases y condiciones sobre la consulta en sala, carritos de devolución y políticas de uso del acervo.',
      link: '/pase-lector/reglamento',
      imagen: reglamento,
    },
    {
      titulo: 'SEDE SAN ISIDRO & HORARIOS',
      descripcion: 'Información sobre la ubicación de la sede, horarios de atención y servicios disponibles para los lectores.',
      link: '/salas/sede',
      imagen: sede,
    }
  ];

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

      <AccesosInstitucionales
      tituloSeccion="SERVICIOS & RECURSOS ACADÉMICOS"
        items={serviciosPrincipales} />

      <SeccionImagenParallax 
        imagenUrl={personal}
      />

      <AccesosInstitucionales
        tituloSeccion="NORMATIVA & FONDOS RESERVADOS"
        items={normativasYArchivo} />

         <SeccionImagenParallax 
        imagenUrl={papers}
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