// src/hooks/useAuth.ts
import { useAuth as useAuthContext } from "../context/AuthContext";
import { User } from "../types";
import { useExplotation } from "../context/ExplotationContext";

export const useAuth = () => {
  // Extraemos las funciones del contexto original de autenticación
  const { authState, login, logout, setLoading, setError } = useAuthContext();
  
  // Extraemos lo necesario del contexto de explotaciones
  // Nota: Si 'explotations' no existe en el context, asegúrate de que el tipado coincida
  const { explotations } = useExplotation(); 

  /**
   * FUNCIÓN CORREGIDA:
   * Ahora acepta 'token' para que LoginScreen no marque error.
   */
  const loginUser = (user: User, token: string) => {
    // Pasamos ambos datos al login del AuthContext
    // Si tu AuthContext.login aún no acepta token, tendrás que añadirlo allí también.
    login(user, token);
  };

  const logoutUser = () => {
    // Aquí podrías añadir una función en ExplotationContext para resetear las fincas si fuera necesario
    // Por ahora llamamos al logout de autenticación
    logout();
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading,
    error: authState.error,
    login: loginUser, // Esta es la función que usa LoginScreen
    logout: logoutUser,
    setLoading,
    setError,
    clearError,
    explotations, // Opcional: exponemos las explotaciones aquí también
  };
};