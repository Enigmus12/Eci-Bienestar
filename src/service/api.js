
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

  // Decodifica un JWT y retorna el payload como objeto
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

  // Obtiene el historial físico por userId
  static async getPhysicalHistoryByUserId(userId) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/tracking-service/records/userId/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al obtener historial físico');
    }
    return response.json();
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
    // Solo enviar los campos requeridos por el backend
    const {
      name,
      objective,
      description,
      duration,
      frequency,
      assignedTrainer = null,
      exercises = []
    } = routineDTO;
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
    const response = await fetch(`${API_BASE_URL}/tracking-service/records/auto`, {
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

    // Obtener todas las rutinas (para Coach)
  static async getAllRoutines() {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/routine-service/routines`, {
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

    // Obtener todos los registros físicos (para Coach)
  static async getAllPhysicalRecords() {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/tracking-service/records`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al obtener registros físicos');
    }
    return response.json();
  }

  // Modificar observaciones y rutina activa de un registro físico
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
    if (!response.ok && response.status !== 204) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al actualizar el registro');
    }
    return true;
  }

    // Obtener rutina por id
  static async getRoutineById(id) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/routine-service/routine/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  }

   // Obtener todos los horarios
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

  // Obtener días reprogramados por usuario
  static async getRescheduledByUser(userId) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/daily-schedule/rescheduled/by-user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al obtener días reprogramados');
    }
    return response.json();
  }
    // Modifica la capacidad de un grupo de horarios por scheduleGroupId
  static async updateGroupCapacity(scheduleGroupId, capacity) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/gym-schedules/group-capacity/${scheduleGroupId}?capacity=${capacity}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al modificar la capacidad del grupo');
    }
    return response.json();
  }

    // Obtener datos de usuario por userId
  static async getUserById(userId) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/user-service/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al obtener usuario');
    }
    return response.json();
  }

    // Cancela un horario específico por fecha
  static async cancelScheduleByDate(date) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/daily-schedule/remove-user/by-date/${date}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al cancelar horario');
    }
    return response.json();
  }

    // Obtener días festivos o reprogramados por grupo de horarios
  static async getHolidaySchedulesByGroup(scheduleGroupId) {
    const token = this.getToken();
    const response = await fetch(`${API_BASE_URL}/daily-schedule/holidays/by-group/${scheduleGroupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al obtener días festivos/reprogramados');
    }
    return response.json();
  }


}

export default ApiService;