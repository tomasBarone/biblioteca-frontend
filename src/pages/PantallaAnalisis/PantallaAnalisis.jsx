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
    
    // Control dinámico del tamaño de fuente para lectura cómoda
    const [fontSize, setFontSize] = useState(1.05); // rem
    const [copiado, setCopiado] = useState(false);

    useEffect(() => {
        setCargando(true);
        analisisService.obtenerPorLibroId(id)
            .then(data => {
                setAnalisis(data);
                setCargando(false);
            })
            .catch(err => {
                setError("No se pudo cargar el ensayo o análisis académico para esta obra.");
                setCargando(false);
            });
    }, [id]);

    // Calcular tiempo estimado de lectura (promedio: 200 palabras/minuto)
    const calcularTiempoLectura = () => {
        if (!analisis) return 0;
        const textoTotal = `${analisis.introduccionTeorica || ''} ${analisis.mapaSensaciones || ''}`;
        const palabras = textoTotal.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(palabras / 200));
    };

    const copiarCita = () => {
        const cita = `Análisis académico de "${analisis.libro}". Sustrato: ${analisis.sustratoFilosofico}. Eje: ${analisis.ejePsicologico}. - Librería Albatros.`;
        navigator.clipboard.writeText(cita);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2500);
    };

    if (cargando) {
        return (
            <div className="analisis-status-container">
                <div className="analisis-spinner"></div>
                <p>Cargando ensayo académico...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="analisis-status-container error">
                <p className="error-msg">{error}</p>
                <button className="btn-volver-error" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
            </div>
        );
    }

    return (
        <div className="analisis-page-wrapper">
            <div className="analisis-container">
                
                {/* Barra superior de navegación y utilidades de lectura */}
                <div className="analisis-top-bar">
                    <button className="btn-volver" onClick={() => navigate(-1)}>
                        ← Volver al detalle del libro
                    </button>

                    <div className="controles-lectura">
                        <span className="lectura-label">Ajustar texto:</span>
                        <button 
                            className="btn-fontSize" 
                            onClick={() => setFontSize(prev => Math.max(0.9, prev - 0.1))}
                            title="Disminuir tamaño"
                        >
                            A-
                        </button>
                        <button 
                            className="btn-fontSize" 
                            onClick={() => setFontSize(prev => Math.min(1.35, prev + 0.1))}
                            title="Aumentar tamaño"
                        >
                            A+
                        </button>
                    </div>
                </div>

                {/* Encabezado Principal */}
                <header className="analisis-header">
                    <div className="badge-academico">Estudio Crítico</div>
                    <h1>{analisis.libro}</h1>
                    <div className="analisis-meta-info">
                        <span>⏱️ Lectura estimada: {calcularTiempoLectura()} min</span>
                        <span>•</span>
                        <button className="btn-copiar-cita" onClick={copiarCita}>
                            {copiado ? "✓ Cita copiada" : "📋 Copiar cita académica"}
                        </button>
                    </div>
                </header>

                {/* Ficha Técnica / Metadata Literaria */}
                <div className="ficha-tecnica-academica">
                    <h3 className="ficha-titulo">Ejes de Clasificación Teórica</h3>
                    <div className="grid-metadata">
                        <div className="card-metadata">
                            <span className="metadata-label">Sustrato Filosófico</span>
                            <span className="metadata-valor">{analisis.sustratoFilosofico || 'No especificado'}</span>
                        </div>
                        <div className="card-metadata">
                            <span className="metadata-label">Eje Psicológico</span>
                            <span className="metadata-valor">{analisis.ejePsicologico || 'No especificado'}</span>
                        </div>
                    </div>
                </div>

                {/* Contenido Extenso */}
                <main className="analisis-contenido" style={{ fontSize: `${fontSize}rem` }}>
                    {analisis.introduccionTeorica && (
                        <section className="bloque-texto">
                            <h2>1. Enfoque de Teoría Literaria</h2>
                            <p className="texto-format">{analisis.introduccionTeorica}</p>
                        </section>
                    )}

                    {analisis.mapaSensaciones && (
                        <section className="bloque-texto">
                            <h2>2. El Mapa de Sensaciones de los Personajes</h2>
                            <p className="texto-format">{analisis.mapaSensaciones}</p>
                        </section>
                    )}
                </main>

                {/* Footer del Ensayo */}
                <footer className="analisis-footer">
                    <p>Análisis generado para el catálogo especializado de <strong>Librería Albatros</strong>.</p>
                </footer>

            </div>
        </div>
    );
}

export default PantallaAnalisis;