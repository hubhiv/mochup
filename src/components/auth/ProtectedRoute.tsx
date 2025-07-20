import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'customer' | 'provider' | 'admin';
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  role
}) => {
  const {
    user,
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (user?.role !== role) {
    // Redirect to appropriate dashboard based on user role
    if (user?.role === 'customer') {
      return <Navigate to="/customer/dashboard" replace />;
    } else if (user?.role === 'provider') {
      return <Navigate to="/provider/dashboard" replace />;
    } else if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};