import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const { isAuthenticated, role, error, loading, handleLogin } = useAuth()

  useEffect(() => {
    // If already authenticated, redirect to appropriate dashboard
    if (isAuthenticated) {
      redirectByRole(role)
    }
  }, [isAuthenticated, role])

  const redirectByRole = (userRole) => {
    switch (userRole) {
      case 'Admin':
        navigate('/admin')
        break
      case 'Editor':
        navigate('/editors')
        break
      case 'Writer':
        navigate('/writers')
        break
      default:
        navigate('/')
    }
  }

  // Initialize Google Sign-In
  useEffect(() => {
    // Wait for Google script to load
    const timer = setTimeout(() => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
          callback: handleLogin,
          ux_mode: 'popup'
        })

        window.google.accounts.id.renderButton(
          document.getElementById('google_signin_button'),
          {
            theme: 'outline',
            size: 'large',
            text: 'signin_with'
          }
        )
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [handleLogin])

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>School Newspaper</h1>
          <p className="tagline">Sign in to access your dashboard</p>
        </div>

        <div className="login-content">
          <div className="login-section">
            <h2>Welcome Back</h2>
            <p className="login-description">
              Sign in with your <strong>school email (@pps.net)</strong> to access the newspaper system.
            </p>

            <div className="signin-button-container">
              <div id="google_signin_button"></div>
            </div>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            {loading && (
              <div className="loading-message">
                <p>Loading...</p>
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>Available Dashboards</h3>
            <div className="dashboard-info">
              <div className="info-card">
                <h4>📖 Reader</h4>
                <p>Browse published articles and view the newspaper</p>
                <p className="access-note">Public - No login required</p>
              </div>

              <div className="info-card">
                <h4>✍️ Writers</h4>
                <p>Create articles, track assignments, and submit for approval</p>
                <p className="access-note">Writers, Editors, Admins</p>
              </div>

              <div className="info-card">
                <h4>✏️ Editors</h4>
                <p>Review submissions, publish content, and manage the site</p>
                <p className="access-note">Editors, Admins</p>
              </div>

              <div className="info-card">
                <h4>⚙️ Admin</h4>
                <p>Manage users, control settings, and full system access</p>
                <p className="access-note">Admins only</p>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3>Need Help?</h3>
            <ul>
              <li><strong>Can't sign in?</strong> Make sure you're using your school email (@pps.net)</li>
              <li><strong>Not in the system?</strong> Ask your administrator to add your email</li>
              <li><strong>Other issues?</strong> Contact the technical team</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
