import React, { useState, useEffect } from 'react';
import libroService from '../services/libroService';
import LibroCard from '../components/LibroCard/LibroCard';
import FormularioLibro from '../components/FormularioLibro';

function AdminDashboard() {
    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    // NUEVO ESTADO: Controla si la ventana del formulario está visible
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const cargarLibros = async () => {
            try {
                const data = await libroService.obtenerTodos();
                if (Array.isArray(data)) setLibros(data);
                else if (data && data.content) setLibros(data.content);
            } catch (err) {
                setError('Error al conectar con el servidor administrativo');
            } finally {
                setCargando(false);
            }
        };
        cargarLibros();
    }, []);

    const handleCrearLibro = async (nuevoLibroData) => {
        const libroCreadoDTO = await libroService.crear(nuevoLibroData);
        setLibros(prev => [libroCreadoDTO, ...prev]);
        
        // Una vez que el libro se crea exitosamente, cerramos el Modal automáticamente
        setIsModalOpen(false); 
    };

    const handleEliminarLibro = async (id) => {
        try {
            await libroService.eliminar(id);
            setLibros(prev => prev.filter(libro => libro.id !== id));
            alert('Registro eliminado físicamente de la DB.');
        } catch (err) {
            alert('Error al eliminar.');
        }
    };

    if (cargando) return <div style={{ color: '#fff', padding: '40px' }}>Cargando Panel de Control...</div>;

    // ESTILOS EN LÍNEA PARA EL MODAL (Oscurece el fondo y centra la tarjeta)
    const modalOverlayStyle = {
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000, backdropFilter: 'blur(3px)'
    };

    const modalContentStyle = {
        position: 'relative', maxHeight: '90vh', overflowY: 'auto'
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Cabecera con el botón para abrir el Modal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: '#f38ba8', margin: 0 }}>⚙️ Panel de Administración (ABM)</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    style={{ background: '#a6e3a1', color: '#11111b', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    ➕ Nuevo Libro
                </button>
            </div>
            
            {/* RENDERIZADO CONDICIONAL DEL MODAL */}
            {isModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        {/* Botón flotante para cerrar el modal manualmente */}
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            style={{ position: 'absolute', top: '15px', right: '25px', background: 'transparent', border: 'none', fontSize: '1.5rem', color: '#3a3636', cursor: 'pointer' }}
                        >
                            ✖
                        </button>
                        
                        {/* Tu formulario intacto */}
                        <FormularioLibro onLibroCreado={handleCrearLibro} />
                    </div>
                </div>
            )}

            {/* Grilla de libros (Se mantiene igual a lo que tenías) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px', marginTop: '40px' }}>
                {libros.map((libro) => (
                    <LibroCard 
                        key={libro.id} 
                        id={libro.id}   
                        titulo={libro.titulo}
                        autor={libro.autor}
                        precio={libro.precio} 
                        generoNombre={libro.subgeneroNombre || libro.subgenero?.nombre || "Clásico"}
                        onEliminar={handleEliminarLibro}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;