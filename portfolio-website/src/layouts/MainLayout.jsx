import { Outlet } from 'react-router-dom'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import NavBar from '../components/NavBar'

const MainLayout = () => {
  const isDesktop = useMediaQuery({query: '(min-width: 1200px)'})
  const isTablet = useMediaQuery({query: '(min-width: 810px) and (max-width: 1199px)'})
  const isPhone = useMediaQuery({query: '(max-width: 809px)'})

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: isPhone ? "column" : "row"
        }}>
        <NavBar/>
        {/* {!isPhone && <NavBar/>} */}
        {!isPhone && (
            <div style={{
              flexShrink:"0",
              width: "288px", 
              backgroundColor: "red"
            }}></div> 
        )}
      <Outlet />
      </div>
    </>
  )
}

export default MainLayout