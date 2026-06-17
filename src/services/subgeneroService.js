import api from "./api";

export const subgeneroService = {
    obtenerTodos: async () => {
        try {
            const response = await api.get('/subgenero/all');
            return response.data;
        } catch (error) {
            console.error('Error al obtener los subgéneros:', error);
            throw error;
        }
    }
};

export default subgeneroService;