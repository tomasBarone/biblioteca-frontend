import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import libroService from '../../services/libroService';
import corrienteLiterariaService from '../../services/corrienteLiterariaService';
import subgeneroService from '../../services/subgeneroService';
import './AdminEditarForm.css';

function AdminEditarForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const corrienteService = corrienteLiterariaService; // Alias para mayor claridad
    const subgeneroServiceInstance = subgeneroService; // Alias para mayor claridad
    const [formData, setFormData] = useState({
        isbn: '',
        titulo: '',
        autor: '',
        ejemplares: '',
        corrienteNombre: '',
        subgeneroNombre: '',
        anioPublicacion: '',
        generoNombre: '',
        precio: '',
        sinopsis: ''
    });

    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        setCargando(true);

        libroService.obtenerPorId(id)
            .then(data => {
                console.log("Datos del libro obtenidos:", data);
                setFormData({
                    isbn : data.isbn || '',
                    titulo: data.titulo || '',
                    autor: data.autor || '',
                    corrienteNombre: data.corrienteNombre || '',
                    subgeneroNombre: data.subgeneroNombre || '',
                    generoNombre: data.generoNombre || '',
                    ejemplares: data.ejemplares || '',
                    anioPublicacion: data.anioPublicacion || '',
                    precio: data.precio || '',
                    sinopsis: data.sinopsis || ''
                });
                setCargando(false);
            }
            )
            .catch(err => {
                console.error("Error al obtener el libro:", err);
                setCargando(false);
            });
    }, [id]);

    useEffect(() => {

        corrienteLiterariaService.obtenerTodos()
            .then(data => {
                console.log("Corrientes literarias obtenidas:", data);
            })
            .catch(err => {
                console.error("Error al obtener corrientes literarias:", err);
            });
    }, []);

    useEffect(() => {
        subgeneroService.obtenerTodos()
            .then(data => {
                console.log("Subgéneros obtenidos:", data);
            })
            .catch(err => {
                console.error("Error al obtener subgéneros:", err);
            });
    }, []);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        let corrienteAux;
        let subgeneroAux;
         
      for (const corriente of await corrienteService.obtenerTodos()) {
            if (corriente.nombre === formData.corrienteNombre) {
                corrienteAux = corriente.id;
                break;
            }
        }

        for (const subgenero of await subgeneroServiceInstance.obtenerTodos()) {
            if (subgenero.nombre === formData.subgeneroNombre) {
                subgeneroAux = subgenero.id;
                break;
            }
        }    
         

      const libroDTO = {
            isbn: formData.isbn,
            titulo: formData.titulo,
            autor: formData.autor,
            corrienteId: corrienteAux,
            subgeneroId: subgeneroAux,
            ejemplares: formData.ejemplares,
            anioPublicacion: formData.anioPublicacion,
            precio: formData.precio,
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="corrienteNombre">Corriente Literaria:</label>
                    <input
                        type="text"
                        id="corrienteNombre"
                        name="corrienteNombre"
                        value={formData.corrienteNombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="anioPublicacion">Año de Publicación:</label>
                    <input
                        type="text"
                        id="anioPublicacion"
                        name="anioPublicacion"
                        value={formData.anioPublicacion}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Sinopsis:</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.sinopsis}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="precio">Precio:</label>
                    <input
                        type="number"
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
                    <label htmlFor="subgeneroNombre">Subgénero:</label>
                    <input
                        type="text"
                        id="subgeneroNombre"
                        name="subgeneroNombre"
                        value={formData.subgeneroNombre}
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
                <div className="form-group">
                    <label htmlFor="generoNombre">Género:</label>
                    <input
                        type="text"
                        id="generoNombre"
                        name="generoNombre"
                        value={formData.generoNombre}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar Libro</button>
            </form>
        </div>
    );

}

export default AdminEditarForm;