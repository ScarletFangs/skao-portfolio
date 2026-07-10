import PageTopInfo from '../PageTopInfo'
import './ProjectPage.css'

const ProjectPage = ({ title, children }) => {
  return (
    <div className="ProjectPage-Container">
      <PageTopInfo
        PageTitle={title}
        ShowLocation={false}
      />
      {children}
    </div>
  )
}

export default ProjectPage
