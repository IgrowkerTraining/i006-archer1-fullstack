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

  const agregarExplotation = useCallback(async (ex: any) => {
    try {
      const response = await api.createExplotation(ex); 
      
      setExplotations((prev) => [...prev, response || ex]);
      
      return response || ex;
    } catch (error) {
      console.error("Error en agregarExplotation:", error);
      throw error;
    }
  }, []);

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
    // 1. Intentamos avisar al servidor (por si acaso lo arreglan en el futuro)
    // Pero como sabemos que falla, rodeamos esto con un try/catch interno
    try {
      await api.updateActivity(id, act);
    } catch (e) {
      console.warn("El servidor no soporta edición, guardando solo en local.");
    }

    // 2. ACTUALIZAMOS EL LOCAL STORAGE (Esto es lo importante)
    const userStr = localStorage.getItem('example_user');
    const userId = JSON.parse(userStr || '{}').id;
    
    if (userId) {
      const localesStr = localStorage.getItem(`local_activities_${userId}`);
      let actuales: Activity[] = localesStr ? JSON.parse(localesStr) : [];
      
      // Reemplazamos la actividad vieja por la editada en la lista local
      const actualizadas = actuales.map(a => (a.id === id ? { ...act, id } : a));
      localStorage.setItem(`local_activities_${userId}`, JSON.stringify(actualizadas));
    }

    // 3. Actualizamos la interfaz al momento
    setActivities(prev => prev.map(a => (a.id === id ? { ...act, id } : a)));
    
    // No lanzamos el error (throw) para que el modal se cierre con éxito
  } catch (error) {
    console.error("Error crítico en la edición local:", error);
  }
}, []);

  return (
    <ExplotationContext.Provider 
      value={{ 
        explotations,
        agregarExplotation,
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