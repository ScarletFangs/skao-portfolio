import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import './MainLayout.css'

const MainLayout = () => {
  const navigate = useNavigate();

  // GitHub Pages deep-link support: public/404.html redirects unknown
  // paths to /?redirect=<path>, which we resolve here.
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = searchParams.get('redirect');
    if(redirectPath){
      navigate(`${redirectPath}`);
    }
  }, [navigate]);

  return (
    <div className="MainLayout-Container">
      <NavBar/>
      <main className="MainLayout-Content">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout