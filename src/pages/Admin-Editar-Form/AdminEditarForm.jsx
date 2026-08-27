import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import libroService from '../../services/libroService';
import corrienteLiterariaService from '../../services/corrienteLiterariaService';
import subgeneroService from '../../services/subgeneroService';
import './AdminEditarForm.css';

function AdminEditarForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        isbn: '',
        titulo: '',
        autor: '',
        ejemplares: '',
        corrienteId: '',
        subgeneroId: '',
        anioPublicacion: '',
        generoNombre: '',
        precio: '',
        sinopsis: ''
    });

    const [corrientes, setCorrientes] = useState([]);
    const [subgeneros, setSubgeneros] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Cargar corrientes y subgéneros al montar
    useEffect(() => {
        Promise.all([
            corrienteLiterariaService.obtenerTodos(),
            subgeneroService.obtenerTodos()
        ])
        .then(([corrientesData, subgenerosData]) => {
            setCorrientes(corrientesData);
            setSubgeneros(subgenerosData);
        })
        .catch(err => console.error("Error al obtener listas de referencia:", err));
    }, []);

    // Cargar datos del libro por ID
    useEffect(() => {
        setCargando(true);
        libroService.obtenerPorId(id)
            .then(data => {
                console.log("Datos del libro obtenidos:", data);
                setFormData({
                    isbn: data.isbn || '',
                    titulo: data.titulo || '',
                    autor: data.autor || '',
                    corrienteId: data.corrienteId || (data.corriente ? data.corriente.id : ''),
                    subgeneroId: data.subgeneroId || (data.subgenero ? data.subgenero.id : ''),
                    generoNombre: data.generoNombre || '',
                    ejemplares: data.ejemplares || '',
                    anioPublicacion: data.anioPublicacion || '',
                    precio: data.precio || '',
                    sinopsis: data.sinopsis || ''
                });
                setCargando(false);
            })
            .catch(err => {
                console.error("Error al obtener el libro:", err);
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

        const libroDTO = {
            isbn: formData.isbn,
            titulo: formData.titulo,
            autor: formData.autor,
            corrienteId: formData.corrienteId ? parseInt(formData.corrienteId, 10) : null,
            subgeneroId: formData.subgeneroId ? parseInt(formData.subgeneroId, 10) : null,
            ejemplares: formData.ejemplares ? parseInt(formData.ejemplares, 10) : 0,
            anioPublicacion: formData.anioPublicacion ? parseInt(formData.anioPublicacion, 10) : null,
            precio: formData.precio ? parseFloat(formData.precio) : 0.0,
            sinopsis: formData.sinopsis
        };

        console.log('Enviando libroDTO al servidor para actualizar:', libroDTO);

        try {
            await libroService.actualizar(id, libroDTO);
            alert('Libro actualizado con éxito');
            navigate('/admin');
        } catch (error) {
            console.error("Error al actualizar el libro:", error);
            alert('Error al actualizar el libro');
        }
    };

    if (cargando) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="admin-editar-form">
            <h2>Editar Libro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="autor">Autor:</label>
                    <input
                        type="text"
                        id="autor"
                        name="autor"
                        value={formData.autor}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="corrienteId">Corriente Literaria:</label>
                    <select
                        id="corrienteId"
                        name="corrienteId"
                        value={formData.corrienteId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Seleccione una Corriente --</option>
                        {corrientes.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="subgeneroId">Subgénero:</label>
                    <select
                        id="subgeneroId"
                        name="subgeneroId"
                        value={formData.subgeneroId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Seleccione un Subgénero --</option>
                        {subgeneros.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="anioPublicacion">Año de Publicación:</label>
                    <input
                        type="number"
                        id="anioPublicacion"
                        name="anioPublicacion"
                        value={formData.anioPublicacion}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sinopsis">Sinopsis:</label>
                    <textarea
                        id="sinopsis"
                        name="sinopsis"
                        value={formData.sinopsis}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="precio">Precio:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ejemplares">Ejemplares:</label>
                    <input
                        type="number"
                        id="ejemplares"
                        name="ejemplares"
                        value={formData.ejemplares}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="isbn">ISBN:</label>
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Actualizar Libro</button>
            </form>
        </div>
    );
}

export default AdminEditarForm;