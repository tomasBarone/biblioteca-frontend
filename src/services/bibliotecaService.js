import api from './api';

const bibliotecaService = {

  getMisLecturas: async () => {
    try {
      const response = await api.get('/biblioteca');
      return response.data; // <--- Retornar .data, no response completo
    }
    catch (error) {
      console.error("Error al obtener mis lecturas:", error);
      throw error;
    }
  },

  // Alias para mantener compatibilidad si en el componente usás este nombre
  obtenerMisLecturas: async () => {
    return await bibliotecaService.getMisLecturas();
  },

  checkEstaGuardado: async (libroId) => {
    try {
      const response = await api.get(`/biblioteca/check/${libroId}`);
      return response.data.guardado;
    } catch (error) {
      console.warn(`No se pudo verificar el estado del libro ${libroId}:`, error);
      return false;
    }
  },

  toggleGuardado: async (libroId) => {
    const response = await api.post(`/biblioteca/toggle/${libroId}`);
    return response.data;
  }
};

export default bibliotecaService;