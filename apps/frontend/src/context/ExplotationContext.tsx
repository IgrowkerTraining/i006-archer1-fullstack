import React, { createContext, useState, useContext, ReactNode } from "react";

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
  id: string;
  explotationId: string;
  tipo: string;
  parcela: string;
  cultivo: string;    // <--- AÑADIDO: Ahora Activity reconoce el cultivo
  responsable: string;
  detalles: string;
  fecha: string;
  parcelas: string[];
  
}

interface ExplotationContextProps {
  explotations: Explotation[];
  agregarExplotation: (ex: Explotation) => void;
  activities: Activity[];
  agregarActivity: (act: Activity) => void;
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
  
  const agregarActivity = (act: Activity) => setActivities(prev => [...prev, act]);

  const actualizarActivity = (actActualizada: Activity) => {
    setActivities(prev => 
      prev.map(act => (act.id === actActualizada.id ? { ...actActualizada } : act))
    );
  };

  return (
    <ExplotationContext.Provider 
      value={{ 
        explotations, 
        agregarExplotation, 
        activities, 
        agregarActivity, 
        actualizarActivity 
      }}
    >
      {children}
    </ExplotationContext.Provider>
  );
};