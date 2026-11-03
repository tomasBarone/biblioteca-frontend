import React from 'react';
import { Link } from 'react-router-dom';
import SeccionImagenParallax from '../../../components/SeccionImagenParallax/SeccionImagenParallax';
import fotoCafe from '../../../assets/Salas/cafePausa.jpg'; 
import fotoCafe2 from '../../../assets/Salas/pausaDelCafePic.jpg';
import seccionCafe from '../../../assets/Salas/coffe2.jpg';
import './SalaCafe.css';

function SalaCafe() {
    return (
        <div className="sala-cafe-page">
           
            <SeccionImagenParallax
             imagenUrl={fotoCafe}
            
             fullHeight={true}
            />
             
            {/* contenido principal  */}


            
            <section className="sala-content-container">
                <div className="infinita-deriva-fullwidth-card">
                <h2 className="infinita-deriva-heading">La Pausa Del Cafe</h2>

                  <div className="infinita-deriva-frame-box">  
                      <p className="infinita-deriva-description">
                        La calma mental o en sanscrito samatha, es una necesidad para encontrar armonia entre mente, cuerpo y espiritu. La pausa del café nos invita a parar un momento, a respirar y a disfrutar de un tiempo que invite a la quietud y reflexión.
                     </p>
                    </div>
                </div>

                      <SeccionImagenParallax
             imagenUrl={fotoCafe2}
            
             
            />
            

              <div className="infinita-deriva-fullwidth-card">
                <h2 className="infinita-deriva-heading">ENCUENTRO E INTERCAMBIO</h2>

                  <div className="infinita-deriva-frame-box">  
                      <p className="infinita-deriva-description">
                            El Gabinete y Café de Lectores está concebido como un espacio de distensión y debate académico para los socios e investigadores de la Sede San Isidro. Provisto de máquinas de café, fuentes de agua purificada y áreas de descanso, es el único sector habilitado dentro del complejo para el consumo de alimentos ligeros y la conversación relajada entre colegas.
                     </p>
                    </div>
                </div>

          

      <SeccionImagenParallax
             imagenUrl={seccionCafe}
            
             
            />

   
                {/* Bloque de normativas del espaci */}
                <div className="sala-details-box" style={{ padding: '60px 10%', backgroundColor: '#fcfaf2', textAlign: 'center' }}>
                  <h3 className="infinita-deriva-heading" style={{ fontSize: '0.95rem', marginBottom: '25px' }}>
                        NORMAS DEL GABINETE
                    </h3>
                    <p className="infinita-deriva-description" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 15px auto' }}>
                        <strong>Alimentos y Bebidas:</strong> El consumo de refrigerios y infusiones se encuentra estipulado exclusivamente dentro de este gabinete o en la piazzetta externa, prohibiéndose su ingreso a las salas de lectura[cite: 10].
                    </p>
                    <p className="infinita-deriva-description" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <strong>Uso de Dispositivos:</strong> A diferencia de las salas de silencio académico, el uso de telefonía móvil y las conversaciones moderadas están permitidas y habilitadas en este sector.
                    </p>
                </div>

                {/* Botón de acción */}
                <div className="sala-extra-info" style={{ textAlign: 'center', paddingBottom: '85px', backgroundColor: '#fcfaf2' }}>
                     <div className="action-wrapper">
                        <Link to="/salas" className="btn-institutional">
                        ← VOLVER A SEDE Y SALAS
                        </Link>
                     </div>
                </div>
            </section>
        </div>
    );
}

export default SalaCafe;