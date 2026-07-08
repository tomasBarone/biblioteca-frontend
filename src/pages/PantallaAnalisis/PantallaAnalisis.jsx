import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import analisisService from '../../services/analisisService';
import './PantallaAnalisis.css'; 

function PantallaAnalisis() {
    const { id } = useParams(); // Captura el ID desde la URL de la ruta
    const navigate = useNavigate();
    
    const [analisis, setAnalisis] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCargando(true);
        analisisService.obtenerPorLibroId(id)
            .then(data => {
                setAnalisis(data);
                setCargando(false);
            })
            .catch(err => {
                setError("No se pudo cargar el análisis académico de esta obra.");
                setCargando(false);
            });
    }, [id]);

    if (cargando) return <div className="loading">Cargando análisis crítico...</div>;
    if (error) return <div className="error-msg">{error} <button onClick={() => navigate(-1)}>Volver</button></div>;

    return (
        <div className="analisis-layout">
            {/* Botón de retorno fluido gracias al historial del navegador */}
            <button className="btn-volver" onClick={() => navigate(-1)}>
                ← Volver al detalle del libro
            </button>

            <header className="analisis-header">
                <h1>Análisis Académico de la Obra</h1>
                <p className="subtitulo-libro">Libro en estudio: <strong>{analisis.libro}</strong></p>
            </header>

            {/* Bloque de Metadata Literaria (Variables Indexadas fijos) */}
            <div className="ficha-tecnica-academica">
                <h3>Ejes de Clasificación Teórica</h3>
                <div className="grid-metadata">
                    <div><strong>Sustrato Filosófico:</strong> {analisis.sustratoFilosofico}</div>
                    <div><strong>Eje Psicológico:</strong> {analisis.ejePsicologico}</div>
                </div>
            </div>

            {/* Contenido Extenso con formato pre-line */}
            <main className="analisis-contenido">
                <section className="bloque-texto">
                    <h2>1. Enfoque de Teoría Literaria</h2>
                    <p className="texto-format">{analisis.introduccionTeorica}</p>
                </section>

                <section className="bloque-texto">
                    <h2>2. El Mapa de Sensaciones de los Personajes</h2>
                    <p className="texto-format">{analisis.mapaSensaciones}</p>
                </section>
            </main>
        </div>
    );
}

export default PantallaAnalisis;