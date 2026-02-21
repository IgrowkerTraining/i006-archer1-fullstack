import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import RegisterProducer from "../pages/RegisterProducer";
import RegisterTechnician from "../pages/RegisterTechnician";
import Dashboard from "../pages/Dashboard";
import ActividadRegistro from "../pages/ActividadRegistro";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/register/producer"
        element={
          <PublicRoute>
            <RegisterProducer />
          </PublicRoute>
        }
      />

      <Route
        path="/register/technician"
        element={
          <PublicRoute>
            <RegisterTechnician />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PublicRoute>
            <Dashboard />
          </PublicRoute>
        }
      />

      <Route
        path="/actividad"
        element={
          <PublicRoute>
            <ActividadRegistro />
          </PublicRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
