import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About The Herald</h3>
          <p>The School Herald is the official student newspaper, committed to delivering news, sports, and stories that matter to our community.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#submit">Submit a Story</a></li>
            <li><a href="#join">Join Our Team</a></li>
            <li><a href="#archive">Archives</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
            <a href="#facebook">Facebook</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 The School Herald. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
