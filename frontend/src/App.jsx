import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import GuardDashboard from './pages/dashboards/GuardDashboard';
import ManagerDashboard from './pages/dashboards/ManagerDashboard';
import DirectorDashboard from './pages/dashboards/DirectorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Role-Based Routes */}
        <Route
          path="/guard/dashboard"
          element={
            <ProtectedRoute requiredRole="guard">
              <GuardDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute requiredRole="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/director/dashboard"
          element={
            <ProtectedRoute requiredRole="director">
              <DirectorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
