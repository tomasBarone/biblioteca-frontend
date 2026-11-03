import React from 'react';
import {Link} from 'react-router-dom';
import './SalaGeneral.css';
import SeccionImagenParallax from '../../../components/SeccionImagenParallax/SeccionImagenParallax';
import fotoSalaGeneral from '../../../assets/Salas/hallInfinitaDeriva.jpg';
import fotoSalaGeneralSec from '../../../assets/Salas/infinita-deriva-hall-secundario.jpg';
import pausaCafe from '../../../assets/Salas/cafePausa.jpg';
import sede from '../../../assets/Salas/sedeSanIsidro.jpg';
import AccesosInstitucionales from '../../../components/AccesosInstitucionales/AccesosInstitucionales';
import fotoGarden from '../../../assets/Salas/garden2.jpg';

const accesosRelacionados = [
     {  titulo: 'LA PAUSA DEL CAFÉ & ESPACIO DE ESTUDIO',
         descripcion: 'Un momento de quietud para la reflexión y la conexión entre mente, cuerpo y espíritu.',
         link: 'salas/cafe',
         imagen: pausaCafe,
        },
    {
         titulo: 'SEDE SAN ISIDRO & HORARIOS',
         descripcion: 'Información sobre la ubicación de la sede, horarios de atención y servicios disponibles para los lectores.',
         link: '/salas/sede',
         imagen: sede,
       }
  ];

function SalaGeneral() {
    return (
        <div className="sala-general-page">
            {/* Reutilizar Componente Parallax Hero */}
            <SeccionImagenParallax
             imagenUrl={fotoSalaGeneral}
             subtitulo="sede san isidro"
             alt="Imagen de la Sala General"
             fullHeight={true}
            />
             
            {/* Contenido principal */}
            <section className="sala-content-container">
                <div className="infinita-deriva-fullwidth-card">
                    <h2 className="infinita-deriva-heading">SALAS GENERALES LECTURAS</h2>

                    <div className="infinita-deriva-frame-box">  
                        <p className="infinita-deriva-description">
                         El espacio principal de lectura de Infinita Deriva cumple un rol vital en la misión de 
                         fomentar el estudio de las corrientes literarias clásicas y contemporáneas. Sus colecciones 
                         de libre acceso, mesas de madera noble y luz focalizada ofrecen un entorno óptimo para la 
                         investigación prolongada. Como parte del sistema de archivos de la Sede San Isidro, la sala 
                         brinda acceso tanto a ejemplares físicos como a fuentes catalogadas para socios y visitantes.
                        </p>
                    </div>
                </div>

                {/* Segundo Parallax de transición */}
                <SeccionImagenParallax
                 imagenUrl={fotoSalaGeneralSec}
                 subtitulo="sede san isidro"
                 alt="Imagen secundaria de la Sala General"
                />
                
                <AccesosInstitucionales 
        tituloSeccion="SECCIONES RELACIONADAS"
        items={accesosRelacionados}
      />  


        <SeccionImagenParallax
             imagenUrl={fotoGarden}
             subtitulo="sede san isidro"
             alt="Imagen de la Sala General"
             
            />
              
                <div className="sala-details-box">
                    <h3 className="infinita-deriva-heading" style={{ fontSize: '0.95rem', marginBottom: '20px', marginLeft: '10%' }}>
                        PAUTAS DE CONVIVENCIA Y CONSULTA
                    </h3>
                    <p className="infinita-deriva-description" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 15px auto' }}>
                        <strong>Silencio Académico:</strong> Se solicita mantener los dispositivos en modo silencioso. Las conversaciones están reservadas para las áreas comunes externas.
                    </p>
                    <p className="infinita-deriva-description" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <strong>Utensilios de Estudio:</strong> Se permite el uso de ordenadores portátiles y toma de notas. El uso de marcadores o notas adhesivas tipo <em>post-it</em> está estrictamente prohibido sobre los libros del acervo.
                    </p>
                </div>

                {/* BOTÓN DE ACCIÓN */}
                <div className="sala-extra-info" style={{ textAlign: 'center', paddingBottom: '60px' }}>
                     <div className="action-wrapper">
                        <Link to="/pase-lector" className="btn-institutional">
                        SOLICITAR PASE LECTOR →
                        </Link>
                     </div>
                </div>
            </section>
        </div>
    );
}  

export default SalaGeneral;