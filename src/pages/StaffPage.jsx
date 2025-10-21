import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/StaffPage.css'

function StaffPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Sample staff data - will be replaced with Google Sheets data later
  const staffMembers = [
    {
      id: 1,
      name: 'Mrs. Kaplan',
      role: 'Advisor',
      email: 'hkaplanminer@pps.net',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'John Smith',
      role: 'Editor-in-Chief',
      email: 'john.smith@pps.net',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Sarah Jones',
      role: 'Section Editor - Sports',
      email: 'sarah.jones@pps.net',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Mike Davis',
      role: 'Section Editor - Arts',
      email: 'mike.davis@pps.net',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    }
  ]

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} onLoginClick={() => navigate('/login')} />

      <main className="main-content staff-page">
        <div className="staff-header">
          <h1>Meet Our Team</h1>
          <p className="staff-subtitle">The dedicated journalists bringing you the latest news from our school</p>
        </div>

        <div className="staff-grid">
          {staffMembers.map(member => (
            <div key={member.id} className="staff-card">
              <div className="staff-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="staff-info">
                <h3>{member.name}</h3>
                <p className="staff-role">{member.role}</p>
                <a href={`mailto:${member.email}`} className="staff-email">{member.email}</a>
              </div>
            </div>
          ))}
        </div>

        <section className="gnn-section">
          <div className="gnn-header">
            <h2>📢 General News Network (GNN)</h2>
            <p className="gnn-description">
              Important announcements and updates from the school administration
            </p>
          </div>

          <div className="gnn-announcements">
            <div className="gnn-card">
              <h4>Upcoming Events</h4>
              <ul>
                <li>Homecoming Pep Rally - October 25th</li>
                <li>Fall Break - November 1-3</li>
                <li>Winter Concert - December 15th</li>
              </ul>
            </div>

            <div className="gnn-card">
              <h4>School Notices</h4>
              <ul>
                <li>Library extended hours during exam week</li>
                <li>New parking procedures in effect</li>
                <li>Dress code reminders for dress-up days</li>
              </ul>
            </div>

            <div className="gnn-card">
              <h4>Achievements</h4>
              <ul>
                <li>Math team advances to state competition</li>
                <li>Environmental club wins regional award</li>
                <li>Volleyball team undefeated in league</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default StaffPage
