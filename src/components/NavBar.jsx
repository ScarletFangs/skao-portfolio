import React, {useState } from 'react'
import HomeIcon from '../assets/NavIcons/house.svg'
import ProfileIcon from '../assets/NavIcons/profile.svg'
import ProjectIcon from '../assets/NavIcons/projects.svg'
import SelfPic from '../assets/NavIcons/selfpic.jpg'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const NavBar = () => {

    // Scalable navigation vertical bar 
    const NavLinks = [
        ["Home", HomeIcon, "/"],
        ["About", ProfileIcon, "/about"], 
        ["Projects", ProjectIcon, "/projects"]
    ];

    const [menuOpen, setMenuOpen] = useState(false);
     
    return (
    <>
        {/* Regular navbar for anything except mobile */}
        <div className="navbar-container"> 
            {/* Self Picture div */}
            <nav className="navbar-TopCluster">
                <Link to="/">  {/* to return people to home*/}
                    <img src={SelfPic} alt="Picture of Sirena Kao"/>
                </Link>

                {/* Navigation Buttons div */}
                <div className="navbar-links-container">
                    {NavLinks.map((item, index) => (
                        <NavLink to={item[2]} className="navbar-links-grouping" key={index}>
                            <div className="navbar-links">
                                <img className="navbar-icons" src={item[1]} alt={`${item[0]} Icon`} style={{width:'16px'}}/>
                                <h3 className="navbar-label">{item[0]}</h3>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>

        {/* Mobile specific navbar */}
        <div className="top-navbar-container">
            <nav className="top-navbar-container-group">
                {/* Self picture div */}
                <Link to="/">
                    <img src={SelfPic} alt="Picture of Sirena Kao"/>
                </Link>
                
                <Link to={null} onClick={() => { setMenuOpen(!menuOpen);}} aria-label="Menu Icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="#f7f2f3" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                    </svg>
                </Link>
            </nav>

            {/* Top bar style navigation */}
            <nav className={menuOpen ? "" : "open"}>
                {NavLinks.map((item, index) => (
                    <NavLink to={item[2]} className="navbar-links-grouping" key={index}>
                        <div className="navbar-links">
                            <h3 className="navbar-label">{item[0]}</h3>
                        </div>
                    </NavLink>
                ))}
            </nav>
        </div> 

      </>
    )
}

export default NavBar