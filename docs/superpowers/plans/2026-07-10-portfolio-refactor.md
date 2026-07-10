# Portfolio Structure Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the portfolio site so future projects are easy to add: CSS-grid layout with sticky sidebar (fixes the 810px red-spacer bug), shared project section components replacing the HeadHunted-named shared CSS, colocated stylesheets, and removal of unused dependencies.

**Architecture:** Project pages become compositions of five reusable section components (`ProjectPage`, `QuickInfo`, `Section`, `VideoSection`, `LinkButton`) living in `src/components/project/`. Every stylesheet moves next to the component that owns it and is imported by that component. Layout is pure CSS grid — JavaScript no longer participates in responsive layout.

**Tech Stack:** Vite 6, React 18 (plain JSX, no TypeScript), react-router-dom 7, plain CSS. No test framework exists; verification is `npm run lint` + `npm run build` + manual dev-server checks as defined in the spec.

**Spec:** `docs/superpowers/specs/2026-07-10-portfolio-refactor-design.md`

## Global Constraints

- Canonical breakpoint: phone = `(max-width: 809px)`, sidebar layout = `(min-width: 810px)`. Every media query must use exactly these values.
- Plain JavaScript only — no `.ts`/`.tsx` files.
- Default exports for components (existing repo convention — overrides the global named-exports preference).
- Visible page content must be identical before and after (apostrophes may become `&apos;`; `<h6>` fact rows become `<p>`).
- Router `basename: '/skao-portfolio/'` and Vite `base: '/skao-portfolio/'` must not change.
- The `?redirect=` effect in MainLayout and `public/404.html` must not change.
- `vite-plugin-static-copy` and the `_redirects` file must not change.
- All work happens on branch `refactor/site-structure`.

## Deviations from spec (discovered during planning, all within spec intent)

