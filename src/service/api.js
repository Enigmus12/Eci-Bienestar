const API_BASE_URL = 'https://seguimientofisicoreservas-c0dhhcgyb0b9atcc.eastus2-01.azurewebsites.net';
const TURNOS_BASE_URL = import.meta.env.VITE_API_URL;

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

  static decodeToken() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return decoded;
    } catch (e) {
      return null;
    }
  }

  static async login(userName, password) {
    const response = await fetch(`${API_BASE_URL}/user-service/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, password }),
    });
    if (!response.ok) throw new Error('Credenciales incorrectas');
    const data = await response.json();
    if (data && data.token) this.setToken(data.token);
    return data;
  }

  static async createSemestralSchedule(dto) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/gym-schedules/create-semestral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error(await response.text() || 'Error al crear el horario');
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
    if (!response.ok) throw new Error(await response.text() || 'Error al reservar grupo');
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
    if (!response.ok) throw new Error(await response.text() || 'Error al obtener los horarios');
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
    if (!response.ok) throw new Error(await response.text() || 'Error al obtener reservas');
    return response.json();
  }

  static async createRoutine(dto) {
    const token = this.getToken();
    const {
      name, objective, description, duration, frequency, assignedTrainer = null, exercises = []
    } = dto;

    const cleanRoutine = {
      name,
      objective,
      description,
      duration,
      frequency,
      assignedTrainer,
      exercises: exercises.map(ex => ({
        name: ex.name,
        description: ex.description,
        sets: Number(ex.sets),
        repetitions: Number(ex.repetitions),
        instructions: ex.instructions
      }))
    };

    const response = await fetch(`${API_BASE_URL}/routine-service/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(cleanRoutine),
    });
    if (!response.ok) throw new Error(await response.text() || 'Error al crear rutina');
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
    if (!response.ok) throw new Error(await response.text() || 'Error al obtener rutinas');
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
    if (!response.ok && response.status !== 204) throw new Error(await response.text() || 'Error al eliminar rutina');
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
    if (!response.ok) throw new Error(await response.text() || 'Error al registrar datos físicos');
    return response.json();
  }

  static async getAllRoutines() {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/routine-service/routines`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) throw new Error(await response.text() || 'Error al obtener rutinas');
    return response.json();
  }

  static async getAllPhysicalRecords() {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/tracking-service/records`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) throw new Error(await response.text() || 'Error al obtener registros físicos');
    return response.json();
  }

  static async updatePhysicalRecord(id, recordDTO) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/tracking-service/records/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(recordDTO),
    });
    if (!response.ok && response.status !== 204) throw new Error(await response.text() || 'Error al actualizar el registro');
    return true;
  }

  static async getRoutineById(id) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/routine-service/routine/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) return null;
    return response.json();
  }

  
}

export default ApiService;
