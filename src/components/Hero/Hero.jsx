import React from 'react';
import './Hero.css';

function Hero(){

  return(
    
    <header className="hero-container">
        <div className="hero-content">
            <h1 className="hero-title">Explora el Universo de la Literatura</h1>
            <p className="hero-subtitle">
                 Sumérgete en un mundo de conocimiento, imaginación y cultura con nuestra amplia colección de libros. Desde los clásicos atemporales hasta las obras contemporáneas más innovadoras, nuestra biblioteca es tu puerta de entrada a un universo literario sin límites. Descubre nuevas perspectivas, amplía tus horizontes y encuentra tu próxima gran lectura con nosotros.
            </p>
            <div className="hero-buttons">
                <a href="#catalogo" className="btn-primary">Ver Catalogo</a>
                <a href="#buscar" className="btn-secondary">Busqueda Avanzada</a>
            </div>   
         </div>
    </header>


  );


}

export default Hero;