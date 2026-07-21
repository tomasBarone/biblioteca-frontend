import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import analisisService from '../../services/analisisService';
import './PantallaAnalisis.css';

function PantallaAnalisis() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [analisis, setAnalisis] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [fontSize, setFontSize] = useState(1.05);

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

    const calcularTiempoLectura = () => {
        if (!analisis) return 0;
        const textoTotal = `${analisis.introduccionTeorica || ''} ${analisis.mapaSensaciones || ''}`;
        const palabras = textoTotal.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(palabras / 200));
    };

    /**
     * Parser de Markdown Liviano:
     * Convierte texto con formato **negrita** en etiquetas <strong> estructuradas y separadas por párrafos.
     */
    const parseMarkdownText = (texto) => {
        if (!texto) return null;

        return texto.split('\n').map((parrafo, idxParrafo) => {
            if (!parrafo.trim()) return null;

            const partes = parrafo.split(/(\*\*.*?\*\*)/g);

            return (
                <p key={idxParrafo} className="parrafo-analisis">
                    {partes.map((parte, idxParte) => {
                        if (parte.startsWith('**') && parte.endsWith('**')) {
                            const textoContenido = parte.slice(2, -2);
                            return (
                                <strong key={idxParte} className="keyword-highlight">
                                    {textoContenido}
                                </strong>
                            );
                        }
                        return parte;
                    })}
                </p>
            );
        });
    };

    if (cargando) return <div className="analisis-loading">Cargando ensayo académico...</div>;
    if (error) return <div className="analisis-error">{error} <button onClick={() => navigate(-1)}>Volver</button></div>;

    return (
        <div className="analisis-hero-wrapper">
            
            {/* Imagen fija al fondo de la pantalla */}
            <div className="analisis-hero-bg">
                <button className="btn-volver-floating" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
            </div>

            {/* Espaciador transparente */}
            <div className="analisis-hero-spacer" />

            {/* Pliego Blanco que sube y tapa todo el ancho al hacer scroll */}
            <div className="analisis-sheet-container">
                <div className="analisis-content-inner">
                    
                    {/* Header del Ensayo */}
                    <header className="analisis-header-academic">
                        <span className="academic-tag">Estudio Crítico</span>
                        <h1 className="analisis-main-title">{analisis.libro}</h1>
                        
                        <div className="analisis-meta-bar">
                            <span>⏱️ Lectura estimada: {calcularTiempoLectura()} min</span>
                            <div className="controles-zoom">
                                <span>Texto:</span>
                                <button onClick={() => setFontSize(p => Math.max(0.9, p - 0.1))}>A-</button>
                                <button onClick={() => setFontSize(p => Math.min(1.3, p + 0.1))}>A+</button>
                            </div>
                        </div>
                    </header>

                    {/* Ficha de ejes / Cuadro Harvard */}
                    <div className="ficha-tecnica-harvard">
                        <h3 className="ficha-harvard-title">Ejes de Clasificación Teórica</h3>
                        <div className="grid-harvard-metadata">
                            <div className="item-harvard">
                                <strong>Sustrato Filosófico</strong>
                                <div>{parseMarkdownText(analisis.sustratoFilosofico) || 'No especificado'}</div>
                            </div>
                            <div className="item-harvard border-left">
                                <strong>Eje Psicológico</strong>
                                <div>{parseMarkdownText(analisis.ejePsicologico) || 'No especificado'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Texto del ensayo con Parser de Markdown */}
                    <main className="analisis-body-text" style={{ fontSize: `${fontSize}rem` }}>
                        {analisis.introduccionTeorica && (
                            <section className="bloque-academico">
                                <h2>1. Enfoque de Teoría Literaria</h2>
                                <div className="contenedor-parrafos">
                                    {parseMarkdownText(analisis.introduccionTeorica)}
                                </div>
                            </section>
                        )}

                        {analisis.mapaSensaciones && (
                            <section className="bloque-academico">
                                <h2>2. El Mapa de Sensaciones de los Personajes</h2>
                                <div className="contenedor-parrafos">
                                    {parseMarkdownText(analisis.mapaSensaciones)}
                                </div>
                            </section>
                        )}
                    </main>

                    <footer className="analisis-footer-editorial">
                        <p>Librería Albatros — Archivo de Análisis Académicos</p>
                    </footer>

                </div>
            </div>
        </div>
    );
}

export default PantallaAnalisis;