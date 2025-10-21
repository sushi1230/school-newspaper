import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/AdminPage.css'

function AdminPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showNewUserModal, setShowNewUserModal] = useState(false)
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserRole, setNewUserRole] = useState('Writer')

  const [users, setUsers] = useState([
    { id: 1, email: 'hkaplanminer@pps.net', name: 'Mrs. Kaplan', role: 'Admin', approved: true, joinDate: '2024-10-01' },
    { id: 2, email: 'john.smith@pps.net', name: 'John Smith', role: 'Editor', approved: true, joinDate: '2024-10-05' },
    { id: 3, email: 'sarah.jones@pps.net', name: 'Sarah Jones', role: 'Editor', approved: true, joinDate: '2024-10-10' },
    { id: 4, email: 'mike.chen@pps.net', name: 'Mike Chen', role: 'Writer', approved: true, joinDate: '2024-10-15' },
    { id: 5, email: 'rachel.green@pps.net', name: 'Rachel Green', role: 'Writer', approved: false, joinDate: '2024-10-18' }
  ])

  const [siteSettings, setSiteSettings] = useState({
    siteName: 'School Newspaper',
    tagline: 'Your source for school news',
    primaryColor: '#1a1a1a',
    accentColor: '#c41e3a',
    categories: 'Campus News, Sports & Activities, Arts & Culture, Opinion, Student Life, Student Profiles'
  })

  const stats = {
    totalUsers: users.length,
    editors: users.filter(u => u.role === 'Editor').length,
    writers: users.filter(u => u.role === 'Writer').length,
    pendingApprovals: users.filter(u => !u.approved).length
  }

  const handleAddUser = () => {
    if (newUserEmail && newUserRole) {
      const newUser = {
        id: users.length + 1,
        email: newUserEmail,
        name: newUserEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        role: newUserRole,
        approved: false,
        joinDate: new Date().toISOString().split('T')[0]
      }
      setUsers([...users, newUser])
      setNewUserEmail('')
      setNewUserRole('Writer')
      setShowNewUserModal(false)
    }
  }

  const handleApproveUser = (userId) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, approved: !u.approved } : u
    ))
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId))
  }

  const handleChangeUserRole = (userId, newRole) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, role: newRole } : u
    ))
  }

  const handleSaveSettings = () => {
    // TODO: Save to backend/Google Sheets
    alert('Settings saved!')
  }

  return (
    <div className="App">
      <Header />

      <main className="admin-page">
        <div className="admin-header">
          <h1>⚙️ Admin Dashboard</h1>
          <p className="welcome-message">Welcome, {user?.name}! Full system access enabled.</p>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            User Management
            {stats.pendingApprovals > 0 && (
              <span className="badge">{stats.pendingApprovals}</span>
            )}
          </button>
          <button
            className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Site Settings
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="tab-content dashboard-tab">
            <h2>System Overview</h2>

            <div className="stats-grid">
              <div className="stat-card">
                <h3>👥 Total Users</h3>
                <p className="stat-value">{stats.totalUsers}</p>
                <p className="stat-breakdown">{stats.editors} editors, {stats.writers} writers</p>
              </div>

              <div className="stat-card highlight">
                <h3>⏳ Pending Approvals</h3>
                <p className="stat-value">{stats.pendingApprovals}</p>
                <p className="stat-breakdown">User account requests</p>
              </div>

              <div className="stat-card">
                <h3>✏️ Editors</h3>
                <p className="stat-value">{stats.editors}</p>
                <p className="stat-breakdown">Can review and publish</p>
              </div>

              <div className="stat-card">
                <h3>📝 Writers</h3>
                <p className="stat-value">{stats.writers}</p>
                <p className="stat-breakdown">Can submit articles</p>
              </div>
            </div>

            <section className="admin-info-section">
              <h3>🔑 Admin Features</h3>
              <div className="features-grid">
                <div className="feature-card">
                  <h4>👥 User Management</h4>
                  <p>Add, remove, and manage user roles and permissions</p>
                  <button className="feature-button" onClick={() => setActiveTab('users')}>
                    Manage Users
                  </button>
                </div>

                <div className="feature-card">
                  <h4>⚙️ Site Settings</h4>
                  <p>Customize site name, colors, and categories</p>
                  <button className="feature-button" onClick={() => setActiveTab('settings')}>
                    Configure Site
                  </button>
                </div>

                <div className="feature-card">
                  <h4>📋 Content Override</h4>
                  <p>Publish, edit, or delete any article directly</p>
                  <button className="feature-button" disabled>
                    Coming Soon
                  </button>
                </div>

                <div className="feature-card">
                  <h4>📊 Analytics</h4>
                  <p>View article performance and user engagement metrics</p>
                  <button className="feature-button" disabled>
                    Coming Soon
                  </button>
                </div>

                <div className="feature-card">
                  <h4>🔐 Permissions</h4>
                  <p>Control what each role can do on the system</p>
                  <button className="feature-button" disabled>
                    Coming Soon
                  </button>
                </div>

                <div className="feature-card">
                  <h4>💾 Backup & Export</h4>
                  <p>Export all data and create system backups</p>
                  <button className="feature-button" disabled>
                    Coming Soon
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="tab-content users-tab">
            <div className="users-header">
              <h2>User Management</h2>
              <button className="add-user-button" onClick={() => setShowNewUserModal(true)}>
                + Add New User
              </button>
            </div>

            <div className="users-list">
              {users.map(userItem => (
                <div key={userItem.id} className={`user-item ${!userItem.approved ? 'pending' : ''}`}>
                  <div className="user-info">
                    <div className="user-header">
                      <h3>{userItem.name || userItem.email}</h3>
                      {!userItem.approved && (
                        <span className="pending-badge">⏳ Pending</span>
                      )}
                    </div>
                    <p className="user-email">{userItem.email}</p>
                    <p className="user-meta">Joined: {new Date(userItem.joinDate).toLocaleDateString()}</p>
                  </div>

                  <div className="user-role">
                    <select
                      value={userItem.role}
                      onChange={(e) => handleChangeUserRole(userItem.id, e.target.value)}
                      className="role-select"
                    >
                      <option value="Viewer">Viewer</option>
                      <option value="Writer">Writer</option>
                      <option value="Editor">Editor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div className="user-actions">
                    {!userItem.approved && (
                      <button
                        className="approve-button"
                        onClick={() => handleApproveUser(userItem.id)}
                      >
                        Approve
                      </button>
                    )}
                    {userItem.approved && (
                      <button
                        className="block-button"
                        onClick={() => handleApproveUser(userItem.id)}
                      >
                        Block
                      </button>
                    )}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteUser(userItem.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <section className="role-info">
              <h3>📖 Role Definitions</h3>
              <div className="roles-grid">
                <div className="role-card">
                  <h4>Viewer</h4>
                  <p>Can view public pages only. No access to dashboards.</p>
                </div>
                <div className="role-card">
                  <h4>Writer</h4>
                  <p>Can write articles and submit for approval. Access to Writers dashboard.</p>
                </div>
                <div className="role-card">
                  <h4>Editor</h4>
                  <p>Can review submissions, publish articles, and manage writers. Access to Editors dashboard.</p>
                </div>
                <div className="role-card">
                  <h4>Admin</h4>
                  <p>Full system access. Can manage users, settings, and override content. This is you!</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Site Settings Tab */}
        {activeTab === 'settings' && (
          <div className="tab-content settings-tab">
            <h2>Site Settings</h2>

            <form className="settings-form">
              <div className="form-section">
                <h3>Basic Information</h3>

                <div className="form-group">
                  <label htmlFor="siteName">Site Name</label>
                  <input
                    type="text"
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings,
                      siteName: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tagline">Tagline</label>
                  <input
                    type="text"
                    id="tagline"
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings,
                      tagline: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Theme Colors</h3>

                <div className="form-group">
                  <label htmlFor="primaryColor">Primary Color</label>
                  <div className="color-input-group">
                    <input
                      type="color"
                      id="primaryColor"
                      value={siteSettings.primaryColor}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        primaryColor: e.target.value
                      })}
                    />
                    <span className="color-value">{siteSettings.primaryColor}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="accentColor">Accent Color</label>
                  <div className="color-input-group">
                    <input
                      type="color"
                      id="accentColor"
                      value={siteSettings.accentColor}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        accentColor: e.target.value
                      })}
                    />
                    <span className="color-value">{siteSettings.accentColor}</span>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Categories</h3>

                <div className="form-group">
                  <label htmlFor="categories">Article Categories (comma-separated)</label>
                  <textarea
                    id="categories"
                    value={siteSettings.categories}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings,
                      categories: e.target.value
                    })}
                    rows="4"
                  />
                  <p className="help-text">Enter each category separated by commas</p>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="save-button" onClick={handleSaveSettings}>
                  Save Settings
                </button>
                <p className="save-note">Changes will apply to all users after saving</p>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Add User Modal */}
      {showNewUserModal && (
        <div className="modal-overlay" onClick={() => setShowNewUserModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New User</h2>
              <button className="close-button" onClick={() => setShowNewUserModal(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@pps.net"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Writer">Writer</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowNewUserModal(false)}>
                Cancel
              </button>
              <button className="submit-button" onClick={handleAddUser}>
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default AdminPage
