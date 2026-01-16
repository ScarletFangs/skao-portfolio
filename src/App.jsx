import {
  Route, 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './Pages/HomePage.jsx'
import AboutPage from './Pages/AboutPage.jsx'
import ProjectPage from './Pages/ProjectsPage.jsx'
import DawnCorePage from './Pages/DawnCorePage.jsx'
import HeadHuntedPage from './Pages/HeadHuntedPage.jsx'
import QuickShotPage from './Pages/QuickShotPage.jsx'

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
