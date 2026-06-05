import React, { useState } from 'react';

function FormularioLibro({ onLibroCreado }) {

     const [formData, setFormData] = useState({
       
        isbn: '',
        titulo: '',
        autor: '',
        ejemplares: '',
        corrienteId: '7',  // Valor por defecto inicializable
        subgeneroId: '1',  // Valor por defecto inicializable
        anioPublicacion: '',
        precio: '',
        sinopsis: ''
});

const [enviando, setEnviando] = useState(false);

    // Manejador genérico para los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones básicas antes de molestar al backend
        if (!formData.titulo.trim() || !formData.autor.trim()) {
            alert('Por favor, completa los campos obligatorios (Título y Autor)');
            return;
        }

        setEnviando(true);
        try {
            // Adaptamos los tipos de datos por si el backend es estricto (String a Int/Double)
            const libroParaEnviar = {
               ...formData,
                isbn: formData.isbn.trim(),
                titulo: formData.titulo.trim(),
                autor: formData.autor.trim(),
                ejemplares: parseInt(formData.ejemplares, 10) || 1,
                corrienteId: parseInt(formData.corrienteId, 10), // Hibernate necesita el ID numérico de la relación
                subgeneroId: parseInt(formData.subgeneroId, 10), // ID numérico de la relación
                anioPublicacion: parseInt(formData.anioPublicacion, 10) || 2026,
                precio: parseFloat(formData.precio) || 0.0,
                sinopsis: formData.sinopsis.trim()
            };

            // Invocamos la función que nos pasará el padre
            await onLibroCreado(libroParaEnviar);

            // Si sale bien, limpiamos el formulario
            setFormData({
                     isbn : '',
                    titulo: '',
                    autor: '',
                    ejemplares : '',
                    corrienteId : '7',
                    subgeneroId : '1',
                    anioPublicacion: '',
                    precio : '',
                    sinopsis : ''
            });
            alert('¡Libro creado con éxito!');
        } catch (err) {
            console.error("Error al enviar el formulario:", err);
            alert('Error al crear el libro. Revisa las validaciones del backend.');
        } finally {
            setEnviando(false);
        }
    };

    return (
      <div style={{
            background: '#1e1e2e',
            border: '1px solid #313244',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
        }}>
            <h3 style={{ color: '#cdd6f4', marginTop: 0, marginBottom: '20px', fontSize: '1.4rem' }}>
                Registrar Nuevo Libro (Capa DTO Completa)
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Fila 1: ISBN y Título */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#a6adc8', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>ISBN *</label>
                        <input 
                            type="text" name="isbn" value={formData.isbn} onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#cdd6f4', boxSizing: 'border-box' }}
                            placeholder="Ej: 9789501239251"
                        />
                    </div>
                    <div style={{ flex: 2 }}>
                        <label style={{ color: '#a6adc8', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Título *</label>
                        <input 
                            type="text" name="titulo" value={formData.titulo} onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#cdd6f4', boxSizing: 'border-box' }}
                            placeholder="Ej: El Aleph"
                        />
                    </div>
                </div>

                {/* Fila 2: Autor y Ejemplares */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 2 }}>
                        <label style={{ color: '#a6adc8', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Autor *</label>
                        <input 
                            type="text" name="autor" value={formData.autor} onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#cdd6f4', boxSizing: 'border-box' }}
                            placeholder="Ej: Jorge Luis Borges"
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#a6adc8', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Ejemplares</label>
                        <input 
                            type="number" name="ejemplares" value={formData.ejemplares} onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#cdd6f4', boxSizing: 'border-box' }}
                            placeholder="50"
                        />
                    </div>
                </div>

                {/* Fila 3: Claves Foráneas (Relaciones de Base de Datos) */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#a6adc8', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>ID Corriente Lit.</label>
                        <input 
                            type="number" name="corrienteId" value={formData.corrienteId} onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#cdd6f4', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#a6adc8', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>ID Subgénero Lit.</label>
                        <input 
                            type="number" name="subgeneroId" value={formData.subgeneroId} onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#cdd6f4', boxSizing: 'border-box' }}
                        />
                    </div>
                </div>

                {/* Fila 4: Finanzas y Tiempos */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#a6adc8', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Año Publicación</label>
                        <input 
                            type="number" name="anioPublicacion" value={formData.anioPublicacion} onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#cdd6f4', boxSizing: 'border-box' }}
                            placeholder="1949"
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ color: '#a6adc8', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Precio ($)</label>
                        <input 
                            type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#cdd6f4', boxSizing: 'border-box' }}
                            placeholder="60000"
                        />
                    </div>
                </div>

                {/* Fila 5: Sinopsis Informativa */}
                <div>
                    <label style={{ color: '#a6adc8', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Sinopsis</label>
                    <textarea 
                        name="sinopsis" value={formData.sinopsis} onChange={handleChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #45475a', background: '#313244', color: '#cdd6f4', boxSizing: 'border-box', height: '80px', resize: 'vertical' }}
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
                    {enviando ? 'Ejecutando transaccion en Spring...' : 'Guardar e Insertar Libro'}
                </button>
            </form>
        </div>
    );
}

export default FormularioLibro;