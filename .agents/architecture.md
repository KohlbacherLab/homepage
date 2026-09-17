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

## Theme Architecture

The custom theme (`src/.vitepress/theme/index.mjs`):

1. Extends VitePress `DefaultTheme`
2. Imports Bootstrap CSS (grid, reboot, utilities only — no JS)
3. Registers FontAwesome icons via `@vuecs/preset-font-awesome`
4. Installs `@vuecs/pagination` with custom class configuration
5. Applies project-wide styles from `style.css`

## Component Naming

All components use the `K` prefix (e.g., `KTeam`, `KPublication`, `KContact`). Components are organized into domain-specific directories mirroring the `domains/` structure, plus a `utilities/` directory for shared UI elements.

## Dynamic Routes

VitePress dynamic routes are defined in `[member].paths.js` files. These export a `paths()` function that returns route parameters, sourced from the person data files. Each person gets a page at `/persons/{slug}`.
