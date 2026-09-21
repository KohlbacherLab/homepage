# 001: Site Redesign (Modern Research-Lab Look)

> Status: design approved in brainstorming (2026-09-17). Part 1 is ready for an implementation plan; part 2 still needs its own mockups.

## Goal

The site looks like a default VitePress docs site. It should look like the website of a research lab:
modern and confident, with a hero-style start page instead of a markdown document.

Constraints:

- Stay on VitePress 1.x, Tailwind v4 and vuecs. No framework switch.
- Dark mode keeps working (VitePress toggles `.dark` on `<html>`).
- Content stays editable by lab members: markdown pages, frontmatter, person and BibTeX data files.
- Mobile-first. No horizontal scroll at 390px.

## Design Decisions

| Topic               | Decision                                                                                             |
|---------------------|------------------------------------------------------------------------------------------------------|
| Visual direction    | Tech / data: dark hero with soft glow and faint grid, clean light/dark content sections below        |
| Brand color         | Indigo, i.e. the current vuecs `primary` scale. Logo colors (sky `#7dd3fc`, pink `#f5a0a3`) only as accents |
| Typography          | Inter only (already shipped by VitePress). Bold, tight-tracked headings. Uppercase letter-spaced eyebrows |
| Hero motif          | Mass-spectrum bars from the logo along the bottom edge, gently animated (CSS only). No sweeping light. Disabled under `prefers-reduced-motion` |
| Hero text           | Eyebrow: "Applied & Translational Bioinformatics · Tübingen"                                         |
|                     | Headline: "Algorithms, software and infrastructure for **omics and clinical data.**" (gradient on the highlighted part) |
|                     | Lead: "From mass spectrometry, immunomics and structural bioinformatics to national research data platforms such as GHGA, DNPM and PrivateAIM." |
| Hero actions        | Primary: "Our research" → `/research`. Secondary: "Publications →" → `/publications`                 |
| Hero extras         | "Led by Prof. Dr. Oliver Kohlbacher" with avatar. No numbers/stats row                               |
| Start page sections | Hero → Groups → Research areas → Projects & software → Latest publications → Team → Contact          |
| Lab lead visibility | Oliver Kohlbacher appears in the hero, the groups intro, the team section (large "Head of the lab" card) and the footer text |
| Groups              | Both groups are located at MVL6, so no building photos. Cards show a monogram (ABI / TBI), institution, summary and a member avatar stack |
| Fixed-dark areas    | Hero and footer stay dark in both color modes. Sections in between follow light/dark                  |
| Navigation          | On the start page the nav is transparent over the hero while scrolled to the top. Elsewhere the VitePress nav stays, in brand colors |
| Footer              | New site-wide dark footer: brand column, link columns, bottom bar with copyright and a subtle "Website by Peter Placzek (@tada5hi)" credit |
| Scope               | Everything, split into two parts (see below)                                                         |

Mockups (local only, not committed): `.superpowers/brainstorm/55135-1789646721/content/`, final state in
`landing-page-v2.html`.

## Split

| Part | Content                                                                                     | Delivery   |
|------|---------------------------------------------------------------------------------------------|------------|
| 1    | Foundation (tokens, chrome, footer), content data model, start page                         | PR 1       |
| 2    | Card-based Research / Projects / Software index pages, polish of Team, Person, Publications, Contact, 404 | PR 2       |

Part 1 goes first: part 2 builds on its data model and tokens. After part 1 is merged, the untouched pages already
get the new footer and brand colors, so nothing looks broken in between.

---

## Part 1: Foundation + Start Page

Branch: `feat/redesign-home` (off `master`).

### 1.1 Design tokens and shared styles (`theme/style.css`)

- Keep the vuecs `primary` → indigo mapping. Bridge VitePress brand vars onto it, as the vuecs docs do:
  `--vp-c-brand-1: var(--vc-color-primary-600)`, `--vp-c-brand-2: …-500`, `--vp-c-brand-3: …-500`,
  `--vp-c-brand-soft: color-mix(in srgb, var(--vc-color-primary-500) 14%, transparent)`, with dark-mode
  counterparts (`-400` / `-300`).
- Add lab tokens for the fixed-dark surfaces: `--k-dark-bg: #070b18`, `--k-dark-fg: #e8ecf6`,
  `--k-dark-fg-muted: #aeb6cc`, glow colors, and the accent gradient (`#7dd3fc → #a5b4fc → #f5a0a3`).
- Tailwind `@theme`: `--font-sans: var(--vp-font-family-base)` so `.vp-raw` subtrees use Inter.
- `@layer components`: `.k-section` (vertical rhythm, centered max-width wrapper), `.k-eyebrow`, `.k-card`
  (border, radius, hover lift + primary border). The existing `.entity-card` stays until part 2.

### 1.2 Chrome

**Start-page nav.** `src/index.md` sets `pageClass: k-home`. VitePress puts it on `.Layout`, and `VPNavBar` toggles
`.top` while `scrollY === 0`. Overrides go in an **unlayered** block at the end of `style.css`, because VitePress
component CSS is unlayered too:

