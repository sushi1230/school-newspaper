import './ArticleCard.css'

function ArticleCard({ article }) {
  // Support both 'image' (old format) and 'imageUrl' (Google Sheets format)
  const imageUrl = article.imageUrl || article.image || 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=300&fit=crop'

  const handleClick = () => {
    if (article.contentUrl) {
      window.open(article.contentUrl, '_blank')
    }
  }

  return (
    <article className="article-card" onClick={handleClick} style={{ cursor: article.contentUrl ? 'pointer' : 'default' }}>
      <div className="article-image">
        <img src={imageUrl} alt={article.title} />
        <span className="category-badge">{article.category}</span>
      </div>
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
        <div className="article-footer">
          <span className="article-author">{article.author}</span>
          <span className="article-date">{article.date}</span>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
