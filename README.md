# Homepage

[![Deploy](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml/badge.svg)](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml)

[VitePress](https://vitepress.dev/)-powered academic website for the [KohlbacherLab](https://kohlbacherlab.org) group at the University of Tubingen. Built with [Vue.js](https://vuejs.org/) and deployed to [kohlbacherlab.org](https://kohlbacherlab.org) via GitHub Pages.

**Table of Contents**

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Recipes](#recipes)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

> **Note**
>
> Please read the [Contributing](#contributing) section before making changes.

**Prerequisites:** [Node.js](https://nodejs.org/) >= 20.0.0

1. Clone the repository

```shell
git clone https://github.com/KohlbacherLab/homepage
cd homepage
```

2. Install dependencies

```shell
npm ci
```

3. Start the dev server (with hot module replacement)

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

Before starting to work on a pull request, it is important to review the guidelines for
[contributing](./CONTRIBUTING.md) and the [code of conduct](./CODE_OF_CONDUCT.md).
These guidelines will help to ensure that contributions are made effectively and are accepted.

## License

Made with 💚

Published under [MIT](./LICENSE).
