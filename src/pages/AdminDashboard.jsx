import React, { useState, useEffect } from 'react';
import libroService from '../services/libroService';
import corrienteLiterariaService from '../services/corrienteLiterariaService';
import FormularioLibro from '../components/FormularioLibro';

const AdminDashboard = () => {
    const [libros, setLibros] = useState([]);
    const [corrientes, setCorrientes] = useState([]);
    const [corrienteSeleccionada, setCorrienteSeleccionada] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. Cargar libros iniciales y corrientes al montar el componente
    useEffect(() => {
        cargarLibros();
        cargarCorrientes();
    }, []);

    const cargarLibros = async () => {
        try {
            const data = await libroService.obtenerTodos();
            // Si el backend devuelve un objeto Pageable, usar data.content
            setLibros(Array.isArray(data) ? data : data.content || []);
        } catch (error) {
            console.error("Error al cargar libros:", error);
        }
    };

    const cargarCorrientes = async () => {
        try {
            const data = await corrienteLiterariaService.obtenerTodos();
            setCorrientes(data);
        } catch (error) {
            console.error("Error al cargar corrientes:", error);
        }
    };

    // 2. Escuchar el cambio del filtro desplegable
    const handleFiltroChange = async (e) => {
        const id = e.target.value;
        setCorrienteSeleccionada(id);

        try {
            if (id === '') {
                // Si elige "Todas", volvemos a traer el catálogo completo
                await cargarLibros();
            } else {
                // Filtro reactivo llamando al endpoint por ID
                const data = await libroService.getLibrosPorCorriente(id);
                setLibros(data);
            }
        } catch (error) {
            console.error("Error al filtrar libros:", error);
        }
    };

    const handleEliminarLibro = async (id) => {
        if (window.confirm("¿Está seguro de eliminar este registro?")) {
            try {
                await libroService.eliminar(id);
                // Refrescamos la lista respetando el filtro actual
                if (corrienteSeleccionada === '') {
                    cargarLibros();
                } else {
                    const data = await libroService.getLibrosPorCorriente(corrienteSeleccionada);
                    setLibros(data);
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#fbf9f4', minHeight: '100vh', padding: '40px', color: '#202022' }}>
            
            {/* ENCABEZADO CONTROLADOR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#000000', margin: 0 }}> Panel de Control</h1>
                    <p style={{ color: '#000000', margin: '5px 0 0 0' }}>Gestión de inventario literario</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    style={{ backgroundColor: '#c7c7c634', color: '#11111b', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'opacity 0.2s' }}
                >
                    + Registrar Nuevo Libro
                </button>
            </div>

            {/* BARRA DE FILTROS (Sección Reactiva) */}
            <div style={{ backgroundColor: '#c7c7c634', padding: '16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #313244' }}>
                <label style={{ fontSize: '0.9rem', color: '#000000', fontWeight: '500' }}>Filtrar por Corriente:</label>
                <select 
                    value={corrienteSeleccionada} 
                    onChange={handleFiltroChange}
                    style={{ backgroundColor: '#fbf9f4', color: '#000000', border: '1px solid #45475a', padding: '8px 14px', borderRadius: '6px', outline: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                    <option value=""> Mostrar Todas las Corrientes</option>
                    {corrientes.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                </select>
            </div>

            {/* TABLA DE REGISTROS */}
            <div style={{ overflowX: 'auto', background: '#c7c7c634', borderRadius: '8px', padding: '16px', border: '1px solid #313244' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #45475a', color: '#000000', fontSize: '0.9rem' }}>
                            <th style={{ padding: '12px' }}>ID</th>
                            <th style={{ padding: '12px' }}>Título</th>
                            <th style={{ padding: '12px' }}>Autor</th>
                            <th style={{ padding: '12px' }}>Línea / Corriente</th>
                            <th style={{ padding: '12px' }}>Precio</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libros.map((libro) => (
                            <tr key={libro.id} style={{ borderBottom: '1px solid #313244' }}>
                                <td style={{ padding: '12px', color: '#6c7086' }}>#{libro.id}</td>
                                <td style={{ padding: '12px', fontWeight: '600' }}>{libro.titulo}</td>
                                <td style={{ padding: '12px' }}>{libro.autor}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{ background: '#313244', color: '#b4befe', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #45475a' }}>
                                        {libro.corrienteNombre || 'Sin asignar'}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', color: '#a6e3a1', fontWeight: '600' }}>${libro.precio}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button 
                                        onClick={() => handleEliminarLibro(libro.id)}
                                        style={{ background: '#c7c7c634', color: '#11111b', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {libros.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#6c7086' }}>
                        No se encontraron libros para la categoría seleccionada.
                    </div>
                )}
            </div>

            {/* MODAL DEL FORMULARIO */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(34, 34, 34, 0.84)', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'rgb(223, 216, 206)', width: '550px', paddingBottom: '1px', borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                        {/* Pasamos cerrarModal para que el formulario controle la salida */}
                        <FormularioLibro 
                            cerrarModal={() => setIsModalOpen(false)} 
                            refrescarLista={corrienteSeleccionada === '' ? cargarLibros : () => handleFiltroChange({ target: { value: corrienteSeleccionada } })} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;