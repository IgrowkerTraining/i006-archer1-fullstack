import React, { createContext, useState, useContext, ReactNode } from "react";
import { api } from "../services/api"; // Importación corregida

export interface Explotation {
  id: string;
  nombre: string;
  ubicacion: string;
  pais: string;
  region: string;
  superficie: number;
  userId: string;
}

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
  explotationId: string;
}

interface ExplotationContextProps {
  explotations: Explotation[];
  agregarExplotation: (ex: Explotation) => void;
  activities: Activity[];
  agregarActivity: (act: Activity) => Promise<void>;
  actualizarActivity: (actActualizada: Activity) => void;
}

const ExplotationContext = createContext<ExplotationContextProps | undefined>(undefined);

export const useExplotation = (): ExplotationContextProps => {
  const context = useContext(ExplotationContext);
  if (!context) throw new Error("useExplotation debe usarse dentro de ExplotationProvider");
  return context;
};

export const ExplotationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [explotations, setExplotations] = useState<Explotation[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const agregarExplotation = (ex: Explotation) => setExplotations(prev => [...prev, ex]);
  
  const agregarActivity = async (act: Activity) => {
    try {
      // Llamamos a la nueva función de api.ts
      const data = await api.createActivity(act);
      setActivities(prev => [...prev, data]);
      console.log("¡Guardado en Docker con éxito!");
    } catch (error) {
      console.error("Error backend:", error);
      // Fallback local por si el Docker está apagado
      setActivities(prev => [...prev, { ...act, id: crypto.randomUUID() }]);
    }
  };

  const actualizarActivity = (actActualizada: Activity) => {
    setActivities(prev => 
      prev.map(act => (act.id === actActualizada.id ? { ...actActualizada } : act))
    );
  };

  return (
    <ExplotationContext.Provider value={{ explotations, agregarExplotation, activities, agregarActivity, actualizarActivity }}>
      {children}
    </ExplotationContext.Provider>
  );
};