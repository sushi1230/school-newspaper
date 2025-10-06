import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="date">October 2, 2025</div>
      </div>
      <div className="header-main">
        <h1 className="newspaper-title">The School Herald</h1>
        <p className="newspaper-tagline">Your Voice. Your Stories. Your School.</p>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="#news">News</a></li>
          <li><a href="#sports">Sports</a></li>
          <li><a href="#arts">Arts & Culture</a></li>
          <li><a href="#opinion">Opinion</a></li>
          <li><a href="#student-life">Student Life</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
