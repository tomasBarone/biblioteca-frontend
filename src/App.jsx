import React from 'react';
import MenuOverlay from './components/MenuOverlay/MenuOverlay';
import LibroCard from './components/LibroCard/LibroCard';
import Hero from './components/Hero/Hero'; 
import CatalogoLibros from './components/CatalogoLibros';

function App() {
  
  /*
  LIBROS HARDCODEADOS PARA PRUEBAS INICIALES, REEMPLAZAR POR LLAMADA REAL AL BACKEND
  const librosRecomendados = [
    {id: 1, titulo: "Los Hermanos Karamazov", autor: "Fyodor Dostoevsky", precio: 1500, generoNombre: "Realismo Mágico"},
    {id: 2, titulo: "El Proceso", autor: "Franz Kafka", precio: 1200, generoNombre: "Narrativo"},
    {id: 3, titulo: "El Retrato de Dorian Gray", autor: "Oscar Wilde", precio: 1100, generoNombre: "Narrativo"},
    {id: 4, titulo: "Matar a un Ruiseñor", autor: "Harper Lee", precio: 1300, generoNombre: "Ficción"},
    {id: 5, titulo: "La Divina Comedia", autor: "Dante Alighieri", precio: 1400, generoNombre: "Poema"}
  ]
*/


  return (

    <div>
      {/*Menu overlay a pantalla completa*/}
      <MenuOverlay />

      {/*Banner Principal*/}
      <Hero/>

      {/*Catálogo de libros*/}
      <CatalogoLibros/>
      </div> 
  );
}

export default App;