import React from "react";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./src/context/AuthContext";
import { ExplotationProvider } from "./src/context/ExplotationContext";
import { Layout } from "./src/components/layout/Layout";
import { LoadingSpinner } from "./src/components/layout/LoadingSpinner";
import { AppRoutes } from "./src/routes/AppRoutes";
import { useAuth } from "./src/hooks/useAuth";

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