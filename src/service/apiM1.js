import axios from "axios";

const TURNOS_BASE_URL = "https://shiftmanager-hrbgeaamdmg6ehb5.canadacentral-01.azurewebsites.net/api/shifts";

class ApiService {
  // Crear turno
  static async createTurno(dto) {
    try {
      const response = await axios.post(`${TURNOS_BASE_URL}`, dto, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || error.message || 'Error al crear turno');
    }
  }

  // Obtener todos los turnos
  static async getTurnos() {
    try {
      const response = await axios.get(`${TURNOS_BASE_URL}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || error.message || 'Error al obtener turnos');
    }
  }

  // Obtener turnos por usuario
  static async getShiftsByUserId(userId) {
    try {
      const response = await axios.get(`${TURNOS_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'No se pudo obtener los turnos del usuario');
    }
  }

  // Eliminar turno por turnCode
  static async deleteTurnByCode(turnCode) {
    try {
      const response = await axios.delete(`${TURNOS_BASE_URL}/turnCode/${turnCode}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'No se pudo eliminar el turno');
    }
  }
}

export default ApiService;