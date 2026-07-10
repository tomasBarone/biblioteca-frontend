import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import analisisService from '../../services/analisisService';
import './AdminAnalisisForm.css';

function AdminAnalisisForm() {
    const { id } = useParams(); // ID del libro que viene por la URL
    const navigate = useNavigate();

    // Estado único para controlar el formulario
    const [formData, setFormData] = useState({
        introduccionTeorica: '',
        ejePsicologico: '',
        sustratoFilosofico: '',
        mapaSensaciones: ''
    });

    const [esEdicion, setEsEdicion] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' }); // Para alertas de éxito/error

    // Al cargar la pantalla, verificamos si el libro ya tiene un análisis previo
    useEffect(() => {
        setCargando(true);
        analisisService.obtenerPorLibroId(id)
            .then(data => {
                if (data) {
                    setFormData({
                        introduccionTeorica: data.introduccionTeorica || '',
                        ejePsicologico: data.ejePsicologico || '',
                        sustratoFilosofico: data.sustratoFilosofico || '',
                        mapaSensaciones: data.mapaSensaciones || ''
                    });
                    setEsEdicion(true); // Encontró datos, el botón final será para actualizar
                }
                setCargando(false);
            })
            .catch(err => {
                // Si el backend tira error porque no existe (tu RuntimeException), 
                // asumimos que es una creación nueva y dejamos los campos vacíos de forma limpia.
                setEsEdicion(false);
                setCargando(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje({ texto: '', tipo: '' });

        // Estructuramos el DTO tal cual lo espera tu controlador de Spring Boot
        const payload = {
            id: parseInt(id), // El DTO de Request mapea el id del libro aquí
            introduccionTeorica: formData.introduccionTeorica,
            ejePsicologico: formData.ejePsicologico,
            sustratoFilosofico: formData.sustratoFilosofico,
            mapaSensaciones: formData.mapaSensaciones
        };

        try {
            if (esEdicion) {
                await analisisService.actualizarAnalisis(payload);
                setMensaje({ texto: '¡Análisis actualizado con éxito!', tipo: 'exito' });
            } else {
                await analisisService.crearAnalisis(payload);
                setMensaje({ texto: '¡Análisis creado y vinculado con éxito!', tipo: 'exito' });
                setEsEdicion(true);
            }
        } catch (error) {
            setMensaje({ texto: 'Hubo un error al guardar la información académica.', tipo: 'error' });
            console.error('Error al enviar el formulario de análisis:', error);
        }
    };

    if (cargando) return <div className="loading">Analizando estado de la obra...</div>;

    return (
        <div className="admin-form-container">
            <button className="btn-back" onClick={() => navigate('/admin')}>
                ← Volver al Dashboard
            </button>

            <header className="form-header">
                <h2>{esEdicion ? 'Editar Análisis Literario' : 'Cargar Nuevo Análisis Literario'}</h2>
                <p>Configurando los datos académicos para el Libro ID: <strong>{id}</strong></p>
            </header>

            {mensaje.texto && (
                <div className={`alerta ${mensaje.tipo}`}>
                    {mensaje.texto}
                </div>
            )}

            <form onSubmit={handleSubmit} className="form-analisis">
                {/* Inputs Cortos */}
                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="sustratoFilosofico">Sustrato Filosófico</label>
                        <input
                            type="text"
                            id="sustratoFilosofico"
                            name="sustratoFilosofico"
                            value={formData.sustratoFilosofico}
                            onChange={handleChange}
                            placeholder="Ej: Existencialismo, Nihilismo, Humanismo..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ejePsicologico">Eje Psicológico</label>
                        <input
                            type="text"
                            id="ejePsicologico"
                            name="ejePsicologico"
                            value={formData.ejePsicologico}
                            onChange={handleChange}
                            placeholder="Ej: Complejo de Edipo, Dualidad de la psique..."
                            required
                        />
                    </div>
                </div>

                {/* Textareas de contenido extenso */}
                <div className="form-group">
                    <label htmlFor="introduccionTeorica">Introducción Teórica / Enfoque Crítico</label>
                    <textarea
                        id="introduccionTeorica"
                        name="introduccionTeorica"
                        value={formData.introduccionTeorica}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Escribí el marco teórico, referencias de autores o análisis contextual de la obra..."
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="mapaSensaciones">Mapa de Sensaciones / Evolución de Personajes</label>
                    <textarea
                        id="mapaSensaciones"
                        name="mapaSensaciones"
                        value={formData.mapaSensaciones}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Describe el viaje emocional o la atmósfera sensorial del libro..."
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                    {esEdicion ? 'Guardar Cambios' : 'Dar de Alta Análisis'}
                </button>
            </form>
        </div>
    );
}

export default AdminAnalisisForm;