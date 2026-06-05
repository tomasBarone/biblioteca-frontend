import React, { useState, useEffect } from 'react';
import libroService from '../services/libroService';
import LibroCard from '../components/LibroCard/LibroCard';
import FormularioLibro from '../components/FormularioLibro';

function AdminDashboard() {
    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#f38ba8', marginBottom: '24px' }}>⚙️ Panel de Administración (ABM)</h2>
            
            {/* El formulario acá queda FIJO y siempre visible para operar rápido */}
            <FormularioLibro onLibroCreado={handleCrearLibro} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px', marginTop: '40px' }}>
                {libros.map((libro) => (
                    <LibroCard 
                        key={libro.id} 
                        id={libro.id}   
                        titulo={libro.titulo}
                        autor={libro.autor}
                        precio={libro.precio} 
                        generoNombre={libro.subgeneroNombre || libro.subgenero?.nombre || "Clásico"}
                        onEliminar={handleEliminarLibro} // Mantiene el botón de borrar activo
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;