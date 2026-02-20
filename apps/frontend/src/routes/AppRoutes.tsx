import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PaginaInicio from "../pages/PaginaInicio";
import HomeProductor from "../pages/HomeProductor";
import ActividadRegistro from "../pages/ActividadRegistro";
import AgregarExplotacion from "../pages/AgregarExplotacion";
import HomeTecnico from "../pages/HomeTecnico";

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
        path="/"
        element={
          <ProtectedRoute>
            <PaginaInicio />
          </ProtectedRoute>
        }
      />

      <Route
        path="/homeProductor"
        element={
          <ProtectedRoute>
            <HomeProductor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/homeTecnico"
        element={
          <ProtectedRoute>
            <HomeTecnico />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agregarExplotacion"
        element={
          <ProtectedRoute>
            <AgregarExplotacion />
          </ProtectedRoute>
        }
      />

      <Route
        path="/actividad"
        element={
          <ProtectedRoute>
            <ActividadRegistro />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
