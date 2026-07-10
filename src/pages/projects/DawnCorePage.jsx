import ProjectInfoBar from '../../components/ProjectInfoBar'
import ProjectPage from '../../components/project/ProjectPage'
import QuickInfo from '../../components/project/QuickInfo'
import Section from '../../components/project/Section'
import VideoSection from '../../components/project/VideoSection'
import LinkButton from '../../components/project/LinkButton'
import DCPhoto1 from '../../assets/ProjectImages/DawnCore/dawncore.jpg'
import DCPhoto2 from '../../assets/ProjectImages/DawnCore/DCsplash.png'
import DCVideo from '../../assets/ProjectImages/DawnCore/DCDemo.mp4'
import DCVideo2 from '../../assets/ProjectImages/DawnCore/WeaponDemo.mp4'

const DawnCorePage = () => {
  return (
    <ProjectPage title="DawnCore">
      <ProjectInfoBar
        ProjectType="School Project"
        Duration="21 Weeks"
        Genre="Single-Player First Person Shooter"
      />

      <img src={DCPhoto1} alt="DawnCore key art"/>

      <QuickInfo
        image={DCPhoto2}
        imageAlt="DawnCore splash screen"
        facts={{
          'Engine': 'Unreal Engine',
          'Tools': 'Perforce, Miro, LucidCharts, Figma, Jira',
          'Roles': 'Programmer',
          'Duration': 'Sept 2024 - June 2025',
          'Game': 'A single-player movement shooter where you fight against hordes of enemies with dynamic movement. Your goal is to survive to reach the end of the map.',
          'Team Size': '17 Students',
        }}
      >
        DawnCore is a single-player movement shooter where you fight against hordes of Shadow monsters with the versatile movement from Titanfall. You are armed with a powerful pistol as well as a sabre to cut down the Darkness.
      </QuickInfo>

      <LinkButton href="https://bronpro.itch.io/dawncore">To Itch.io</LinkButton>

      {/*
        Reorganization from here:
        - Problem game tries to solve (maybe put goal of game here)
        - System name
            - Challenges
            - Implementation
            - Iterations
            - Lessons
            - video / images if any
        - Tools or designer-facing architecture
        - Collaboration
        - What you would do differently
      */}
      {/* TODO - stylize */}
      <Section title="Goal">
        <p>Design a high velocity traversal system inspired by Titanfall 2 where momentum conservation is the core skill expression. Movement states (sprint, slide, wall run, air) should blend seamlessly while avoiding motion discomfort during rapid directional changes.</p>
      </Section>

      <Section title="Challenges">
        <ul>
            <li>Players frequently lost speed when transitioning between sprinting, sliding, and wall-running</li>
            <li>Camera snapping to different states caused motion discomfort during extended play</li>
            <li>Movement transitions felt abrupt, making traversal feel predetermined instead of fluid</li>
        </ul>
      </Section>

      <Section title="Implementation">
        <ul>
            <li><b>Controller Augmentation</b> - Extended the engine character controller by injecting custom directional velocity and surface adhesion logic during wall running</li>
            <li><b>Momentum Redirection</b> - Redirected the player&apos;s existing movement vector along wall surfaces instead of resetting speed on impact</li>
            <li><b>Surface Validation</b> - sampled wall angles using surface normals to prevent attachment to geometry that would break movement flow</li>
            <li><b>Camera Smoothing</b> - Interpolated camera orientation relative to the wall surface to avoid sudden view snaps during traversal</li>
            <li><b>Aerial Control Separation</b> - decomposed player input into directional influence without canceling accumulated forward momentum (movement behavior was driven by vector based calculations rather than simple speed adjustments)</li>
        </ul>
      </Section>

      <Section title="My Contributions">
        <ul>
          <li>Developed a movement system that smoothly transitions between modes while maintaining player momentum using linear algebra</li>
          <li>Collaborated with game designers to ensure fluidity between movement mechanics and maintain satisfying feeling</li>
          <li>Designed and implemented the pistol and saber weapons in game drawing inspiration from Left for Dead 2</li>
          <li>Collaborated with UI/UX members to implement user interfaces that enhances gameplay</li>
          <li>Collaborated with 3D model artist and animators to ensure proper assets are being created for the player</li>
        </ul>
        <VideoSection src={DCVideo}/>
      </Section>

      <Section title="Weapon Prototype">
        <VideoSection src={DCVideo2}/>
      </Section>

      <LinkButton href="https://bronpro.itch.io/dawncore">To Itch.io</LinkButton>
    </ProjectPage>
  )
}

export default DawnCorePage
