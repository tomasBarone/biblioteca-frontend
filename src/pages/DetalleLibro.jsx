import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import libroService from '../services/libroService';

const DetalleLibro = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [libro, setLibro] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [errorImagen, setErrorImagen] = useState(false);

    useEffect(() => {
        const obtenerDatosLibro = async () => {
            setCargando(true);
            try {
                const data = await libroService.obtenerPorId(id); 
                setLibro(data);
                setErrorImagen(false);
            } catch (error) {
                console.error("Error al cargar el detalle del libro:", error);
            } finally {
                setCargando(false);
            }
        };
        obtenerDatosLibro();
    }, [id]);

    if (cargando) {
        return <div style={{ padding: '60px', textAlign: 'center', background: '#fcfaf2', minHeight: '100vh', fontFamily: 'serif' }}>Cargando obra...</div>;
    }

    if (!libro) {
        return <div style={{ padding: '60px', textAlign: 'center', background: '#fcfaf2', minHeight: '100vh', fontFamily: 'serif' }}>Obra no encontrada.</div>;
    }

    const mostrarImagenReal = Boolean(libro.imagenUrl) && !errorImagen;
    const tieneStock = libro.ejemplares > 0;

    return (
        <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', padding: '40px 10%', color: '#1a1917' }}>
            
            {/* BREADCRUMB */}
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#70695d', marginBottom: '40px' }}>
                <Link to="/catalogo" style={{ color: '#70695d', textDecoration: 'none' }}>CATÁLOGO</Link> 
                <span style={{ margin: '0 8px' }}>/</span> 
                <span>{libro.corrienteNombre || 'VANGUARDISMO'}</span>
                <span style={{ margin: '0 8px' }}>/</span>
                <span>{libro.generoNombre} ({libro.subgeneroNombre})</span>
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 420px) 1fr', gap: '60px', alignItems: 'start' }}>
                
                {/* PORTADA */}
                <div style={{ 
                    position: 'relative',
                    height: '560px', 
                    borderRadius: '4px', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    overflow: 'hidden'
                }}>
                    {mostrarImagenReal ? (
                        <img 
                            src={libro.imagenUrl} 
                            alt={`Portada de ${libro.titulo}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                            onError={() => setErrorImagen(true)}
                        />
                    ) : (
                        <div style={{
                            background: 'linear-gradient(135deg, #44403c 0%, #292524 100%)',
                            width: '100%',
                            height: '100%',
                            padding: '30px',
                            boxSizing: 'border-box',
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <span style={{ color: '#fcfaf2', fontSize: '0.85rem', opacity: 0.6, fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
                                    {libro.anioPublicacion}
                                </span>
                                <h2 style={{ color: '#fcfaf2', fontSize: '2.2rem', margin: 0, fontWeight: '400', lineHeight: '1.2' }}>
                                    {libro.titulo}
                                </h2>
                            </div>
                            <span style={{ color: '#fcfaf2', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8, fontWeight: 'bold' }}>
                                {libro.autor}
                            </span>
                        </div>
                    )}
                </div>

                {/* COLUMNA DETALLES */}
                <div style={{ padding: '10px 0' }}>
                    <span style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '6px' }}>
                        {libro.corrienteNombre} · {libro.anioPublicacion}
                    </span>
                    
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '400', margin: '0 0 8px 0', lineHeight: '1.1' }}>
                        {libro.titulo}
                    </h1>
                    
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '500', color: '#544f46', margin: '0 0 25px 0' }}>
                        {libro.autor}
                    </h3>

                    <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#1a1917', marginBottom: '30px', maxWidth: '650px' }}>
                        {libro.sinopsis && libro.sinopsis.length > 5 ? libro.sinopsis : 'Sin descripción disponible para esta edición.'}
                    </p>

                    {/* TARJETA DESTACADA: ANÁLISIS ACADÉMICO */}
                    <div style={{
                        backgroundColor: '#efebe0',
                        borderLeft: '4px solid #5c3a21',
                        padding: '18px 22px',
                        borderRadius: '4px',
                        marginBottom: '35px',
                        maxWidth: '650px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                            <div>
                                <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#70695d', fontWeight: 'bold', display: 'block' }}>
                                    RECURSO ACADÉMICO
                                </span>
                                <span style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1917', display: 'block', marginTop: '2px' }}>
                                    Análisis filosófico, estructura y guía de lectura
                                </span>
                            </div>
                            <button 
                                onClick={() => navigate(`/libro/${libro.id}/analisis`)}
                                style={{
                                    backgroundColor: '#5c3a21',
                                    color: '#fcfaf2',
                                    border: 'none',
                                    padding: '10px 18px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Ver Análisis
                            </button>
                        </div>
                    </div>

                    {/* METADATOS TÉCNICOS */}
                    <div style={{ borderTop: '1px solid #e5dec9', borderBottom: '1px solid #e5dec9', padding: '15px 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '4px' }}>Género</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>{libro.generoNombre}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '4px' }}>Subgénero</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>{libro.subgeneroNombre}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '4px' }}>Año</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>{libro.anioPublicacion}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '4px' }}>ISBN</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>{libro.isbn}</span>
                        </div>
                    </div>

                    {/* PRECIO Y STOCK */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '400' }}>
                            $ {Number(libro.precio).toLocaleString('es-AR')}
                        </span>
                        <span style={{
                            fontSize: '0.8rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: tieneStock ? '#2e7d32' : '#c62828',
                            fontWeight: 'bold'
                        }}>
                            {tieneStock ? `✓ EN STOCK (${libro.ejemplares} unidades)` : '✕ SIN STOCK'}
                        </span>
                    </div>

                    {/* BOTONES DE COMPRA Y NAVEGACIÓN */}
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <button
                            disabled={!tieneStock}
                            style={{
                                backgroundColor: tieneStock ? '#5c3a21' : '#a39e93',
                                color: '#fcfaf2',
                                border: 'none',
                                padding: '14px 28px',
                                borderRadius: '30px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                cursor: tieneStock ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'background-color 0.2s ease'
                            }}
                            onClick={() => {
                                console.log("Añadido al carrito:", libro.id);
                            }}
                        >
                            🛒 AÑADIR AL CARRITO
                        </button>

                        <button
                            disabled={!tieneStock}
                            style={{
                                backgroundColor: 'transparent',
                                color: tieneStock ? '#1a1917' : '#a39e93',
                                border: `1px solid ${tieneStock ? '#1a1917' : '#a39e93'}`,
                                padding: '14px 28px',
                                borderRadius: '30px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                cursor: tieneStock ? 'pointer' : 'not-allowed',
                                transition: 'all 0.2s ease'
                            }}
                            onClick={() => navigate('/checkout', { state: { libro, cantidad: 1 } })}
                        >
                            COMPRAR AHORA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleLibro;