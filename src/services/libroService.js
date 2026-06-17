import api from './api';

export const libroService = {
  obtenerTodos: async () => {
    try {
      // Agregamos el prefijo /libros
      const response = await api.get('/libros/all'); 
      return response.data;
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      throw error;
    }
  },

  filtrarAvanzado: async (inicio, fin, pagina = 0, tamano = 10) => {
    const response = await api.get('/libros/filtrar-avanzado', {
      params: { inicio, fin, page: pagina, size: tamano }
    });
    return response.data;
  },

  crear: async (libroDTO) => {
    console.log('Enviando libroDTO al servidor:', libroDTO);
    const response = await api.post('/libros/crear', libroDTO); 
    console.log('Respuesta del servidor al crear libro:', response.data);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await api.delete(`/libros/eliminar/${id}`); 
    return response.data;
  }
};

export default libroService;