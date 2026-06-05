import api from './api';

export const libroService = {
    

    obtenerTodos: async () =>{
      try{
        
        const response = await api.get('/all');
        return response.data;
      } catch (error) {
        console.error('Error al obtener los libros:', error);
        throw error;
      }
    },

//  GET para obtener libros por género
  filtrarAvanzado: async (inicio, fin, pagina = 0, tamano = 10) => {
    const response = await api.get('/libros/filtrar-avanzado', {
      params: { inicio, fin, page: pagina, size: tamano }
    });
    return response.data;
  },

  // POST para crear un nuevo libro
  crear: async (libroDTO) => {
    const response = await api.post('/crear', libroDTO);
    return response.data;
  },

  // DELETE para eliminar un libro por ID
  eliminar: async (id) => {
    const response = await api.delete(`/eliminar/${id}`); 
       return response.data;
  }
};


export default libroService;
