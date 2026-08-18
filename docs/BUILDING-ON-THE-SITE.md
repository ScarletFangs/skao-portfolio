# Building on the Site — Post-Refactor Guide

This doc explains how the codebase is structured after the 2026-07 refactor and, most importantly, **how to add new content**. The short version: yes, the refactor was done specifically so new projects are cheap to add. A new project page is one JSX file composing shared components, plus a route and a card — no new CSS required.

## The big picture

```
src/
  main.jsx                      → entry; imports ONLY styles/tokens.css + styles/global.css
  App.jsx                       → all routes live here (react-router v7, basename '/skao-portfolio/')
  styles/
    tokens.css                  → design tokens (--Dark2, --Light60, --Green60, …)
    global.css                  → reset, body, h1–h6/p element styles
  layouts/
    MainLayout.jsx / .css       → CSS grid: sticky 288px sidebar + content column; wraps every page
  components/
    NavBar.jsx / .css           → renders BOTH sidebar and mobile top-bar; CSS shows one
    PageTopInfo.jsx / .css      → page heading block (title, description, optional location)
    ProjectCard.jsx / .css      → clickable project tile used on Home + Projects pages
    ProjectInfoBar.jsx / .css   → the type/duration/genre bar at the top of a project page
    project/                    → shared building blocks for project DETAIL pages
      ProjectPage.jsx / .css
      QuickInfo.jsx / .css
      Section.jsx / .css
      VideoSection.jsx / .css
      LinkButton.jsx / .css
  pages/
    HomePage.jsx / .css
    AboutPage.jsx / .css
    ProjectsPage.jsx / .css     → the project LISTING page ("ProjectsPage-*" classes)
    projects/                   → one file per project, NO CSS files here — pure composition
      DawnCorePage.jsx
      HeadHuntedPage.jsx
      QuickShotPage.jsx
  assets/
    ProjectImages/<ProjectName>/  → images + videos per project, imported into JSX
```

Rules that keep this clean:

- **Every stylesheet is colocated** with its component and imported by that component (`NavBar.jsx` imports `./NavBar.css`). Only `tokens.css` and `global.css` are global.
- **Class names are prefixed with their component name** (`QuickInfo-Container`, `Section-Container`). Watch the near-collision: `ProjectsPage-*` = listing page, `ProjectPage-*` = detail wrapper.
- **Project pages own no CSS.** If a project page needs a new look, extend or add a shared component in `src/components/project/` instead of writing page-specific styles.
- **Use tokens, not hex values.** Colors come from `src/styles/tokens.css`.

## The reusable project-page components

These live in `src/components/project/` and are the whole point of the refactor. `DawnCorePage.jsx` is the most developed example — copy it when starting a new page.

| Component | Props | What it renders |
|---|---|---|
| `ProjectPage` | `title`, `children` | Page wrapper: `PageTopInfo` heading + the content container |
| `ProjectInfoBar` | `ProjectType`, `Duration`, `Genre` | Icon bar under the title (lives in `components/`, predates the refactor) |
| `QuickInfo` | `facts`, `image`, `imageAlt`, `children` | Facts list + description paragraph (children) + side image. `facts` is a plain `{ label: value }` object — add any labels you want, no component change needed |
| `Section` | `title`, `children` | `<h2>` heading + whatever you put inside (paragraphs, `<ul>` lists, videos) |
| `VideoSection` | `src` | Full-width mp4 video with controls |
| `LinkButton` | `href`, `children` | Green arrow link, opens in a new tab |

A minimal project page is just:

