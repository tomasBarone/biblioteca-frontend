import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import libroService from '../services/libroService';
import corrienteLiterariaService from '../services/corrienteLiterariaService';
import LibroCard from '../components/LibroCard/LibroCard';

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

                {/* Grid de Cards Literarias usando el componente desacoplado */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '30px' }}>
                    {libros.map((libro) => (
                        <LibroCard 
                            key={libro.id}
                            id={libro.id}
                            titulo={libro.titulo}
                            autor={libro.autor}
                            precio={libro.precio}
                            anioPublicacion={libro.anioPublicacion}
                            ano={libro.ano}
                            imagenUrl={libro.imagenUrl}
                            generoNombre={corriente?.nombre}
                            /* No pasamos onEliminar acá para mantener la vista pública segura */
                        />
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