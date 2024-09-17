# Homepage 📖

[![Deploy](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml/badge.svg)](https://github.com/KohlbacherLab/homepage/actions/workflows/main.yml)

This repository contains a homepage based on [vitepress](https://vitepress.dev/) and customized
with [Vue.js](https://vuejs.org/).

The homepage is hosted
on [GitHub Pages](https://KohlbacherLab.github.io/homepage/)

## Contributing

1. Clone Repository

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
To create a new person, navigate to the `src/.vitepress/data/persons` folder using the console or the IDE.
A file with the following schema should be created there: `<lastname>-<firstname>.mjs`.

The content can be created in the same way as the existing persons.
The content of such a file could look like this, for example:

```ts
import { TeamID } from "../../domains";
import { definePerson } from "../../domains";

export default definePerson({
    avatar: 'https://www.github.com/tada5hi.png',
    name: 'Peter Placzek',
    team: TeamID.TBI,
    title: 'Researcher',
    links: [
        { icon: 'github', link: 'https://github.com/tada5hi' },
        { icon: 'twitter', link: 'https://twitter.com/tada5hi' },
        { icon: 'linkedin', link: 'https://www.linkedin.com/in/peter-placzek-047a74210/' },
    ],
});
```


