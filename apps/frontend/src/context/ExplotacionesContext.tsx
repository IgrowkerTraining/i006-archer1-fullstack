
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

export interface Explotacion {
  id: string;
  nombre: string;
  ubicacion: string;
  pais: string;
  region: string;
  superficie: number;
  userId: string; 
}

interface ExplotacionesContextProps {
  explotaciones: Explotacion[];
  agregarExplotacion: (explotacion: Explotacion) => void;
  setExplotaciones: React.Dispatch<React.SetStateAction<Explotacion[]>>;
  allExplotaciones: Explotacion[]; 
}

const ExplotacionesContext = createContext<ExplotacionesContextProps | undefined>(undefined);

export const useExplotaciones = () => {
  const context = useContext(ExplotacionesContext);
  if (!context) {
    throw new Error("useExplotaciones debe usarse dentro de ExplotacionesProvider");
  }
  return context;
};

export const ExplotacionesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [allExplotaciones, setAllExplotaciones] = useState<Explotacion[]>([]);

  
  const explotaciones = allExplotaciones.filter((ex) => ex.userId === user?.id);

  const agregarExplotacion = (explotacion: Explotacion) => {
    setAllExplotaciones((prev) => [...prev, explotacion]);
  };

  return (
    <ExplotacionesContext.Provider
      value={{
        explotaciones,
        agregarExplotacion,
        setExplotaciones: setAllExplotaciones,
        allExplotaciones,
      }}
    >
      {children}
    </ExplotacionesContext.Provider>
  );
};
