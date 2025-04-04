import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({imgSrc, projectType, projectTitle, pageLink}) => {
  return (
    <>
        <Link to={pageLink} className="ProjectCards-Large">
          <img src={imgSrc} alt={`${projectTitle} Image`}/>
          <div className="ProjectCard-Description">
              <div>
              <p className="ProjectCard-Type">{projectType}</p>
              <h2></h2>
              <h3 className="ProjectCard-Title">{projectTitle}</h3>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#4CE6A6" viewBox="0 0 256 256" aria-label="Double Right Arrow Icon">
              <path d="M141.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L124.69,128,50.34,53.66A8,8,0,0,1,61.66,42.34l80,80A8,8,0,0,1,141.66,133.66Zm80-11.32-80-80a8,8,0,0,0-11.32,11.32L204.69,128l-74.35,74.34a8,8,0,0,0,11.32,11.32l80-80A8,8,0,0,0,221.66,122.34Z"></path>
              </svg>
          </div>
        </Link>
    </>
  )
}

export default ProjectCard