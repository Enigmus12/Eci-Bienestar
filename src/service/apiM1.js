const TURNOS_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
    // Turnos
  static async createTurno(dto) {
    const response = await fetch(`${TURNOS_BASE_URL}/api/shifts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error al crear turno');
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return { message: await response.text() };
    }
  }

  static async getTurnos() {
    const response = await fetch(`${TURNOS_BASE_URL}/api/shifts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(await response.text() || 'Error al obtener turnos');
    return response.json();
  }

  static async getShiftsByUserId(userId) {
    const response = await fetch(`${TURNOS_BASE_URL}/api/shifts/user/${userId}`);
    if (!response.ok) throw new Error("No se pudo obtener los turnos del usuario");
    return response.json();
  }

}
export default ApiService;