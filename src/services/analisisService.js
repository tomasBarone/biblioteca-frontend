import axios from 'axios';
import api from './api';


const analisisService = {
    // Al usar @MapsId en el backend, el id del análisis es el mismo id del libro
    obtenerPorLibroId: async (id) => {
        try {
            const response = await api.get(`/analisis/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error en analisisService.obtenerPorLibroId(${id}):`, error);
            throw error;
        }
    },

    crearAnalisis: async (analisisData) => {
       
            
            const response = await api.post(`/analisis`, analisisData, config);
            console.log('Respuesta del servidor al crear análisis:', response.data);
            return response.data;
           
        
    }
};

export default analisisService;