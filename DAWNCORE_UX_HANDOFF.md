# Handoff — Reframe the DawnCore and HeadHunted pages for UX design

**Written:** 2026-09-14
**For:** a fresh session working in `~/Documents/GitHub/skao-portfolio`
**Owner:** Sirena Kao (goes by Scarlet)

---

## 1. The task

Rewrite two existing project pages so they read as UX design case studies instead of systems-programming writeups:

1. **`src/pages/projects/DawnCorePage.jsx`** — do this one first. It has the most material and the best existing structure.
2. **`src/pages/projects/HeadHuntedPage.jsx`** — her strongest interaction-design credential, currently the weakest page on the site.

Both pages already exist and both already have assets. This is rewriting copy and restructuring sections, not building new pages.

Scarlet submitted an application to **Riot Games, UX Designer — League of Legends Studios (Job ID 6154)** on 2026-09-14. Her resume and free responses were re-pointed from engineering framing to player-experience framing. The portfolio was not updated in time, so the DawnCore page currently argues a different case than the application does. A Riot reviewer who follows the portfolio link should land on something consistent with what she submitted.

**Scope is those two pages.** Do not restructure the site, do not touch Quickshot or the listing page, and do not redesign components. Finish DawnCore and get her sign-off before starting HeadHunted — she may want the approach adjusted after seeing the first one.

---

## 2. Read these first

| Path | Why |
|---|---|
| `~/Documents/GitHub/job-search/HANDOFF.md` | Application state, the project bench, and **§6 claim boundaries**. The authority on what may be claimed. |
| `~/Documents/GitHub/job-search/Riot_FreeResponses.md` | The DawnCore story **in her own words**, already edited by her. This is the voice and the content to work from. |
| `~/Documents/GitHub/job-search/SKao_Resume_RiotUX.tex` | The four DawnCore bullets as submitted. Keep the page consistent with these. |
| `~/Documents/GitHub/job-search/Riot_UXDesigner.pdf` | The posting. **Image-only, no text layer** — `pdftotext` returns nothing, read it as images. |
| `CLAUDE.md` (this repo) | Build, routing, breakpoints, styling rules. Follow it. |

Do not re-derive the application strategy. It is settled and submitted.

---

## 3. Claim boundaries — verified, do not cross

These were confirmed with Scarlet directly during the application session. Full table lives in `job-search/HANDOFF.md` §6.

- **No Figma.** The page's current `facts` block lists `'Tools': 'Perforce, Miro, LucidCharts, Figma, Jira'`. Figma was a **team** tool used by the UI/UX members. She did not use it. Her own design tools are **Miro and LucidCharts**. Remove Figma from that list, or attribute it to the team. This is the single easiest mistake to make here, because the string is already in the file.
- **She observed playtests.** Real: she watched others play, took designer and team feedback, and did her own feel testing. "Observed playtests" is defensible.
- **She watched playtest footage slowed down** and studied how **Titanfall 2 and Apex Legends** solved the same traversal problem. Both confirmed, both currently missing from the page.
- **She worked with the game designers on where the speed ceiling should sit.** Confirmed by her directly.
- **Role was Programmer** on a 17-person, 21-week student team. She is not claiming a designer title. The argument is that she did player-experience work as a programmer, not that she held a design role.
- **UI implementation (DawnCore):** she implemented in-game user interfaces *with* the UI/UX designers. Do not upgrade this to designing them.

On HeadHunted specifically:

- **She chose the player control and locomotion scheme herself.** Confirmed directly on 2026-09-13. This is the claim the whole page should be built around, and it is the one thing on her entire record that is unambiguously interaction design.
- **Role was Team Lead and Programmer** on a 6-person, 9-week student team. The lead role is real and hers.
- **Do not claim a comfort or frame rate result.** She profiled and optimized against Quest 3 hardware constraints. The honest framing, used on the submitted resume, is that performance directly governs player comfort in VR. That states a property of the platform, not an outcome she measured. Keep it that way.

---

## 4. What the pages are missing

### DawnCore

The existing page already has good bones. Its `Goal` / `Challenges` / `Implementation` / `My Contributions` sections are closer to a case study than the resume ever was, and the `Challenges` list is already written in player-experience language ("motion discomfort," "traversal feel predetermined instead of fluid"). Keep that.

What is absent, and what the Riot framing needs:

1. **How she found the problems.** The page states the challenges as if they were known. They were not. She found them by watching playtest footage slowed down and by reading how Titanfall 2 and Apex Legends handled the same thing. Method is the most valuable thing on the page for a UX reader and it is currently invisible.
2. **The skill floor and ceiling insight.** From her Q1 answer: the movement had to be forgiving enough that the least experienced player could still perform it without feeling overwhelmed, and demanding enough that a skilled player could chain complex traversals. She arrived at this from her own playtests. **Do not label it "skill floor and skill ceiling"** — describing it from observation is more convincing than naming the term. This is the strongest single idea she produced and it appears nowhere on the site.
3. **The collaboration with designers on the speed ceiling.** A concrete instance of partnering with designers on a player-experience tradeoff.
4. **Iterations and Lessons.** The file already contains a commented-out restructure plan (in `DawnCorePage.jsx`, the JSX comment block after `LinkButton`) that lists `Iterations`, `Lessons`, `Tools or designer-facing architecture`, `Collaboration`, and `What you would do differently`. That plan is hers and it is sound. Use it as the section skeleton rather than inventing a new one.

### HeadHunted

This page is currently a `QuickInfo` block followed by a single `My Contributions` section holding seven flat bullets. It has no `Goal`, no `Challenges`, no `Implementation`. It reads as a task list, and it buries the best thing on it.

The game: a horror VR prototype on Meta Quest 3 with an environmental sustainability message. You play a deer being hunted through a forest, trying to free other deer from cages, with deforestation reshaping the space you run through.

What it needs:

1. **Lead with the locomotion decision.** Bullet 2 of the current list is "Created player controls with Meta Quest 3 Virtual Reality Headset," sitting below "Directed and lead team meetings." That ordering hides the point. She chose the control and locomotion scheme, and in VR that choice is the player experience. It should be the spine of the page, not an item in a list.
2. **Name the tradeoff.** This is a chase game. The player is being pursued and needs to feel able to run, while VR locomotion that conveys speed is exactly what makes people motion sick. Comfort against freedom of movement, in a game whose whole premise is fleeing. That tension is the case study, and Riot's first responsibility names accessibility explicitly.
3. **Give it the same section structure as DawnCore** — goal, the problem, what she decided, what it cost. Consistency across the two pages is part of the point: a reviewer should see one person with one way of working, not two unrelated writeups.
4. **Keep the team lead material, but subordinate it.** Directing meetings and holding game vision across programming and art is real and worth saying. It is context for the design work, not the headline.
5. **Do not invent playtest findings.** The confirmed playtest observation is DawnCore's. Nothing equivalent has been confirmed for HeadHunted, so do not imply she watched players and iterated unless she says so. Ask her.

---

## 5. Component API

All in `src/components/project/`. Props only, no variants.

```jsx
<ProjectPage title="DawnCore">          // wraps page, renders PageTopInfo
<ProjectInfoBar ProjectType Duration Genre />
<QuickInfo facts={{...}} image imageAlt>{children}</QuickInfo>  // facts renders as "label: value"
<Section title="...">{children}</Section>                        // h2 + content
<VideoSection src={mp4} />
<LinkButton href="...">{children}</LinkButton>
```

Assets already imported and available:

- DawnCore: `dawncore.jpg`, `DCsplash.png`, `DCDemo.mp4`, `WeaponDemo.mp4`
- HeadHunted: `hh.jpg`, `HH_Movie_Poster_2.png`, `startVideo.mp4`

No new assets are needed for either page. Do not go looking for images that do not exist, and do not ask her to produce new captures unless she raises it.

---

## 6. Constraints from this repo's CLAUDE.md

- Plain JavaScript/JSX, **not TypeScript**. React 18 + Vite. No Tailwind, no MUI.
- Use tokens from `src/styles/tokens.css`, never raw hex.
- Class names prefixed by component. Note `ProjectsPage-*` (listing) vs `ProjectPage-*` (detail wrapper) — easy to confuse.
- **Named exports only** is the global preference in `~/Documents/GitHub/.claude/CLAUDE.md`, but every component in this repo uses `export default`. Match the repo, not the global rule. Do not convert them.
- Verification is `npm run lint` and `npm run build`, then check the dev server. There are no tests.
- The dev server must be opened at `http://localhost:3000/skao-portfolio/`. The bare root will not match the router basename.
- **Do not run `npm run deploy` without asking.** It publishes to the live GitHub Pages site.

---

## 7. Suggested skills

- **`portfolio-writer`** — the primary skill for this task. It chains into `humanizer` automatically.
- **`humanizer`** — Scarlet's voice pass, Register 3 (portfolio/professional). Runs as the final pass after `portfolio-writer`. Read `references/scarlet-writing-style.md` before drafting.
- **`portfolio-case-study-writer`** — if the page needs a fuller case-study structure than the current sections support.
- **`superpowers:brainstorming`** — invoke before writing if the section structure is still open.

**Voice note.** There is a recorded conflict to resolve with her: `job-search/CLAUDE.md` says her preference is "contractions spelled out," while the `humanizer` skill says "contractions are fine, doesn't/don't read naturally for her." The Riot free responses spelled them out and she kept it that way in her own edits, so spelled-out is the safer default. Worth asking her once and then fixing whichever file is wrong.

---

## 8. Open items

- Her portfolio has not been updated in a while (her words). Other pages may be stale. Out of scope here, worth raising with her.
- **JustDots** (`~/Documents/GitHub/JustDots`) is active Unity mobile work from 2026 and is on no resume and not on the portfolio at all. It has a documented screen-flow state machine in `docs/game-flow-v0.md` and a devlog. Candidate for a new project page.
- The Riot application is submitted and awaiting response. No deadline pressure on this work.
