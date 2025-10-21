import React, { createContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import googleService from '../services/googleService'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Get user's role from Users sheet
  const getUserRole = useCallback(async (email) => {
    try {
      // Fetch users from Google Sheets
      const response = await axios.get(
        `${import.meta.env.VITE_GOOGLE_SHEETS_BASE_URL || 'https://sheets.googleapis.com/v4/spreadsheets'}/${import.meta.env.VITE_GOOGLE_SHEETS_ID}/values/Users!A2:D1000`,
        {
          params: {
            key: import.meta.env.VITE_GOOGLE_API_KEY
          }
        }
      )

      const rows = response.data.values || []

      // Find user row
      const userRow = rows.find(row => row[0]?.toLowerCase() === email.toLowerCase())

      if (!userRow) {
        return null // User not in sheet
      }

      // Check if approved
      const approved = userRow[3]?.toLowerCase() === 'true'
      if (!approved) {
        return 'blocked'
      }

      // Return role
      const userRole = userRow[2] || 'Viewer'
      return userRole
    } catch (err) {
      console.error('Error fetching user role:', err)
      return null
    }
  }, [])

  // Verify email domain
  const isValidDomain = useCallback((email) => {
    const domain = import.meta.env.VITE_ALLOWED_EMAIL_DOMAIN || 'pps.net'
    return email.endsWith(`@${domain}`)
  }, [])

  // Handle successful Google Sign-In
  const handleLogin = useCallback(async (credentialResponse) => {
    try {
      setLoading(true)
      setError(null)

      // Decode JWT token
      const decoded = decodeJwt(credentialResponse.credential)
      const email = decoded.email
      const name = decoded.name

      // Check email domain
      if (!isValidDomain(email)) {
        setError(`Must use school email (@${import.meta.env.VITE_ALLOWED_EMAIL_DOMAIN || 'pps.net'})`)
        setIsAuthenticated(false)
        return
      }

      // Get user role from sheet
      const userRole = await getUserRole(email)

      if (userRole === 'blocked') {
        setError('Your account is pending approval. Contact your administrator.')
        setIsAuthenticated(false)
        return
      }

      if (userRole === null) {
        setError('Your email must be added to the system. Contact your administrator.')
        setIsAuthenticated(false)
        return
      }

      // Determine if admin
      const isAdmin = email === import.meta.env.VITE_ADMIN_EMAIL || userRole === 'Admin'

      // Set user state
      setUser({
        email,
        name,
        rawCredential: credentialResponse.credential
      })
      setRole(userRole)
      setIsAuthenticated(true)

      // Store in localStorage for session persistence
      sessionStorage.setItem('schoolnewspaper_user', JSON.stringify({
        email,
        name,
        role: userRole,
        isAdmin,
        loginTime: new Date().toISOString()
      }))
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please try again.')
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }, [isValidDomain, getUserRole])

  // Check for existing session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('schoolnewspaper_user')
    if (stored) {
      const userData = JSON.parse(stored)
      setUser({
        email: userData.email,
        name: userData.name
      })
      setRole(userData.role)
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  // Logout function
  const logout = useCallback(() => {
    setUser(null)
    setRole(null)
    setIsAuthenticated(false)
    setError(null)
    sessionStorage.removeItem('schoolnewspaper_user')

    // Try to sign out from Google
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect()
    }
  }, [])

  // Helper function to decode JWT
  function decodeJwt(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    )
    return JSON.parse(jsonPayload)
  }

  // Check if user has specific role
  const hasRole = useCallback((requiredRole) => {
    if (!isAuthenticated) return false

    const roleHierarchy = {
      'Admin': ['Admin', 'Editor', 'Writer', 'Viewer'],
      'Editor': ['Editor', 'Writer', 'Viewer'],
      'Writer': ['Writer', 'Viewer'],
      'Viewer': ['Viewer']
    }

    const allowed = roleHierarchy[role] || []
    return allowed.includes(requiredRole)
  }, [isAuthenticated, role])

  // Check if user is admin
  const isAdmin = useCallback(() => {
    if (!isAuthenticated) return false
    return user?.email === import.meta.env.VITE_ADMIN_EMAIL || role === 'Admin'
  }, [isAuthenticated, user, role])

  const value = {
    user,
    role,
    loading,
    error,
    isAuthenticated,
    handleLogin,
    logout,
    hasRole,
    isAdmin: isAdmin(),
    getUserRole
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default AuthContext
