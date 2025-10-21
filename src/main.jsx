import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Load Google Sign-In script
const script = document.createElement('script')
script.src = 'https://accounts.google.com/gsi/client'
script.async = true
script.defer = true
document.head.appendChild(script)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
