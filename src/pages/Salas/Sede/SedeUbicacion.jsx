import React from 'react';
import { Link } from 'react-router-dom';
import SeccionImagenParallax from '../../../components/SeccionImagenParallax/SeccionImagenParallax';
import fotoSede from '../../../assets/Salas/sedeSanIsidro.jpg'
import garden from '../../../assets/Salas/garden2.jpg'
import view from '../../../assets/Salas/infinitaDeriva.jpg'
import backGarden from '../../../assets/Salas/infinita-deriva-back.jpg'
import './SedeUbicacion.css'

function SedeUbicacion(){
    return(
        <div className="sede-page-container">
          {/* banner parallax */}
          <SeccionImagenParallax
             imagenUrl={fotoSede}
             subtitulo="Institucional"
             titulo="SEDE SAN ISIDRO"
             fullHeight={true}
          />
           
           {/* contenido principal  */}
          <section className="sede-content-container">
             <div className="infinita-deriva-fullwidth-card">
                <h2 className="infinita-deriva-heading">INFORMACIÓN PRÁCTICA & SEDE</h2>

                <div className="infinita-deriva-frame-box"> 
                    <h3 className="sede-subheading">Horarios de Atención Presencial</h3>
                    <p className="infinita-deriva-description" style={{ textAlign: 'center' }}>
                        <strong>Lunes a Viernes:</strong> 09:00 a 19:00 hs.<br />
                        <strong>Sábados:</strong> 10:00 a 14:00 hs (exclusivo para consulta en sala con reserva previa).
                    </p>
                    <p className="infinita-deriva-description" style={{ marginTop: '20px', textAlign: 'center', color: '#70695d', fontSize: '0.9rem' }}>
                        <em>Nota Institucional:</em> La Sede San Isidro permanece cerrada al público durante todo el mes de enero por tareas de preservación del acervo, así como durante los feriados nacionales de la República Argentina y los recesos administrativos de invierno.
                    </p>
                </div>
             </div>


            <SeccionImagenParallax imagenUrl={view}/>
           
            {/* bloque secundario */}
            <div className="sede-secondary-section">
             <div className="sede-info-box">
                <h4 className="sede-subheading">Orientación en Sala y Archivo</h4>
                <p className="infinita-deriva-description" style={{ textAlign: 'center' }}>
                    Para acceder a los fondos de reserva especial o ubicar ejemplares en las estanterías de libre acceso, solicite la guía impresa o asistencia en el mostrador principal de recepción.
                </p>
                <div className="sede-action-wrapper">
                    <Link to="/salas/generales" className="btn-institutional">
                    ← VOLVER A SALAS DE LECTURA
                    </Link>
                </div>
             </div>
            </div>

            <SeccionImagenParallax imagenUrl={backGarden}/>

          </section>
        </div>
    );
}

export default SedeUbicacion;