# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site (game dev projects) built with Vite + React 18, written in plain JavaScript/JSX — not TypeScript. Deployed to GitHub Pages at `https://scarletfangs.github.io/skao-portfolio`.

## Commands

```bash
npm run dev        # Dev server on http://localhost:3000 (port set in vite.config.js)
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run lint       # ESLint
npm run deploy     # Build + publish dist/ to GitHub Pages via gh-pages
```

There are no tests in this project. Verification is `npm run lint` + `npm run build` + checking pages in the dev server. The site must be opened at the `/skao-portfolio/` path (e.g. `http://localhost:3000/skao-portfolio/`) — the bare root won't match the router basename.

## Architecture

### Routing and GitHub Pages

The app is an SPA using `react-router-dom` v7 (`createBrowserRouter` in `src/App.jsx`). Two things must stay in sync with the repo name:

- `base: '/skao-portfolio/'` in `vite.config.js`
- `basename: '/skao-portfolio/'` in the router config in `src/App.jsx`

Deep links on GitHub Pages work via a redirect trick: `public/404.html` rewrites any unknown path to `/skao-portfolio/?redirect=<path>`, and `MainLayout.jsx` reads the `redirect` query param on mount and navigates to it. If you add or rename a route, no 404.html change is needed — but breaking either the 404 script or the `MainLayout` redirect effect breaks all direct links to subpages.

The `_redirects` file (copied into `dist/` by `vite-plugin-static-copy`) is a Netlify-style SPA fallback; leave it alone.

### Layout and breakpoints

`src/layouts/MainLayout.jsx` wraps every page: a CSS grid (`MainLayout.css`) with a sticky 288px sidebar column and a content column. Responsive behavior is pure CSS — no JavaScript participates in layout.

**Canonical breakpoint:** phone = `(max-width: 809px)`, sidebar layout = `(min-width: 810px)`. Every media query in the codebase uses exactly these two values; CSS custom properties can't be used in `@media` conditions, so keep them literal and consistent. At phone width the sidebar is hidden and a sticky top navbar (with hamburger menu) shows instead — `NavBar.jsx` renders both variants as siblings and CSS displays exactly one.

Percentage heights that were harmless under the old block layout can misbehave as grid items (this caused a mobile navbar bug once) — size grid children with content or explicit units.

### Styling

- `src/styles/tokens.css` — design-token custom properties (`--Dark2`, `--Light60`, `--Green60`, …). Use these instead of hex values.
- `src/styles/global.css` — reset, body, and h1–h6/p element styles.
- Only those two files are imported in `src/main.jsx`. Every other stylesheet is colocated next to the component or page that owns it and imported by that file (`NavBar.jsx` imports `./NavBar.css`).
- Class names are prefixed with their component name (`QuickInfo-Container`, `Section-Container`). Note the distinction: `ProjectsPage-*` is the projects *listing* page; `ProjectPage-*` is the shared project *detail* wrapper.

Tailwind and MUI were removed from this project; styling is plain CSS only.

### Project detail pages

Project pages (`src/pages/projects/`) are compositions of the shared section components in `src/components/project/`:

- `ProjectPage({ title, children })` — page wrapper, renders `PageTopInfo` + container
- `QuickInfo({ facts, image, imageAlt, children })` — `facts` is a `{ label: value }` object; children is the description text
- `Section({ title, children })`
- `VideoSection({ src })`
- `LinkButton({ href, children })` — external link, opens in new tab

plus the existing `ProjectInfoBar({ ProjectType, Duration, Genre })`. Don't reintroduce page-specific layout CSS on project pages — extend the shared components instead.

### Adding a new project

1. Add assets under `src/assets/ProjectImages/<ProjectName>/` (imported directly into JSX so Vite bundles them)
2. Create `src/pages/projects/<ProjectName>Page.jsx` composing the section components (DawnCorePage is the most developed example)
3. Register the route in `src/App.jsx`
4. Add a `ProjectCard` entry in `src/pages/ProjectsPage.jsx` (and optionally `src/pages/HomePage.jsx`)

### Design docs

`docs/superpowers/specs/` and `docs/superpowers/plans/` contain the design spec and implementation plan for the 2026-07 structure refactor — useful history for why the architecture looks the way it does.

## Conventions

This repo predates the global engineering preferences and intentionally differs from them: it uses JavaScript (not TypeScript) and default exports. Match the existing style; don't convert files to TypeScript or named exports unless asked.
