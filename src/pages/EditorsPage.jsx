import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/EditorsPage.css'

function EditorsPage() {
  const { user, role } = useAuth()
  const [activeTab, setActiveTab] = useState('submissions')
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [reviewFeedback, setReviewFeedback] = useState('')
  const [reviewAction, setReviewAction] = useState('approve')

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      title: 'New Robotics Team Advances to Nationals',
      author: 'Mike Chen',
      category: 'Sports & Activities',
      submittedDate: '2024-10-20',
      excerpt: 'Our school robotics team has qualified for nationals after an impressive regional performance.',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Fall Concert Announcement',
      author: 'Sarah Lee',
      category: 'Arts & Culture',
      submittedDate: '2024-10-19',
      excerpt: 'Mark your calendars for the annual fall concert on December 15th at 7 PM.',
      status: 'pending'
    }
  ])

  const [publishedArticles, setPublishedArticles] = useState([
    {
      id: 1,
      title: 'Environmental Club Wins Regional Award',
      author: 'Rachel Green',
      category: 'Campus News',
      publishedDate: '2024-10-15',
      featured: true
    },
    {
      id: 2,
      title: 'Student Body Elections Results',
      author: 'John Smith',
      category: 'Student Life',
      publishedDate: '2024-10-10',
      featured: false
    }
  ])

  const [writers] = useState([
    { id: 1, name: 'Mike Chen', email: 'mike.chen@pps.net', submissions: 3, approved: 2 },
    { id: 2, name: 'Sarah Lee', email: 'sarah.lee@pps.net', submissions: 2, approved: 1 },
    { id: 3, name: 'Rachel Green', email: 'rachel.green@pps.net', submissions: 4, approved: 4 }
  ])

  const handleReviewClick = (submission) => {
    setSelectedSubmission(submission)
    setShowReviewModal(true)
    setReviewFeedback('')
    setReviewAction('approve')
  }

  const handleSubmitReview = () => {
    if (reviewAction === 'approve') {
      // Move to published
      setPublishedArticles([...publishedArticles, {
        id: selectedSubmission.id,
        title: selectedSubmission.title,
        author: selectedSubmission.author,
        category: selectedSubmission.category,
        publishedDate: new Date().toISOString().split('T')[0],
        featured: false
      }])
    }
    // Remove from submissions
    setSubmissions(submissions.filter(s => s.id !== selectedSubmission.id))
    setShowReviewModal(false)
  }

  const handleFeatureArticle = (articleId) => {
    setPublishedArticles(publishedArticles.map(a =>
      a.id === articleId ? { ...a, featured: !a.featured } : { ...a, featured: false }
    ))
  }

  const handleDeleteArticle = (articleId) => {
    setPublishedArticles(publishedArticles.filter(a => a.id !== articleId))
  }

  return (
    <div className="App">
      <Header />

      <main className="editors-page">
        <div className="editors-header">
          <h1>✏️ Editors Dashboard</h1>
          <p className="welcome-message">Welcome, {user?.name}!</p>
        </div>

        <div className="editors-tabs">
          <button
            className={`tab-button ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            Submissions to Review
            {submissions.filter(s => s.status === 'pending').length > 0 && (
              <span className="badge">{submissions.filter(s => s.status === 'pending').length}</span>
            )}
          </button>
          <button
            className={`tab-button ${activeTab === 'published' ? 'active' : ''}`}
            onClick={() => setActiveTab('published')}
          >
            Published Articles
          </button>
          <button
            className={`tab-button ${activeTab === 'writers' ? 'active' : ''}`}
            onClick={() => setActiveTab('writers')}
          >
            Writer Management
          </button>
        </div>

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="tab-content">
            <h2>Pending Submissions</h2>
            {submissions.length === 0 ? (
              <p className="empty-message">No pending submissions. Great job staying on top of things!</p>
            ) : (
              <div className="submissions-grid">
                {submissions.map(submission => (
                  <div key={submission.id} className="submission-review-card">
                    <div className="submission-header">
                      <h3>{submission.title}</h3>
                    </div>
                    <p className="submission-author"><strong>By:</strong> {submission.author}</p>
                    <p className="submission-category"><strong>Category:</strong> {submission.category}</p>
                    <p className="submission-excerpt">{submission.excerpt}</p>
                    <p className="submission-date">Submitted: {new Date(submission.submittedDate).toLocaleDateString()}</p>
                    <button
                      className="review-button"
                      onClick={() => handleReviewClick(submission)}
                    >
                      Review & Decide
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Published Articles Tab */}
        {activeTab === 'published' && (
          <div className="tab-content">
            <h2>Published Articles</h2>
            {publishedArticles.length === 0 ? (
              <p className="empty-message">No articles published yet.</p>
            ) : (
              <div className="published-articles-list">
                {publishedArticles.map(article => (
                  <div key={article.id} className="published-article-card">
                    <div className="article-info">
                      <h3>{article.title}</h3>
                      {article.featured && (
                        <span className="featured-badge">📌 Featured</span>
                      )}
                      <p className="article-meta">
                        <strong>By:</strong> {article.author} | <strong>Category:</strong> {article.category}
                      </p>
                      <p className="article-date">Published: {new Date(article.publishedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="article-actions">
                      <button
                        className={`feature-button ${article.featured ? 'featured' : ''}`}
                        onClick={() => handleFeatureArticle(article.id)}
                      >
                        {article.featured ? '📌 Unfeature' : 'Feature'}
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteArticle(article.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Writer Management Tab */}
        {activeTab === 'writers' && (
          <div className="tab-content">
            <h2>Writer Management</h2>
            <div className="writers-management-grid">
              {writers.map(writer => (
                <div key={writer.id} className="writer-card">
                  <h3>{writer.name}</h3>
                  <a href={`mailto:${writer.email}`} className="writer-email">{writer.email}</a>
                  <div className="writer-stats">
                    <div className="stat">
                      <span className="stat-label">Submissions</span>
                      <span className="stat-value">{writer.submissions}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Approved</span>
                      <span className="stat-value">{writer.approved}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Pending</span>
                      <span className="stat-value">{writer.submissions - writer.approved}</span>
                    </div>
                  </div>
                  <div className="writer-actions">
                    <button className="action-button">View Details</button>
                    <button className="action-button secondary">Message</button>
                  </div>
                </div>
              ))}
            </div>

            <section className="writer-guidelines">
              <h3>📋 Writer Guidelines</h3>
              <ul>
                <li><strong>Quality Check:</strong> Ensure articles follow AP Style and journalism standards</li>
                <li><strong>Fact Checking:</strong> Verify facts and quotes before approval</li>
                <li><strong>Feedback:</strong> Provide constructive feedback to improve writing</li>
                <li><strong>Timeliness:</strong> Review submissions promptly to maintain publishing schedule</li>
                <li><strong>Consistency:</strong> Ensure articles maintain consistent voice and tone</li>
              </ul>
            </section>
          </div>
        )}
      </main>

      {/* Review Modal */}
      {showReviewModal && selectedSubmission && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Review Article</h2>
              <button className="close-button" onClick={() => setShowReviewModal(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="article-preview">
                <h3>{selectedSubmission.title}</h3>
                <p className="preview-meta">
                  <strong>By:</strong> {selectedSubmission.author} | <strong>Category:</strong> {selectedSubmission.category}
                </p>
                <p className="preview-excerpt">{selectedSubmission.excerpt}</p>
              </div>

              <div className="review-form">
                <div className="form-group">
                  <label>Your Decision</label>
                  <div className="decision-buttons">
                    <button
                      className={`decision-button approve ${reviewAction === 'approve' ? 'active' : ''}`}
                      onClick={() => setReviewAction('approve')}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className={`decision-button reject ${reviewAction === 'reject' ? 'active' : ''}`}
                      onClick={() => setReviewAction('reject')}
                    >
                      ✗ Request Changes
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="feedback">Feedback (Optional)</label>
                  <textarea
                    id="feedback"
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    placeholder="Provide feedback for the writer..."
                    rows="6"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setShowReviewModal(false)}>Cancel</button>
              <button className="submit-button" onClick={handleSubmitReview}>
                {reviewAction === 'approve' ? 'Publish Article' : 'Send Feedback'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default EditorsPage
