import React from 'react'
import tempProjImg from '../assets/ProjectImages/HeadHunted/background.jpg'

const Hero = () => {
  return (
    <>
        <div className="Hero-Container">
          <h1>
            Hello Everyone! I'm Sirena.
          </h1>
          <p>
            A passionate game engineer who loves to dive into how mechanics work behind the scenes. 
          </p>
        </div>

        <a className="ProjectCards-Large">
          <img src={tempProjImg} alt="Project Image"/>
          <div className="ProjectCard-Description">
            <p className="ProjectCard-Type">Virtual Reality</p>
            <h3 className="ProjectCard-Title">HeadHunted</h3>
          </div>
        </a>
    </>
  )
}

export default Hero