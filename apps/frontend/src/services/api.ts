import { API_ENDPOINTS } from "../constants/routes";

export const api = {
  async login(data: any) {
    const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Error en el login");
    return result;
  },

  async register(data: any) {
    const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.REGISTER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Error en el registro");
    return result;
  },

  async getActivities(producerId: string): Promise<any[]> {
    if (!producerId) return [];
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}/activity/${producerId}`);
      if (!response.ok) return []; 
      return await response.json();
    } catch (error) {
      return [];
    }
  },

  async createActivity(data: any): Promise<any> {
    const response = await fetch(`${API_ENDPOINTS.BASE}/activity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al guardar");
    return await response.json();
  },

async updateActivity(activityId: string, data: any): Promise<any> {
  const response = await fetch(`${API_ENDPOINTS.BASE}/agroactivity/${activityId}`, {
    method: "PUT", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al actualizar la actividad");
  return await response.json();
},

  async getExplotationsByProducer(producerId: string): Promise<any[]> {
    if (!producerId) return [];
    const response = await fetch(`${API_ENDPOINTS.BASE}/exploitation/${producerId}`);
    if (!response.ok) return [];
    return await response.json();
  },

  async createExplotation(data: any): Promise<any> {
    const response = await fetch(`${API_ENDPOINTS.BASE}/exploitation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
};