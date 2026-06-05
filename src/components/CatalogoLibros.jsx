import React, { useState, useEffect } from 'react';
import libroService from '../services/libroService';
import LibroCard from './LibroCard/LibroCard'; 
import FormularioLibro from './FormularioLibro';

function CatalogoLibros() {
    
    // 1. Definimos los estados (el array empieza vacío)
    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarForm, setMostrarForm] = useState(false);

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




    const handleCrearLibro = async (nuevoLibroData) => {
    try {
        // 1. Despachamos el POST hacia Spring Boot mediante el Service
        const libroCreadoDTO = await libroService.crear(nuevoLibroData);
        
        console.log("Objeto DTO retornado por el Backend tras crear:", libroCreadoDTO);

        // 2. Normalizamos el objeto antes de inyectarlo en la lista.
        // Nos aseguramos de que mantenga la consistencia con las propiedades que lee tu tarjeta.
        const libroNormalizado = {
            ...libroCreadoDTO,
            // Si el DTO trae subgeneroNombre directo del constructor, lo consolidamos acá
            generoNombre: libroCreadoDTO.subgeneroNombre || libroCreadoDTO.generoNombre || "Clásico"
        };
        
        // 3. Modificamos el estado de React inyectándolo al inicio
        setLibros(prevLibros => [libroNormalizado, ...prevLibros]);
        
    } catch (err) {
        console.error("Fallo la sincronización en el Catálogo:", err);
        throw err; // Re-lanzamos para que el formulario sepa que no debe limpiarse
    }
};


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
            
            {/* ================= SECCIÓN DE CABECERA CON BOTÓN ================= */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '32px',
                borderBottom: '1px solid #313244',
                paddingBottom: '16px'
            }}>
                <h2 style={{ color: '#ffffff', margin: 0, fontSize: '1.8rem' }}>
                    Libros Recomendados
                </h2>
                
                {/* Este botón conmuta el estado mostrarForm entre true y false */}
                <button 
                    onClick={() => setMostrarForm(!mostrarForm)}
                    style={{
                        background: mostrarForm ? '#f38ba8' : '#cba6f7', // Cambia de color según el estado
                        color: '#11111b', 
                        border: 'none', 
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        cursor: 'pointer', 
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                    }}
                >
                    {mostrarForm ? '✕ Cancelar Alta' : '＋ Agregar Libro'}
                </button>
            </div>

            {/* ================= COMPONENTE FORMULARIO CONDICIONAL ================= */}
            {/* Si mostrarForm es true, el formulario se inyecta en el DOM de React */}
            {mostrarForm && <FormularioLibro onLibroCreado={handleCrearLibro} />}


            {/* ================= GRILLA DE TARJETAS (TU CÓDIGO) ================= */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '24px',
                marginTop: '20px'
            }}>
                {libros.length === 0 ? (
                    <div style={{ color: '#aaa', padding: '20px' }}>No hay libros cargados en el sistema actualmente.</div>
                ) : (
                    libros.map((libro) => (
                        <LibroCard 
                            key={libro.id} 
                            id={libro.id}   
                            titulo={libro.titulo}
                            autor={libro.autor}
                            precio={libro.precio} 
                            generoNombre={libro.subgeneroNombre || (libro.subgenero?.nombre) || "Clásico"}
                            onEliminar={handleEliminarLibro}
                        />
                    ))
                )}
            </div>
        </main>
    );
}

export default CatalogoLibros;