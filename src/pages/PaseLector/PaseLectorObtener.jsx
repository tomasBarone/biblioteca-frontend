import React from 'react';
import {Link} from 'react-router-dom';
import SeccionImagenParallax from '../../components/SeccionImagenParallax/SeccionImagenParallax';
import fotoPaseLector from '../../assets/Salas/estanterias.jpg';
import './PaseLectorObtener.css';


function PaseLectorObtener(){

    return(

   <div className="pase-page-container">

    <SeccionImagenParallax
                imagenUrl={fotoPaseLector}
                subtitulo="Acreditación"
               titulo="¿CÓMO OBTENER EL PASE LECTOR?"
                fullHeight={true}
            />

    <section className="pase-content-container">
        <div className="infinita-deriva-fullwidth-card">
            <h2 className="infinita-deriva-heading">PROCESO DE ACREDITACIÓN INSTITUCIONAL</h2>
<div className="infinita-deriva-frame-box">  
                        <p className="infinita-deriva-description" style={{ marginBottom: '20px' }}>
                            El Pase Lector es la credencial oficial que otorga derechos de acceso a la Sede San Isidro, préstamo domiciliario de ejemplares y reserva de puestos de estudio en las salas de lectura[cite: 13].
                        </p>
                        <p className="infinita-deriva-description">
                            <strong>Proceso de solicitud en tres etapas:</strong><br />
                            <strong>1. Registro online:</strong> Complete el formulario de inscripción con sus datos académicos y de contacto[cite: 7]. Se recomienda iniciar el trámite al menos cinco días hábiles antes de su primera visita prevista[cite: 5].<br />
                            <strong>2. Aprobación del Legajo:</strong> El comité de archivo evaluará su solicitud y emitirá su habilitación de lector asociado[cite: 7].<br />
                            <strong>3. Emisión de Credencial:</strong> Retire su credencial física presentándose en el mostrador de recepción de la Sede San Isidro[cite: 8].
                        </p>
                    </div>

           </div>

           
</section>
   </div>

    )

}


export default PaseLectorObtener;