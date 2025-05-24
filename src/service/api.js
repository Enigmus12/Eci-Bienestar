// src/service/api.js
// Clase para manejar peticiones a la API y gestión de token

const API_BASE_URL = 'https://seguimientofisico-d2ebhzd3fwfdh4as.canadacentral-01.azurewebsites.net'; // Cambia el puerto si tu backend usa otro

class ApiService {
  static token = null;

  static setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  static getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  static async login(userName, password) {
    const response = await fetch(`${API_BASE_URL}/user-service/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
    });
    if (!response.ok) {
      throw new Error('Credenciales incorrectas');
    }
    const data = await response.json();
    if (data && data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  // Puedes agregar más métodos para otros endpoints aquí
}

export default ApiService;
