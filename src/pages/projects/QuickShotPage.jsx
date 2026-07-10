import ProjectInfoBar from '../../components/ProjectInfoBar'
import ProjectPage from '../../components/project/ProjectPage'
import QuickInfo from '../../components/project/QuickInfo'
import Section from '../../components/project/Section'
import VideoSection from '../../components/project/VideoSection'
import LinkButton from '../../components/project/LinkButton'
import QSPhoto1 from '../../assets/ProjectImages/Quickshot/quickshot.png'
import QSPhoto2 from '../../assets/ProjectImages/Quickshot/quickshot2.png'
import QSVideo from '../../assets/ProjectImages/Quickshot/QSDemo.mp4'

const QuickShotPage = () => {
  return (
    <ProjectPage title="QuickShot">
      <ProjectInfoBar
        ProjectType="School Project"
        Duration="9 Weeks"
        Genre="Multiplayer First Person Shooter"
      />

      <img src={QSPhoto1} alt="QuickShot gameplay screenshot"/>

      <QuickInfo
        image={QSPhoto2}
        imageAlt="QuickShot arena screenshot"
        facts={{
          'Engine': 'Unity',
          'Tools': 'GitHub, Photoshop, CodeDecks, Figma',
          'Roles': 'Programmer',
          'Duration': 'March 2024 - June 2024',
          'Game': 'Fast pace online multiplayer FPS death match game, where you use a sniper to dominate the competition.',
          'Team Size': '14 Students',
        }}
      >
        QuickShot is a fast paced online multiplayer FPS death-match game, where you use a sniper to dominate the competition. Use your dash and grapple hook to traverse the arena, and take quick shots at your opponents with your handy sniper rifle.
      </QuickInfo>

      <LinkButton href="https://dtrmgiraffe.itch.io/quickshot">To Itch.io</LinkButton>

      <Section title="My Contributions">
        <ul>
          <li>Designed and refined player movement for a responsive and satisfying feel using Unity&apos;s Character Controller</li>
          <li>Developed and fine-tuned advanced movement abilities, including a dynamic grapple hook and dash</li>
          <li>Worked closely with game designers to enhance movement mechanics, ensuring fluidity and player engagement</li>
          <li>Ensured smooth multiplayer synchronization by prioritizing essential data transmission while reducing bandwidth usage</li>
          <li>Designed a health recovery system to enhance player engagement and reward strategic gameplay</li>
          <li>Collaborated with environmental artists to refine map colliders, optimizing level design and improving the playable area</li>
        </ul>
      </Section>

      <VideoSection src={QSVideo}/>

      <LinkButton href="https://dtrmgiraffe.itch.io/quickshot">To Itch.io</LinkButton>
    </ProjectPage>
  )
}

export default QuickShotPage
