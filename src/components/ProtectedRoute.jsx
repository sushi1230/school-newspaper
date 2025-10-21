import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * ProtectedRoute component
 * Restricts access to pages based on user role
 *
 * Usage:
 * <ProtectedRoute requiredRole="Editor" component={EditorsPage} />
 *
 * Role hierarchy:
 * - Admin can access: Admin, Editor, Writer, Viewer
 * - Editor can access: Editor, Writer, Viewer
 * - Writer can access: Writer, Viewer
 * - Viewer can access: Viewer
 */
function ProtectedRoute({ requiredRole, component: Component }) {
  const { isAuthenticated, role, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize: '1.2em',
        color: '#666'
      }}>
        <p>Loading...</p>
      </div>
    )
  }

  // Role hierarchy for access control
  const canAccess = (userRole, requiredRole) => {
    const roleHierarchy = {
      'Admin': ['Admin', 'Editor', 'Writer', 'Viewer'],
      'Editor': ['Editor', 'Writer', 'Viewer'],
      'Writer': ['Writer', 'Viewer'],
      'Viewer': ['Viewer']
    }

    const allowedRoles = roleHierarchy[userRole] || []
    return allowedRoles.includes(requiredRole)
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Not authorized - redirect to dashboard for their role
  if (!canAccess(role, requiredRole)) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px'
      }}>
        <h1 style={{ color: '#c41e3a' }}>Access Denied</h1>
        <p style={{ fontSize: '1.1em', color: '#666', maxWidth: '500px' }}>
          This page requires {requiredRole} access. Your current role is {role}.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1em'
          }}
        >
          Return to Home
        </button>
      </div>
    )
  }

  // Authorized - render component
  return <Component />
}

export default ProtectedRoute
