import React, { createContext, useState, useContext, ReactNode, useCallback } from "react";
import { api } from "../services/api";

export interface Activity {
  id?: string;
  plot: string;
  crop: string;
  activitytype: string;
  responsible: string;
  description: string;
  date_day: number;
  date_month: number;
  date_year: number;
  explotation: string;
}

interface ExplotationContextProps {
  explotations: any[];
  activities: Activity[];
  agregarActivity: (act: Activity) => Promise<void>;
  // AÑADIMOS ESTO A LA INTERFAZ:
  agregarExplotation: (ex: any) => Promise<any>; 
  actualizarActivity: (id: string, act: Activity) => Promise<void>;
  cargarExplotacionesByProducer: (producerId: string) => Promise<any[]>;
  cargarActividades: () => Promise<void>;
}

const ExplotationContext = createContext<ExplotationContextProps | undefined>(undefined);

export const useExplotation = () => {
  const context = useContext(ExplotationContext);
  if (!context) throw new Error("useExplotation debe usarse dentro de ExplotationProvider");
  return context;
};

export const ExplotationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [explotations, setExplotations] = useState<any[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // --- NUEVA FUNCIÓN QUE FALTABA ---
  const agregarExplotation = useCallback(async (ex: any) => {
    try {
      // Llamamos a la API para guardar en Supabase
      const response = await api.createExplotation(ex); 
      
      // Actualizamos el estado local para que aparezca en la lista
      setExplotations((prev) => [...prev, response || ex]);
      
      return response || ex;
    } catch (error) {
      console.error("Error en agregarExplotation:", error);
      throw error; // Lanzamos el error para que el componente lo huela
    }
  }, []);
  // --------------------------------

  const cargarActividades = useCallback(async () => {
    try {
      const userStr = localStorage.getItem('example_user');
      if (!userStr) return;
      
      const userData = JSON.parse(userStr);
      const userId = userData?.id;
      if (!userId) return;

      const data = await api.getActivities(userId);
      
      const localesStr = localStorage.getItem(`local_activities_${userId}`);
      const actividadesLocales: Activity[] = localesStr ? JSON.parse(localesStr) : [];

      let combinadas: Activity[] = [];
      
      if (Array.isArray(data) && data.length > 0) {
        combinadas = data.map((act: any) => ({
          ...act,
          explotation: act.explotation || act.exploitation || ""
        }));
      } else {
        combinadas = actividadesLocales;
      }

      setActivities(combinadas);
    } catch (error) {
      console.error("Error al cargar actividades:", error);
    }
  }, []);

  const cargarExplotacionesByProducer = useCallback(async (producerId: string) => {
    if (!producerId) return [];
    try {
      const data = await api.getExplotationsByProducer(producerId);
      setExplotations(data || []);
      return data;
    } catch (error) {
      return [];
    }
  }, []);

  const agregarActivity = useCallback(async (act: Activity) => {
    try {
      const response = await api.createActivity(act);
      const nuevaAct = response || act;
      
      const userStr = localStorage.getItem('example_user');
      const userId = JSON.parse(userStr || '{}').id;
      
      if (userId) {
        const localesStr = localStorage.getItem(`local_activities_${userId}`);
        const actuales: Activity[] = localesStr ? JSON.parse(localesStr) : [];
        const nuevas = [nuevaAct, ...actuales];
        localStorage.setItem(`local_activities_${userId}`, JSON.stringify(nuevas));
      }

      setActivities(prev => [nuevaAct, ...prev]);

    } catch (error) {
      console.error("Error al guardar actividad:", error);
      setActivities(prev => [act, ...prev]);
    }
  }, []);

  const actualizarActivity = useCallback(async (id: string, act: Activity) => {
    try {
      await api.updateActivity(id, act);

      const userStr = localStorage.getItem('example_user');
      const userId = JSON.parse(userStr || '{}').id;
      if (userId) {
        const localesStr = localStorage.getItem(`local_activities_${userId}`);
        if (localesStr) {
          const actuales: Activity[] = JSON.parse(localesStr);
          const actualizadas = actuales.map(a => (a.id === id ? { ...act, id } : a));
          localStorage.setItem(`local_activities_${userId}`, JSON.stringify(actualizadas));
        }
      }

      setActivities(prev => prev.map(a => (a.id === id ? { ...act, id } : a)));
    } catch (error) {
      console.error("Error al actualizar actividad:", error);
      throw error;
    }
  }, []);

  return (
    <ExplotationContext.Provider 
      value={{ 
        explotations,
        agregarExplotation, // <--- YA NO SALDRÁ ROJO PORQUE YA EXISTE ARRIBA
        activities, 
        agregarActivity, 
        actualizarActivity,
        cargarExplotacionesByProducer, 
        cargarActividades 
      }}
    >
      {children}
    </ExplotationContext.Provider>
  );
};