1. **Class-name collision:** `.ProjectPage-Container` already exists in `src/CSS/PagesCSS/ProjectPage.css` for the Projects *listing* page. Fix: rename listing classes to `ProjectsPage-Container` / `ProjectsPage-ProjectCards` (file becomes `pages/ProjectsPage.css`), freeing the spec's names for the new detail-page component.
2. **Lint baseline is red (26 errors).** The repo never uses prop-types, so `react/prop-types` is turned off in `eslint.config.js`; unused `React` imports are removed from each file as it is touched. Phase A ends with lint fully green and it stays green.
3. **Two tiny spacing unifications** (accepted): all QuickInfo fact rows get the `.625rem` top margin (HeadHunted's rows previously had none because the rule targeted `h6` and HH used `p`); DawnCore's Goal/Challenges/Implementation `<ul>`s get 32px top margin like every other section (previously 16px).

---

## Phase A — Structure

### Task 1: Branch, lint config, design tokens, global styles

**Files:**
- Modify: `eslint.config.js`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Modify: `src/main.jsx`
- Modify: `src/CSS/ComponentCSS/PageTopInfo.css` (remove `*` reset)
- Modify: `src/CSS/ComponentCSS/ProjectCard.css` (remove `*` reset)
- Delete: `src/index.css`, `src/CSS/GeneralText.css`, `src/App.css`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: `src/styles/tokens.css` (CSS custom properties `--Dark2`, `--Dark10`, `--Light60`, `--Light90`, `--Green60`, `--Green10`, `--Red70`) and `src/styles/global.css` (reset, body, h1–h6, p). All later CSS relies on these vars being loaded from `main.jsx`.

- [ ] **Step 1: Create branch and verify baseline build**

```bash
git checkout -b refactor/site-structure
npm run build
```

Expected: build succeeds (baseline). If it fails, stop and report — the plan assumes a passing build.

- [ ] **Step 2: Turn off react/prop-types in eslint.config.js**

In `eslint.config.js`, in the `rules` object, add one line after `'react/jsx-no-target-blank': 'off',`:

```js
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
```

- [ ] **Step 3: Create `src/styles/tokens.css`**

```css
/*
 * Design tokens.
 *
 * Canonical responsive breakpoint: phone = (max-width: 809px),
 * sidebar layout = (min-width: 810px). CSS custom properties cannot
 * be used inside @media conditions, so every media query in the
 * codebase must use these exact values.
 */
:root
{
  --Dark2: #050505;
  --Dark10: #1A1A1A;
  --Light60: #999999;
  --Light90: #E6E6E6;
  --Green60: #4CE6A6;
  --Green10: #062D1D;
  --Red70: #EC7979;
}
```

- [ ] **Step 4: Create `src/styles/global.css`**

This merges the `*` reset (previously duplicated in PageTopInfo.css and ProjectCard.css), the font/rendering rules from `index.css` (minus the dead `@tailwind` lines), and the element rules from `GeneralText.css`:

```css
*
{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root
{
  font-family: Inter;
  line-height: 1.4;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body
{
  background-color: var(--Dark2);
  font-family: "Inter", serif;
  font-weight: 300;
  font-style: normal;
  font-size: 16px;
  color: var(--Light60);
}

h1
{
  font-family: "Inter", serif;
  font-weight: 500;
  font-style: normal;
  font-size: 3rem;
  color: var(--Light90);
}

h2
{
  font-family: "Inter", serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1.5rem;
  color: var(--Light90);
}

h3
{
  font-family: "Inter", serif;
  font-weight: 500;
  font-style: normal;
  font-size: 1.125rem;
  color: var(--Light90);
}

h4
{
  font-family: "Inter", serif;
  font-weight: 700;
  font-style: normal;
  font-size: 1.375rem;
  color: black;
}

h5
{
  font-family: "Inter", serif;
  font-weight: 700;
  font-style: normal;
  font-size: 1.125rem;
  color: black;
}

h6
{
  /* mini heading */
  font-family: "Inter", serif;
  font-weight: 400;
  font-style: italic;
  font-size: 1rem;
  color: var(--Light60);
}

p
{
  font-family: "Inter", serif;
  font-weight: 300;
  font-style: normal;
  font-size: 1rem;
  color: var(--Light60);
}
```

- [ ] **Step 5: Update `src/main.jsx` imports**

Replace lines 3–4 (`import './index.css'` and `import './CSS/GeneralText.css'`) with the two new files. Result:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import './CSS/ComponentCSS/NavBar.css'
import './CSS/ComponentCSS/ProjectCard.css'
import './CSS/ComponentCSS/PageTopInfo.css'
import './CSS/ComponentCSS/ProjectInfoBar.css'
import './CSS/PagesCSS/AboutPage.css'
import './CSS/PagesCSS/ProjectPage.css'
import './CSS/HeadHunted.css'
import './CSS/PagesCSS/HomePage.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 6: Remove the `*` reset blocks from the two component CSS files**

In `src/CSS/ComponentCSS/PageTopInfo.css`, delete lines 1–6:

```css
*
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

In `src/CSS/ComponentCSS/ProjectCard.css`, delete lines 1–7:

```css
*
{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    /* background-color: blue; */
}
```

- [ ] **Step 7: Delete dead files**

```bash
git rm src/index.css src/CSS/GeneralText.css src/App.css
```

(`App.css` is imported nowhere and its first line says "does not do anything rn".)

- [ ] **Step 8: Verify build**

```bash
npm run build
```

Expected: PASS. (`npm run lint` still fails at this point — unused `React` imports are removed in Tasks 2–4.)

- [ ] **Step 9: Visual smoke check**

Run `npm run dev`, open `http://localhost:3000/skao-portfolio/`. Expected: site looks unchanged (dark background, Inter font, green accents).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "refactor: extract design tokens and global styles, drop dead CSS"
```

---

### Task 2: CSS-grid layout with sticky sidebar

**Files:**
- Modify: `src/layouts/MainLayout.jsx` (full rewrite)
- Create: `src/layouts/MainLayout.css`
- Modify: `src/CSS/ComponentCSS/NavBar.css` (sticky sidebar, canonical breakpoints, mobile-menu classes)
- Modify: `src/components/NavBar.jsx` (mobile-menu class logic, drop unused React import)

**Interfaces:**
- Consumes: nothing new
- Produces: `MainLayout` renders `<div className="MainLayout-Container">` grid containing NavBar's two variants and `<main className="MainLayout-Content">`. NavBar's mobile menu uses classes `NavBar-MobileMenu` / `is-open`.

- [ ] **Step 1: Rewrite `src/layouts/MainLayout.jsx`**

```jsx
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
```

Note: `react-responsive` imports, the three `useMediaQuery` calls, the red 288px spacer div, and the inline styles are all gone. NavBar renders two siblings (desktop sidebar + mobile top bar); CSS shows exactly one of them, so the grid sees sidebar+content on desktop and topbar+content (single column) on phone.

- [ ] **Step 2: Create `src/layouts/MainLayout.css`**

```css
.MainLayout-Container
{
    display: grid;
    grid-template-columns: 288px 1fr;
}

.MainLayout-Content
{
    /* Prevent wide content (videos, images) from blowing out the 1fr track */
    min-width: 0;
    margin-bottom: 2%;
}

@media (max-width: 809px)
{
    .MainLayout-Container
    {
        grid-template-columns: 1fr;
    }
}
```

- [ ] **Step 3: Edit `src/CSS/ComponentCSS/NavBar.css` — sticky sidebar**

In the `.navbar-container` rule, replace `position: fixed;` with:

```css
    position: sticky;
    top: 0;
```

Leave every other declaration in that rule unchanged.

- [ ] **Step 4: Edit `src/CSS/ComponentCSS/NavBar.css` — mobile menu classes**

Delete both `.open` rules (the `.open { display: none; gap: 6px; }` block and the later duplicate `.open { position: sticky; }` block). In their place (where the first `.open` block was), add:

```css
.NavBar-MobileMenu
{
    display: none;
}

.NavBar-MobileMenu.is-open
{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 6px;
}
```

- [ ] **Step 5: Edit `src/CSS/ComponentCSS/NavBar.css` — canonical breakpoints**

Replace `@media ((min-width: 811px))` with `@media (min-width: 810px)`.
Replace `@media (max-width: 810px)` with `@media (max-width: 809px)`.

- [ ] **Step 6: Fix mobile menu logic in `src/components/NavBar.jsx`**

Change line 1 from `import React, {useState } from 'react'` to:

```jsx
import { useState } from 'react'
```

Change the mobile menu nav element from `<nav className={menuOpen ? "" : "open"}>` (inverted logic: `.open` meant *hidden*) to:

```jsx
            <nav className={menuOpen ? "NavBar-MobileMenu is-open" : "NavBar-MobileMenu"}>
```

- [ ] **Step 7: Verify the bug is fixed**

Run `npm run dev`, open `http://localhost:3000/skao-portfolio/` and use browser devtools responsive mode:
- At 1280px: sidebar visible on the left, content beside it, no red column anywhere.
- At exactly 810px: sidebar visible, content beside it (previously: red column, no nav).
- At exactly 809px and 375px: sidebar gone, top navbar visible, content full width; hamburger toggles the menu open/closed (previously inverted).
- Scroll a long page (DawnCore) at desktop width: sidebar stays pinned.

- [ ] **Step 8: Verify build and lint progress**

```bash
npm run build
npm run lint
```

Expected: build PASS. Lint: no remaining errors in `MainLayout.jsx` or `NavBar.jsx`; errors remain only in files not yet touched (pages, other components).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "refactor: replace JS-driven layout with CSS grid and sticky sidebar

Fixes the 810px breakage caused by mismatched JS (809px) and CSS
(810/811px) breakpoints coordinating a hardcoded spacer div."
```

---

### Task 3: Rename Pages/ to pages/ and nest project pages

**Files:**
- Rename: `src/Pages/` → `src/pages/` (two-step case-only rename)
- Rename: `src/pages/DawnCorePage.jsx` → `src/pages/projects/DawnCorePage.jsx` (and HeadHunted, QuickShot)
- Modify: `src/App.jsx` (import paths)
- Modify: the three project page files (relative import depth, drop unused React imports)

**Interfaces:**
- Consumes: nothing new
- Produces: page module paths used by `App.jsx`: `./pages/HomePage.jsx`, `./pages/AboutPage.jsx`, `./pages/ProjectsPage.jsx`, `./pages/projects/DawnCorePage.jsx`, `./pages/projects/HeadHuntedPage.jsx`, `./pages/projects/QuickShotPage.jsx`.

- [ ] **Step 1: Rename the folder (case-only rename needs a temp name on macOS)**

```bash
git mv src/Pages src/pages-tmp
git mv src/pages-tmp src/pages
mkdir src/pages/projects
git mv src/pages/DawnCorePage.jsx src/pages/projects/DawnCorePage.jsx
git mv src/pages/HeadHuntedPage.jsx src/pages/projects/HeadHuntedPage.jsx
git mv src/pages/QuickShotPage.jsx src/pages/projects/QuickShotPage.jsx
```

- [ ] **Step 2: Update `src/App.jsx`** (only the import paths change; routes stay identical)

```jsx
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
```

- [ ] **Step 3: Fix relative imports in the three moved project pages**

They moved one level deeper, so `../` becomes `../../`. In `src/pages/projects/HeadHuntedPage.jsx`, replace the import block with (also dropping the unused `React` import):

```jsx
import { Link } from 'react-router-dom'
import PageTopInfo from '../../components/PageTopInfo'
import ProjectInfoBar from '../../components/ProjectInfoBar'
import HHSplashArt from '../../assets/ProjectImages/HeadHunted/hh.jpg'
import HHMoviePoster from '../../assets/ProjectImages/HeadHunted/HH_Movie_Poster_2.png'
import HHVideo from '../../assets/ProjectImages/HeadHunted/startVideo.mp4'
```

In `src/pages/projects/DawnCorePage.jsx`:

```jsx
import { Link } from 'react-router-dom'
import PageTopInfo from '../../components/PageTopInfo'
import ProjectInfoBar from '../../components/ProjectInfoBar'
import DCPhoto1 from '../../assets/ProjectImages/DawnCore/dawncore.jpg'
import DCPhoto2 from '../../assets/ProjectImages/DawnCore/DCsplash.png'
import DCVideo from '../../assets/ProjectImages/DawnCore/DCDemo.mp4'
import DCVideo2 from '../../assets/ProjectImages/DawnCore/WeaponDemo.mp4'
```

In `src/pages/projects/QuickShotPage.jsx`:

```jsx
import PageTopInfo from '../../components/PageTopInfo'
import ProjectInfoBar from '../../components/ProjectInfoBar'
import { Link } from 'react-router-dom'
import QSPhoto1 from '../../assets/ProjectImages/Quickshot/quickshot.png'
import QSPhoto2 from '../../assets/ProjectImages/Quickshot/quickshot2.png'
import QSVideo from '../../assets/ProjectImages/Quickshot/QSDemo.mp4'
```

- [ ] **Step 4: Fix two pre-existing lint errors in `src/pages/projects/HeadHuntedPage.jsx` line 37**

The description paragraph has an unescaped apostrophe and ends with an invisible non-breaking space (U+00A0), which trips `no-irregular-whitespace`. In the long description text, change `haven't` to `haven&apos;t`, and delete the trailing character after the final `?` (retype the end of the line as `can you?` followed immediately by the newline). Verify with:

```bash
npx eslint src/pages/projects/HeadHuntedPage.jsx
```

Expected: no `react/no-unescaped-entities` or `no-irregular-whitespace` errors for this file (no errors at all).

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: PASS. Then `npm run dev` and click through all six routes — every page renders.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: rename Pages/ to pages/ and nest project detail pages"
```

---

### Task 4: Colocate CSS with components and pages

**Files:**
- Rename: `src/CSS/ComponentCSS/NavBar.css` → `src/components/NavBar.css` (same for PageTopInfo, ProjectCard, ProjectInfoBar)
- Rename: `src/CSS/PagesCSS/HomePage.css` → `src/pages/HomePage.css`; `AboutPage.css` → `src/pages/AboutPage.css`; `ProjectPage.css` → `src/pages/ProjectsPage.css`
- Modify: `src/main.jsx` (drop colocated imports; keep HeadHunted.css until Task 8)
- Modify: `src/components/NavBar.jsx`, `PageTopInfo.jsx`, `ProjectCard.jsx`, `ProjectInfoBar.jsx` (add CSS import, drop unused React import)
- Modify: `src/pages/HomePage.jsx`, `AboutPage.jsx`, `ProjectsPage.jsx` (add CSS import, drop unused React import; ProjectsPage class renames)
- Modify: `src/pages/HomePage.css` (canonical breakpoint, drop empty media blocks)
- Modify: `src/pages/ProjectsPage.css` (class renames)

**Interfaces:**
- Consumes: page/component files from Tasks 2–3
- Produces: `main.jsx` imports only `styles/tokens.css`, `styles/global.css`, and (temporarily) `./CSS/HeadHunted.css`. Listing-page classes are now `ProjectsPage-Container` / `ProjectsPage-ProjectCards`, freeing `ProjectPage-*` names for Task 5.

- [ ] **Step 1: Move the files**

```bash
git mv src/CSS/ComponentCSS/NavBar.css src/components/NavBar.css
git mv src/CSS/ComponentCSS/PageTopInfo.css src/components/PageTopInfo.css
git mv src/CSS/ComponentCSS/ProjectCard.css src/components/ProjectCard.css
git mv src/CSS/ComponentCSS/ProjectInfoBar.css src/components/ProjectInfoBar.css
git mv src/CSS/PagesCSS/HomePage.css src/pages/HomePage.css
git mv src/CSS/PagesCSS/AboutPage.css src/pages/AboutPage.css
git mv src/CSS/PagesCSS/ProjectPage.css src/pages/ProjectsPage.css
```

- [ ] **Step 2: Update `src/main.jsx`** to:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import './CSS/HeadHunted.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

(`HeadHunted.css` stays global until the project pages are migrated in Tasks 6–8.)

- [ ] **Step 3: Add CSS imports to components; drop unused React imports**

`src/components/NavBar.jsx` — after the other imports add:

```jsx
import './NavBar.css'
```

`src/components/PageTopInfo.jsx` — replace line 1 `import React from 'react'` with:

```jsx
import './PageTopInfo.css'
```

`src/components/ProjectCard.jsx` — replace line 1 `import React from 'react'` with nothing; the file's imports become:

```jsx
import { Link } from 'react-router-dom'
import './ProjectCard.css'
```

`src/components/ProjectInfoBar.jsx` — replace line 1 `import React from 'react'` with:

```jsx
import './ProjectInfoBar.css'
```

- [ ] **Step 4: Add CSS imports to pages; drop unused React imports**

`src/pages/HomePage.jsx` — imports become:

```jsx
import ProjectCard from '../components/ProjectCard.jsx'
import PageTopInfo from '../components/PageTopInfo.jsx'
import DawnCorePhoto from '../assets/ProjectImages/DawnCore/dawncore.jpg' 
import QuickshotPhoto from '../assets/ProjectImages/Quickshot/quickshot.png'
import './HomePage.css'
```

`src/pages/AboutPage.jsx` — imports become:

```jsx
import Resume from '../assets/SKao_Resume.pdf'
import PageTopInfo from '../components/PageTopInfo'
import './AboutPage.css'
```

Also in AboutPage.jsx, fix the pre-existing lint error on the education heading: change `<h3> Bachelor's Degree in Game Design and Interactive Media</h3>` to:

```jsx
          <h3> Bachelor&apos;s Degree in Game Design and Interactive Media</h3>
```

`src/pages/ProjectsPage.jsx` — imports become:

```jsx
import PageTopInfo from '../components/PageTopInfo'
import ProjectCard from '../components/ProjectCard'
import HeadHuntedPhoto from '../assets/ProjectImages/HeadHunted/headhunted.jpg' 
import QuickshotPhoto from '../assets/ProjectImages/Quickshot/quickshot.png'
import DawnCorePhoto from '../assets/ProjectImages/DawnCore/dawncore.jpg'
import './ProjectsPage.css'
```

- [ ] **Step 5: Rename listing-page classes (frees `ProjectPage-*` for the new components)**

In `src/pages/ProjectsPage.css`, rename `.ProjectPage-Container` → `.ProjectsPage-Container` and `.ProjectPage-ProjectCards` → `.ProjectsPage-ProjectCards`.

In `src/pages/ProjectsPage.jsx`, update the two `className`s to match: `"ProjectsPage-Container"` and `"ProjectsPage-ProjectCards"`.

(The dead `className="ProjectPage-LargerCard"` props passed to `ProjectCard` in HomePage.jsx and ProjectsPage.jsx are ignored by ProjectCard — leave them; removing them is optional tidy-up, not required.)

- [ ] **Step 6: Fix `src/pages/HomePage.css` breakpoint and dead blocks**

Delete the two empty media blocks (`@media ((min-width: 1200px))` and `@media ((min-width: 810px) and (max-width: 1199px))`). Change `@media (max-width: 810px)` to `@media (max-width: 809px)`. Resulting file:

```css
.Home-Container
{
    margin: 3rem;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: 50px;
}

.Hero-ProjectCards
{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    flex-wrap:wrap;
}

@media (max-width: 809px)
{
    .Home-Container
    {
        margin: 3rem;
    }
}
```

- [ ] **Step 7: Verify — Phase A must end fully green**

```bash
npm run lint
npm run build
```

Expected: lint 0 errors, 0 warnings (or warnings only from `react-refresh/only-export-components`); build PASS.

Then `npm run dev`: check all six routes at 1280px, 810px, and 375px — identical to before, no red column, mobile menu works.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor: colocate CSS with components, rename listing-page classes"
```

---

## Phase B — Styling centralization

### Task 5: Project section components

**Files:**
- Create: `src/components/project/ProjectPage.jsx`, `src/components/project/ProjectPage.css`
- Create: `src/components/project/QuickInfo.jsx`, `src/components/project/QuickInfo.css`
- Create: `src/components/project/Section.jsx`, `src/components/project/Section.css`
- Create: `src/components/project/VideoSection.jsx`, `src/components/project/VideoSection.css`
- Create: `src/components/project/LinkButton.jsx`, `src/components/project/LinkButton.css`

**Interfaces:**
- Consumes: `PageTopInfo` (existing, props `PageTitle`, `ShowLocation`), design tokens
- Produces (used verbatim by Tasks 6–8):
  - `ProjectPage({ title, children })` — default export
  - `QuickInfo({ facts, image, imageAlt, children })` — `facts` is a plain object `{ label: value }`; `children` is the description text
  - `Section({ title, children })`
  - `VideoSection({ src })`
  - `LinkButton({ href, children })` — external link, opens in new tab

All styles below are copied from `src/CSS/HeadHunted.css` with renamed selectors; behavior notes are inline.

- [ ] **Step 1: Create `src/components/project/ProjectPage.jsx`**

```jsx
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
```

- [ ] **Step 2: Create `src/components/project/ProjectPage.css`**

The img rule uses the child combinator (`>`) so it only hits full-bleed splash images that are direct children — QuickInfo's side image keeps its own 50% width rule regardless of CSS load order:

```css
.ProjectPage-Container
{
    padding: 3rem 3rem 0;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    max-width: 70vw;
    margin: auto;
    gap: 9px;
}

.ProjectPage-Container > img
{
    width: 100%;
}

.ProjectPage-Container ul
{
    margin-top: 16px;
    margin-bottom: 16px;
    padding-left: 1.4rem;
    width: auto;
    list-style-type: disc;
    list-style-position: outside;
}

@media (max-width: 809px)
{
    .ProjectPage-Container
    {
        max-width: 100vw;
    }
}
```

- [ ] **Step 3: Create `src/components/project/QuickInfo.jsx`**

```jsx
import './QuickInfo.css'

const QuickInfo = ({ facts, image, imageAlt, children }) => {
  return (
    <div className="QuickInfo-Container">
      <div className="QuickInfo-Description">
        <div className="QuickInfo-Facts">
          {Object.entries(facts).map(([label, value]) => (
            <p key={label}>
              <strong className="QuickInfo-FactLabel">{label}</strong>: {value}
            </p>
          ))}
        </div>
        <p>{children}</p>
      </div>

      <img src={image} alt={imageAlt} />
    </div>
  )
}

export default QuickInfo
```

- [ ] **Step 4: Create `src/components/project/QuickInfo.css`**

```css
.QuickInfo-Container
{
    display: flex;
    flex-direction: row;
    overflow: hidden;
    height: min-content;
    width: 100%;
    padding: 37px 0;
    gap: 24px;
    align-items: center;
}

.QuickInfo-Container img
{
    width: 50%;
    height: auto;
    max-height: 50vh;
    object-fit: contain;
}

.QuickInfo-Description
{
    display: flex;
    flex-direction: column;
    gap: 48px;
}

.QuickInfo-Facts p
{
    margin-top: .625rem;
}

.QuickInfo-FactLabel
{
    word-break: break-word;
    word-wrap: break-word;

    /* mini heading */
    font-family: "Inter", serif;
    font-weight: 1200;
    font-style: italic;
    font-size: 1rem;
    color: var(--Light60);
}

@media (max-width: 809px)
{
    .QuickInfo-Container
    {
        flex-direction: column;
    }

    .QuickInfo-Container img
    {
        align-self: center;
        min-width: 250px;
    }
}
```

- [ ] **Step 5: Create `src/components/project/Section.jsx`**

```jsx
import './Section.css'

const Section = ({ title, children }) => {
  return (
    <div className="Section-Container">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export default Section
```

- [ ] **Step 6: Create `src/components/project/Section.css`**

The extra `.ProjectPage-Container` ancestor gives this rule higher specificity than `.ProjectPage-Container ul`, so it wins regardless of stylesheet load order (in the old single file, source order did this job):

```css
.ProjectPage-Container .Section-Container ul
{
    margin-top: 32px;
}
```

- [ ] **Step 7: Create `src/components/project/VideoSection.jsx`**

```jsx
import './VideoSection.css'

const VideoSection = ({ src }) => {
  return (
    <div className="VideoSection">
      <video controls width="100%" muted>
        <source src={src} type="video/mp4" />
        {/* Fallback if video doesnt load */}
        Your browser does not support video tag.
      </video>
    </div>
  )
}

export default VideoSection
```

- [ ] **Step 8: Create `src/components/project/VideoSection.css`**

```css
.VideoSection
{
    padding-top: 16px;
}
```

- [ ] **Step 9: Create `src/components/project/LinkButton.jsx`**

```jsx
import { Link } from 'react-router-dom'
import './LinkButton.css'

const LinkButton = ({ href, children }) => {
  return (
    <Link to={href} target="_blank" className="LinkButton">
      <p>{children}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#999999" viewBox="0 0 256 256" aria-label="Right Arrow Icon">
        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
      </svg>
    </Link>
  )
}

export default LinkButton
```

- [ ] **Step 10: Create `src/components/project/LinkButton.css`**

```css
.LinkButton
{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: fit-content;
    text-decoration: none;
    gap: 6px;
    padding: 12px 24px;
    border-radius: 12px;
    border: 1px solid var(--Light60);

    /* For animation */
    transition: color ease;
}

.LinkButton svg
{
    transition: transform ease;
}

.LinkButton:hover
{
    color: var(--Dark10);
    border: 1px solid var(--Dark10);
}

.LinkButton:hover svg
{
    /* move icon 5px right */
    transform: translateX(5px);
}

.LinkButton:hover p
{
    color: var(--Green60);
    transform: scale(1.1);
}
```

- [ ] **Step 11: Verify**

```bash
npm run lint
npm run build
```

Expected: both PASS (components are not consumed yet; they just need to compile and lint clean).

- [ ] **Step 12: Commit**

```bash
git add src/components/project
git commit -m "feat: add shared project-page section components"
```

---

### Task 6: Migrate HeadHuntedPage to section components

**Files:**
- Modify: `src/pages/projects/HeadHuntedPage.jsx` (full rewrite)

**Interfaces:**
- Consumes: `ProjectPage({ title, children })`, `QuickInfo({ facts, image, imageAlt, children })`, `Section({ title, children })`, `VideoSection({ src })`, `LinkButton({ href, children })` from Task 5; existing `ProjectInfoBar({ ProjectType, Duration, Genre })`
- Produces: nothing consumed later

- [ ] **Step 1: Rewrite `src/pages/projects/HeadHuntedPage.jsx`**

```jsx
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
```

- [ ] **Step 2: Verify**

```bash
npm run lint
npm run build
```

Expected: both PASS. Then in the dev server open `/skao-portfolio/HeadHunted` at 1280px and 375px and compare against the live site or `main` branch: same title, info bar, splash image, facts (fact rows now have a small top margin — accepted unification), description, both Itch.io buttons, contributions list, video.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects/HeadHuntedPage.jsx
git commit -m "refactor: migrate HeadHunted page to shared section components"
```

---

### Task 7: Migrate DawnCorePage to section components

**Files:**
- Modify: `src/pages/projects/DawnCorePage.jsx` (full rewrite)

**Interfaces:**
- Consumes: same Task 5 components as Task 6
- Produces: nothing consumed later

- [ ] **Step 1: Rewrite `src/pages/projects/DawnCorePage.jsx`**

The deep-dive div (`DC-Movement-System`, which had no styles) becomes three `Section`s; its `<ul>`s gain the 32px section top margin (accepted, noted in header). The reorganization comment is preserved per spec.

```jsx
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
```

- [ ] **Step 2: Verify**

```bash
npm run lint
npm run build
```

Expected: both PASS. Dev-server check `/skao-portfolio/DawnCore` at 1280px and 375px: all sections present in order (Goal, Challenges, Implementation, My Contributions + video, Weapon Prototype + video), both Itch.io buttons work.

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects/DawnCorePage.jsx
git commit -m "refactor: migrate DawnCore page to shared section components"
```

---

### Task 8: Migrate QuickShotPage and delete HeadHunted.css

**Files:**
- Modify: `src/pages/projects/QuickShotPage.jsx` (full rewrite)
- Delete: `src/CSS/HeadHunted.css` (and the now-empty `src/CSS/` tree)
- Modify: `src/main.jsx` (drop the HeadHunted.css import)

**Interfaces:**
- Consumes: same Task 5 components as Task 6
- Produces: `src/CSS/` no longer exists; `main.jsx` imports only `styles/tokens.css` and `styles/global.css`.

- [ ] **Step 1: Rewrite `src/pages/projects/QuickShotPage.jsx`**

```jsx
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
```

- [ ] **Step 2: Delete HeadHunted.css and its import**

```bash
git rm src/CSS/HeadHunted.css
```

Then remove the line `import './CSS/HeadHunted.css'` from `src/main.jsx`. Confirm `src/CSS/` is now empty and gone from git:

```bash
ls src/CSS 2>&1
```

Expected: "No such file or directory" (git removes empty dirs). If the directory lingers with only `.DS_Store`, `rm -rf src/CSS`.

- [ ] **Step 3: Verify no orphaned references**

```bash
grep -rn "HeadHunted-\|CSS/" src/ --include='*.jsx' --include='*.css'
```

Expected: no matches.

- [ ] **Step 4: Verify — Phase B must end fully green**

```bash
npm run lint
npm run build
```

Expected: both PASS. Dev-server check of ALL THREE project pages at 1280px, 810px, 375px: layout identical to Task 6/7 checks; QuickShot renders complete.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: migrate QuickShot page and delete HeadHunted.css"
```

---

## Phase C — Cleanup

### Task 9: Remove unused dependencies and configs

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm)
- Delete: `postcss.config.js`, `tailwind.config.js`

**Interfaces:**
- Consumes: Task 2 (removed the only `react-responsive` usage), Task 1 (removed the `@tailwind` directives)
- Produces: final dependency set

- [ ] **Step 1: Confirm nothing imports the packages being removed**

```bash
grep -rn "react-responsive\|@mui\|@emotion\|tailwind" src/ index.html
```

Expected: no matches.

- [ ] **Step 2: Uninstall**

```bash
npm uninstall @mui/material @emotion/react @emotion/styled react-responsive tailwindcss @tailwindcss/postcss autoprefixer
```

- [ ] **Step 3: Delete config files**

```bash
git rm postcss.config.js tailwind.config.js
```

- [ ] **Step 4: Verify**

```bash
npm run lint
npm run build
```

Expected: both PASS with no PostCSS/Tailwind warnings.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused MUI, emotion, Tailwind, and react-responsive deps"
```

---

### Task 10: Final verification pass

**Files:** none (verification only)

**Interfaces:**
- Consumes: everything
- Produces: verified, deployable branch

- [ ] **Step 1: Full manual check in dev server**

`npm run dev`, then verify each item:
- All six routes render: `/`, `/about`, `/projects`, `/DawnCore`, `/HeadHunted`, `/QuickShot`
- Widths 375px / 810px / 1280px on Home and one project page: no red column, no horizontal scrollbar, sidebar or top-navbar as appropriate
- Exactly 809px vs 810px: layout flips cleanly between top-navbar and sidebar
- Mobile hamburger opens and closes the menu
- Sticky sidebar stays pinned while scrolling DawnCore at desktop width
- Videos play on all three project pages; Itch.io buttons open in new tabs
- Resume iframe renders on About

- [ ] **Step 2: Deep-link check (production build)**

```bash
npm run build
npm run preview
```

Open the preview URL's `/skao-portfolio/DawnCore` directly in a fresh tab. Expected: 404.html redirect flow lands on the DawnCore page. (Note: `vite preview` may not serve `404.html` fallback the way GitHub Pages does — if the direct link 404s in preview, instead verify `dist/404.html` exists and manually open `/skao-portfolio/?redirect=/DawnCore`, which must land on DawnCore.)

- [ ] **Step 3: Report results**

Report any check that failed (with what was observed) rather than fixing ad hoc — layout regressions need a look at which task introduced them.
