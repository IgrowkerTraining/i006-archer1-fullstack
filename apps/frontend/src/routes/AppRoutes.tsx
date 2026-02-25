import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import { ExplotationProvider } from "../context/ExplotationContext";

import Login from "../pages/Login";
import Register from "../pages/Register";
import InitialPage from "../pages/InitialPage";
import HomeProductor from "../pages/HomeProductor";
import ActivityRegister from "../pages/ActivityRegister";
import TechnicalAddExplotation from "../pages/TechnicalAddExplotation";
import HomeTecnic from "../pages/HomeTecnic";
import ProducerHistory from "../pages/ProducerHistory";
import TechnicalHistory from "../pages/TechnicalHistory";
import RegisterProducer from "../pages/RegisterProducer";
import RegisterTechnician from "../pages/RegisterTechnician";
import Dashboard from "../pages/Dashboard";

export const AppRoutes: React.FC = () => {
  return (
    <ExplotationProvider>
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
            <RegisterProducer/>
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

        <Route path="/" element={<InitialPage />} />
        <Route path="/homeProductor" element={<HomeProductor />} />
        <Route path="/homeTecnic" element={<HomeTecnic />} />
        <Route path="/activity" element={<ActivityRegister />} />
        <Route path="/producer-history" element={<ProducerHistory />} />
        <Route path="/technical-history" element={<TechnicalHistory />} />
        <Route path="/add-explotation" element={<TechnicalAddExplotation />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ExplotationProvider>
  );
};

export default AppRoutes;