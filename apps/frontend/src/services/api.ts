import { User } from "../types";
import { API_ENDPOINTS } from "../constants/routes";

export const api = {
  // REGISTRO DE USUARIO
  async register(data: any): Promise<{ user: User; message: string }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.REGISTER}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Registration failed");
    return result;
  },

  // LOGIN DE USUARIO
  async login(data: any): Promise<{ user: User; token: string; message: string }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.LOGIN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Login failed");
    return result;
  },

  // CREAR EXPLOTACIÓN
  async createExplotation(data: any): Promise<any> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}/exploitation`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Error al crear explotación");
    return result;
  },

  // CREAR ACTIVIDAD
  async createActivity(data: any): Promise<any> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}/activity`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Error al crear actividad");
    return result;
  },

  // COMPROBACIÓN DE SALUD (HEALTH)
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.HEALTH}`);
      return response.ok;
    } catch {
      return false;
    }
  },
};