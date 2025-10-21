import './App.css'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import FeaturedArticle from './components/FeaturedArticle'
import ArticleGrid from './components/ArticleGrid'
import Footer from './components/Footer'
import googleService from './services/googleService'

function App() {
  const [articles, setArticles] = useState([])
  const [featuredArticle, setFeaturedArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all articles from Google Sheets
        const allArticles = await googleService.getAllArticles()

        if (allArticles.length === 0) {
          setError('No articles found. Please check your Google Sheets setup.')
          setArticles([])
          setFeaturedArticle(null)
          return
        }

        // Sort articles by date (newest first)
        const sortedArticles = allArticles.sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        )

        // Get featured article (first one marked as featured, or most recent)
        const featured = sortedArticles.find(a => a.featured) || sortedArticles[0]
        setFeaturedArticle(featured)

        // Set remaining articles for grid (limit to 6)
        setArticles(sortedArticles.slice(0, 6))
      } catch (err) {
        console.error('Error loading articles:', err)
        setError(err.message || 'Failed to load articles from Google Sheets')
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Fallback UI if no articles or error
  if (error && articles.length === 0) {
    return (
      <div className="App">
        <Header />
        <main className="main-content">
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            margin: '40px 20px'
          }}>
            <h2>Getting Started</h2>
            <p>{error}</p>
            <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
              Check the console for details. See <code>docs/GOOGLE_API_SETUP.md</code> for setup instructions.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        {featuredArticle && (
          <FeaturedArticle article={featuredArticle} />
        )}
        {loading ? (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#666'
          }}>
            <p>Loading articles...</p>
          </div>
        ) : (
          <ArticleGrid articles={articles} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
