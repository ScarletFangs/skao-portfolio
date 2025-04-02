import React from 'react'
import PageTopInfo from '../components/PageTopInfo'
import ProjectInfoBar from '../components/ProjectInfoBar'
import { Link } from 'react-router-dom'
import QSPhoto1 from '../assets/ProjectImages/Quickshot/quickshot.png'
import QSPhoto2 from '../assets/ProjectImages/Quickshot/quickshot2.png'
import QSVideo from '../assets/ProjectImages/Quickshot/QSDemo.mp4'


const QuickShotPage = () => {
  return (
    <div className="HeadHunted-Container">
        {/* Page Header */}
        <PageTopInfo
            PageTitle="QuickShot"
            ShowLocation={false}
        />

        <ProjectInfoBar
            ProjectType="School Project"
            Duration="9 Weeks"
            Genre="Multiplayer First Person Shooter"
        />

        <img src={QSPhoto1}/>

        <div className="HeadHunted-QuickInfo-Container">
            <div className="HeadHunted-QuickInfo-Description">
                <div className="HeadHunted-QuickInfo-Label">
                    <h6><strong className="Description-Label">Engine</strong>: Unity</h6>
                    <h6><strong className="Description-Label">Tools</strong>: GitHub, Photoshop, CodeDecks, Figma</h6>
                    <h6><strong className="Description-Label">Roles</strong>: Programmer</h6>
                    <h6><strong className="Description-Label">Duration</strong>: March 2024 - June 2024</h6>
                    <h6><strong className="Description-Label">Game</strong>: Fast pace online multiplayer FPS death match game, where you use a sniper to dominate the competition.</h6>
                    <h6><strong className="Description-Label">Team Size</strong>: 14 Students</h6>
                </div>
                <p>
                    QuickShot is a fast paced online multiplayer FPS death-match game, where you use a sniper to dominate the competition. Use your dash and grapple hook to traverse the arena, and take quick shots at your opponents with your handy sniper rifle.
                </p>
            </div>

            <img src={QSPhoto2}/>
        </div>

        <Link to="https://dtrmgiraffe.itch.io/quickshot" target="_blank" className="HeadHunted-LinkBtn">
            <p>To Itch.io</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
            </svg>
        </Link>
        
        <div className="HeadHunted-MyContributions-Container">
            <h2>My Contributions</h2>
            <ul>
                <li>Designed and refined player movement for a responsive and satisfying feel using Unity’s Character Controller</li>
                <li>Developed and fine-tuned advanced movement abilities, including a dynamic grapple hook and dash</li>
                <li>Worked closely with game designers to enhance movement mechanics, ensuring fluidity and player engagement</li>
                <li>Ensured smooth multiplayer synchronization by prioritizing essential data transmission while reducing bandwidth usage</li>
                <li>Designed a health recovery system to enhance player engagement and reward strategic gameplay</li>
                <li>Collaborated with environmental artists to refine map colliders, optimizing level design and improving the playable area</li>
            </ul>
        </div>

        <div className="QSVideo" style={{paddingTop: "16px"}}>
            <video controls width="100%" muted>
                <source src={QSVideo} type="video/mp4"/>
                {/* Fallback if video doesnt load */}
                Your browser does not support video tag. 
            </video>
        </div>

        <Link to="https://dtrmgiraffe.itch.io/quickshot" target="_blank" className="HeadHunted-LinkBtn">
            <p>To Itch.io</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
            </svg>
        </Link>
    </div>
  )
}

export default QuickShotPage