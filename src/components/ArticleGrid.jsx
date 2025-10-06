import ArticleCard from './ArticleCard'
import './ArticleGrid.css'

function ArticleGrid({ articles }) {
  return (
    <section className="article-grid">
      <h2 className="section-title">Latest Stories</h2>
      <div className="grid">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default ArticleGrid
