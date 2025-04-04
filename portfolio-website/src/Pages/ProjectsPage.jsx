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
          PageTitle="Projects I Have Worked On"
        />

        <div className="ProjectPage-ProjectCards">
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
              className="ProjectPage-LargerCard"
              imgSrc={QuickshotPhoto}
              projectType="First Person Shooter"
              projectTitle="Quickshot"
              pageLink="/QuickShot"
            />

            {/* Project 3 */}
            <ProjectCard
              className="ProjectPage-LargerCard"
              imgSrc={HeadHuntedPhoto}
              projectType="Virtual Reality"
              projectTitle="HeadHunted"
              pageLink="/HeadHunted"
            />
        </div>
      </div>
    </>
  )
}

export default ProjectsPage