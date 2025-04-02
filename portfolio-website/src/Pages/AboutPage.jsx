import React from 'react'
import Resume from '../assets/fakeresume.pdf'
import PageTopInfo from '../components/PageTopInfo'

const AboutPage = () => {
  return (
    <>
    <div className="About-Container">
      <PageTopInfo
        PageTitle="Get To Know Me"
        PageDescription= "Hello, I'm Sirena, and I am game engineer who loves working with combat systems. I have always been captivated by the engineering done behind the scenes for games to perform. My goal is to combine bring exhilarating and dynamic combat experiences to players in both first and third person point of views."
        ShowLocation={true}
      />

      <div className="About-EduContainer">
        <h2>
          Education
        </h2>
        <div className="About-EduGrouping">
          <h3>
            Bachelor's Degree in Game Design and Interactive Media
          </h3>
          <p>
            University of California, 2025
          </p>
        </div>
      </div>

      <hr className="MiniGroup-Divider"/>
      <h2>Resume</h2>

      <div className="About-ResumeContainer">
        <iframe className="Resume" src={Resume}> </iframe>
      </div>
    </div>
    </>
  )
}

export default AboutPage