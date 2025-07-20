import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { CustomerDashboard } from './pages/dashboard/CustomerDashboard';
import { ProviderDashboard } from './pages/dashboard/ProviderDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { BoardDetails } from './pages/boards/BoardDetails';
import { ListingManagement } from './pages/listings/ListingManagement';
import { AdminPanel } from './pages/admin/AdminPanel';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout';
export function App() {
  return <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainLayout />}>
            {/* Customer Routes */}
            <Route path="customer/dashboard" element={<ProtectedRoute role="customer">
                  <CustomerDashboard />
                </ProtectedRoute>} />
            <Route path="customer/board/:boardId" element={<ProtectedRoute role="customer">
                  <BoardDetails />
                </ProtectedRoute>} />
            {/* Provider Routes */}
            <Route path="provider/dashboard" element={<ProtectedRoute role="provider">
                  <ProviderDashboard />
                </ProtectedRoute>} />
            <Route path="provider/listings" element={<ProtectedRoute role="provider">
                  <ListingManagement />
                </ProtectedRoute>} />
            <Route path="provider/board/:boardId" element={<ProtectedRoute role="provider">
                  <BoardDetails />
                </ProtectedRoute>} />
            {/* Admin Routes */}
            <Route path="admin/dashboard" element={<ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>} />
            <Route path="admin/panel" element={<ProtectedRoute role="admin">
                  <AdminPanel />
                </ProtectedRoute>} />
            <Route path="admin/board/:boardId" element={<ProtectedRoute role="admin">
                  <BoardDetails />
                </ProtectedRoute>} />
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>;
}