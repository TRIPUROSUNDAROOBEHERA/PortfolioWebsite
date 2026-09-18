import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * Checks if a JWT token is expired without needing an external library
 */
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return true;
    const decodedJson = JSON.parse(atob(payloadBase64));
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return decodedJson.exp ? decodedJson.exp < nowInSeconds : false;
  } catch (error) {
    return true;
  }
};

export default function ProtectedRoute({ children, fallback = null }) {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  // 1. If no token exists OR token has expired -> clear and redirect
  if (!token || isTokenExpired(token)) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }

    // Optional custom fallback UI if provided
    if (fallback) {
      return fallback;
    }

    // Redirect public/unauthorized user directly to admin login page
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 2. If valid token exists: support both <ProtectedRoute><Admin /></ProtectedRoute>
  //    and React Router layout routes <Route element={<ProtectedRoute />}>
  return children ? children : <Outlet />;
}