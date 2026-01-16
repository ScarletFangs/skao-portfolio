import React from 'react'
import { Link } from 'react-router-dom'
import PageTopInfo from '../components/PageTopInfo'
import ProjectInfoBar from '../components/ProjectInfoBar'
import DCPhoto1 from '../assets/ProjectImages/DawnCore/dawncore.jpg'
import DCPhoto2 from '../assets/ProjectImages/DawnCore/DCsplash.png'
import DCVideo from '../assets/ProjectImages/DawnCore/DCDemo.mp4'
import DCVideo2 from '../assets/ProjectImages/DawnCore/WeaponDemo.mp4'

const DawnCorePage = () => {
  return (
      <div className="HeadHunted-Container">
        <PageTopInfo
            PageTitle="DawnCore"
            ShowLocation={false}
        />       
        
        <ProjectInfoBar
            ProjectType="School Project"
            Duration="21 Weeks"
            Genre="Single-Player First Person Shooter"
        />

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

      <Link to="https://bronpro.itch.io/dawncore" target="_blank" className="HeadHunted-LinkBtn">
          <p>To Itch.io</p>
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
        <div className="HHVideo" style={{paddingTop: "16px"}}>
            <video controls width="100%" muted>
                <source src={DCVideo} type="video/mp4"/>
                {/* Fallback if video doesnt load */}
                Your browser does not support video tag. 
            </video>
        </div>
      </div>

      <div className="HeadHunted-MyContributions-Container">
        <h2>Weapon Prototype</h2>
        <div className="HHVideo" style={{paddingTop: "16px"}}>
            <video controls width="100%" muted>
                <source src={DCVideo2} type="video/mp4"/>
                {/* Fallback if video doesnt load */}
                Your browser does not support video tag. 
            </video>
        </div>
      </div>


      <Link to="https://bronpro.itch.io/dawncore" target="_blank" className="HeadHunted-LinkBtn">
          <p>To Itch.io</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 256 256">
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
          </svg>
      </Link>
    </div>
  )
}

export default DawnCorePage