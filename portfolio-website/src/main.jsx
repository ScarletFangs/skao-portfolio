import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './CSS/GeneralText.css'
import './CSS/ComponentCSS/NavBar.css'
import './CSS/ComponentCSS/ProjectCard.css'
import './CSS/ComponentCSS/PageTopInfo.css'
import './CSS/ComponentCSS/ProjectInfoBar.css'
import './CSS/PagesCSS/AboutPage.css'
import './CSS/PagesCSS/ProjectPage.css'
import './CSS/HeadHunted.css'
import './CSS/PagesCSS/HomePage.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
