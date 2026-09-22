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
          'Engine': 'Unreal Engine (Blueprints, C++)',
          'My Tools': 'Perforce, Miro, LucidCharts, Jira',
          'Team Tools': 'Figma',
          'Roles': 'Gameplay Programmer',
          'Duration': 'Sept 2024 - June 2025',
          'Game': 'A single-player movement shooter where you fight against hordes of enemies with dynamic movement. Your goal is to survive to reach the end of the map.',
          'Team Size': '17 Students',
        }}
      >
        DawnCore is a single-player movement shooter where you fight against hordes of Shadow monsters with the versatile movement from Titanfall. You are armed with a powerful pistol as well as a sabre to cut down the Darkness.
      </QuickInfo>

      <LinkButton href="https://bronpro.itch.io/dawncore">To Itch.io</LinkButton>

      <Section title="Goal">
        <p>DawnCore is a movement shooter, so traversal is the game. The target was momentum conservation as the core skill expression. Sprinting into a slide into a wall run should read as one continuous motion instead of a sequence of separate states. I was the gameplay programmer for the traversal system.</p>
      </Section>

      <Section title="Finding the Problem">
        <p>I had the math working early and the system still felt wrong. To work out why, I watched playtest footage slowed down and studied how Titanfall 2 and Apex Legends solved the same traversal problem. Two problems came out of that, and neither one had shown up while I was testing calmly on my own.</p>
        <ul>
            <li>Players lost speed moving between sprinting, sliding, and wall running, which made traversal feel predetermined instead of fluid</li>
            <li>The camera snapped as the movement state changed. Once players were moving and shooting at the same time, that snap caused real physical discomfort over a long session</li>
        </ul>
      </Section>

      <Section title="Implementation">
        <p>I prototyped the movement in Blueprints so I could answer the feel questions quickly, then converted the system to C++ once the behavior was settled, for efficiency and scalability. I structured movement and weapons as modular C++ components, so designers could retune behavior through Blueprints without touching code and a new movement style could extend a shared base instead of being written from scratch.</p>
        <p>The choices below came out of what I saw in the playtests, so each one is paired with the player behavior it was fixing.</p>
        <ul>
            <li><b>Momentum Redirection</b> - Maintained the player&apos;s existing movement vector based on the state they were transitioning from, instead of setting or increasing speed to compensate for the change. This is what kept sprinting, sliding, and wall running reading as one motion instead of three separate states</li>
            <li><b>Camera Smoothing</b> - Interpolated camera orientation relative to the wall surface. This removed the view snaps that were causing physical discomfort once players were moving and shooting at the same time, and added some juice to how players landed on a wall</li>
            <li><b>Character Extension</b> - Extended Unreal&apos;s Character class, injecting custom directional velocity and surface adhesion logic during wall running</li>
            <li><b>Surface Validation</b> - Sampled wall angles using surface normals to prevent attachment to geometry that would break movement flow</li>
            <li><b>Aerial Control Separation</b> - Decomposed player input into directional influence without canceling accumulated forward momentum (movement behavior was driven by vector based calculations rather than simple speed adjustments)</li>
        </ul>
        <VideoSection src={DCVideo}/>
      </Section>

      <Section title="Iterations">
        <p>Once the core movement was working, the rest of my work on it was fine tuning rather than building. I was adding juice, smoothing the momentum transfer between states and refactoring the camera so every movement system called one camera object instead of its own. I was refining the weapons at the same time and helping the artists get their models and animations into the game. I was getting pulled to help in other places while trying to get through my own tasks.</p>
        <p>I had calibrated the first version to what I thought was good. I did not have Titanfall 2, so I could not feel the wall running for myself. I worked from YouTube videos and from Apex Legends where there was an equivalent move. Once other people started playing, I had to widen the timing windows and account for movement I had not planned for. Wall riding needed to keep working when the wall curved, and when the surface had dips and bumps in it.</p>
        <p>The movement had to be forgiving enough that the least experienced player could still perform it without feeling overwhelmed, and demanding enough that a skilled player could chain complex traversals to their advantage. Finding where that line sits was never something I could work out at my desk.</p>
      </Section>

      <Section title="Collaboration">
        <p>Because the whole point was preserving momentum, I worked with the game designers on where the speed ceiling should sit. Players were trying to move as fast as they could while still shooting at hordes of enemies, and those two goals pull against each other. Setting that number was a design call, so I worked it out with the designers instead of picking it on my own.</p>
        <ul>
          <li>Implemented in-game user interfaces with the UI/UX designers</li>
          <li>Partnered with the level designers to shape playable spaces around what the movement system could do, tuning layout scale, traversal routes, and encounter spacing against player momentum and speed</li>
          <li>Worked with the 3D modelers and animators so player assets matched what the movement system needed</li>
          <li>Managed Perforce version control for the 17 person team</li>
          <li>Mapped movement states and system flow in Miro and LucidCharts before building them, and tracked work in Jira across Agile sprints</li>
        </ul>
      </Section>

      <Section title="Weapon Prototype">
        <p>I also designed and implemented the pistol and sabre in Unreal Engine C++, built on the same component pattern as the movement system, taking inspiration from Left 4 Dead 2.</p>
        <VideoSection src={DCVideo2}/>
      </Section>

      <Section title="Lessons">
        <p>Testing a system myself and watching someone else play it are two completely different scenarios, and only the second one told me what to change. The camera snap never showed up in my own testing because I was never moving and shooting at the same time while I tested.</p>
        <p>That is the reason I want to be in the position where I can watch someone play, notice the change in their behavior that shows when they stopped enjoying it, and go find out why.</p>
      </Section>

      <Section title="What I Would Do Differently">
        <p>The traversal system got where it needed to go. Most of what I would change is about how long it took me to find out what was wrong.</p>
        <ul>
          <li>I was diagnosing a feel problem by eye. Before tuning anything, I would build a live readout of speed and movement state so I could see what the system was doing while I was playing it, instead of working it out from slowed footage afterward.</li>
          <li>Most of my testing happened once the system already felt finished, which is the point where changing it costs the most. I would spend less effort testing a build I considered done and more of it while the system was still rough, when feedback can still change the design and not just the numbers.</li>
          <li>Playtests happened on the project schedule, so feedback on the movement arrived when the calendar said it would rather than when I needed it. I would put rough builds in front of teammates between those dates instead of waiting for the next scheduled session.</li>
          <li>Designers could adjust the movement values I had thought to expose. The ones I had not predicted, like a small boost coming out of a slide into a jump, still had to come through me as a code change. I would build the tuning surface expecting designers to want things I did not anticipate.</li>
        </ul>
      </Section>

      <LinkButton href="https://bronpro.itch.io/dawncore">To Itch.io</LinkButton>
    </ProjectPage>
  )
}

export default DawnCorePage
