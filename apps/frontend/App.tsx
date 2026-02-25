import React from "react";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./src/context/AuthContext";
import { ExplotationProvider } from "./src/context/ExplotationContext";
import { Layout } from "./src/components/layout/Layout";
import { LoadingSpinner } from "./src/components/layout/LoadingSpinner";
import { AppRoutes } from "./src/routes/AppRoutes";
import { useAuth } from "./src/hooks/useAuth";
import { useNavigate } from "react-router-dom";



export const OnboardingScreen: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      console.log(`Role selected: ${selectedRole}`);
      navigate('/login');
    }
  }
  };




// --- Componente que usa useAuth ---
const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Initializing..." />;
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

// --- App principal ---
// Primero AuthProvider, luego ExplotationProvider, luego AppContent
export const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ExplotationProvider>
          <AppContent />
        </ExplotationProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