```jsx
import ProjectPage from '../../components/project/ProjectPage'
import ProjectInfoBar from '../../components/ProjectInfoBar'
import QuickInfo from '../../components/project/QuickInfo'
import Section from '../../components/project/Section'
import LinkButton from '../../components/project/LinkButton'
import CoverPhoto from '../../assets/ProjectImages/MyGame/cover.png'

const MyGamePage = () => {
  return (
    <ProjectPage title="MyGame">
      <ProjectInfoBar ProjectType="Personal Project" Duration="8 Weeks" Genre="Puzzle" />

      <QuickInfo
        image={CoverPhoto}
        imageAlt="MyGame cover art"
        facts={{ Engine: 'Unity', Roles: 'Programmer', 'Team Size': 'Solo' }}
      >
        One-paragraph description of the game.
      </QuickInfo>

      <Section title="My Contributions">
        <ul>
          <li>Thing I built</li>
        </ul>
      </Section>

      <LinkButton href="https://example.itch.io/mygame">To Itch.io</LinkButton>
    </ProjectPage>
  )
}

export default MyGamePage
```

## Checklist: adding a new project

1. **Assets** — create `src/assets/ProjectImages/<ProjectName>/` and drop images/videos there. Import them directly in JSX so Vite bundles and fingerprints them.
2. **Page** — create `src/pages/projects/<ProjectName>Page.jsx` composing the components above (default export, matching the repo convention).
3. **Route** — register it in `src/App.jsx`:
   ```jsx
   import MyGamePage from './pages/projects/MyGamePage.jsx'
   // inside the <Route path='/' element={<MainLayout/>}> block:
   <Route path='/MyGame' element={<MyGamePage/>}/>
   ```
   No `404.html` change is needed — the GitHub Pages redirect trick forwards any path automatically.
4. **Card** — add a `ProjectCard` in `src/pages/ProjectsPage.jsx` (and optionally `src/pages/HomePage.jsx` if it should be featured):
   ```jsx
   <ProjectCard
     imgSrc={MyGamePhoto}
     projectType="Puzzle"
     projectTitle="MyGame"
     pageLink="/MyGame"
   />
   ```
5. **Verify** — `npm run lint`, `npm run build`, and check it in the dev server at `http://localhost:3000/skao-portfolio/` (the bare root won't match the router basename).

## Adding a new top-level page (e.g. a blog or resume page)

1. Create `src/pages/<Name>Page.jsx` + colocated `<Name>Page.css`, start it with `PageTopInfo` for a consistent heading.
2. Register the route in `src/App.jsx` inside the `MainLayout` route so it gets the sidebar/navbar.
3. Add a nav link in `src/components/NavBar.jsx` — remember it renders **two** variants (desktop sidebar and mobile menu), so add the link to both.

## Adding a new reusable section component

If a project needs a layout that doesn't exist yet (say, a side-by-side image gallery):

1. Create `src/components/project/<Name>.jsx` and `<Name>.css` (imported by the JSX file).
2. Prefix all class names with the component name.
3. Use tokens from `tokens.css` for colors.
4. Keep props simple and content-shaped (like `QuickInfo`'s `facts` object) so future pages can reuse it without edits.

## Things that will bite you if changed carelessly

- **Repo-name coupling:** `base: '/skao-portfolio/'` in `vite.config.js` and `basename: '/skao-portfolio/'` in `src/App.jsx` must stay in sync (and match the GitHub repo name).
- **Deep-link redirect:** `public/404.html` rewrites unknown paths to `/?redirect=<path>`, and `MainLayout.jsx` reads that param on mount. Breaking either breaks every direct link to a subpage on GitHub Pages.
- **Breakpoints are literal:** phone = `(max-width: 809px)`, sidebar = `(min-width: 810px)` — everywhere, exactly. CSS variables can't be used in `@media`, so keep the numbers consistent by hand.
- **No percentage heights on grid children:** size them with content or explicit units (this caused a mobile navbar bug once).
- **Case-only renames** (like `Pages/` → `pages/`) need a two-step `git mv` on macOS's case-insensitive filesystem.
- **`_redirects`** in `public/` is a Netlify-style fallback copied into `dist/` — leave it alone.

## Commands

```bash
npm run dev        # dev server → http://localhost:3000/skao-portfolio/
npm run lint       # ESLint
npm run build      # production build to dist/
npm run preview    # preview the production build
npm run deploy     # build + publish to GitHub Pages
```

There are no tests; lint + build + eyeballing the dev server is the verification loop.
