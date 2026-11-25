<div align="center">

<img src="./.github/assets/logo.svg" alt="KohlbacherLab" width="128" height="128" />

<h1>KohlbacherLab Homepage</h1>

[![Deploy](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml/badge.svg)](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml)
[![Check](https://github.com/KohlbacherLab/homepage/actions/workflows/check.yml/badge.svg)](https://github.com/KohlbacherLab/homepage/actions/workflows/check.yml)
[![Docker](https://github.com/KohlbacherLab/homepage/actions/workflows/docker.yml/badge.svg)](https://github.com/KohlbacherLab/homepage/actions/workflows/docker.yml)

**Source of kohlbacherlab.org, the website of the Applied and Translational Bioinformatics group in Tübingen.**

Team members, publications, projects and software are data files and frontmatter, not hand-written HTML.
Built with [VitePress](https://vitepress.dev/) and deployed to [kohlbacherlab.org](https://kohlbacherlab.org) on every push to `master`.

[Getting Started](#getting-started) · [Recipes](#recipes) · [Deployment](#deployment) · [Contributing](#contributing)

</div>

---

## Why this setup?

A lab website changes all the time: people join and leave, papers come out, projects start and end. When every change
means editing HTML in several places, the team page, the member page and the navigation drift apart, and the
publication list falls behind.

Here, each kind of content has one source, and the build turns it into every page that shows it:

| Concern | Hand-maintained pages or a CMS | This repository |
|---|---|---|
| **Team** | Update the team list, the member page and the navigation separately | One file per person in `src/.vitepress/data/persons/` yields the member page, the team listing and the sidebar entry |
| **Publications** | Copy each paper into a list by hand | Paste the BibTeX export into `pub.bib`; the publications page renders and paginates it |
| **Projects and software** | Funding, runtime and links typed into prose, easy to get wrong | Frontmatter checked at build time; a missing or mistyped key fails the build and names the page and the key |
| **Current projects** | Someone has to notice a project ended | The start page shows featured projects only until their `runtime.end` date |
| **Review** | Changes go live as soon as they are saved | Every change is a pull request; CI runs tests, type checks, the build and lint |
| **Hosting** | A server, a database and CMS updates | Static HTML on GitHub Pages, or one nginx Docker image |

**Table of Contents**

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Recipes](#recipes)
  - [Person](#person)
  - [Publication](#publication)
  - [Project](#project)
  - [Software](#software)
  - [Research Area](#research-area)
- [Deployment](#deployment)
- [Notes](#notes)
- [Contributing](#contributing)
  - [Fork Workflow](#fork-workflow)
  - [Keeping Your Fork Up to Date](#keeping-your-fork-up-to-date)
- [License](#license)

## Getting Started

> **Note**
>
> This project uses a fork-based workflow. See the [Contributing](#contributing) section
> for how to fork, clone, and submit changes.

**Prerequisites:** [Node.js](https://nodejs.org/) >= 22.0.0

1. Install dependencies

```shell
npm ci
```

2. Start the dev server (with hot module replacement)

```shell
npm run dev
```

## Scripts

| Command              | Description                                         |
|----------------------|-----------------------------------------------------|
| `npm run dev`        | Start local dev server with HMR                     |
| `npm run build`      | Build the static site into `src/.vitepress/dist/`   |
| `npm test`           | Run the domain unit tests (Node's built-in runner)  |
| `npm run typecheck`  | Run type checking with `vue-tsc`                    |
| `npm run lint`       | Lint source files with ESLint                       |
| `npm run lint:fix`   | Lint and auto-fix source files                      |

## Recipes

The following recipes help you create and manage content on the homepage.
For general page editing, refer to the [VitePress documentation](https://vitepress.dev/).

### Person

To add a new person, create a file in `src/.vitepress/data/persons/` following the naming pattern `<lastname>-<firstname>.mjs`.
The file name (without `.mjs`) becomes the URL of the member page: `/persons/<lastname>-<firstname>`.

Use existing person files as reference. A minimal example:

```js
import { TeamID, definePerson } from '../..';

export default definePerson({
    name: 'Peter Placzek',
    role: 'Researcher',
    avatar: '/images/persons/placzek-peter.jpg',
    email: 'peter.placzek@medizin.uni-tuebingen.de',
    phone: '+49 7071 29 84309',
    address: 'Sand 14, Room A301, Tübingen, 72076',
    team: TeamID.TBI,
    socialLinks: [
        { icon: 'github', link: 'https://github.com/tada5hi' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/peter-placzek-047a74210/' },
    ],
    interests: [
        'Personalized Medicine',
        'Privacy',
        'Security',
    ],
    education: [
        {
            year: [2002, 2006],
            value: 'Grundschule Pliezhausen',
        },
    ],
    awards: [
        {
            year: 2020,
            value: 'xxx',
        },
    ],
    biography: [
        {
            year: [2000, 2005],
            value: 'xxx',
        },
    ],
});
```

- Put the avatar image in `src/public/images/persons/` and reference it as `/images/persons/<file>`. Without an avatar,
  the page shows `/images/persons/default.png`.
- `team` takes `TeamID.TBI` (`'tbi'`) or `TeamID.ABI` (`'abi'`), or an array of both.
- When someone leaves, set `inactive: true` instead of deleting the file. The person moves to the inactive tab of the
  team page and keeps their member page.
- Person files are read at build time, and the sidebar and member routes are generated when the dev server starts.
  Restart the dev server after adding or renaming a person.

#### Structure

**Person**

```ts
/**
 * Represents a team member with their personal and professional information.
 */
interface Person {
    /** The full name of the person. */
    name: string;

    /** The professional role (e.g., 'Researcher', 'Professor'). Can be an array for several roles. */
    role?: string | string[];

    /** URL to the person's avatar image. Can be absolute or relative. */
    avatar?: string;

    /** A short description or bio of the person. */
    description?: string;

    /** A list of the person's social media links. */
    socialLinks?: SocialLink[];

    /** The person's address. Can be a string or an array for multiple addresses. */
    address?: string | string[];

    /** The person's email address. */
    email?: string;

    /** The person's phone number. Can be a string or an array for multiple numbers. */
    phone?: string | string[];

    /** The team or teams the person is part of (e.g., 'tbi', 'abi'). */
    team: string | string[];

    /** Marks a former member: listed under "inactive" on the team page. */
    inactive?: boolean;

    /** The person's educational background. */
    education?: HistoryEntry[];

    /** Awards or recognitions the person has received. */
    awards?: HistoryEntry[];

    /** A detailed biography of the person. */
    biography?: HistoryEntry[];

    /** A list of the person's professional or personal interests. */
    interests?: string[];

    /** URL to the person's sponsor page. */
    sponsor?: string;

    /** Custom text for the sponsor action button. */
    actionText?: string;
}
```

**HistoryEntry**

```ts
/**
 * Represents a chronological entry (e.g., education, award, biography item).
 */
type HistoryEntry = {
    /** The year or year range (e.g., 2020 or [2018, 2022]). */
    year: number | [number, number];

    /** A description of the entry. */
    value: string;
};
```

**SocialLink**

```ts
/**
 * Represents a social media or external profile link.
 */
type SocialLink = {
    /** The icon identifier for the social platform (e.g., 'github', 'linkedin'). */
    icon: string;

    /** The URL to the social profile. */
    link: string;

    /** Accessible label for screen readers. */
    ariaLabel?: string;
};
```

### Publication

Publications come from one BibTeX file: `src/.vitepress/data/publications/pub.bib`.
Append new entries to it, for example from the export of a reference manager.
The file is read once at build time, so restart the dev server to see new entries.

### Project

Each project is a Markdown page in `src/projects/`. Its metadata lives in the frontmatter:

```yaml
---
title: PrivateAIM
name: Privacy-preserving Analytics in Medicine
website: https://privateaim.de/
funding:
  - funder: BMFTR
    reference: 'funding number: 01ZZ2316A'
runtime:
  start: '2023-04-01'
  end: '2027-03-31'
featured: true
---
```

| Key | Description |
|---|---|
| `title` | Short name, used in lists and the sidebar |
| `name` | Full project name |
| `website` | Project website |
| `funding[]` | `funder` and an optional `reference`, rendered in parentheses |
| `runtime` | `start` and `end` as quoted ISO dates (`'2027-03-31'`) |
| `featured` | Show the project on the start page while it runs (up to four, newest `start` first) |

- Place `<KProjectMeta />` in the page body where funding and runtime should appear.
- Add the page to the `/projects` sidebar in `src/.vitepress/config.mjs`.

### Software

Each package is a Markdown page in `src/software/`:

```yaml
---
title: FLAME
summary: Federated learning and analyses in medicine, the open-source core of PrivateAIM.
website: https://docs.privateaim.net/
repository: https://github.com/PrivateAim
featured: true
---
```

`title` and `summary` appear in lists, `website` and `repository` as links, and `featured` puts the package on the
start page (up to four, sorted by title). Add the page to the `/software` sidebar in `src/.vitepress/config.mjs`.

### Research Area

Research areas live in the frontmatter of `src/research/index.md`:

```yaml
---
areas:
  - title: Computational Immunomics
    summary: MHC ligandomics, HLA typing and neoepitope discovery from mass spectrometry and NGS data.
    icon: fa-solid fa-shield-virus
---
```

Each `title` must match a `##` heading in the same page, or the build fails; the start page links to that heading.
`icon` is a [Font Awesome](https://fontawesome.com/icons) class.

## Deployment

A push to `master` runs two workflows:

- [`main.yml`](./.github/workflows/main.yml) builds the site and publishes `src/.vitepress/dist/` to GitHub Pages
  under [kohlbacherlab.org](https://kohlbacherlab.org).
- [`docker.yml`](./.github/workflows/docker.yml) builds the [`Dockerfile`](./Dockerfile) and pushes
  `ghcr.io/kohlbacherlab/homepage:latest`, an nginx image that serves the built site on port 80:

```shell
docker run -p 8080:80 ghcr.io/kohlbacherlab/homepage:latest
```

Pull requests run [`check.yml`](./.github/workflows/check.yml): install, test, type check, build and lint.

## Notes

- **Content errors fail the build.** A project, software or research page with a missing or mistyped frontmatter key,
  or a research area without its `##` heading, stops `npm run build` and names the page. Fix the frontmatter; the error is not a code bug.
- **"Current" projects are fixed at build time.** The start page compares `runtime.end` with the build date, so a
  project that ends drops off only with the next deploy.
- **The privacy policy describes GitHub Pages hosting.** If you serve the site from the Docker image on your own server,
  update `src/privacy.md` to describe that server's logs.

## Contributing

Before starting to work on a pull request, please review the guidelines for
[contributing](./CONTRIBUTING.md) and the [code of conduct](./CODE_OF_CONDUCT.md).

### Fork Workflow

1. **Fork** the repository on GitHub (click the **Fork** button on the repo page).
   This creates a personal copy under `https://github.com/<your-username>/homepage`.

2. **Clone** your fork locally:

```shell
git clone https://github.com/<your-username>/homepage
cd homepage
```

3. **Add the upstream remote.** This points to the original repository so you can
   pull in new changes later. You only need to do this once:

```shell
git remote add upstream https://github.com/KohlbacherLab/homepage.git
```

You can verify the remotes are set up correctly:

```shell
git remote -v
# origin    https://github.com/<your-username>/homepage.git (fetch)
# origin    https://github.com/<your-username>/homepage.git (push)
# upstream  https://github.com/KohlbacherLab/homepage.git (fetch)
# upstream  https://github.com/KohlbacherLab/homepage.git (push)
```

- `origin` — your fork (you push here)
- `upstream` — the original repository (you pull from here)

4. **Install dependencies** and start developing:

```shell
npm ci
npm run dev
```

5. **Create a feature branch** off master:

```shell
git checkout -b my-feature
```

6. Make your changes, then **commit**:

```shell
git add .
git commit -m "feat: describe your change"
```

7. **Push** your branch to your fork:

```shell
git push -u origin my-feature
```

8. **Open a pull request** on GitHub from your fork's branch to `KohlbacherLab/homepage:master`.

### Keeping Your Fork Up to Date

Update your local master with the latest upstream changes:

```shell
git checkout master
git fetch upstream
git merge upstream/master
git push origin master
```

Sync your feature branch with the updated master:

```shell
git checkout my-feature
git rebase master
```

If there are conflicts, resolve them in the affected files, then:

```shell
git add .
git rebase --continue
```

After rebasing, force-push your branch:

```shell
git push --force-with-lease
```

## License

Made with 💚

Published under [MIT](./LICENSE).
