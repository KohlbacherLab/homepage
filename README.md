# Homepage

[![Deploy](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml/badge.svg)](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml)

[VitePress](https://vitepress.dev/)-powered academic website for the [KohlbacherLab](https://kohlbacherlab.org) group at the University of Tubingen. Built with [Vue.js](https://vuejs.org/) and deployed to [kohlbacherlab.org](https://kohlbacherlab.org) via GitHub Pages.

**Table of Contents**

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Recipes](#recipes)
- [Contributing](#contributing)
  - [Fork Workflow](#fork-workflow)
  - [Keeping Your Fork Up to Date](#keeping-your-fork-up-to-date)
- [License](#license)

## Getting Started

> **Note**
>
> This project uses a fork-based workflow. See the [Contributing](#contributing) section
> for how to fork, clone, and submit changes.

**Prerequisites:** [Node.js](https://nodejs.org/) >= 20.0.0

1. Install dependencies

```shell
npm ci
```

2. Start the dev server (with hot module replacement)

```shell
npm run dev
```

## Scripts

| Command              | Description                              |
|----------------------|------------------------------------------|
| `npm run dev`        | Start local dev server with HMR          |
| `npm run build`      | Build the static site                    |
| `npm run typecheck`  | Run type checking with `vue-tsc`         |
| `npm run lint`       | Lint source files with ESLint            |
| `npm run lint:fix`   | Lint and auto-fix source files           |

## Recipes

The following recipes help you create and manage content on the homepage.
For general page editing, refer to the [VitePress documentation](https://vitepress.dev/).

### Person

To add a new person, create a file in `src/.vitepress/data/persons/` following the naming pattern `<lastname>-<firstname>.mjs`.

Use existing person files as reference. A minimal example:

```ts
import { definePerson } from '../../index.ts';

export default definePerson({
    name: 'Peter Placzek',
    role: 'Researcher',
    avatar: 'https://www.github.com/tada5hi.png',
    email: 'peter.placzek@medizin.uni-tuebingen.de',
    phone: '+49 7071 29 84309',
    address: 'Sand 14, Room A301, Tubingen, 72076',
    team: 'tbi',
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

Since person data files are processed at build time, the dev server must be restarted after changes.

#### Structure

**Person**

```ts
/**
 * Represents a team member with their personal and professional information.
 */
interface Person {
    /** The full name of the person. */
    name: string;

    /** The professional role (e.g., 'Researcher', 'Professor'). */
    role?: string;

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
