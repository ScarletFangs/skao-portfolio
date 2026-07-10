import ProjectInfoBar from '../../components/ProjectInfoBar'
import ProjectPage from '../../components/project/ProjectPage'
import QuickInfo from '../../components/project/QuickInfo'
import Section from '../../components/project/Section'
import VideoSection from '../../components/project/VideoSection'
import LinkButton from '../../components/project/LinkButton'
import HHSplashArt from '../../assets/ProjectImages/HeadHunted/hh.jpg'
import HHMoviePoster from '../../assets/ProjectImages/HeadHunted/HH_Movie_Poster_2.png'
import HHVideo from '../../assets/ProjectImages/HeadHunted/startVideo.mp4'

const HeadHuntedPage = () => {
  return (
    <ProjectPage title="HeadHunted">
      <ProjectInfoBar
        ProjectType="School Project"
        Duration="9 Weeks"
        Genre="Virtual Reality Game"
      />

      <img src={HHSplashArt} alt="HeadHunted Game Splash Art"/>

      <QuickInfo
        image={HHMoviePoster}
        imageAlt="HeadHunted Movie Poster"
        facts={{
          'Engine': 'Unity',
          'Tools': 'GitHub, Photoshop',
          'Roles': 'Team Lead, Programmer',
          'Duration': 'October 2023 - December 2023',
          'Game': 'Horror virtual reality game raising awareness of environmental sustainability',
          'Team Size': '6 Students',
        }}
      >
        Headhunted is a VR game prototype with a message of environmental sustainability. You are a deer lurking in the forest, running away from hunters while trying to rescue your friends in a cage! Look out, deforestation has made it different to run around the forest... Unfortunately, many deer haven&apos;t made it out alive.... can you?
      </QuickInfo>

      <LinkButton href="https://scarletfangs.itch.io/headhunted">To Itch.io</LinkButton>

      <Section title="My Contributions">
        <ul>
          <li>Directed and lead team meetings to resolve challenges and maintain game vision</li>
          <li>Created player controls with Meta Quest 3 Virtual Reality Headset</li>
          <li>Implemented player movement</li>
          <li>Created development tools to improve development flow</li>
          <li>Designed game manager to control flow of the game </li>
          <li>Integrated art assets (UI / 3D Models / Meshes / Textures)</li>
          <li>Analyzing and optimizing game due to hardware constraints</li>
        </ul>
      </Section>

      <VideoSection src={HHVideo}/>

      <LinkButton href="https://scarletfangs.itch.io/headhunted">To Itch.io</LinkButton>
    </ProjectPage>
  )
}

export default HeadHuntedPage
