import React from 'react'
import PageTopInfo from '../components/PageTopInfo'
import ProjectCard from '../components/ProjectCard'
import HeadHuntedPhoto from '../assets/ProjectImages/HeadHunted/headhunted.jpg' 
import QuickshotPhoto from '../assets/ProjectImages/Quickshot/quickshot.png'
import DawnCorePhoto from '../assets/ProjectImages/DawnCore/dawncore.jpg'

const ProjectsPage = () => {
  return (
    <>
      <div className="ProjectPage-Container">
        <PageTopInfo
          pageTitle="Projects I Have Worked On"
          // pageDescription= "Hello, I'm sirena, and I am game engineer who loves working with combat systems. I have always been captivated by the engineering done behind the scenes for games to perform. My goal is to combine bring exhilarating and dynamic combat experiences to players in both first and third person point of views."
        />

        <div className="ProjectPage-ProjectCards">
            {/* Project 1 */}
            <ProjectCard
              className="ProjectPage-LargerCard"
              imgSrc={DawnCorePhoto}
              projectType="First Person Shooter"
              projectTitle="DawnCore"
              pageLink="/DawnCore"
            />

            {/* Project 2 */}
            <ProjectCard
              className="ProjectPage-LargerCard"
              imgSrc={QuickshotPhoto}
              projectType="First Person Shooter"
              projectTitle="Quickshot"
              pageLink="https://phosphoricons.com/?q=%22arrow%22"
            />

            {/* Project 3 */}
            <ProjectCard
              className="ProjectPage-LargerCard"
              imgSrc={HeadHuntedPhoto}
              projectType="Virtual Reality"
              projectTitle="HeadHunted"
              pageLink="https://phosphoricons.com/?q=%22arrow%22"
            />
        </div>
      </div>
    </>
  )
}

export default ProjectsPage