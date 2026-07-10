# Portfolio Structure Refactor — Design

**Date:** 2026-07-10
**Status:** Approved
**Goal:** Restructure the portfolio site so future projects are easy to add, fix the fragile responsive layout, and centralize the project-page styling currently named after HeadHunted. No visual redesign — same content, same look, minus the layout bug.

## Problems being solved

1. **Layout breaks at certain widths.** Layout decisions are split between JS and CSS with mismatched breakpoints: `MainLayout.jsx` uses `react-responsive` with phone ≤ 809px, while `NavBar.css` hides the sidebar at ≤ 810px and shows it at ≥ 811px. At exactly 810px the CSS hides the sidebar but JS still renders the hardcoded 288px spacer div (`backgroundColor: "red"`), producing a visible red column with no nav. The spacer-div pattern itself requires two files to agree on a magic number.
2. **Styling named after one project but shared by all.** `HeadHunted.css` classes (`HeadHunted-Container`, `HeadHunted-QuickInfo-*`, `HeadHunted-LinkBtn`, `HeadHunted-MyContributions-Container`) are used by the DawnCore and QuickShot pages too. All CSS is imported globally in `main.jsx`.
3. **Dead weight.** MUI, @emotion, and Tailwind are installed but unused (the Tailwind v4 setup in `index.css` uses v3 `@tailwind` syntax and does nothing). `App.css` is dead code by its own comment.

## Decisions (user-approved)

- **Page authoring model:** shared section components — new project pages compose reusable sections in a short JSX file. Not fully data-driven; not per-page copy-paste.
- **Language:** stay plain JavaScript (.jsx). No TypeScript migration in this refactor.
- **Styling:** plain CSS, colocated — one CSS file per component, imported by that component. Design tokens in a central file. No CSS Modules, no Tailwind.
- **Layout fix:** pure CSS grid with a sticky sidebar. JS no longer participates in layout; `react-responsive` is removed.
- **Dependencies:** remove all unused styling deps (MUI, emotion, Tailwind, autoprefixer) plus `react-responsive`.
- **Execution order:** structure first, then styling centralization, then dep cleanup.

## Target structure

```
src/
  main.jsx                  → imports only styles/tokens.css + styles/global.css
  App.jsx                   → routes (behavior unchanged, incl. basename '/skao-portfolio/')
  styles/
    tokens.css              → :root color vars (from GeneralText.css) + canonical breakpoint comment
    global.css              → body, h1–h6, p rules (rest of GeneralText.css merged with index.css)
  layouts/
    MainLayout.jsx / .css
  components/
    NavBar.jsx / .css
    PageTopInfo.jsx / .css
    ProjectInfoBar.jsx / .css
    ProjectCard.jsx / .css
    project/
      ProjectPage.jsx / .css    (page container — replaces HeadHunted-Container)
      QuickInfo.jsx / .css      (facts list + description + side image)
      Section.jsx / .css        (h2 heading + children — replaces MyContributions-Container)
      VideoSection.jsx / .css
      LinkButton.jsx / .css     (replaces HeadHunted-LinkBtn; generic label + href + arrow icon)
  pages/
    HomePage.jsx / .css
    AboutPage.jsx / .css
    ProjectsPage.jsx / .css
    projects/
      DawnCorePage.jsx
      HeadHuntedPage.jsx
      QuickShotPage.jsx
  assets/                   (unchanged)
```

