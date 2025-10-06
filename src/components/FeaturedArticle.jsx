import './FeaturedArticle.css'

function FeaturedArticle({ article }) {
  return (
    <section className="featured-article">
      <div className="featured-image">
        <img src={article.image} alt={article.title} />
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
        <button className="read-more">Read Full Article</button>
      </div>
    </section>
  )
}

export default FeaturedArticle
