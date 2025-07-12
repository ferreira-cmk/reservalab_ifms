import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import BookingModal from './components/BookingModal';
import MyBookings from './components/MyBookings';
import LabRegister from './components/LabRegister';
import UserRegister from './components/UserRegister';
import AdminPanel from './components/AdminPanel';
import LabEdit from './components/LabEdit';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const { user } = useApp();

  const defaultRoute = () => {
    if (!user) return '/login';
    return user.role === 'admin' ? '/dashboard' : '/booking';
  };

  return (
    <Router>
      <Routes>
        {}
        <Route path="/login" element={<Login />} />

        {}
        <Route path="/" element={<Navigate to={defaultRoute()} />} />

        {}
        <Route path="/dashboard" element={
          <PrivateRoute adminOnly>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/calendar" element={
          <PrivateRoute adminOnly>
            <Calendar />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute adminOnly>
            <AdminPanel />
          </PrivateRoute>
        } />
        <Route path="/admin/lab-register" element={
          <PrivateRoute adminOnly>
            <LabRegister />
          </PrivateRoute>
        } />
        <Route path="/admin/lab-edit/:id" element={
          <PrivateRoute adminOnly>
            <LabEdit />
          </PrivateRoute>
        } />
        <Route path="/admin/user-register" element={
          <PrivateRoute adminOnly>
            <UserRegister />
          </PrivateRoute>
        } />

        {}
        <Route path="/booking" element={
          <PrivateRoute>
            <BookingModal />
          </PrivateRoute>
        } />
        <Route path="/bookings" element={
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        } />

        {}
        <Route path="*" element={<Navigate to={defaultRoute()} />} />
      </Routes>
    </Router>
  );
};

export default App;
