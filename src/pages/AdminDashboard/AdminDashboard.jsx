import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import libroService from '../../services/libroService';
import corrienteLiterariaService from '../../services/corrienteLiterariaService';
import FormularioLibro from '../../components/FormularioLibro';
import './AdminDashboard.css';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [libros, setLibros] = useState([]);
    const [corrientes, setCorrientes] = useState([]);
    const [corrienteSeleccionada, setCorrienteSeleccionada] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        cargarLibros();
        cargarCorrientes();
    }, []);

    const cargarLibros = async () => {
        try {
            const data = await libroService.obtenerTodos();
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

    // 1. Helper para recargar manteniendo el estado del filtro actual
  const refrescarListaActual = async () => {
    if (corrienteSeleccionada === '') {
        await cargarLibros();
    } else {
        const data = await libroService.getLibrosPorCorriente(corrienteSeleccionada);
        setLibros(data);
    }
};

    const handleFiltroChange = async (e) => {
        const id = e.target.value;
        setCorrienteSeleccionada(id);

        try {
            if (id === '') {
                await cargarLibros();
            } else {
                const data = await libroService.getLibrosPorCorriente(id);
                setLibros(data);
            }
        } catch (error) {
            console.error("Error al filtrar libros:", error);
        }
    };

    

  const handleEliminarLibro = async (id) => {
    // Promesa limpia con feedback instantáneo
    toast.promise(libroService.eliminar(id), {
        loading: 'Eliminando registro...',
        success: () => {
            refrescarListaActual();
            return 'Libro eliminado del inventario';
        },
        error: 'No se pudo eliminar el libro.',
    });
};

const confirmarEliminacion = (id, titulo) => {
    toast(({ closeToast }) => (
        <div>
            <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                ¿Eliminar <strong>"{titulo}"</strong> del catálogo?
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button 
                    onClick={closeToast}
                    style={{ background: '#ccc', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Cancelar
                </button>
                <button 
                    onClick={() => {
                        closeToast();
                        handleEliminarLibro(id);
                    }}
                    style={{ background: '#a94442', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Confirmar
                </button>
            </div>
        </div>
    ), { autoClose: false, closeOnClick: false });
};

    // Helper para formatear moneda en ARS/formato estándar profesional
    const formatearPrecio = (valor) => {
        if (valor === undefined || valor === null) return '$0';
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(valor);
    };

    return (
        <div className="admin-dashboard-wrapper">
            
            {/* Header del Panel */}
            <header className="admin-dashboard-header">
                <div>
                    <h1 className="admin-dashboard-title">Panel de Control</h1>
                    <p className="admin-dashboard-subtitle">Gestión de inventario literario</p>
                </div>
                <button 
                    className="btn-primary-admin"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Registrar Nuevo Libro
                </button>
            </header>

            {/* Barra de Filtro */}
            <div className="admin-filter-card">
                <label htmlFor="selectCorriente" className="filter-label">Filtrar por Corriente:</label>
                <select 
                    id="selectCorriente"
                    value={corrienteSeleccionada} 
                    onChange={handleFiltroChange}
                    className="filter-select"
                >
                    <option value="">Mostrar Todas las Corrientes</option>
                    {corrientes.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                </select>
            </div>

            {/* Tabla de Registros */}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Línea / Corriente</th>
                            <th>Precio</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libros.map((libro) => (
                            <tr key={libro.id}>
                                <td className="cell-id">#{libro.id}</td>
                                <td className="cell-titulo">{libro.titulo}</td>
                                <td className="cell-autor">{libro.autor}</td>
                                <td>
                                    <span className="badge-corriente">
                                        {libro.corrienteNombre || 'Sin asignar'}
                                    </span>
                                </td>
                                <td className="cell-precio">{formatearPrecio(libro.precio)}</td>
                                <td>
                                    <div className="actions-cell-group">
                                        <button 
                                            className="btn-action-delete"
                                            onClick={() => confirmarEliminacion(libro.id, libro.titulo)}
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            className="btn-action-analisis"
                                            onClick={() => navigate(`/admin/analisis/${libro.id}`)}
                                        >
                                            📚 Análisis
                                        </button>

                                        <button
                                            className="btn-action-editar"
                                            onClick={() => navigate(`/admin/editar/${libro.id}`)}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {libros.length === 0 && (
                    <div className="table-empty-state">
                        No se encontraron libros para la categoría seleccionada.
                    </div>
                )}
            </div>

            {/* Modal para Crear Libro */}
            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content">
                        <FormularioLibro 
                            cerrarModal={() => setIsModalOpen(false)} 
                            refrescarLista={
                                corrienteSeleccionada === '' 
                                    ? cargarLibros 
                                    : () => handleFiltroChange({ target: { value: corrienteSeleccionada } })
                            } 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;