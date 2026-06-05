import React, { useState, useEffect } from 'react';
import libroService from '../services/libroService';
import LibroCard from './LibroCard/LibroCard'; 

function CatalogoLibros() {
    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarLibros = async () => {
            try {
                const data = await libroService.obtenerTodos();
                if (Array.isArray(data)) setLibros(data);
                else if (data && data.content) setLibros(data.content);
            } catch (err) {
                console.error(err);
            } finally {
                setCargando(false);
            }
        };
        cargarLibros();
    }, []);

    if (cargando) return <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>Cargando catálogo...</div>;

    return (
        <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#ffffff', marginBottom: '24px', fontSize: '1.8rem' }}>
                Explora nuestro catálogo
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
                {libros.length === 0 ? (
                    <div style={{ color: '#aaa', padding: '20px' }}>No hay libros disponibles.</div>
                ) : (
                    libros.map((libro) => (
                        <LibroCard 
                            key={libro.id} 
                            id={libro.id}   
                            titulo={libro.titulo}
                            autor={libro.autor}
                            precio={libro.precio} 
                            generoNombre={libro.subgeneroNombre || libro.subgenero?.nombre || "Clásico"}
                            onEliminar={null} // <--- PASAMOS NULL: Al no recibir función, la tarjeta esconde el botón "Eliminar" de la UI pública
                        />
                    ))
                )}
            </div>
        </main>
    );
}

export default CatalogoLibros;