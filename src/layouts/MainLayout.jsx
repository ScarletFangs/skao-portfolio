import { React, useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import NavBar from '../components/NavBar'

const MainLayout = () => {
  const isDesktop = useMediaQuery({query: '(min-width: 1200px)'})
  const isTablet = useMediaQuery({query: '(min-width: 810px) and (max-width: 1199px)'})
  const isPhone = useMediaQuery({query: '(max-width: 809px)'})

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = searchParams.get('redirect');
    if(redirectPath){
      navigate(`${redirectPath}`);
    }
  }, [navigate]);

  return (
    <>
      <div className="MainLayout-Container" style={{
        display: "flex",
        flexDirection: isPhone ? "column" : "row"
        }}>
        <NavBar/>
        {!isPhone && (
            <div style={{
              flexShrink:"0",
              width: "288px", 
              backgroundColor: "red"
            }}></div> 
        )}
        <div className="MainLayout-Content" style={{marginBottom: "2%"}}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainLayout