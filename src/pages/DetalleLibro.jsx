import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import libroService from '../services/libroService';

const DetalleLibro = () => {
    const { id } = useParams(); // Captura el ID desde la URL (Ej: /libro/15)
    const [libro, setLibro] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDatosLibro = async () => {
            setCargando(true);
            try {
                // Aquí usamos tu servicio que pega a tu endpoint de Spring Boot (ej: GET /api/libros/{id})
                const data = await libroService.obtenerPorId(id); 
                console.log("Datos del libro obtenidos:", data); // Para depuración
                setLibro(data);
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

    return (
        <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', padding: '40px 10%', color: '#1a1917' }}>
            
           
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#70695d', marginBottom: '40px' }}>
                <Link to="/catalogo" style={{ color: '#70695d', textDecoration: 'none' }}>CATÁLOGO</Link> 
                <span style={{ margin: '0 8px' }}>/</span> 
                {/* Asumiendo que tu DTO trae el objeto o nombre de la corriente */}
                <Link to={`/corriente/${libro.corrienteId || ''}`} style={{ color: '#70695d', textDecoration: 'none' }}>
                    {libro.nombreCorriente || 'ILUSTRACIÓN'}
                </Link>
            </div>

            {/* CONTENEDOR PRINCIPAL: DOS COLUMNAS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 420px) 1fr', gap: '60px', alignItems: 'start' }}>
                
                {/* COLUMNA IZQUIERDA: DISEÑO DE LA TAPA */}
                <div style={{ 
                    background: 'linear-gradient(135deg, #44403c 0%, #292524 100%)', // Simulación del degradado sutil de la foto
                    height: '560px', 
                    borderRadius: '4px', 
                    padding: '30px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    position: 'relative'
                }}>
                    <div>
                        <span style={{ color: '#fcfaf2', fontSize: '0.85rem', opacity: 0.6, fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
                            {libro.anioPublicacion || libro.ano || '1721'}
                        </span>
                        <h2 style={{ color: '#fcfaf2', fontSize: '2.2rem', margin: 0, fontWeight: '400', lineHeight: '1.2' }}>
                            {libro.titulo}
                        </h2>
                    </div>
                    <span style={{ color: '#fcfaf2', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8, fontWeight: 'bold' }}>
                        {libro.autor}
                    </span>
                </div>

                {/* COLUMNA DERECHA: INFORMACIÓN DETALLADA */}
                <div style={{ paddingWrap: '10px' }}>
                    <span style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '6px' }}>
                        {libro.nombreCorriente || 'ILUSTRACIÓN'} · {libro.anioPublicacion || libro.ano || '1721'}
                    </span>
                    
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '400', margin: '0 0 8px 0', lineHeight: '1.1' }}>
                        {libro.titulo}
                    </h1>
                    
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '500', color: '#544f46', margin: '0 0 35px 0' }}>
                        {libro.autor}
                    </h3>

                    <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#1a1917', marginBottom: '40px', maxWidth: '650px', fontWeight: 'normal' }}>
                        {libro.sinopsis || 'Sin sinopsis disponible.'}
                    </p>

                    {/* TABLA DE METADATOS TÉCNICOS */}
                    <div style={{ borderTop: '1px solid #e5dec9', borderBottom: '1px solid #e5dec9', padding: '15px 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '4px' }}>Páginas</span>
                            <span style={{ fontSize: '1rem', fontWeight: '600' }}>{libro.paginas || '360'}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '4px' }}>Idioma</span>
                            <span style={{ fontSize: '1rem', fontWeight: '600' }}>{libro.idioma || 'Español'}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '4px' }}>Año</span>
                            <span style={{ fontSize: '1rem', fontWeight: '600' }}>{libro.anioPublicacion || libro.ano || '1721'}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', display: 'block', marginBottom: '4px' }}>ISBN</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>{libro.isbn || '978-84-376-3002-9'}</span>
                        </div>
                    </div>

                    {/* PRECIO Y STOCK */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '400' }}>
                            {libro.precio ? Number(libro.precio).toFixed(2) : '0.00'} €
                        </span>
                        {/* Control de Stock lógico */}
                        <span style={{ fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#2e7d32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            ✓ EN STOCK
                        </span>
                    </div>

                    {/* ACCIONES DE COMPRA */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button style={{ 
                            backgroundColor: '#5c3a21', 
                            color: '#fcfaf2', 
                            border: 'none', 
                            padding: '14px 28px', 
                            borderRadius: '30px', 
                            fontSize: '0.9rem', 
                            fontWeight: '600', 
                            letterSpacing: '0.05em', 
                            textTransform: 'uppercase', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            🛅 AÑADIR AL CARRITO
                        </button>
                        
                        <button style={{ 
                            backgroundColor: 'transparent', 
                            color: '#1a1917', 
                            border: '1px solid #1a1917', 
                            padding: '14px 28px', 
                            borderRadius: '30px', 
                            fontSize: '0.9rem', 
                            fontWeight: '600', 
                            letterSpacing: '0.05em', 
                            textTransform: 'uppercase', 
                            cursor: 'pointer'
                        }}>
                            COMPRAR AHORA
                        </button>
                    </div>
                </div>
            </div>

            {/* SECCIÓN INFERIOR: RECOMENDACIONES (Próximo paso si querés) */}
            <div style={{ marginTop: '80px', borderTop: '1px solid #e5dec9', paddingTop: '40px' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '400', margin: 0 }}>
                    Más de {libro.nombreCorriente?.toLowerCase() || 'ilustración'}
                </h3>
            </div>
        </div>
    );
};

export default DetalleLibro;