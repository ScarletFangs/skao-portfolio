import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './CSS/GeneralText.css'
import './CSS/NavBar.css'
import './CSS/ProjectCard.css'
import './CSS/PageTopInfo.css'
import './CSS/AboutPage.css'
import './CSS/ProjectPage.css'
import './CSS/HeadHunted.css'
import './CSS/HomePage.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
