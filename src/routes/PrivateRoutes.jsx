// src/routes/PrivateRoutes.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../hooks/UseAuth';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children 
 * @param {string[]} [props.allowedRoles] 
 */

const PrivateRoutes = ({ children, allowedRoles }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user) {
    return <Navigate state={{from: location.pathname}} to="/login" />;
  }

  // ✅ Role check if allowedRoles is provided
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoutes;
