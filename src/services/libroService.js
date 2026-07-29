import api from './api';
import axios from 'axios';

export const libroService = {
  obtenerTodos: async (pagina = 0, tamano = 10) => {
    try {
     
      const response = await api.get('/libros/all', {
        params: { page: pagina, size: tamano }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      throw error;
    }
  },

  // 2. Método de conveniencia si algún componente necesita SÓLO el Array de libros
  obtenerListaPlana: async () => {
    try {
      // Pedimos un tamaño grande para traer todo en una sola solicitud
      const response = await api.get('/libros/all', {
        params: { page: 0, size: 1000 }
      });
      return response.data.content; // Devuelve directamente el Array []
    } catch (error) {
      console.error('Error al obtener la lista plana de libros:', error);
      throw error;
    }
  },

  obtenerPorId: async (id) => {
    try {
      const response = await api.get(`/libros/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el libro con ID ${id}:`, error);
      throw error;
    }
  },

  getLibrosPorCorriente: async (movimientoId) => {
        const response = await api.get(`/libros/movimiento/${movimientoId}`);
        return response.data;
    },

  filtrarAvanzado: async (anioInicio, anioFin, pagina = 0, tamano = 10) => {
    const response = await api.get('/libros/filtrar-avanzado', {
      params: { inicio: anioInicio, fin: anioFin, page: pagina, size: tamano }
    });
    return response.data;
  },

  crear: async (libroDTO) => {
    console.log('Enviando libroDTO al servidor:', libroDTO);
    const response = await api.post('/libros/crear', libroDTO); 
    console.log('Respuesta del servidor al crear libro:', response.data);
    return response.data;
  },

  buscar: async(query) => {
    const response = await api.get('/libros/buscar', {
      params: { query }
    });
    return response.data;
  },

  // 2. NUEVO MÉTODO: Especializado para procesar la imagen física
  crearConFoto: async (libroData, archivoImagen) => {
    const formData = new FormData();

    // Convertimos el objeto de texto en un Blob JSON para que calce con @RequestPart("libro")
    formData.append(
      'libro',
      new Blob([JSON.stringify(libroData)], { type: 'application/json' })
    );

    // Adjuntamos el archivo físico binario que calza con @RequestPart("imagen")
    if (archivoImagen) {
      formData.append('imagen', archivoImagen);
    }

    const response = await api.post(`/libros/con-foto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Si usás interceptores para el token Bearer, Axios lo inyecta solo.
        // Si no, agregá acá el Header de Authorization si es necesario.
      },
    });

    return response.data; // Retorna tu LibroResponseDTO con la 'imagenUrl'
  },

  eliminar: async (id) => {
    const response = await api.delete(`/libros/eliminar/${id}`); 
    return response.data;
  }


};

export default libroService;