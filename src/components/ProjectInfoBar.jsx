import React from 'react'

const ProjectInfoBar = ({ProjectType, Duration, Genre}) => {
  return (
    <div className="InfoBar-Container">
        <div className="InfoBar-MiniGroup">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4CE6A6" viewBox="0 0 256 256" aria-label="Student Icon">
                <path d="M226.53,56.41l-96-32a8,8,0,0,0-5.06,0l-96,32A8,8,0,0,0,24,64v80a8,8,0,0,0,16,0V75.1L73.59,86.29a64,64,0,0,0,20.65,88.05c-18,7.06-33.56,19.83-44.94,37.29a8,8,0,1,0,13.4,8.74C77.77,197.25,101.57,184,128,184s50.23,13.25,65.3,36.37a8,8,0,0,0,13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64,64,0,0,0,20.65-88l44.12-14.7a8,8,0,0,0,0-15.18ZM176,120A48,48,0,1,1,89.35,91.55l36.12,12a8,8,0,0,0,5.06,0l36.12-12A47.89,47.89,0,0,1,176,120ZM128,87.57,57.3,64,128,40.43,198.7,64Z"></path>
            </svg>
            <p>{ProjectType}</p>
        </div>

    <hr className="InfoBar-Divider"/>

        <div className="InfoBar-MiniGroup">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4CE6A6" viewBox="0 0 256 256">
                <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216ZM173.66,90.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32l40-40A8,8,0,0,1,173.66,90.34ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"></path>
            </svg>
            <p>{Duration}</p>
        </div>
        
    <hr className="InfoBar-Divider"/>

        <div className="InfoBar-MiniGroup">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4CE6A6" viewBox="0 0 256 256">
                <path d="M208,144H136V95.19a40,40,0,1,0-16,0V144H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V160A16,16,0,0,0,208,144ZM104,56a24,24,0,1,1,24,24A24,24,0,0,1,104,56ZM208,208H48V160H208v48Zm-40-96h32a8,8,0,0,1,0,16H168a8,8,0,0,1,0-16Z"></path>
            </svg>
            <p>{Genre}</p>
        </div>

    </div>
  )
}

export default ProjectInfoBar