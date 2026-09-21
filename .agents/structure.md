# Project Structure

## Directory Layout

```
src/
├── .vitepress/
│   ├── config.mjs          # VitePress site config (nav, sidebar, theme)
│   ├── constants.ts         # Shared constants (e.g., PERSON_DIRECTORY path)
│   ├── index.ts             # Re-exports domains + constants
│   ├── cache/               # VitePress build cache
│   ├── components/          # Vue components organized by domain
│   │   ├── contact/         # KContact.vue
│   │   ├── history/         # KHistoryEntries.vue, KHistoryEntry.vue
│   │   ├── home/            # KHome + section components (KHomeHero, KHomeGroups, ...), types, composables
│   │   ├── layout/          # KFooter
│   │   ├── person/          # KPerson.vue
│   │   ├── project/         # KProjectMeta (global, used in projects/*.md)
│   │   ├── publication/     # KPublications.vue, KPublication.vue, KPublicationTitle.vue
│   │   ├── team/            # KTeam.vue, KTeamMembers.vue, KTeamMembersItem.vue, KTeamSwitch.vue
│   │   └── utilities/       # Reusable UI: KContactDetails, KPageTitle, KPagination, KSwitch
│   ├── data/                # Data layer: loaders and static data
│   │   ├── bib.data.ts      # BibTeX publication loader (VitePress data loader)
│   │   ├── team.data.ts     # Team data loader
│   │   ├── research.data.ts # Research areas loader (createContentLoader over frontmatter)
│   │   ├── projects.data.ts # Projects loader (createContentLoader over frontmatter)
│   │   ├── software.data.ts # Software loader (createContentLoader over frontmatter)
│   │   ├── persons/         # Per-person JSON/data files
│   │   └── publications/    # BibTeX source files
│   ├── domains/             # Domain logic (TypeScript)
│   │   ├── contact/         # Contact constants
│   │   ├── content/         # Frontmatter readers, shared by project/research/software builders
│   │   ├── history/         # History types and logic
│   │   ├── home/            # Start page types, frontmatter builder (lead, hero, groups)
│   │   ├── person/          # Person define/read/types
│   │   ├── project/         # Project types, frontmatter builder, selection/formatting
│   │   ├── publication/     # Publication formatting/linking
│   │   ├── research/        # Research area types, frontmatter builder, slugify
│   │   ├── software/        # Software types, frontmatter builder, selection
│   │   └── team/            # Team constants and logic
│   ├── dist/                # Build output (git-ignored)
│   └── theme/               # Custom VitePress theme
│       ├── index.mjs        # Theme entry: extends DefaultTheme, registers plugins
│       ├── Layout.vue        # Wraps DefaultTheme.Layout, mounts KFooter in layout-bottom
│       └── style.css        # Tailwind entry: layers, vuecs tokens, shared component styles
├── index.md                 # Home page
├── contact.md               # Contact page
├── persons/                 # Dynamic member pages
│   └── [member].paths.js    # VitePress dynamic route definitions
├── projects/                # Project markdown pages
├── publications/            # Publication markdown pages
├── public/                  # Static assets (images, icons)
├── research/                # Research area pages
├── software/                # Software description pages
└── team/                    # Team overview pages
```

`*.spec.ts` files next to the code in `domains/` are unit tests, run with `npm test`.

`projects.data.ts` exports `{ generatedAt: string, items: Project[] }`, not a bare `Project[]`: the loader
stamps the build time once so "current" filtering (e.g. in `KHomeProjects`) is deterministic between SSR and
client hydration, comparing against `new Date(projects.generatedAt)`.

## Module Responsibilities

| Module               | Purpose                                                         |
|----------------------|-----------------------------------------------------------------|
| `config.mjs`         | Defines site metadata, navigation, sidebar structure            |
| `components/`        | Vue SFCs for rendering domain-specific content                  |
| `data/`              | VitePress data loaders — parse BibTeX, read person JSON files   |
| `domains/`           | Pure TypeScript: type definitions, data reading/transformation  |
| `theme/`             | Extends VitePress DefaultTheme with Tailwind CSS, vuecs theme, FontAwesome, pagination |
| `theme/Layout.vue`   | Adds the site footer via the layout-bottom slot                 |
| `constants.ts`       | File system paths used by data loaders at build time            |
| `*.spec.ts`          | Unit tests for domain logic (npm test)                          |

## Key Dependencies

| Package                      | Role                                  |
|------------------------------|---------------------------------------|
| `vitepress`                  | Static site generator (Vue 3 + Vite)  |
| `tailwindcss`, `@tailwindcss/vite` | Utility-first CSS (v4)          |
| `@vuecs/core`, `@vuecs/theme-tailwind`, `@vuecs/design` | vuecs theme system + design tokens |
| `@fortawesome/fontawesome-free` | Icon library                       |
| `@vuecs/pagination`          | Pagination component                  |
| `@retorquere/bibtex-parser`  | Parses .bib files into structured data|
| `locter`                     | File/module locating utility          |
| `smob`                       | Object merging utility                |
