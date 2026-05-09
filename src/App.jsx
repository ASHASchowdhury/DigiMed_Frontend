import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientRegistration from './pages/PatientRegistration';
import PatientDetails from './pages/PatientDetails';
import DoctorList from './pages/DoctorList';
import DoctorRegistration from './pages/DoctorRegistration';
import DoctorDetails from './pages/DoctorDetails';
import AppointmentList from './pages/AppointmentList';
import AppointmentBooking from './pages/AppointmentBooking';
import AIPortal from './pages/AIPortal';
import Settings from './pages/Settings';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="patients/register" element={<PatientRegistration />} />
        <Route path="patients/:id" element={<PatientDetails />} />
        <Route path="doctors" element={<DoctorList />} />
        <Route path="doctors/register" element={<DoctorRegistration />} />
        <Route path="doctors/:id" element={<DoctorDetails />} />
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="appointments/book" element={<AppointmentBooking />} />
        <Route path="ai" element={<AIPortal />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }} />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;