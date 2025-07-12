// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type PrivateRouteProps = {
  adminOnly?: boolean;
  children: React.ReactElement;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ adminOnly = false, children }) => {
  const { user } = useApp();


  if (adminOnly && (!user || user.role !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
