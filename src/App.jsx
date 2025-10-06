import './App.css'
import Header from './components/Header'
import FeaturedArticle from './components/FeaturedArticle'
import ArticleGrid from './components/ArticleGrid'
import Footer from './components/Footer'

function App() {
  const featuredArticle = {
    title: "Student Council Announces New Campus Initiatives",
    excerpt: "A comprehensive plan to improve student life and campus facilities has been unveiled by the newly elected student council members.",
    author: "Sarah Johnson",
    date: "October 2, 2025",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=500&fit=crop",
    category: "Campus News"
  }

  const articles = [
    {
      id: 1,
      title: "Robotics Team Advances to State Championship",
      excerpt: "Our school's robotics team secured first place at the regional competition.",
      author: "Mike Chen",
      date: "October 1, 2025",
      category: "Sports & Activities",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Fall Musical Auditions Begin Next Week",
      excerpt: "Drama department announces auditions for this year's production of 'The Sound of Music'.",
      author: "Emily Rodriguez",
      date: "September 30, 2025",
      category: "Arts & Culture",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "New Lunch Menu Options Receive Mixed Reviews",
      excerpt: "Students weigh in on the cafeteria's expanded menu featuring healthier alternatives.",
      author: "David Kim",
      date: "September 29, 2025",
      category: "Student Life",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Environmental Club Launches Recycling Program",
      excerpt: "New initiative aims to reduce campus waste and promote sustainability.",
      author: "Lisa Park",
      date: "September 28, 2025",
      category: "Campus News",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Senior Spotlight: Meet Valedictorian Candidate Emma Thompson",
      excerpt: "A look at the academic journey and future plans of one of our top students.",
      author: "Rachel Green",
      date: "September 27, 2025",
      category: "Student Profiles",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Soccer Team Clinches League Title",
      excerpt: "Undefeated season culminates in championship victory.",
      author: "Tom Martinez",
      date: "September 26, 2025",
      category: "Sports & Activities",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
    }
  ]

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <FeaturedArticle article={featuredArticle} />
        <ArticleGrid articles={articles} />
      </main>
      <Footer />
    </div>
  )
}

export default App
