import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout/MainLayout';
import Home from './components/Home';
import Scanner from './components/Scanner';
import BatchAudit from './components/BatchAudit';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Prediction from './components/Prediction';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ProfilePage from './components/ProfilePage';
import AuthProvider from './provider/AuthProvider';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/batch" element={<BatchAudit />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
