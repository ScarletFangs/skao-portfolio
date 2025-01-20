import React from 'react'
import NavIcons from '../images.js'
import { Link } from 'react-router-dom'

const NavBar = () => {

    const NavLinks = [
        ["Home", NavIcons["HomeIcon"], "/"],
        ["About", NavIcons["ProfileIcon"], "/about"], 
        ["Projects", NavIcons["ProjectIcon"], "/projects"]
    ];
     
    return (
    <>
        <div className="navbar-container"> 
            
            {/* Self Picture div */}
            <div className="navbar-selfpic">
            <img src={NavIcons["SelfPic"]}/>
            </div>

            {/* Navigation Buttons div */}
            <div>
                {NavLinks.map((item, index) => (
                    <Link to={item[2]} className="navbar-links-container" key={index}>
                        <div className="navbar-links">
                            <img className="navbar-icons" src={item[1]} alt={`${item[0]} Icon`}/>
                            <h3 className="navbar-label">{item[0]}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </>
    )
}

export default NavBar