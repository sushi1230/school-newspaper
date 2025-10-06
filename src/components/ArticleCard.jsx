import './ArticleCard.css'

function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <div className="article-image">
        <img src={article.image} alt={article.title} />
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
