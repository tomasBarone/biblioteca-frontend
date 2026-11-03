import React from 'react';
import { Link } from 'react-router-dom';
import SeccionImagenParallax from '../../../components/SeccionImagenParallax/SeccionImagenParallax';
import fotoInvestigacion from '../../../assets/Salas/infinita-deriva-mesas-silenciosas.jpg'; 
import './SalaInvestigacion.css';

function SalaInvestigacion() {
    return (
        <div className="sala-investigacion-page">
            {/* Banner Parallax Principal Fullscreen */}
            <SeccionImagenParallax
             imagenUrl={fotoInvestigacion}
             subtitulo="sede san isidro"
             titulo="MESAS DE INVESTIGACIÓN"
             fullHeight={true}
            />
             
            {/* contenido principal */}
         <section className="sala-content-container">
            <div className="infinita-deriva-fullwidth-card">
                 <h2 className="infinita-deriva-heading">ESTUDIO ACADÉMICO Y RESERVA ESPECIAL</h2>

                <div className="infinita-deriva-frame-box">  
                     <p className="infinita-deriva-description">
                            Las Mesas de Investigación Silenciosa están destinadas a investigadores acreditados, académicos y estudiantes avanzados que requieren un espacio reservado para el análisis de fuentes primarias, manuscritos y colecciones especiales. Dotadas de iluminación focal de alta precisión y puestos de trabajo aislados, garantizan el rigor necesario para proyectos editoriales y de investigación de larga duración.
                        </p>
                </div>
                </div>

                {/* Bloque de pautas específicas inspirado en el rigor de archivos */}
                <div className="sala-details-box" style={{ padding: '60px 10%', backgroundColor: '#fcfaf2', textAlign: 'center' }}>
                    <h3 className="infinita-deriva-heading" style={{ fontSize: '0.95rem', marginBottom: '25px' }}>
                        CONDICIONES DE ACCESO Y RESERVA
                    </h3>
                    <p className="infinita-deriva-description" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 15px auto' }}>
                        <strong>Acreditación Previa:</strong> El uso de este sector requiere contar con un Pase Lector activo de categoría Investigador o haber tramitado la autorización de acceso a colecciones especiales.
                    </p>
                    <p className="infinita-deriva-description" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <strong>Solicitud de Materiales:</strong> Los ejemplares de archivo y reserva deben solicitarse con un mínimo de veinticuatro horas hábiles de anticipación para su correcta preservación y entrega en sala.
                    </p>
                </div>

               
                <div className="sala-extra-info" style={{ textAlign: 'center', paddingBottom: '85px', backgroundColor: '#fcfaf2' }}>
                     <div className="action-wrapper">
                        <Link to="/pase-lector" className="btn-institutional">
                        SOLICITAR ACCESO A INVESTIGACIÓN →
                        </Link>
                     </div>
                </div>
            </section>
        </div>
    );
}

export default SalaInvestigacion;