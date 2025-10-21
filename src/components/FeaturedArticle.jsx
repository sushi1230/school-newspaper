import './FeaturedArticle.css'

function FeaturedArticle({ article }) {
  // Support both 'image' (old format) and 'imageUrl' (Google Sheets format)
  const imageUrl = article.imageUrl || article.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=500&fit=crop'

  const handleReadMore = () => {
    if (article.contentUrl) {
      window.open(article.contentUrl, '_blank')
    }
  }

  return (
    <section className="featured-article">
      <div className="featured-image">
        <img src={imageUrl} alt={article.title} />
        <span className="featured-badge">Featured</span>
      </div>
      <div className="featured-content">
        <span className="category-tag">{article.category}</span>
        <h2 className="featured-title">{article.title}</h2>
        <p className="featured-excerpt">{article.excerpt}</p>
        <div className="article-meta">
          <span className="author">By {article.author}</span>
          <span className="date">{article.date}</span>
        </div>
        <button className="read-more" onClick={handleReadMore}>Read Full Article</button>
      </div>
    </section>
  )
}

export default FeaturedArticle
