import React, { createContext, useState, useContext, ReactNode } from "react";

// ----- TIPOS -----
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
  detalles: string;
  fecha: string;
}

// ----- CONTEXTO -----
interface ExplotationContextProps {
  explotations: Explotation[];
  allExplotations: Explotation[];
  setExplotations: React.Dispatch<React.SetStateAction<Explotation[]>>;
  agregarExplotation: (ex: Explotation) => void;

  activities: Activity[];
  agregarActivity: (act: Activity) => void;
}

const ExplotationContext = createContext<ExplotationContextProps | undefined>(undefined);

// ----- HOOK -----
export const useExplotation = (): ExplotationContextProps => {
  const context = useContext(ExplotationContext);
  if (!context) {
    throw new Error("useExplotation debe usarse dentro de ExplotationProvider");
  }
  return context;
};

// ----- PROVIDER -----
interface ExplotationProviderProps {
  userId: string; // Recibimos el `userId` como prop
  children: ReactNode;
}

export const ExplotationProvider: React.FC<ExplotationProviderProps> = ({ userId, children }) => {
  const [allExplotations, setAllExplotations] = useState<Explotation[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Filtramos las explotaciones solo para el `userId` que nos pasan
  const explotations = allExplotations.filter(ex => ex.userId === userId);

  const agregarExplotation = (ex: Explotation) => setAllExplotations(prev => [...prev, ex]);
  const agregarActivity = (act: Activity) => setActivities(prev => [...prev, act]);

  const value: ExplotationContextProps = {
    explotations,
    allExplotations,
    setExplotations: setAllExplotations,
    agregarExplotation,
    activities,
    agregarActivity,
  };

  return (
    <ExplotationContext.Provider value={value}>
      {children}
    </ExplotationContext.Provider>
  );
};