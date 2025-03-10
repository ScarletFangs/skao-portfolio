import React from 'react'
import { Link } from 'react-router-dom'
import PageTopInfo from '../components/PageTopInfo'
import DCPhoto1 from '../assets/ProjectImages/DawnCore/dawncore.jpg'
import DCPhoto2 from '../assets/ProjectImages/DawnCore/DCsplash.png'
import DCVideo from '../assets/ProjectImages/DawnCore/DCDemo.mp4'
import DCVideo2 from '../assets/ProjectImages/DawnCore/WeaponDemo.mp4'

const DawnCorePage = () => {
  return (
      <div className="HeadHunted-Container">
        <PageTopInfo
            pageTitle="DawnCore"
            showLocation={false}
        />       

        <div className="HeadHunted-InfoBar">
            <div className="DawnCore-InfoBar-MiniGroup">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4CE6A6" viewBox="0 0 256 256">
                    <path d="M226.53,56.41l-96-32a8,8,0,0,0-5.06,0l-96,32A8,8,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.59,86.29a64,64,0,0,0,20.65,88.05c-18,7.06-33.56,19.83-44.94,37.29a8,8,0,1,0,13.4,8.74C77.77,197.25,101.57,184,128,184s50.23,13.25,65.3,36.37a8,8,0,0,0,13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64,64,0,0,0,20.65-88l44.12-14.7a8,8,0,0,0,0-15.18ZM176,120A48,48,0,1,1,89.35,91.55l36.12,12a8,8,0,0,0,5.06,0l36.12-12A47.89,47.89,0,0,1,176,120ZM128,87.57,57.3,64,128,40.43,198.7,64Z"></path>
                </svg>
                <p>School Project</p>
            </div>
            <hr className="HeadHunted-InfoBar-Divider"/>
            <div className="HeadHunted-InfoBar-MiniGroup">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4CE6A6" viewBox="0 0 256 256">
                    <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path>
                </svg>
                <p>21 Weeks</p>
            </div>
            <hr className="HeadHunted-InfoBar-Divider"/>
            <div className="HeadHunted-InfoBar-MiniGroup">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4CE6A6" viewBox="0 0 256 256">
                    <path d="M208,144H136V95.19a40,40,0,1,0-16,0V144H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V160A16,16,0,0,0,208,144ZM104,56a24,24,0,1,1,24,24A24,24,0,0,1,104,56ZM208,208H48V160H208v48Zm-40-96h32a8,8,0,0,1,0,16H168a8,8,0,0,1,0-16Z"></path>
                </svg>
                <p>Single-Player First Person Shooter</p>
            </div>
        </div>

      <img src={DCPhoto1}/>

      <div className="HeadHunted-QuickInfo-Container">
          <div className="HeadHunted-QuickInfo-Description">
              <div className="HeadHunted-QuickInfo-Label">
                  <h6><strong className="Description-Label">Engine</strong>: Unreal Engine</h6>
                  <h6><strong className="Description-Label">Tools</strong>: Perforce, Miro, LucidCharts, Figma, Jira</h6>
                  <h6><strong className="Description-Label">Roles</strong>: Programmer</h6>
                  <h6><strong className="Description-Label">Duration</strong>: Sept 2024 - June 2025</h6>
                  <h6><strong className="Description-Label">Game</strong>: A single-player movement shooter where you fight against hordes of enemies with dynamic movement. Your goal is to survive to reach the end of the map.</h6>
                  <h6><strong className="Description-Label">Team Size</strong>: 17 Students</h6>
              </div>
              <p>
                DawnCore is a single-player movement shooter where you fight against hordes of Shadow monsters with the versatile movement from Titanfall. You are armed with a powerful pistol as well as a sabre to cut down the Darkness.
              </p>
          </div>

          <img src={DCPhoto2}/>
      </div>

      <Link to="https://scarletfangs.itch.io/headhunted" target="_blank" className="HeadHunted-LinkBtn" onClick={(e) => e.preventDefault()}>
          <p>Coming Soon</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 256 256">
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
          </svg>
      </Link>

      <div className="HeadHunted-MyContributions-Container">
          <h2>My Contributions</h2>
          <ul>
              <li>Developed a movement system that smoothly transitions between modes while maintaining player momentum using linear algebra</li>
              <li>Collaborated with game designers to ensure fluidity between movement mechanics and maintain satisfying feeling</li>
              <li>Designed and implemented the pistol and saber weapons in game drawing inspiration from Left for Dead 2</li>
              <li>Collaborated with UI/UX members to implement user interfaces that enhances gameplay</li>
              <li>Collaborated with 3D model artist and animators to ensure proper assets are being created for the player</li>
          </ul>
      </div>

      <div className="HHVideo" style={{paddingTop: "16px"}}>
          <video controls width="100%" muted>
              <source src={DCVideo} type="video/mp4"/>
              {/* Fallback if video doesnt load */}
              Your browser does not support video tag. 
          </video>
      </div>

      <div className="HeadHunted-MyContributions-Container">
          <h2>Weapon Prototype</h2>
      </div>

      <div className="HHVideo" style={{paddingTop: "16px"}}>
          <video controls width="100%" muted>
              <source src={DCVideo2} type="video/mp4"/>
              {/* Fallback if video doesnt load */}
              Your browser does not support video tag. 
          </video>
      </div>

      <Link to="https://scarletfangs.itch.io/headhunted" target="_blank" className="HeadHunted-LinkBtn" onClick={(e) => e.preventDefault()}>
          <p>Coming Soon</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 256 256">
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
          </svg>
      </Link>
    </div>
  )
}

export default DawnCorePage