import React from 'react'
import ProjectCard from './ProjectCard'
import PageTopInfo from './PageTopInfo'
import HeadHuntedPhoto from '../assets/ProjectImages/HeadHunted/headhunted.jpg' 
import QuickshotPhoto from '../assets/ProjectImages/Quickshot/quickshot.png'

const Hero = () => {
  return (
    <>
        <div className="Hero-Container">
          <PageTopInfo
            pageTitle="Hello Everyone! I'm Sirena."
            pageDescription= "A passionate game engineer who loves to dive into how mechanics work behind the scenes."
          />
          <div className="Hero-ProjectCards">
            {/* Project 1 */}
            <ProjectCard
              imgSrc={HeadHuntedPhoto}
              projectType="Virtual Reality"
              projectTitle="HeadHunted"
              pageLink="/HeadHunted"
            />

            {/* Project 2 */}

            <ProjectCard
              imgSrc={QuickshotPhoto}
              projectType="First Person Shooter"
              projectTitle="Quickshot"
              pageLink="https://phosphoricons.com/?q=%22arrow%22"
            />
          </div>
        </div>
    </>
  )
}

export default Hero