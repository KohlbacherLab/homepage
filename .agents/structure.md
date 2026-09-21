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
│   │   ├── home/            # (currently empty)
│   │   ├── person/          # KPerson.vue
│   │   ├── publication/     # KPublications.vue, KPublication.vue, KPublicationTitle.vue
│   │   ├── team/            # KTeam.vue, KTeamMembers.vue, KTeamMembersItem.vue, KTeamSwitch.vue
│   │   └── utilities/       # Reusable UI: KContactDetails, KPageTitle, KPagination, KSwitch
│   ├── data/                # Data layer: loaders and static data
│   │   ├── bib.data.ts      # BibTeX publication loader (VitePress data loader)
│   │   ├── team.data.ts     # Team data loader
│   │   ├── persons/         # Per-person JSON/data files
│   │   └── publications/    # BibTeX source files
│   ├── domains/             # Domain logic (TypeScript)
│   │   ├── history/         # History types and logic
│   │   ├── person/          # Person define/read/types
│   │   └── team/            # Team constants and logic
│   ├── dist/                # Build output (git-ignored)
│   └── theme/               # Custom VitePress theme
│       ├── index.mjs        # Theme entry: extends DefaultTheme, registers plugins
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

## Module Responsibilities

| Module               | Purpose                                                         |
|----------------------|-----------------------------------------------------------------|
| `config.mjs`         | Defines site metadata, navigation, sidebar structure            |
| `components/`        | Vue SFCs for rendering domain-specific content                  |
| `data/`              | VitePress data loaders — parse BibTeX, read person JSON files   |
| `domains/`           | Pure TypeScript: type definitions, data reading/transformation  |
| `theme/`             | Extends VitePress DefaultTheme with Tailwind CSS, vuecs theme, FontAwesome, pagination |
| `constants.ts`       | File system paths used by data loaders at build time            |

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
