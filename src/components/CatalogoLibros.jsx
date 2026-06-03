import React, { useState, useEffect } from 'react';
import libroService from '../services/libroService';
import LibroCard from './LibroCard/LibroCard'; 

function CatalogoLibros() {
    
    // 1. Definimos los estados (el array empieza vacío)
    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Función auxiliar con nombre unívoco para normalizar si la respuesta es una lista directa o un PageImpl paginado
    const procesarRespuestaLibros = (backendResponse) => {

    

        if (Array.isArray(backendResponse)) {
            setLibros(backendResponse);
        } else if (backendResponse && Array.isArray(backendResponse.content)) {
            // Spring está devolviendo un Page<Libro>, extraemos el contenido
            setLibros(backendResponse.content);
        } else {
            console.warn("Estructura de respuesta inesperada del backend:", backendResponse);
        }
    };

    // 2. useEffect para disparar la carga de datos al inicializar 
    useEffect(() => {
        const cargarLibros = async () => {
            try {
                const data = await libroService.obtenerTodos();
                // Usamos la función de procesamiento corregida
                procesarRespuestaLibros(data);
            } catch (err) {
                console.error("Error capturado en el componente:", err);
                setError('Error al conectar con Springboot');
            } finally {
                setCargando(false);
            }
        }; 

        cargarLibros();
    }, []); // El array vacío asegura que esto se ejecute solo una vez al montar

   const handleEliminarLibro = async (id) => {
        try {
            // 1. Le avisamos al backend (Axios viaja con el token automáticamente)
            await libroService.eliminar(id);
            
            // 2. Si el backend no falló, actualizamos el estado de React aplicando un filter.
            // Esto descarta el libro eliminado y redibuja la pantalla sin necesidad de recargar toda la lista desde el backend.
            setLibros(prevLibros => prevLibros.filter(libro => libro.id !== id));
            
            alert('Libro eliminado correctamente del sistema central.');
        } catch (err) {
            console.error("Error al eliminar el libro:", err);
            alert('No se pudo eliminar el libro. Verificá los permisos de administrador en la consola.');
        }
    };

    // 3. Renderizamos la UI según el estado actual
    if (cargando) return <div style={{ color: '#fff' , textAlign: 'center' , padding: '40px' }}>Conectando con el catálogo central...</div>;
    if (error) return <div style={{ color: '#ef4444' , textAlign: 'center' , padding: '40px' }}>{error}</div>;

    return (
        <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#ffffff', marginBottom: '24px', fontSize: '1.8rem' }}>
                Libros Recomendados
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '24px'
            }}>
                {libros.length === 0 ? (
                    <div style={{ color: '#aaa', padding: '20px' }}>No hay libros cargados en el sistema actualmente.</div>
                ) : (
                    libros.map((libro) => (
                        <LibroCard 
                          key={libro.id || libro.idLibro} // Clave única para React
                          id={libro.id || libro.idLibro}   // <-- SI EL BACKEND DEVOLVIÓ 'idLibro', ACÁ LO ATRAPAMOS
                          titulo={libro.titulo}
                          autor={libro.autor}
                          precio={libro.precio || 1200} 
                          generoNombre={libro.subgenero?.nombre || libro.generoNombre || "Clásico"}
                          onEliminar={handleEliminarLibro}
                        />
                    ))
                )}
            </div>
        </main>
    );
}

export default CatalogoLibros;