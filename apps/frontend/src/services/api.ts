import { User } from "../types";
import { API_ENDPOINTS } from "../constants/routes";

export const api = {
  // 1. REGISTRO
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

  // 2. LOGIN
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

  // 3. EXPLOTACIONES (CONEXIÓN DOCKER PUERTO 3000)
  async createExplotation(data: any): Promise<any> {
    const response = await fetch(
      `http://localhost:3000/api/exploitation`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Error al crear explotación");
    return result;
  },

  // 4. ACTIVIDADES (CONEXIÓN DOCKER PUERTO 3000)
  async createActivity(data: any): Promise<any> {
    const response = await fetch(
      `http://localhost:3000/api/activity`, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Error al crear actividad");
    return result;
  },

  // 5. SALUD DEL SISTEMA
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.HEALTH}`);
      return response.ok;
    } catch {
      return false;
    }
  },
};