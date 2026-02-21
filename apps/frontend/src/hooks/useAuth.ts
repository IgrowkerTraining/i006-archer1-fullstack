// src/hooks/useAuth.ts
import { useAuth as useAuthContext } from "../context/AuthContext";
import { User } from "../types";
import { useExplotation } from "../context/ExplotationContext"; // <-- usar el hook correcto

export const useAuth = () => {
  const { authState, login, logout, setLoading, setError } = useAuthContext();
  const { setExplotations } = useExplotation(); // <-- hook singular

  const loginUser = (user: User) => {
    login(user);
  };

  const logoutUser = () => {
    // Limpiamos las explotaciones al cerrar sesión
    setExplotations([]);
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
    login: loginUser,
    logout: logoutUser,
    setLoading,
    setError,
    clearError,
  };
};
