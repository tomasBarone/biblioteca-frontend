import React, { useState, useEffect } from 'react';
import corrienteLiterariaService from '../services/corrienteLiterariaService';
import API from '../services/api'; 
import subgeneroService from '../services/subgeneroService';

function FormularioLibro({ cerrarModal, refrescarLista }) {
    const [formData, setFormData] = useState({
        isbn: '',
        titulo: '',
        autor: '',
        ejemplares: '',
        corrienteId: '',  // Dejamos vacío inicialmente para que obligue a elegir
        subgeneroId: '',  // Cuando tengas el endpoint de subgéneros, aplicás la misma lógica
        anioPublicacion: '',
        precio: '',
        sinopsis: ''
    });

    // Estados para las listas dinámicas de la Base de Datos
    const [corrientes, setCorrientes] = useState([]);
    const [cargandoCorrientes, setCargandoCorrientes] = useState(true);
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
    corrienteLiterariaService.obtenerTodos()
        .then(data => {
            setCorrientes(data);
            setCargandoCorrientes(false);
            if(data.length > 0) {
                setFormData(prev => ({ ...prev, corrienteId: data[0].id.toString() }));
            }
        })
        .catch(err => {
            console.error("Error al recuperar corrientes:", err);
            setCargandoCorrientes(false);
        });
}, []);


     const [subgeneros, setSubgeneros] = useState([]);
     const [cargandoSubgeneros, setCargandoSubgeneros] = useState(true);
     
    useEffect(() => {
        subgeneroService.obtenerTodos()
            .then(data => { 
                setSubgeneros(data);
                setCargandoSubgeneros(false);
               
                
            })
            .catch(err => {
                console.error("Error al recuperar subgéneros:", err);
                setCargandoSubgeneros(false);
            });
    }, []);

    // Manejador genérico para inputs y selectores (funciona idéntico)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.titulo.trim() || !formData.autor.trim() || !formData.corrienteId) {
            alert('Por favor, completa los campos obligatorios (Título, Autor y Corriente)');
            return;
        }

        setEnviando(true);
        try {
            const libroParaEnviar = {
                ...formData,
                isbn: formData.isbn.trim(),
                titulo: formData.titulo.trim(),
                autor: formData.autor.trim(),
                ejemplares: parseInt(formData.ejemplares, 10) || 1,
                corrienteId: parseInt(formData.corrienteId, 10), 
                subgeneroId: parseInt(formData.subgeneroId, 10) || null, 
                anioPublicacion: parseInt(formData.anioPublicacion, 10) || 2026,
                precio: parseFloat(formData.precio) || 0.0,
                sinopsis: formData.sinopsis.trim()
            };

            // IMPACTAMOS LA DB: Pegamos al endpoint POST de tu Spring Boot
            await API.post('/libros/crear', libroParaEnviar);

            alert('¡Libro creado con éxito!');
            
            // CONTRATO CON EL PADRE: Refrescamos la grilla y cerramos el modal de forma limpia
            if (typeof refrescarLista === 'function') refrescarLista();
            if (typeof cerrarModal === 'function') cerrarModal();

        } catch (err) {
            console.error("Error al enviar el formulario:", err);
            // Si tenés validaciones con @Valid de Spring, acá podés capturar los mensajes específicos
            alert('Error al crear el libro. Revisa las validaciones del backend.');
        } finally {
            setEnviando(false);
        }
    };

    // Estilos base que ya tenías (reutilizados para consistencia visual)
    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #f7f8ff',
        background: '#c6c6cf',
        color: '#3d3f46',
        boxSizing: 'border-box'
    };

    const labelStyle = {
        color: '#6a6d63',
        display: 'block',
        marginBottom: '6px',
        fontSize: '0.9rem'
    };

    return (
        <div style={{
            background: '#c7c7c634',
            border: '1px solid #c1c4cc',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
        }}>
            <h3 style={{ color: '#3a3636', marginTop: 0, marginBottom: '20px', fontSize: '1.4rem' }}>
                Registrar Nuevo Libro (Capa DTO Dinámica)
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Fila 1: ISBN y Título */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>ISBN *</label>
                        <input 
                            type="text" name="isbn" value={formData.isbn} onChange={handleChange}
                            style={inputStyle} placeholder="Ej: 9789501239251"
                        />
                    </div>
                    <div style={{ flex: 2 }}>
                        <label style={labelStyle}>Título *</label>
                        <input 
                            type="text" name="titulo" value={formData.titulo} onChange={handleChange}
                            style={inputStyle} placeholder="Ej: El Aleph"
                        />
                    </div>
                </div>

                {/* Fila 2: Autor y Ejemplares */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 2 }}>
                        <label style={labelStyle}>Autor *</label>
                        <input 
                            type="text" name="autor" value={formData.autor} onChange={handleChange}
                            style={inputStyle} placeholder="Ej: Jorge Luis Borges"
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Ejemplares</label>
                        <input 
                            type="number" name="ejemplares" value={formData.ejemplares} onChange={handleChange}
                            style={inputStyle} placeholder="50"
                        />
                    </div>
                </div>

                {/* Fila 3: Claves Foráneas (¡REFACTORIZADO A RECT/SELECT!) */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Corriente Literaria *</label>
                        {cargandoCorrientes ? (
                            <span style={{ color: '#f9e2af', fontSize: '0.85rem', italic: 'true' }}>Conectando a Spring...</span>
                        ) : (
                            <select 
                                name="corrienteId" 
                                value={formData.corrienteId} 
                                onChange={handleChange}
                                style={{ 
                                    ...inputStyle, 
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <option value="">Seleccione corriente...</option>
                                {corrientes.map(c => (
                                    <option key={c.id} value={c.id} style={{ background: '#313244' }}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>ID Subgénero Lit.</label>
                        {cargandoSubgeneros ? (
                            <span style={{ color: '#f9e2af', fontSize: '0.85rem', italic: 'true' }}>Conectando a Spring...</span>
                        ) : (
                            <select 
                                name="subgeneroId" 
                                value={formData.subgeneroId} 
                                onChange={handleChange}
                                style={{ 
                                    ...inputStyle, 
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <option value="">Seleccione subgénero...</option>
                                {subgeneros.map(s => (
                                    <option key={s.id} value={s.id} style={{ background: '#313244' }}>
                                        {s.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                        
                    </div>
                </div>

                {/* Fila 4: Finanzas y Tiempos */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Año Publicación</label>
                        <input 
                            type="number" name="anioPublicacion" value={formData.anioPublicacion} onChange={handleChange}
                            style={inputStyle} placeholder="1949"
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Precio ($)</label>
                        <input 
                            type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange}
                            style={inputStyle} placeholder="60000"
                        />
                    </div>
                </div>

                {/* Fila 5: Sinopsis Informativa */}
                <div>
                    <label style={labelStyle}>Sinopsis</label>
                    <textarea 
                        name="sinopsis" value={formData.sinopsis} onChange={handleChange}
                        style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
                        placeholder="Breve descripción del libro..."
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={enviando}
                    style={{
                        background: '#a6e3a1', color: '#11111b', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px', transition: 'background 0.2s'
                    }}
                >
                    {enviando ? 'Ejecutando transacción en Spring...' : 'Guardar e Insertar Libro'}
                </button>

                {/* Al final de tu <form>, junto al botón de enviar */}
<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
    <button 
        type="button" 
        onClick={cerrarModal} 
        style={{ background: 'transparent', color: '#6a6d63', border: '1px solid #353638', padding: '12px 20px', borderRadius: '6px', cursor: 'pointer' }}
    >
        Cancelar
    </button>
   
</div>
            </form>
        </div>
    );
}

export default FormularioLibro;