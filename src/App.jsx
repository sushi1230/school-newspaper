import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import StaffPage from './pages/StaffPage'
import WritersPage from './pages/WritersPage'
import EditorsPage from './pages/EditorsPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/staff" element={<StaffPage />} />

          {/* Writers page - Writers, Editors, Admins */}
          <Route
            path="/writers"
            element={
              <ProtectedRoute requiredRole="Writer" component={WritersPage} />
            }
          />

          {/* Editors page - Editors, Admins */}
          <Route
            path="/editors"
            element={
              <ProtectedRoute requiredRole="Editor" component={EditorsPage} />
            }
          />

          {/* Admin page - Admins only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Admin" component={AdminPage} />
            }
          />

          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
