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
       
            
            const response = await api.post(`analisis/crear`, analisisData);
            console.log('Respuesta del servidor al crear análisis:', response.data);
            return response.data;
           
        
    },

    actualizarAnalisis: async (analisisData) => {
        try {
            const response = await api.put(`analisis/actualizar/${analisisData.id}`, analisisData);
            console.log('Respuesta del servidor al actualizar análisis:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error en analisisService.actualizarAnalisis:', error);
            throw error;
        }
    }   

};

export default analisisService;