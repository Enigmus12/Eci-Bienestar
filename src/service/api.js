import axios from 'axios';

// Configuración base para axios
const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token a las solicitudes autenticadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicio para autenticación y usuarios
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/user-service/login', credentials);
    return response.data;
  }
};

export default api;
