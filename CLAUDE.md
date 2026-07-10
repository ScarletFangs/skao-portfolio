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

There are no tests in this project.

## Architecture

### Routing and GitHub Pages

The app is an SPA using `react-router-dom` v7 (`createBrowserRouter` in `src/App.jsx`). Two things must stay in sync with the repo name:

- `base: '/skao-portfolio/'` in `vite.config.js`
- `basename: '/skao-portfolio/'` in the router config in `src/App.jsx`

Deep links on GitHub Pages work via a redirect trick: `public/404.html` rewrites any unknown path to `/skao-portfolio/?redirect=<path>`, and `MainLayout.jsx` reads the `redirect` query param on mount and navigates to it. If you add or rename a route, no 404.html change is needed — but breaking either the 404 script or the `MainLayout` redirect effect breaks all direct links to subpages.

The `_redirects` file (copied into `dist/` by `vite-plugin-static-copy`) is a Netlify-style SPA fallback; leave it alone.

### Page structure

- `src/App.jsx` — all routes, one per page
- `src/layouts/MainLayout.jsx` — wraps every page: `NavBar` + a fixed 288px spacer (desktop/tablet) + `<Outlet/>`. Responsive behavior uses `react-responsive` `useMediaQuery` with three breakpoints: phone ≤809px, tablet 810–1199px, desktop ≥1200px. These same breakpoints are used in components — keep them consistent.
- `src/Pages/` — one component per page. Project pages (DawnCore, HeadHunted, QuickShot) share a common shape: `PageTopInfo` → `ProjectInfoBar` → images/videos/description sections → external link button.
- `src/components/` — shared pieces (`NavBar`, `PageTopInfo`, `ProjectInfoBar`, `ProjectCard`)
- `src/CSS/` — plain CSS files. Many class names are prefixed `HeadHunted-*` (from the first project page built) but are reused across all project pages; don't rename them for one page without checking the others.
- `src/assets/ProjectImages/<ProjectName>/` — images and demo videos, imported directly into JSX so Vite bundles them

### Adding a new project

1. Add assets under `src/assets/ProjectImages/<ProjectName>/`
2. Create `src/Pages/<ProjectName>Page.jsx` following an existing project page (DawnCorePage is the most developed)
3. Register the route in `src/App.jsx`
4. Add a `ProjectCard` entry in `src/Pages/ProjectsPage.jsx`

## Conventions

This repo predates the global engineering preferences and intentionally differs from them: it uses JavaScript (not TypeScript), default exports, and inline styles mixed with plain CSS. Match the existing style; don't convert files to TypeScript or named exports unless asked.

Tailwind 4 and MUI are installed as dependencies, but the styling in practice is custom CSS in `src/CSS/` plus inline styles — follow whichever the surrounding code uses.
