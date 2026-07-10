import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProjectPage from './pages/ProjectsPage.jsx'
import DawnCorePage from './pages/projects/DawnCorePage.jsx'
import HeadHuntedPage from './pages/projects/HeadHuntedPage.jsx'
import QuickShotPage from './pages/projects/QuickShotPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/projects' element={<ProjectPage/>}/>
      <Route path='/DawnCore' element={<DawnCorePage/>}/>
      <Route path='/HeadHunted' element={<HeadHuntedPage/>}/>
      <Route path='/QuickShot' element={<QuickShotPage/>}/>      
    </Route>
  ),
  {
    basename:'/skao-portfolio/'
  }
)

function App() {
  return <RouterProvider router={router} />;
}

export default App
