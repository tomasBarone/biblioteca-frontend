import React, { useState, useEffect } from 'react';
import corrienteLiterariaService from '../services/corrienteLiterariaService';
import subgeneroService from '../services/subgeneroService';
import libroService from '../services/libroService';
import axios from 'axios';

export const FormularioLibro = ({ cerrarModal, refrescarLista }) => {
  // 1. Estado unificado del libro
  const [libro, setLibro] = useState({
    isbn: '',
    titulo: '',
    autor: '',
    ejemplares: '',
    corrienteId: '',   // Forzamos a elegir en la UI
    subgeneroId: '',   // Opcional, viaja limpio
    anioPublicacion: '',
    precio: '',
    sinopsis: ''
  });
  
  // 2. Estados exclusivos para el archivo binario y preview
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  // 3. Estados para las listas dinámicas desde la Base de Datos
  const [corrientes, setCorrientes] = useState([]);
  const [subgeneros, setSubgeneros] = useState([]);
  const [cargandoCorrientes, setCargandoCorrientes] = useState(true);
  const [cargandoSubgeneros, setCargandoSubgeneros] = useState(true);
  const [enviando, setEnviando] = useState(false);

  // 4. Carga de Corrientes Literarias al montar el componente
  useEffect(() => {
    corrienteLiterariaService.obtenerTodos()
      .then(data => {
        setCorrientes(data);
        setCargandoCorrientes(false);
      })
      .catch(err => {
        console.error("Error al recuperar corrientes:", err);
        setCargandoCorrientes(false);
      });
  }, []);

  // 5. Carga de Subgéneros al montar el componente
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

  // Manejador para inputs de texto, números y selectores
  const handleInputChange = (e) => {
    
    setLibro({ ...libro, [e.target.name]: e.target.value });
  };

  // Manejador para el archivo de imagen
  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setImagen(archivo);
      setPreview(URL.createObjectURL(archivo));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación previa local
    if (!libro.titulo.trim() || !libro.autor.trim() || !libro.corrienteId) {
        alert('Por favor, completa los campos obligatorios (Título, Autor y Corriente)');
        return;
    }

    setEnviando(true);
    try {
      let resultado;
      
      // Mapeo y tipado limpio compatible con tu DTO en Spring Boot
      const libroDto = {
        isbn: libro.isbn.trim(),
        titulo: libro.titulo.trim(),
        autor: libro.autor.trim(),
        ejemplares: parseInt(libro.ejemplares, 10) || 1,
        corrienteId: parseInt(libro.corrienteId, 10),
        subgeneroId: libro.subgeneroId ? parseInt(libro.subgeneroId, 10) : null,
        anioPublicacion: parseInt(libro.anioPublicacion, 10) || 2026,
        precio: parseFloat(libro.precio) || 0.0,
        sinopsis: libro.sinopsis.trim()
      };

      if (imagen) {
        // FLUJO MULTIPART: Pasamos el DTO limpio y el archivo binario
        resultado = await libroService.crearConFoto(libroDto, imagen);
      } else {
        // FLUJO TRADICIONAL: Solo el JSON limpio
        resultado = await libroService.crear(libroDto);
      }
      
      alert('¡Libro guardado con éxito!');
      console.log('Respuesta del backend:', resultado);

      if (typeof refrescarLista === 'function') refrescarLista();
      if (typeof cerrarModal === 'function') cerrarModal();

    } catch (error) {
      console.error('Error al guardar el libro:', error);
      alert('Hubo un error en el servidor al procesar la solicitud.');
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
              type="text" name="isbn" value={libro.isbn} onChange={handleInputChange} 
              style={inputStyle} placeholder="Ej: 9789501239251" 
            />
          </div>
          <div style={{ flex: 2 }}>
            <label style={labelStyle}>Título *</label>
            <input 
              type="text" name="titulo" value={libro.titulo} onChange={handleInputChange} 
              style={inputStyle} placeholder="Ej: El Aleph" 
            />
          </div>
        </div>

        {/* Fila 2: Autor y Ejemplares */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 2 }}>
            <label style={labelStyle}>Autor *</label>
            <input 
              type="text" name="autor" value={libro.autor} onChange={handleInputChange} 
              style={inputStyle} placeholder="Ej: Jorge Luis Borges" 
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Ejemplares</label>
            <input 
              type="number" name="ejemplares" value={libro.ejemplares} onChange={handleInputChange} 
              style={inputStyle} placeholder="50" 
            />
          </div>
        </div>

        {/* Fila 3: Selectores Dinámicos Acoplados */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Corriente Literaria *</label>
            {cargandoCorrientes ? (
              <span style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#6a6d63' }}>Conectando a Spring...</span>
            ) : (
              <select 
                name="corrienteId" value={libro.corrienteId} onChange={handleInputChange}
                style={{ ...inputStyle, cursor: 'pointer', outline: 'none' }}
              >
                <option value="">Seleccione corriente...</option>
                {corrientes.map(c => (
                  <option key={c.id} value={c.id} style={{ background: '#313244', color: '#fff' }}>{c.nombre}</option>
                ))}
              </select>
            )}
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>ID Subgénero Lit.</label>
            {cargandoSubgeneros ? (
              <span style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#6a6d63' }}>Conectando a Spring...</span>
            ) : (
              <select 
                name="subgeneroId" value={libro.subgeneroId} onChange={handleInputChange}
                style={{ ...inputStyle, cursor: 'pointer', outline: 'none' }}
              >
                <option value="">Seleccione subgénero...</option>
                {subgeneros.map(s => (
                  <option key={s.id} value={s.id} style={{ background: '#313244', color: '#fff' }}>{s.nombre}</option>
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
              type="number" name="anioPublicacion" value={libro.anioPublicacion} onChange={handleInputChange} 
              style={inputStyle} placeholder="1949" 
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Precio ($)</label>
            <input 
              type="number" step="0.01" name="precio" value={libro.precio} onChange={handleInputChange} 
              style={inputStyle} placeholder="60000" 
            />
          </div>
        </div>

        {/* Fila 5: Sinopsis Informativa */}
        <div>
          <label style={labelStyle}>Sinopsis</label>
          <textarea 
            name="sinopsis" value={libro.sinopsis} onChange={handleInputChange} 
            placeholder="Breve descripción del libro..." 
            style={{ ...inputStyle, height: '80px', resize: 'vertical' }} 
          />
        </div>

        {/* Fila 6: Input de Imagen Binaria */}
        <div>
          <label style={labelStyle}>Portada del Libro (Opcional)</label>
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/jpg" 
            onChange={handleFileChange} 
            style={{ ...inputStyle, padding: '8px', cursor: 'pointer' }}
          />
        </div>

        {/* Previsualización Miniatura Integrada */}
        {preview && (
          <div style={{ 
            marginTop: '4px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px',
            background: '#c6c6cf44',
            padding: '10px',
            borderRadius: '6px',
            border: '1px dashed #c1c4cc',
            width: 'fit-content'
          }}>
            <span style={{ ...labelStyle, marginBottom: 0 }}>Vista previa:</span>
            <img src={preview} alt="Preview" style={{ width: '100px', height: 'auto', borderRadius: '4px', border: '1px solid #c1c4cc' }} />
          </div>
        )}

        {/* Fila de Botones de Acción de tu diseño */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
          <button 
            type="button" 
            onClick={cerrarModal}
            style={{ background: 'transparent', color: '#6a6d63', border: '1px solid #353638', padding: '12px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={enviando}
            style={{
              background: '#a6e3a1', color: '#11111b', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s', flex: 1, maxWidth: '280px'
            }}
          >
            {enviando ? 'Ejecutando...' : 'Guardar Libro'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default FormularioLibro;