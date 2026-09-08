import axios from 'axios';

// Definimos ambas URLs explícitamente
const LOCAL_URL = 'http://localhost:8080/api';
const CLOUD_URL = 'https://libreria-backend-6wqf.onrender.com/api';

// Elegimos cuál usar cambiando una sola bandera booleana (true = local, false = nube)
const USAR_LOCAL = false; 

const API_URL = USAR_LOCAL ? LOCAL_URL : CLOUD_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;