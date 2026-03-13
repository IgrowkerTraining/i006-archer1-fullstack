import { API_ENDPOINTS } from "../constants/routes";

export const api = {
  async login(data: any) {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.LOGIN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      },
    );

    const result = await response.json();
    console.log(result);

    if (!response.ok) throw new Error(result.message || "Error en el login");
    return result;
  },

  async register(data: any) {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.REGISTER}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      },
    );

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Error en el registro");
    return result;
  },

  async getActivities(producerId: string): Promise<any[]> {
    if (!producerId) return [];

    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASE}/activity/${producerId}`,
        {
          credentials: "include",
        },
      );

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
      credentials: "include",
    });

    if (!response.ok) throw new Error("Error al guardar");
    return await response.json();
  },

  async updateActivity(activityId: string, data: any): Promise<any> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}/activity/${activityId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      },
    );

    if (!response.ok) throw new Error("Error al actualizar la actividad");
    return await response.json();
  },

  async getExplotationsByProducer(producerId: string): Promise<any[]> {
    if (!producerId) return [];

    const response = await fetch(
      `${API_ENDPOINTS.BASE}/exploitation/${producerId}`,
      {
        credentials: "include",
      },
    );

    if (!response.ok) return [];
    return await response.json();
  },

  async createExplotation(data: any): Promise<any> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}/exploitation/createExploitation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      },
    );

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  },

  // =========================
  // OBSERVACIONES
  // =========================

  async createObservation(data: {
    observation: string;
    agroactivity: string;
  }): Promise<any> {
    const response = await fetch(`${API_ENDPOINTS.BASE}/observation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  },

  async getObservationsByActivity(activityId: string): Promise<any[]> {
    if (!activityId) return [];

    try {
      const response = await fetch(
        `${API_ENDPOINTS.BASE}/observation/${activityId}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      return [];
    }
  },
  // =========================
  // RESUMEN
  // =========================

  async getResume(
    exploitationId: string,
    month: number,
    year: number,
  ): Promise<any> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}/resume/${exploitationId}?month=${month}&year=${year}`,
      {
        credentials: "include",
      },
    );

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  },

  async getResumeData(
    exploitationId: string,
    month: number,
    year: number,
  ): Promise<any> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}/resume/data/${exploitationId}?month=${month}&year=${year}`,
      {
        credentials: "include",
      },
    );

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  },
};
