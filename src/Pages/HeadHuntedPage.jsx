import React from 'react'
import { Link } from 'react-router-dom'
import PageTopInfo from '../components/PageTopInfo'
import ProjectInfoBar from '../components/ProjectInfoBar'
import HHSplashArt from '../assets/ProjectImages/HeadHunted/hh.jpg'
import HHMoviePoster from '../assets/ProjectImages/HeadHunted/HH_Movie_Poster_2.png'
import HHVideo from '../assets/ProjectImages/HeadHunted/startVideo.mp4'

const HeadHuntedPage = () => {
  return (
    <>
        <div className="HeadHunted-Container">
            <PageTopInfo
                PageTitle="HeadHunted"
                ShowLocation={false}
            />

            <ProjectInfoBar
                ProjectType="School Project"
                Duration="9 Weeks"
                Genre="Virtual Reality Game"
            />
            
            <img src={HHSplashArt} alt="HeadHunted Game Splash Art"/>
            
            <div className="HeadHunted-QuickInfo-Container">
                <div className="HeadHunted-QuickInfo-Description">
                    <div className="HeadHunted-QuickInfo-Label">
                        <p><strong className="Description-Label">Engine</strong>: Unity</p>
                        <p><strong className="Description-Label">Tools</strong>: GitHub, Photoshop</p>
                        <p><strong className="Description-Label">Roles</strong>: Team Lead, Programmer</p>
                        <p><strong className="Description-Label">Duration</strong>: October 2023 - December 2023</p>
                        <p><strong className="Description-Label">Game</strong>: Horror virtual reality game raising awareness of environmental sustainability</p>
                        <p><strong className="Description-Label">Team Size</strong>: 6 Students</p>
                    </div>
                    <p>
                        Headhunted is a VR game prototype with a message of environmental sustainability. You are a deer lurking in the forest, running away from hunters while trying to rescue your friends in a cage! Look out, deforestation has made it different to run around the forest... Unfortunately, many deer haven't made it out alive.... can you? 
                    </p>
                </div>

                <img src={HHMoviePoster} alt="HeadHunted Movie Poster"/>
            </div>

            <Link to="https://scarletfangs.itch.io/headhunted" target="_blank" className="HeadHunted-LinkBtn">
                <p>To Itch.io</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 256 256" aria-label="Right Arrow Icon">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                </svg>
            </Link>

            <div className="HeadHunted-MyContributions-Container">
                <h2>My Contributions</h2>
                <ul>
                    <li>Directed and lead team meetings to resolve challenges and maintain game vision</li>
                    <li>Created player controls with Meta Quest 3 Virtual Reality Headset</li>
                    <li>Implemented player movement</li>
                    <li>Created development tools to improve development flow</li>
                    <li>Designed game manager to control flow of the game </li>
                    <li>Integrated art assets (UI / 3D Models / Meshes / Textures)</li>
                    <li>Analyzing and optimizing game due to hardware constraints</li>
                </ul>
            </div>

            <div className="HHVideo" style={{paddingTop: "16px"}}>
                <video controls width="100%" muted>
                    <source src={HHVideo} type="video/mp4"/>
                    {/* Fallback if video doesnt load */}
                    Your browser does not support video tag. 
                </video>
            </div>

            <Link to="https://scarletfangs.itch.io/headhunted" target="_blank" className="HeadHunted-LinkBtn">
                <p>To Itch.io</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 256 256">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                </svg>
            </Link>
        </div>
    </>   
  )
}

export default HeadHuntedPage