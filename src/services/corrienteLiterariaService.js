import api from './api';

export const corrienteLiterariaService = {
  obtenerTodos: async () => {
    try {
      // Esto le pegará exactamente a http://localhost:8080/api/movimientos/all
      const response = await api.get('/movimientos/all');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los movimientos:', error);
      throw error;
    }
  }
};

export default corrienteLiterariaService;