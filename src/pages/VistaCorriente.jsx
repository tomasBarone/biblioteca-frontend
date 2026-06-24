import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import libroService from '../services/libroService';
import corrienteLiterariaService from '../services/corrienteLiterariaService';

const VistaCorriente = () => {
    // 1. Capturamos el ID de la corriente desde la URL (Ej: /corriente/2)
    const { id } = useParams(); 
    
    const [libros, setLibros] = useState([]);
    const [corriente, setCorriente] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatosPantalla = async () => {
            setCargando(true);
            try {
                // Ejecutamos ambas peticiones en paralelo (Buena práctica de rendimiento)
                const [dataLibros, dataCorrientes] = await Promise.all([
                    libroService.getLibrosPorCorriente(id),
                    corrienteLiterariaService.obtenerTodos() // Para sacar la info de la cabecera
                ]);

                setLibros(dataLibros);
                
                // Buscamos los metadatos específicos de esta corriente (siglo, descripción, etc.)
                const corrienteActual = dataCorrientes.find(c => c.id.toString() === id);
                setCorriente(corrienteActual);
            } catch (error) {
                console.error("Error al cargar la corriente literaria:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarDatosPantalla();
    }, [id]); // Si el usuario salta de Barroco a Ilustración, el ID cambia y el useEffect se vuelve a ejecutar

    if (cargando) {
        return <div style={{ padding: '40px', textAlign: 'center', background: '#fcfaf2', minHeight: '100vh' }}>Cargando catálogo...</div>;
    }

    return (
        <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', margin: 0 }}>
            
            {/* HERO BLACK HEADER */}
            <div style={{ backgroundColor: '#0f0e0c', color: '#fcfaf2', padding: '60px 10%' }}>
                <Link to="/catalogo" style={{ color: '#a8a297', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '20px' }}>
                    ← Catálogo
                </Link>
                
                <p style={{ color: '#a8a297', fontSize: '0.9rem', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>
                    {corriente?.siglo || 'S. XVII'}
                </p>
                
                <h1 style={{ fontSize: '4.5rem', fontWeight: '400', margin: '0 0 16px 0', fontFamily: 'serif' }}>
                    {corriente?.nombre || 'Barroco'}
                </h1>
                
                <p style={{ color: '#e5dec9', fontSize: '1.2rem', fontStyle: 'italic', margin: 0, maxWidth: '600px', fontWeight: '300' }}>
                    {corriente?.descripcion || 'Ingenio, conceptismo y desengaño.'}
                </p>
            </div>

            {/* CUERPO DE TÍTULOS */}
            <div style={{ padding: '40px 10%' }}>
                <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#544f46', marginBottom: '30px', fontWeight: 'bold' }}>
                    {libros.length} {libros.length === 1 ? 'Título' : 'Títulos'}
                </p>

                {/* Grid de Cards Literarias */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '30px' }}>
                    {libros.map((libro) => (
                        /* ENLACE AL DETALLE: Envolvemos la tarjeta completa */
                        <Link 
                            key={libro.id} 
                            to={`/libro/${libro.id}`} 
                            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                                
                                {/* Simulador de Libro / Tapa Estética (con degradado sofisticado de la foto) */}
                                <div style={{ 
                                    background: 'linear-gradient(135deg, #44403c 0%, #292524 100%)', 
                                    height: '320px', 
                                    borderRadius: '4px', 
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
                                    marginBottom: '14px',
                                    position: 'relative'
                                }}>
                                    <span style={{ color: '#fcfaf2', fontSize: '0.75rem', opacity: 0.6, fontWeight: 'bold' }}>
                                        {libro.anioPublicacion || libro.ano || '1721'}
                                    </span>
                                    <h4 style={{ color: '#fcfaf2', fontSize: '1.3rem', margin: 0, fontWeight: '500', lineHeight: '1.3' }}>
                                        {libro.titulo}
                                    </h4>
                                    <span style={{ color: '#fcfaf2', fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>
                                        {libro.autor}
                                    </span>
                                </div>

                                {/* Metadatos inferiores */}
                                <span style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1917', marginBottom: '2px' }}>
                                    {libro.titulo}
                                </span>
                                <span style={{ fontSize: '0.8rem', color: '#70695d', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                                    {libro.autor}
                                </span>
                                <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#1a1917' }}>
                                    {libro.precio != null && typeof libro.precio === 'number' 
                                        ? libro.precio.toFixed(2) 
                                        : (Number(libro.precio) ? Number(libro.precio).toFixed(2) : "0.00")} €
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {libros.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px', color: '#70695d', fontStyle: 'italic' }}>
                        No hay obras registradas en esta corriente por el momento.
                    </div>
                )}
            </div>
        </div>
    );
};

export default VistaCorriente;