# Homepage 📖

[![Deploy](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml/badge.svg)](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml)

**Table of Contents**

- [Getting Started](#getting-started)
- [Recipes](#recipes)
- [Contributing](#contributing)
- [License](#license)

This repository contains a homepage based on [vitepress](https://vitepress.dev/) and customized
with [Vue.js](https://vuejs.org/).

The homepage is hosted
on [GitHub Pages](https://KohlbacherLab.github.io/homepage/)

## Getting Started

> 📝 **Notice**
> 
> Please read the [Contributing](#contributing) section and the associated instructions
> before you start making changes to the source code.

1. Fork/Clone the Repository

```shell
git clone https://github.com/KohlbacherLab/homepage
```
2. Install Node.js

[https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)

3. Install dependencies

```shell
npm i
```

4. Run docs generation with Hot Module Replacement (HMR):

```shell
npm run dev
```

## Recipes
The following recipes are intended to help you create and manage certain content on the homepage.
These recipes do not include concepts which are already covered in the [vitepress](https://vitepress.dev/) documentation.

### Person
To create a new person, navigate to the `src/.vitepress/data/persons` folder using the console or 
the IDE (e.g. WebStorm or VSCode).
A file with the following pattern should be created there: `<lastname>-<firstname>.mjs`.

The content can be created in the same way as the existing persons.

The content of such a file must follow a specific [structure](#structure) and 
could look like this, for example:

```ts
import { definePerson } from "../..";

export default definePerson({
    name: 'Peter Placzek',
    role: 'Researcher',
    avatar: 'https://www.github.com/tada5hi.png',
    email: 'peter.placzek@medizin.uni-tuebingen.de',
    phone: '+49 7071 29 84309',
    address: 'Schaffhausenstraße 77, Raum 2.105, Tübingen, 72072',
    team: 'tbi',
    socialLinks: [
        { icon: 'github', link: 'https://github.com/tada5hi' },
        { icon: 'twitter', link: 'https://twitter.com/tada5hi' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/peter-placzek-047a74210/' },
    ],
    interests: [
        'Personalized Medicine',
        'Privacy',
        'Security'
    ],
    education: [
        {
            year: [2002, 2006],
            value: 'Grundschule Pliezhausen'
        },
        // ...
    ],
    awards: [
        {
            year: 2020,
            value: 'xxx'
        }
    ],
    biography: [
        { 
            year: [2000, 2005],
            value: 'xxx'
        }
    ]
});
```

Since the files are in the persons folder on build time and generally not included in the hot module replacement (hmr) process,
the application must be restarted after changes have been made.

#### Structure

**Person**

```ts

export interface Person {
    /**
     * The full name of the person.
     * e.g., Oliver Kohlbacher
     */
    name: string,

    /**
     * The professional role of the person.
     * e.g., Researcher, Professor, PhD, etc.
     */
    role?: string,

    /**
     * URL to the person's avatar image. 
     * Can be absolute or relative.
     */
    avatar?: string,

    /**
     * A short description or bio of the person.
     */
    description?: string,

    /**
     * A list of the person's social media links.
     */
    socialLinks?: DefaultTheme.SocialLink[],

    /**
     * The person's address.
     * Can be a string or an array of strings for multiple addresses.
     */
    address?: string | string[],

    /**
     * The person's email address.
     */
    email?: string,

    /**
     * The person's phone number.
     * Can be a string or an array for multiple phone numbers.
     */
    phone?: string | string[],

    /**
     * The team or teams the person is part of.
     * e.g., "tbi" or "abi"
     */
    team: string | string[],

    /**
     * The person's educational background, 
     * represented as an array of history entries.
     */
    education?: HistoryEntry[],

    /**
     * Awards or recognitions the person has received, 
     * represented as an array of history entries.
     */
    awards?: HistoryEntry[],

    /**
     * A detailed biography of the person,
     * represented as an array of history entries.
     */
    biography?: HistoryEntry[],

    /**
     * A list of the person's professional
     * or personal interests.
     */
    interests?: string[]
}
```

**HistoryEntry**
```ts
type HistoryEntry = {
    year: number | [number, number],
    value: string
}
```

**SocialLink**
```ts
 type SocialLink = {
    icon: string,
    link: string,
    ariaLabel?: strin
}
```

## Contributing

Before starting to work on a pull request, it is important to review the guidelines for
[contributing](./CONTRIBUTING.md) and the [code of conduct](./CODE_OF_CONDUCT.md).
These guidelines will help to ensure that contributions are made effectively and are accepted.

## License

Made with 💚

Published under [MIT](./LICENSE).
