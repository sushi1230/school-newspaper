import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/WritersPage.css'

function WritersPage() {
  const { user, role } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Homecoming Coverage',
      editor: 'John Smith',
      dueDate: '2024-10-25',
      category: 'Campus News',
      status: 'assigned'
    },
    {
      id: 2,
      title: 'Sports Review - Football Game',
      editor: 'Sarah Jones',
      dueDate: '2024-10-22',
      category: 'Sports & Activities',
      status: 'in_progress'
    }
  ])

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      title: 'Environmental Club Wins Award',
      submittedDate: '2024-10-15',
      status: 'approved',
      category: 'Campus News',
      excerpt: 'The environmental club received recognition for their recycling initiative...'
    },
    {
      id: 2,
      title: 'New Library Hours Announced',
      submittedDate: '2024-10-18',
      status: 'pending',
      category: 'Campus News',
      excerpt: 'The library will extend hours during exam week...'
    }
  ])

  const [showNewArticle, setShowNewArticle] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Campus News',
    content: '',
    excerpt: ''
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitArticle = (e) => {
    e.preventDefault()
    // TODO: Submit to backend/Google Sheets
    console.log('Submitting article:', formData)
    setFormData({ title: '', category: 'Campus News', content: '', excerpt: '' })
    setShowNewArticle(false)
  }

  const staffContacts = [
    { name: 'John Smith', role: 'Editor-in-Chief', email: 'john.smith@pps.net' },
    { name: 'Sarah Jones', role: 'Sports Editor', email: 'sarah.jones@pps.net' },
    { name: 'Mike Davis', role: 'Arts Editor', email: 'mike.davis@pps.net' },
    { name: 'Mrs. Kaplan', role: 'Advisor', email: 'hkaplanminer@pps.net' }
  ]

  return (
    <div className="App">
      <Header />

      <main className="writers-page">
        <div className="writers-header">
          <h1>✍️ Writers Dashboard</h1>
          <p className="welcome-message">Welcome, {user?.name}!</p>
        </div>

        <div className="writers-tabs">
          <button
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`tab-button ${activeTab === 'write' ? 'active' : ''}`}
            onClick={() => setActiveTab('write')}
          >
            Write Article
          </button>
          <button
            className={`tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Staff Contacts
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="tab-content">
            <div className="dashboard-grid">
              {/* Assignments Section */}
              <section className="dashboard-section assignments-section">
                <h2>📋 Your Assignments</h2>
                {assignments.length === 0 ? (
                  <p className="empty-message">No assignments yet. Check back soon!</p>
                ) : (
                  <div className="assignments-list">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="assignment-card">
                        <div className="assignment-header">
                          <h3>{assignment.title}</h3>
                          <span className={`status-badge ${assignment.status}`}>
                            {assignment.status === 'assigned' ? 'New' : 'In Progress'}
                          </span>
                        </div>
                        <p className="assignment-meta">
                          <strong>Category:</strong> {assignment.category}
                        </p>
                        <p className="assignment-meta">
                          <strong>Assigned by:</strong> {assignment.editor}
                        </p>
                        <p className="assignment-meta">
                          <strong>Due:</strong> {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                        <button className="action-button">Start Writing</button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Submissions Section */}
              <section className="dashboard-section submissions-section">
                <h2>📤 Your Submissions</h2>
                {submissions.length === 0 ? (
                  <p className="empty-message">You haven't submitted any articles yet.</p>
                ) : (
                  <div className="submissions-list">
                    {submissions.map(submission => (
                      <div key={submission.id} className="submission-card">
                        <div className="submission-header">
                          <h3>{submission.title}</h3>
                          <span className={`status-badge ${submission.status}`}>
                            {submission.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                          </span>
                        </div>
                        <p className="submission-excerpt">{submission.excerpt}</p>
                        <p className="submission-meta">
                          <strong>Category:</strong> {submission.category} | <strong>Submitted:</strong> {new Date(submission.submittedDate).toLocaleDateString()}
                        </p>
                        <button className="action-button">View Details</button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Quick Stats */}
            <section className="quick-stats">
              <div className="stat-card">
                <h4>Assignments</h4>
                <p className="stat-number">{assignments.length}</p>
              </div>
              <div className="stat-card">
                <h4>Submitted</h4>
                <p className="stat-number">{submissions.length}</p>
              </div>
              <div className="stat-card">
                <h4>Approved</h4>
                <p className="stat-number">{submissions.filter(s => s.status === 'approved').length}</p>
              </div>
              <div className="stat-card">
                <h4>Pending Review</h4>
                <p className="stat-number">{submissions.filter(s => s.status === 'pending').length}</p>
              </div>
            </section>
          </div>
        )}

        {/* Write Article Tab */}
        {activeTab === 'write' && (
          <div className="tab-content write-tab">
            <div className="article-form-container">
              <h2>Create New Article</h2>
              <form onSubmit={handleSubmitArticle} className="article-form">
                <div className="form-group">
                  <label htmlFor="title">Article Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="Enter your article title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="Campus News">Campus News</option>
                    <option value="Sports & Activities">Sports & Activities</option>
                    <option value="Arts & Culture">Arts & Culture</option>
                    <option value="Opinion">Opinion</option>
                    <option value="Student Life">Student Life</option>
                    <option value="Student Profiles">Student Profiles</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="excerpt">Excerpt / Summary *</label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleFormChange}
                    placeholder="1-2 sentence summary of your article"
                    rows="2"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="content">Article Content *</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    placeholder="Write your article here..."
                    rows="12"
                    required
                  />
                  <p className="help-text">
                    Tip: For now, write in plain text. Advanced formatting will be available soon.
                  </p>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-button">Submit for Approval</button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setFormData({ title: '', category: 'Campus News', content: '', excerpt: '' })}
                  >
                    Clear Form
                  </button>
                </div>

                <p className="submission-note">
                  Your article will be reviewed by editors before publication.
                </p>
              </form>
            </div>

            <div className="writing-tips">
              <h3>📝 Writing Tips</h3>
              <ul>
                <li><strong>Be clear and concise:</strong> Get to the point quickly</li>
                <li><strong>Use a strong headline:</strong> It should summarize your story</li>
                <li><strong>Proofread:</strong> Check spelling and grammar</li>
                <li><strong>Include facts:</strong> Use quotes and specific details</li>
                <li><strong>Stay objective:</strong> Report facts, not opinions (unless Opinion section)</li>
                <li><strong>Include relevant context:</strong> Who, what, when, where, why?</li>
              </ul>
            </div>
          </div>
        )}

        {/* Staff Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="tab-content contacts-tab">
            <h2>Staff Directory</h2>
            <p className="section-description">
              Reach out to our editors and advisor with questions, story ideas, or for feedback
            </p>

            <div className="contacts-grid">
              {staffContacts.map((contact, index) => (
                <div key={index} className="contact-card">
                  <h3>{contact.name}</h3>
                  <p className="contact-role">{contact.role}</p>
                  <a href={`mailto:${contact.email}`} className="contact-email">
                    {contact.email}
                  </a>
                  <p className="contact-note">
                    {contact.role === 'Editor-in-Chief'
                      ? 'Overall publication oversight'
                      : contact.role === 'Advisor'
                      ? 'System admin and faculty advisor'
                      : `Oversees ${contact.role.split(' ')[0].toLowerCase()} section`}
                  </p>
                </div>
              ))}
            </div>

            <section className="resources-section">
              <h3>📚 Resources</h3>
              <div className="resources-list">
                <div className="resource-item">
                  <h4>AP Style Guide</h4>
                  <p>Standard style for news writing</p>
                </div>
                <div className="resource-item">
                  <h4>Interview Tips</h4>
                  <p>How to conduct effective interviews</p>
                </div>
                <div className="resource-item">
                  <h4>Photo Guidelines</h4>
                  <p>Rules for including images in articles</p>
                </div>
                <div className="resource-item">
                  <h4>Editorial Calendar</h4>
                  <p>Upcoming publication dates and deadlines</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default WritersPage
