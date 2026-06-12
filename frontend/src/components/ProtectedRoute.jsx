import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, requiredRole = null }) {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Chargement...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on their role
    if (user.role === 'client') {
      return <Navigate to="/" replace />
    } else if (user.role === 'employe') {
      return <Navigate to="/IndexEmploye" replace />
    }
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
