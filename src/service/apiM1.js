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

  // Obtener datos de usuario por ID
  static async getUserById(userId) {
    try {
      // Ajusta la URL según tu arquitectura real
      const response = await axios.get(`https://shiftmanager-hrbgeaamdmg6ehb5.canadacentral-01.azurewebsites.net/user-service/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'No se pudo obtener el usuario');
    }
  }

  // Actualizar estado de un turno por turnCode
  static async updateTurnStatus(turnCode, status) {
    try {
      const response = await axios.put(
        `${TURNOS_BASE_URL}/${turnCode}`,
        { status },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || 'No se pudo actualizar el estado del turno');
    }
  }
}

export default ApiService;