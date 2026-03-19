<!-- NOTE: Keep this file and all corresponding files in the .agents directory updated as the project evolves. When making architectural changes, adding new patterns, or discovering important conventions, update the relevant sections. -->

# KohlbacherLab Homepage — Agent Guide

VitePress-powered academic website for the Applied and Translational Bioinformatics group (KohlbacherLab) at the University of Tubingen. Serves content for team members, research areas, publications (from BibTeX), projects, software, and teaching. Deployed to kohlbacherlab.org via GitHub Pages.

## Quick Reference

```bash
# Setup
npm ci

# Development
npm run dev

# Build
npm run build

# Lint
npm run lint
npm run lint:fix
```

- **Node.js**: >= 20.0.0
- **Package manager**: npm
- **Framework**: VitePress 1.x (Vue 3 + Vite)

## Content Sections

| Section      | Source path          | Notes                                          |
|--------------|----------------------|------------------------------------------------|
| Home         | `src/index.md`       | Landing page                                   |
| Team         | `src/team/`          | Team overview, links to individual member pages |
| Persons      | `src/persons/`       | Dynamic routes via `[member].paths.js`          |
| Research     | `src/research/`      | Research area descriptions                     |
| Publications | `src/publications/`  | Rendered from BibTeX data files                 |
| Projects     | `src/projects/`      | Individual project pages                       |
| Software     | `src/software/`      | Software package descriptions                  |
| Teaching     | External link        | Links to university course catalog              |
| Contact      | `src/contact.md`     | Contact information                            |

## Detailed Guides

- **[Project Structure](.agents/structure.md)** — Source layout, modules, and data pipeline
- **[Architecture](.agents/architecture.md)** — Component design, data flow, and domain model
- **[Conventions](.agents/conventions.md)** — Code style, linting, CI/CD, and commit hooks
