import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/store';

interface PrivateRouteProps {
  children: React.ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return isAuthenticated ? children : <Navigate to="/login" />;
}