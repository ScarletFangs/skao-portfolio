import MediaQuery, { useMediaQuery } from 'react-responsive'
import NavBar from '../src/components/NavBar.jsx'
import Hero from '../src/components/Hero.jsx'



function App() {
  const isDesktop = useMediaQuery({query: '(min-width: 1200px'})
  const isTablet = useMediaQuery({query: '(min-width: 810px) and (max-width: 1199px)'})
  const isPhone = useMediaQuery({query: '(max-width: 810px'})
  return (
    <>
      {!isPhone && <NavBar/>}
      {/* <NavBar/> */}

      {/* Content */}
      <div style={{display: "flex"}}>
        {!isPhone && (
          //for not phone devices 
          <div style={{
            width: "20vw", minWidth: "200px"}}></div> 
        )}
        <Hero />
      </div>
    </>
  )
}

export default App