Notes:
- `src/CSS/` is deleted entirely after migration; every stylesheet moves next to its component and is imported by that component, not `main.jsx`.
- `src/Pages/` is renamed to `src/pages/` (case-only rename: use a two-step `git mv` via a temp name on macOS's case-insensitive filesystem).
- Project pages have no CSS files of their own — they are pure composition.
- Existing default exports stay as default exports (repo convention).

## Section component APIs

```jsx
const NewGamePage = () => (
  <ProjectPage title="NewGame">
    <ProjectInfoBar ProjectType="School Project" Duration="10 Weeks" Genre="Puzzle" />
    <img src={splash} alt="NewGame splash art" />
    <QuickInfo image={poster} imageAlt="NewGame poster"
      facts={{ Engine: 'Unity', Tools: 'GitHub', Roles: 'Programmer' }}>
      One-paragraph game description...
    </QuickInfo>
    <LinkButton href="https://...itch.io/...">To Itch.io</LinkButton>
    <Section title="My Contributions">
      <ul><li>...</li></ul>
    </Section>
    <VideoSection src={demoVideo} />
  </ProjectPage>
);
```

- `ProjectPage({ title, children })` — renders the page container div and `PageTopInfo` (with `ShowLocation={false}`) internally.
- `QuickInfo({ facts, image, imageAlt, children })` — `facts` is an object rendered as `<strong>Label</strong>: value` rows; `children` is the description paragraph; `image` renders in the side column. Keeps the existing stacking behavior on phone widths. The current pages disagree on the fact-row element (`<p>` in HeadHunted, `<h6>` in DawnCore); QuickInfo standardizes on `<p>` rows with the existing `Description-Label` strong styling.
- `Section({ title, children })` — h2 + arbitrary children. DawnCore's Goal/Challenges/Implementation deep-dive content fits without template changes.
- `VideoSection({ src })` — the `<video controls muted>` block with fallback text.
- `LinkButton({ href, children })` — external link styled as the current arrow button, `target="_blank"`.
- All three existing project pages are rewritten in this vocabulary with identical visible content. CSS classes become component-scoped names (`ProjectPage-Container`, `QuickInfo-Description`, `Section-Container`, `LinkButton`, …). `HeadHunted.css` is deleted.

## Layout fix

- `MainLayout` renders a CSS grid: `grid-template-columns: 288px 1fr`; single column below the phone breakpoint. The spacer div and all `useMediaQuery` calls are removed.
- Sidebar NavBar switches from `position: fixed` to `position: sticky; top: 0; height: 100vh` inside its grid column.
- **One canonical breakpoint:** phone = `max-width: 809px`. Every media query in the codebase uses this number (the current 810/811 stragglers in `NavBar.css` are corrected). The unused desktop/tablet 1200px distinction is dropped.
- NavBar keeps both variants (sidebar and mobile top bar); visibility is controlled only by CSS media queries at the canonical breakpoint.
- The inverted mobile-menu class logic (`menuOpen ? "" : "open"` where `.open` means hidden) becomes a readable `is-open` pattern with unchanged behavior.
- The GitHub Pages `?redirect=` effect in `MainLayout` stays exactly as is; `basename` and Vite `base` untouched.

## Dependency & dead-code cleanup

Remove: `@mui/material`, `@emotion/react`, `@emotion/styled`, `tailwindcss`, `@tailwindcss/postcss`, `autoprefixer`, `react-responsive`; delete `postcss.config.js`, `tailwind.config.js`, `src/App.css`, and the `@tailwind` lines in `index.css` (whose remaining rules merge into `styles/global.css`).

Keep: `vite-plugin-static-copy` (copies `_redirects`), all router deps, `gh-pages` tooling.

## Execution phases & verification

- **Phase A — structure:** layout fix (grid + sticky sidebar), folder moves/renames, import updates. Verify, commit.
- **Phase B — styling centralization:** build `components/project/` section components, migrate DawnCore/HeadHunted/QuickShot pages, colocate all CSS, delete `src/CSS/`. Verify, commit.
- **Phase C — cleanup:** remove dependencies and dead files. Verify, commit.

Each phase must end green:
1. `npm run lint`
2. `npm run build`
3. Manual dev-server visual check at ~375px, exactly 810px (the bug width), and 1280px
4. Deep-link check: `/skao-portfolio/DawnCore` redirect flow still lands on the DawnCore page

There is no test suite or screenshot baseline; visual parity verification is manual. Content must be byte-identical text; DOM structure may change where the old structure was incidental.

## Out of scope

- TypeScript migration
- Visual redesign of any kind
- New pages or content changes (the DawnCore reorganization TODO comment stays a TODO)
- Named-export conversion or other global-preference alignment
