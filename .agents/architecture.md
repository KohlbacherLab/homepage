# Architecture

## Data Flow

```
BibTeX files / Person JSON files
        │
        ▼
  VitePress Data Loaders (src/.vitepress/data/*.data.ts)
        │  ── uses domains/ for reading & typing
        ▼
  Build-time data (available via `useData()` in Vue)
        │
        ▼
  Vue Components (src/.vitepress/components/)
        │
        ▼
  Static HTML (src/.vitepress/dist/)
```

All data processing happens at **build time**, not runtime. VitePress data loaders (`*.data.ts`) run during the build, parse source files, and make the results available to Vue components via VitePress's `useData()` composable.

## Domain Model

### Person

Persons are defined as JSON files in `src/.vitepress/data/persons/`. The domain layer in `domains/person/` provides:

- **`types.ts`** — TypeScript interface for person data
- **`read.ts`** — Reads person JSON files from disk using `PERSON_DIRECTORY` constant
- **`define.ts`** — Helper for defining/validating person data

Person data drives:
- Individual member pages via dynamic routes (`src/persons/[member].paths.js`)
- Team listing page
- Sidebar navigation (built in `config.mjs`)

### Publications

Publications use `@retorquere/bibtex-parser` to parse `.bib` files in `src/.vitepress/data/publications/`. The `bib.data.ts` loader transforms entries for rendering by `KPublications.vue`.

### Team

The team domain (`domains/team/`) defines constants (e.g., team groupings). `team.data.ts` loads team data for the team overview components.

### Projects, Software, Research Areas

Metadata lives in frontmatter and is validated by `domains/content/frontmatter.ts` (build errors name the page and
key). Dates are quoted ISO strings.

- `src/projects/*.md`: `title`, `name`, `website`, `funding[]` (`funder`, `reference`), `runtime` (`start`, `end`),
  `featured`. Pages place `<KProjectMeta />` where funding and runtime should render.
- `src/software/*.md`: `title`, `summary`, `website`, `repository`, `featured`.
- `src/research/index.md`: `areas[]` (`title` = the `##` heading, `summary`, `icon`).

`projects.data.ts`, `software.data.ts` and `research.data.ts` use `createContentLoader` and the domain builders.
`projects.data.ts` exports `{ generatedAt: string, items: Project[] }` rather than a bare array: the loader stamps
the build time once so "current" filtering is deterministic between SSR and client hydration; `KHomeProjects`
compares against `new Date(projects.generatedAt)`.

### Start Page

`src/index.md` uses `layout: page` and `pageClass: k-home`, holds the editable texts in frontmatter (`lead`, `hero`,
`groups`) and mounts `KHome`, which composes `KHomeHero`, `KHomeGroups`, `KHomeResearch`, `KHomeProjects`,
`KHomePublications`, `KHomeTeam` and `KHomeContact`. That frontmatter is read client-side via `useData()`, so
`domains/home/build.ts` validates it the same way the `project`/`software`/`research` builders validate theirs;
`components/home/composables.ts` exposes it as `useHome()` (and `useHomeLead()`, which additionally checks
`lead.person` against the person data files).

## Theme Architecture

The custom theme (`src/.vitepress/theme/index.mjs`):

1. Extends VitePress `DefaultTheme`
2. Imports FontAwesome CSS (icons are plain `<i class="fa ...">` elements)
3. Installs `@vuecs/core` with the `@vuecs/theme-tailwind` theme, plus `@vuecs/pagination`
4. Loads Tailwind CSS v4 from `style.css` (via `@tailwindcss/vite`, registered in `config.mjs`)
5. Wraps `DefaultTheme.Layout` in `theme/Layout.vue` to render `KFooter` in the `layout-bottom` slot

### Styling with Tailwind

- Components are styled with Tailwind utility classes. Shared styles live in `style.css`
  (`@layer base` for the heading scale and token bindings, `@layer components` for `.entity-card`).
- VitePress's base and doc CSS is unlayered and would override Tailwind utilities. Every page-level
  component root therefore carries the `vp-raw` class; `postcssIsolateStyles()` in `config.mjs`
  excludes `.vp-raw` subtrees from those VitePress styles.
- The vuecs semantic tokens (`bg-bg-muted`, `text-fg-muted`, `border-border`, ...) are bound to the
  VitePress palette in `style.css`, so they follow VitePress's `.dark` mode. `primary` maps to indigo.
- Tailwind only scans `src/.vitepress/components` and `node_modules/@vuecs` (`@source` in `style.css`);
  classes used elsewhere are not generated.
- Avoid the Tailwind `container` utility: it also matches VitePress's own `.container` elements.
- Lab tokens: `--k-dark-*` (fixed-dark hero/footer surfaces, Tailwind colors `night`, `night-fg`, `night-fg-muted`,
  `night-border`) and logo accents (`accent-sky`, `accent-pink`). Shared classes: `k-section`, `k-section-alt`,
  `k-wrap`, `k-eyebrow`, `k-heading`, `k-link`, `k-card`, `k-card-interactive`, `k-night`, `k-gradient-text`.
- VitePress brand variables are bound to the vuecs primary scale. Overrides of VitePress variables and component
  styles (e.g. the transparent start page nav) live in the unlayered part at the end of `style.css`.
- Client components import runtime code from concrete domain files, never from `domains/index.ts` (it re-exports
  `person/read.ts`, which uses `node:fs`).

## Component Naming

All components use the `K` prefix (e.g., `KTeam`, `KPublication`, `KContact`). Components are organized into domain-specific directories mirroring the `domains/` structure, plus a `utilities/` directory for shared UI elements.

## Dynamic Routes

VitePress dynamic routes are defined in `[member].paths.js` files. These export a `paths()` function that returns route parameters, sourced from the person data files. Each person gets a page at `/persons/{slug}`.