- `.k-home .VPNavBar.top`: transparent background, light link/search/appearance/hamburger colors, and the
  `logo_light.png` variant even in light mode (hide `.VPImage.light`, show `.VPImage.dark`).
- `.k-home .VPContent` loses its `padding-top` (≥ 960px), and the hero adds `--vp-nav-height` as top padding, so the
  hero sits under the fixed nav.
- Below 960px the nav is not fixed: give `.k-home .VPNav` the dark hero background.
- After scrolling, `.top` is gone and the default nav styles apply again.

**Footer.** `theme/Layout.vue` wraps `DefaultTheme.Layout` and renders `KFooter` in the `layout-bottom` slot.
`theme/index.mjs` sets `Layout`. Remove `themeConfig.footer` from `config.mjs` (it would render `VPFooter` as well).

- `components/layout/KFooter.vue` (root carries `vp-raw`): brand column (logo, one-line description that names the
  lead), link columns *Lab* (Team, Research, Publications, Contact), *Work* (Projects, Software, Teaching ↗),
  *Links* (University of Tübingen ↗, University Hospital Tübingen ↗, GitHub ↗ `github.com/KohlbacherLab`), and a
  bottom bar: "© 2024–present KohlbacherLab" and "Website by [Peter Placzek](https://tada5hi.net)
  ([@tada5hi](https://github.com/tada5hi))" in small muted text.
- Sidebar pages (persons, projects, software): `VPSidebar` is fixed on the left from 960px on, so the footer mirrors
  the `VPContent.has-sidebar` left padding (including the 1440px rule), driven by `useSidebar().hasSidebar` from
  `vitepress/theme`.

### 1.3 Content data model

Frontmatter becomes the single source for metadata that the start page (and later the index pages) render.

**Projects** (`src/projects/*.md`, except `index.md`):

```yaml
---
title: GHGA
name: German Human Genome-Phenome Archive
website: https://ghga.de
funding:
  - funder: DFG
    reference: 'funding number: 441914366'
runtime:
  start: '2020-10-01'
  end: '2028-12-31'
featured: true
---
```

- The `**Funding:**` and `**Project runtime:**` lines leave the body. `<KProjectMeta />` is placed where they were
  and renders them from `useData().frontmatter`. Multiple funders (GDI, Epic-XS) are supported via the list.
  `reference` keeps the original wording (e.g. "Grant agreement ID: 765502") and is optional (CRG has none).
- Dates are quoted ISO strings: unquoted YAML dates become `Date` objects and don't survive the loader's JSON
  serialization unchanged.
- Initially featured: GHGA, de.NBI, PrivateAIM, PM4Onco.

**Software** (`src/software/*.md`, except `index.md`):

```yaml
---
title: OpenMS
summary: Open-source software for mass spectrometry analysis.
website: https://www.openms.de
repository: https://github.com/OpenMS/OpenMS
featured: true
---
```

- Initially featured: OpenMS, FLAME, DNPM:DIP, Fred2. `software/index.md` stays as is until part 2.

**Research areas** (`src/research/index.md` frontmatter):

```yaml
---
areas:
  - title: Computational Mass Spectrometry
    summary: Algorithms and the OpenMS platform for high-throughput proteomics and metabolomics.
    icon: fa-solid fa-chart-column
---
```

- Cards link to the heading anchor on `/research` (VitePress slug of `title`). The page body stays unchanged.

**Start page** (`src/index.md` frontmatter): `lead` (person slug, display name "Prof. Dr. Oliver Kohlbacher", role
label, one-line summary), `hero` (`eyebrow`, `title`, `highlight`, `description`, `actions`), and `groups` (`intro`
plus items with `id`, `name`, `institution`, `summary`), so lab members can edit them without touching components.
The body only mounts `<KHome />`.

**Domain + loaders:**

| File                                    | Purpose                                                                  |
|-----------------------------------------|--------------------------------------------------------------------------|
| `domains/content/frontmatter.ts`        | `readString()`, `readOptionalString()`, `readDate()` with clear build errors |
| `domains/project/*`                     | `Project` type, `buildProject()`, `isProjectRunning()`, `selectFeaturedProjects()`, runtime/funding formatting |
| `domains/software/*`                    | `Software` type, `buildSoftware()`, `selectFeaturedSoftware()`           |
| `domains/research/*`                    | `ResearchArea` type, `buildResearchAreas()`, `slugify()` (same algorithm as VitePress heading anchors) |
| `domains/publication/*`                 | `formatAuthors()`, `formatSource()`, `getPublicationLink()` extracted from `KPublication(Title).vue` |
| `domains/person/avatar.ts`              | `getPersonAvatar()` with the default avatar fallback                     |
| `domains/team/select.ts`                | `isTeamMember()`, `selectActiveMembers()`, `selectTeamMembers()`, `parseTeamQuery()` |
| `domains/contact/constants.ts`          | Lab address and contact details, extracted from `KContact.vue`           |

Pure domain functions get unit tests with Node's built-in test runner (`npm test`, no new dependency). Client
components import runtime code from the concrete domain file, never from `domains/index.ts`, which pulls in
`node:fs` via `person/read.ts`.
| `data/projects.data.ts`                 | `createContentLoader('projects/*.md')` → `Project[]` (with `url`)        |
| `data/software.data.ts`                 | `createContentLoader('software/*.md')` → `Software[]`                    |
| `data/research.data.ts`                 | `createContentLoader('research/index.md')` → `ResearchArea[]`            |

### 1.4 Start page components (`components/home/`)

Every section root carries `vp-raw`. `KHome` composes them in order.

| Component              | Data                                                    | Notes                                                                 |
|------------------------|---------------------------------------------------------|-----------------------------------------------------------------------|
| `KHomeHero`            | `index.md` frontmatter, lead from `team.data.ts`        | Glow + masked grid via pseudo-elements. Spectrum bars as a static height array (`aria-hidden`), `transform: scaleY` keyframes with staggered durations |
| `KHomeGroups`          | `index.md` frontmatter, `team.data.ts`                  | Monogram, institution, summary, avatar stack (first 6 + "+N"), link `/team?group=abi` |
| `KHomeResearch`        | `research.data.ts`                                      | 3-column grid of 5 area cards plus a dark "Explore our research" card  |
| `KHomeProjects`        | `projects.data.ts`, `software.data.ts`                  | Left: featured projects that are still running, max 4, with funder and years. Right: featured software as 2×2 tiles with repository link |
| `KHomePublications`    | `bib.data.ts` + `parse()`                               | Newest 4 entries: year, journal badge, title, one-line author list    |
| `KHomeTeam`            | `index.md` frontmatter (`lead`), `team.data.ts`         | Lead card + grid of all other active members, linking to their person pages |
| `KHomeContact`         | `domains/contact`                                       | Address, phone, email, "How to find us" → `/contact`, MVL6 photo       |

Small related changes:

- `KTeam` reads an optional `?group=abi|tbi` query and filters by `member.team`, so the group links land on a
  filtered team page.
- Delete the outdated `public/images/contact/abi.jpg` and `tbi.jpg` (unused).
- `KContact` and `KPublication` use the extracted domain helpers.

### 1.5 Responsive and accessibility

- Breakpoints: standard `sm/md/lg/xl` only (see gotchas). At 390px, all grids collapse to one column (team grid: 3
  columns), the hero headline scales with `clamp()`, and the nav collapses to the VitePress hamburger.
- Motion only in the spectrum bars, off under `prefers-reduced-motion: reduce`.
- Text on the dark hero uses `--k-dark-fg` / `--k-dark-fg-muted`. Links on light backgrounds use `primary-700`,
  on dark `primary-300`.
- Decorative elements (`aria-hidden`), meaningful `alt` for avatars (person name).

### 1.6 Verification

- Baseline screenshots before changes, then compare: start page, one sidebar page (project), team, publications,
  in light and dark mode (click `.VPSwitchAppearance`).
- Mobile: 390px `<iframe>` technique from the resume notes, check `scrollWidth > innerWidth` on every page touched.
- Check nav transparency at the top and after scrolling on the start page, and the footer next to the sidebar.
- `npm test`, `npm run build`, `npm run lint`, `npm run typecheck`.
- Update `.agents/structure.md` and `.agents/architecture.md` (new `layout/` and `home/` components, loaders,
  frontmatter model, `Layout.vue`).

---

## Part 2: Remaining Pages (outline)

Needs its own mockups and approval before implementation.

- **Research index:** area cards (reusing `research.data.ts`) at the top, detailed sections below.
- **Projects index:** card grid from `projects.data.ts`, split into running and finished projects, with funder and
  runtime. Project pages get a proper header (`KProjectMeta` grows into it).
- **Software index:** card grid from `software.data.ts` with logos, website and repository links.
- **Team:** restyle cards, visible ABI / TBI filter (building on the `?group=` query).
- **Person:** profile header in the new style.
- **Publications:** grouping by year and possibly a filter. Consider parsing BibTeX at build time instead of
  in the client.
- **Contact:** restyle, with the directions as cards.
- **404 page** in the hero style.

## Gotchas (Tailwind inside VitePress)

- VitePress base and doc CSS is unlayered and beats Tailwind utilities. Component roots need `vp-raw`
  (`postcssIsolateStyles` in `config.mjs`). `custom-block.css` is not isolated.
- Overrides of VitePress component styles (nav) must be unlayered as well.
- Tailwind only scans `src/.vitepress/components` and `node_modules/@vuecs`. Classes elsewhere need an `@source`.
- Don't use the Tailwind `container` utility: it matches VitePress's `.container`.
- `min-[960px]:` variants were emitted before `md:`. Use standard breakpoints or a custom `--breakpoint-*`.
- vuecs radius tokens override Tailwind's (`rounded-sm` = 2px, `rounded-md` = 6px, `rounded-xl` = 12px).
- `eslint .` also walks into `.claude/worktrees/*`; ignore warnings from there.
