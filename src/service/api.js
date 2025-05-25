// src/service/api.js
// Clase para manejar peticiones a la API y gestión de token

const API_BASE_URL = 'https://seguimientofisicoreservas-c0dhhcgyb0b9atcc.eastus2-01.azurewebsites.net'; 

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

  static async createSemestralSchedule(gymSchedulesDTO) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/gym-schedules/create-semestral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(gymSchedulesDTO),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al crear el horario');
    }
    return response.json();
  }

    static async reserveGymGroup(scheduleGroupId) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/gym/reserve-group/${scheduleGroupId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al reservar grupo');
    }
    return response.json();
  }

    static async getAllSchedules() {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/gym-schedules`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al obtener los horarios');
    }
    return response.json();
  }

    static async getMyReservations() {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/gym/my-reservations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al obtener reservas');
    }
    return response.json();
  }

  static async createRoutine(routineDTO) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/routine-service/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(routineDTO),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al crear rutina');
    }
    return response.json();
  }

    static async getMyRoutines() {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/routine/my-routines`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al obtener rutinas');
    }
    return response.json();
  }

  static async deleteRoutine(id) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/routine/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok && response.status !== 204) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al eliminar rutina');
    }
    return true;
  }

    static async registerAutoPhysicalData(dto) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/records/auto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al registrar datos físicos');
    }
    return response.json();
  }

}

export default ApiService;
