import React from 'react'
import ProjectCard from '../components/ProjectCard.jsx'
import PageTopInfo from '../components/PageTopInfo.jsx'
import HeadHuntedPhoto from '../assets/ProjectImages/HeadHunted/headhunted.jpg' 
import QuickshotPhoto from '../assets/ProjectImages/Quickshot/quickshot.png'

const HomePage = () => {
  
  return (
    <>
      <div className="Home-Container">
        <PageTopInfo
          pageTitle="Hello Everyone! I'm Sirena."
          pageDescription= "A passionate game engineer who loves to dive into how mechanics work behind the scenes."
          showLocation={true}
        />

        <div className="Hero-ProjectCards">
          {/* Project 1 */}
          <ProjectCard
              className="ProjectPage-LargerCard"
              imgSrc={DawnCorePhoto}
              projectType="First Person Shooter"
              projectTitle="DawnCore (Unreleased)"
              pageLink="/DawnCore"
            />

          {/* Project 2 */}
          <ProjectCard
            imgSrc={QuickshotPhoto}
            projectType="First Person Shooter"
            projectTitle="Quickshot"
            pageLink="/QuickShot"
            />
        </div>
      </div>
    </>
  )
}

export default HomePage