# Site Redesign Part 1 (Foundation + Start Page) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the markdown start page with a hero-style landing page, introduce brand tokens and a site-wide footer, and move project/software/research metadata into frontmatter.

**Architecture:** Pure TypeScript domain functions (unit-tested with `node:test`) turn frontmatter and person/BibTeX data into view models. VitePress data loaders (`createContentLoader`) expose them at build time. `KHome*` Vue sections render them with Tailwind utilities inside a `vp-raw` root. VitePress chrome is adjusted only through CSS variables, `pageClass` and the `layout-bottom` slot of a thin `theme/Layout.vue`.

**Tech Stack:** VitePress 1.6, Vue 3 (`defineComponent` + `<script lang="ts">`), Tailwind CSS v4 with `@vuecs/theme-tailwind`, FontAwesome 7, `@retorquere/bibtex-parser`, Node's built-in test runner.

**Spec:** `.agents/plans/001-site-redesign.md` (part 1). Read it first: it holds the design decisions and exact copy.

## Global Constraints

- Branch: `feat/redesign-home`. Conventional Commits. **No `Co-Authored-By` or any other Claude attribution** in commits or PRs.
- Node >= 22 (CI runs Node 22). No new npm dependencies.
- Every new `.ts` file starts with the copyright block below; every new `.vue` file with the HTML-comment variant. Year: 2026.
  ```ts
  /*
   * Copyright (c) 2026.
   * Author Peter Placzek (tada5hi)
   * For the full copyright and license information,
   * view the LICENSE file that was distributed with this source code.
   */
  ```
  ```html
  <!--
    - Copyright (c) 2026.
    - Author Peter Placzek (tada5hi)
    - For the full copyright and license information,
    - view the LICENSE file that was distributed with this source code.
    -->
  ```
  In the code below, "(with copyright header)" and a leading `<!-- copyright header -->` line both mean: put the
  matching block above at the top of the file.
- 4-space indentation, ESM, `.ts` extensions in relative TS imports (as the existing domain code does).
- Internal links rendered through `VPLink` are normalized to `.html` (no `cleanUrls`): `/projects` becomes
  `/projects.html`, `/team?group=abi` becomes `/team.html?group=abi`. Browser checks select links accordingly.
- Components: `K` prefix, `defineComponent` + `<script lang="ts">`. Page-level roots carry `vp-raw`.
- **Client code (anything under `components/` or `theme/`) imports runtime values from the concrete domain file** (e.g. `../../domains/team/select.ts`), never from `domains/index.ts`: the index re-exports `person/read.ts`, which pulls `node:fs` and `locter` into the browser bundle. `import type` from the index is fine.
- Tailwind only scans `src/.vitepress/components` and `node_modules/@vuecs`: utility classes may only appear there (not in `theme/Layout.vue`, not in markdown).
- VitePress base/doc/component CSS is unlayered: anything that must beat it (VitePress variables, nav overrides, rules at the 960px VitePress breakpoint) goes in the **unlayered** part at the end of `theme/style.css`.
- Never use the Tailwind `container` utility. Use standard breakpoints (`sm/md/lg/xl`) only.
- vuecs radius tokens: `rounded-sm` = 2px, `rounded-md` = 6px, `rounded-xl` = 12px. Use arbitrary values (`rounded-[16px]`) where the design needs other radii.
- Hero and footer stay dark in both color modes; everything else follows `.dark`.
- Existing lint warnings that are not ours: `vue/no-v-html` (2×), `KTeamSwitch` required prop with default. `eslint .` also walks `.claude/worktrees/*`; ignore those paths.

## Verification Toolkit

Referenced by the tasks below.

**Dev server** (run in the background, keep it running across tasks):

```bash
npm run dev -- --port 5199 --strictPort
```

**Browser checks** use Chrome automation on `http://localhost:5199/`. Resizing the window does not change the viewport, so widths are tested with same-origin iframes. Paste this into the page (JavaScript tool) to define the helper, then call it:

```js
window.kFrames = async (path, widths = [390, 1200]) => {
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    const results = [];
    for (const width of widths) {
        const frame = document.createElement('iframe');
        frame.width = String(width);
        frame.height = '900';
        frame.src = path;
        document.body.append(frame);
        await new Promise((resolve) => { frame.onload = resolve; });
        await new Promise((resolve) => { setTimeout(resolve, 1000); });
        results.push({
            width,
            doc: frame.contentDocument,
            win: frame.contentWindow,
            overflow: frame.contentDocument.documentElement.scrollWidth > frame.contentWindow.innerWidth,
        });
    }
    return results;
};
```

**Color mode:** `document.querySelector('.VPSwitchAppearance').click()` toggles light/dark (works even when the switch sits in a collapsed menu).

**Final gates** (every task that touches code ends with them unless stated otherwise):

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: tests pass, typecheck exits 0, lint shows no errors (the pre-existing warnings are allowed), build completes.

---

### Task 1: Test runner and publication helpers

Adds `npm test` (Node's built-in runner, no dependency) and extracts the publication formatting from the components into a tested domain module. Fixes a latent bug: a single author rendered as `" & Smith, J."`.

**Files:**
- Modify: `package.json` (scripts)
- Modify: `.github/workflows/check.yml`
- Create: `src/.vitepress/domains/publication/format.ts`
- Create: `src/.vitepress/domains/publication/link.ts`
- Create: `src/.vitepress/domains/publication/index.ts`
- Create: `src/.vitepress/domains/publication/publication.spec.ts`
- Modify: `src/.vitepress/domains/index.ts`
- Modify: `src/.vitepress/components/publication/KPublication.vue`
- Modify: `src/.vitepress/components/publication/KPublicationTitle.vue`

**Interfaces:**
- Produces: `formatAuthors(entry: Entry): string`, `formatSource(entry: Entry): string` (`domains/publication/format.ts`), `getPublicationLink(entry: Entry): string | undefined` (`domains/publication/link.ts`). `Entry` is `import type { Entry } from '@retorquere/bibtex-parser'`.
- Produces: `npm test` running `src/.vitepress/domains/**/*.spec.ts`.

- [ ] **Step 1: Add the test script**

In `package.json`, add to `scripts` (after `"lint:fix"`):

```json
"test": "node --disable-warning=ExperimentalWarning --experimental-transform-types --test 'src/.vitepress/domains/**/*.spec.ts'",
```

`--experimental-transform-types` is needed because `domains/team/constants.ts` uses TypeScript enums.

- [ ] **Step 2: Run tests in CI**

In `.github/workflows/check.yml`, insert after the `Install` step:

```yaml
      - name: Test
        run: npm test
```

- [ ] **Step 3: Write the failing test**

Create `src/.vitepress/domains/publication/publication.spec.ts` (with copyright header):

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parse } from '@retorquere/bibtex-parser';
import { formatAuthors, formatSource } from './format.ts';
import { getPublicationLink } from './link.ts';

const { entries } = parse(`
@article{doe2024, title={A Test}, author={Doe, Jane and Roe, Richard and others}, journal={Nature}, volume={11}, number={1}, pages={663}, year={2024}, url={https://example.org/a}}
@article{pmid123, title={Solo}, author={Smith, John}, year={2023}}
@misc{bare, title={Bare}}
`);

const [full, solo, bare] = entries;

describe('formatAuthors', () => {
    it('joins last names with initials and drops "others"', () => {
        assert.equal(formatAuthors(full), 'Doe, J. & Roe, R.');
    });

    it('renders a single author without a leading ampersand', () => {
        assert.equal(formatAuthors(solo), 'Smith, J.');
    });

    it('returns an empty string without authors', () => {
        assert.equal(formatAuthors(bare), '');
    });
});

describe('formatSource', () => {
    it('renders year, journal, volume, number and pages', () => {
        assert.equal(formatSource(full), '(2024). Nature, 11 (1), pp. 663');
    });

    it('renders only the year when nothing else is known', () => {
        assert.equal(formatSource(solo), '(2023).');
    });

    it('returns an empty string without any source fields', () => {
        assert.equal(formatSource(bare), '');
    });
});

describe('getPublicationLink', () => {
    it('prefers PubMed for pmid keys', () => {
        assert.equal(getPublicationLink(solo), 'https://pubmed.ncbi.nlm.nih.gov/123');
    });

    it('falls back to the url field', () => {
        assert.equal(getPublicationLink(full), 'https://example.org/a');
    });

    it('returns undefined without pmid or url', () => {
        assert.equal(getPublicationLink(bare), undefined);
    });
});
```

- [ ] **Step 4: Run it to verify it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module '.../publication/format.ts'`.

- [ ] **Step 5: Implement the helpers**

`src/.vitepress/domains/publication/format.ts` (with copyright header):

```ts
import type { Entry } from '@retorquere/bibtex-parser';

/**
 * Format authors as "Doe, J., Roe, R. & Poe, P.". BibTeX "and others" is dropped.
 */
export function formatAuthors(entry: Entry) : string {
    const names = (entry.fields.author ?? [])
        .filter((author) => !!author.lastName && author.lastName !== 'others')
        .map((author) => (author.firstName ?
            `${author.lastName}, ${author.firstName.at(0)}.` :
            `${author.lastName}`));

    const last = names.pop();
    if (!last) {
        return '';
    }

    if (names.length === 0) {
        return last;
    }

    return `${names.join(', ')} & ${last}`;
}

/**
 * Format the source as "(2024). Nature, 11 (1), pp. 663".
 */
export function formatSource(entry: Entry) : string {
    const parts : string[] = [];
    if (entry.fields.journal) {
        parts.push(entry.fields.journal);
    }

    if (entry.fields.volume) {
        let text = entry.fields.volume;
        if (entry.fields.number) {
            text += ` (${entry.fields.number})`;
        }

        parts.push(text);
    }

    if (entry.fields.pages) {
        parts.push(`pp. ${entry.fields.pages}`);
    }

    const source = parts.join(', ');
    if (!entry.fields.year) {
        return source;
    }

    return source.length > 0 ?
        `(${entry.fields.year}). ${source}` :
        `(${entry.fields.year}).`;
}
```

`src/.vitepress/domains/publication/link.ts` (with copyright header):

```ts
import type { Entry } from '@retorquere/bibtex-parser';

const PUBMED_KEY = /pmid(\d+)/;

/**
 * Link target for a publication: PubMed for `pmid…` keys, otherwise the `url` field.
 */
export function getPublicationLink(entry: Entry) : string | undefined {
    const match = entry.key.match(PUBMED_KEY);
    if (match && match[1]) {
        return `https://pubmed.ncbi.nlm.nih.gov/${match[1]}`;
    }

    if ('url' in entry.fields && typeof entry.fields.url === 'string') {
        return entry.fields.url;
    }

    return undefined;
}
```

`src/.vitepress/domains/publication/index.ts` (with copyright header):

```ts
export * from './format.ts';
export * from './link.ts';
```

In `src/.vitepress/domains/index.ts`, add `export * from './publication/index.ts';` between the `person` and `team` exports.

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS, 9 tests.

- [ ] **Step 7: Use the helpers in the components**

`KPublication.vue`: replace the whole `setup(props) { ... }` body with:

```ts
    setup(props) {
        const entity = toRef(props, 'entity');

        const publication = computed(() => formatSource(entity.value));
        const authors = computed(() => formatAuthors(entity.value));

        return {
            publication,
            authors,
        };
    },
```

and add the import `import { formatAuthors, formatSource } from '../../domains/publication/format.ts';` below the `vue` import. The template stays unchanged.

`KPublicationTitle.vue`: replace the script's `setup` with:

```ts
    setup(props) {
        const link = computed(() => getPublicationLink(props.entity));

        return {
            link,
        };
    },
```

add `import { getPublicationLink } from '../../domains/publication/link.ts';`, and replace the three `<template v-if/v-else-if/v-else>` branches inside `<h5>` (after the `<i>` icon) with:

```vue
        <VCLink
            v-if="link"
            :href="link"
            target="_blank"
        >
            {{ entity.fields.title }}
        </VCLink>
        <template v-else>
            {{ entity.fields.title }}
        </template>
```

- [ ] **Step 8: Verify the publications page is unchanged**

Run the final gates. Then on `http://localhost:5199/publications`, check in the browser that the first entry's title links to `https://pubmed.ncbi.nlm.nih.gov/…` or its URL as before, and that the author line reads like `Pakkir Shah, A. & Walter, A. …`.

- [ ] **Step 9: Commit**

```bash
git add package.json .github/workflows/check.yml src/.vitepress/domains src/.vitepress/components/publication
git commit -m "refactor: extract publication formatting into domain helpers"
```

---

### Task 2: Project frontmatter and `KProjectMeta`

Moves funding and runtime of the 12 projects from bold lines into validated frontmatter. `<KProjectMeta />` renders the same text where the lines were.

**Files:**
- Create: `src/.vitepress/domains/content/frontmatter.ts`
- Create: `src/.vitepress/domains/content/index.ts`
- Create: `src/.vitepress/domains/content/frontmatter.spec.ts`
- Create: `src/.vitepress/domains/project/types.ts`
- Create: `src/.vitepress/domains/project/build.ts`
- Create: `src/.vitepress/domains/project/select.ts`
- Create: `src/.vitepress/domains/project/format.ts`
- Create: `src/.vitepress/domains/project/index.ts`
- Create: `src/.vitepress/domains/project/project.spec.ts`
- Modify: `src/.vitepress/domains/index.ts`
- Create: `src/.vitepress/components/project/KProjectMeta.vue`
- Create: `src/.vitepress/components/project/index.ts`
- Modify: `src/.vitepress/components/index.ts`
- Modify: `src/.vitepress/theme/index.mjs`
- Modify: all 12 `src/projects/*.md` except `index.md`

**Interfaces:**
- Produces (`domains/content/frontmatter.ts`): `type Frontmatter = Record<string, unknown>`; `readString(input: Frontmatter, key: string, source: string): string`; `readOptionalString(input, key, source): string | undefined`; `readDate(input, key, source): string` (`YYYY-MM-DD`); `readObject(input, key, source): Frontmatter`; `readList(input, key, source): Frontmatter[]`. All throw `Error` with a message starting with `${source}: frontmatter "${key}"`.
- Produces (`domains/project/types.ts`): `ProjectFunding { funder: string, reference?: string }`, `ProjectRuntime { start: string, end: string }`, `Project { url, title, name, website?, funding: ProjectFunding[], runtime: ProjectRuntime, featured: boolean }`.
- Produces: `buildProject(url: string, frontmatter: Frontmatter): Project` (`build.ts`); `compareProjectsByStart(a: Project, b: Project): number`, `isProjectRunning(project: Project, now: Date): boolean`, `selectFeaturedProjects(projects: Project[], now: Date, limit?: number): Project[]` (`select.ts`); `formatRuntime(runtime): string` ("01.10.2020 - 31.12.2028"), `formatRuntimeYears(runtime): string` ("2020 – 2028"), `formatFunding(funding): string` (`format.ts`).
- Produces: globally registered `<KProjectMeta />`.

- [ ] **Step 1: Record the current project meta text (baseline)**

```bash
npm run build
mkdir -p .temp
node -e '
const fs = require("node:fs");
const dir = "src/.vitepress/dist/projects";
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".html") && f !== "index.html").sort()) {
    const html = fs.readFileSync(`${dir}/${file}`, "utf8");
    const m = html.match(/Funding:<\/strong>\s*([^<]*?)\s*<br>\s*<strong>Project runtime:<\/strong>\s*([^<]*?)\s*<\/p>/);
    console.log(file, "|", m ? `${m[1]} | ${m[2]}` : "MISSING");
}' > .temp/project-meta-before.txt
cat .temp/project-meta-before.txt
```

Expected: 12 lines, none `MISSING`. Keep this command; Step 12 runs it again.

- [ ] **Step 2: Write the failing frontmatter tests**

`src/.vitepress/domains/content/frontmatter.spec.ts` (with copyright header):

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
    readDate,
    readList,
    readObject,
    readOptionalString,
    readString,
} from './frontmatter.ts';

describe('readString', () => {
    it('returns trimmed strings', () => {
        assert.equal(readString({ title: ' GHGA ' }, 'title', 'a.md'), 'GHGA');
    });

    it('throws for missing or empty values', () => {
        assert.throws(() => readString({}, 'title', 'a.md'), /^Error: a\.md: frontmatter "title"/);
        assert.throws(() => readString({ title: '  ' }, 'title', 'a.md'), /non-empty string/);
    });
});

describe('readOptionalString', () => {
    it('returns undefined for missing values', () => {
        assert.equal(readOptionalString({}, 'website', 'a.md'), undefined);
    });

    it('validates present values', () => {
        assert.throws(() => readOptionalString({ website: 3 }, 'website', 'a.md'), /"website"/);
    });
});

describe('readDate', () => {
    it('accepts quoted ISO dates', () => {
        assert.equal(readDate({ start: '2020-10-01' }, 'start', 'a.md'), '2020-10-01');
    });

    it('rejects unquoted YAML dates and other formats', () => {
        assert.throws(() => readDate({ start: new Date('2020-10-01') }, 'start', 'a.md'), /quoted date string/);
        assert.throws(() => readDate({ start: '01.10.2020' }, 'start', 'a.md'), /quoted date string/);
    });
});

describe('readObject', () => {
    it('returns objects and rejects lists', () => {
        assert.deepEqual(readObject({ runtime: { start: 'x' } }, 'runtime', 'a.md'), { start: 'x' });
        assert.throws(() => readObject({ runtime: [] }, 'runtime', 'a.md'), /must be an object/);
    });
});

describe('readList', () => {
    it('returns lists of objects', () => {
        assert.deepEqual(readList({ funding: [{ funder: 'DFG' }] }, 'funding', 'a.md'), [{ funder: 'DFG' }]);
    });

    it('rejects empty lists and non-object items', () => {
        assert.throws(() => readList({ funding: [] }, 'funding', 'a.md'), /non-empty list/);
        assert.throws(() => readList({ funding: ['DFG'] }, 'funding', 'a.md'), /"funding\[0\]" must be an object/);
    });
});
```

- [ ] **Step 3: Write the failing project tests**

`src/.vitepress/domains/project/project.spec.ts` (with copyright header):

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildProject } from './build.ts';
import { formatFunding, formatRuntime, formatRuntimeYears } from './format.ts';
import { isProjectRunning, selectFeaturedProjects } from './select.ts';
import type { Project } from './types.ts';

function project(title: string, start: string, end: string, featured = true) : Project {
    return {
        url: `/projects/${title}.html`,
        title,
        name: title,
        funding: [{ funder: 'DFG' }],
        runtime: { start, end },
        featured,
    };
}

describe('buildProject', () => {
    it('maps valid frontmatter', () => {
        const result = buildProject('/projects/ghga.html', {
            title: 'GHGA',
            name: 'German Human Genome-Phenome Archive',
            website: 'https://ghga.de',
            funding: [{ funder: 'DFG', reference: 'funding number: 441914366' }],
            runtime: { start: '2020-10-01', end: '2028-12-31' },
            featured: true,
        });

        assert.deepEqual(result, {
            url: '/projects/ghga.html',
            title: 'GHGA',
            name: 'German Human Genome-Phenome Archive',
            website: 'https://ghga.de',
            funding: [{ funder: 'DFG', reference: 'funding number: 441914366' }],
            runtime: { start: '2020-10-01', end: '2028-12-31' },
            featured: true,
        });
    });

    it('defaults featured to false and allows funders without reference', () => {
        const result = buildProject('/projects/x.html', {
            title: 'X',
            name: 'X',
            funding: [{ funder: 'Centre for Genomic Regulation (CRG)' }],
            runtime: { start: '2019-01-01', end: '2022-12-31' },
        });

        assert.equal(result.featured, false);
        assert.equal(result.website, undefined);
        assert.deepEqual(result.funding, [{ funder: 'Centre for Genomic Regulation (CRG)', reference: undefined }]);
    });

    it('names the file and key in errors', () => {
        assert.throws(
            () => buildProject('/projects/x.html', { title: 'X', funding: [{ funder: 'DFG' }], runtime: { start: '2019-01-01', end: '2022-12-31' } }),
            /^Error: \/projects\/x\.html: frontmatter "name"/,
        );
    });
});

describe('isProjectRunning', () => {
    it('treats the end date as inclusive', () => {
        const item = project('a', '2020-01-01', '2028-12-31');
        assert.equal(isProjectRunning(item, new Date('2028-12-31T12:00:00')), true);
        assert.equal(isProjectRunning(item, new Date('2029-01-01T00:00:01')), false);
    });
});

describe('selectFeaturedProjects', () => {
    it('keeps featured running projects, newest start first, limited', () => {
        const now = new Date('2026-09-17T12:00:00');
        const result = selectFeaturedProjects([
            project('old', '2017-10-01', '2022-03-31'),
            project('ghga', '2020-10-01', '2028-12-31'),
            project('hidden', '2024-01-01', '2028-12-31', false),
            project('pm4onco', '2023-05-01', '2027-04-30'),
            project('privateaim', '2023-04-01', '2027-03-31'),
        ], now, 2);

        assert.deepEqual(result.map((item) => item.title), ['pm4onco', 'privateaim']);
    });
});

describe('format', () => {
    it('formats runtime as German dates and as years', () => {
        const runtime = { start: '2020-10-01', end: '2028-12-31' };
        assert.equal(formatRuntime(runtime), '01.10.2020 - 31.12.2028');
        assert.equal(formatRuntimeYears(runtime), '2020 – 2028');
    });

    it('joins funders with their references', () => {
        assert.equal(
            formatFunding([
                { funder: 'EU', reference: 'funding number: H2020-INFRAIA-2018-1' },
                { funder: 'Centre for Genomic Regulation (CRG)' },
            ]),
            'EU (funding number: H2020-INFRAIA-2018-1) and Centre for Genomic Regulation (CRG)',
        );
    });
});
```

- [ ] **Step 4: Run them to verify they fail**

Run: `npm test`
Expected: FAIL with `Cannot find module '.../content/frontmatter.ts'` and `.../project/build.ts`.

- [ ] **Step 5: Implement the frontmatter readers**

`src/.vitepress/domains/content/frontmatter.ts` (with copyright header):

```ts
export type Frontmatter = Record<string, unknown>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isObject(value: unknown) : value is Frontmatter {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function readString(input: Frontmatter, key: string, source: string) : string {
    const value = input[key];
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`${source}: frontmatter "${key}" must be a non-empty string.`);
    }

    return value.trim();
}

export function readOptionalString(input: Frontmatter, key: string, source: string) : string | undefined {
    if (typeof input[key] === 'undefined' || input[key] === null) {
        return undefined;
    }

    return readString(input, key, source);
}

export function readDate(input: Frontmatter, key: string, source: string) : string {
    const value = input[key];
    if (typeof value !== 'string' || !ISO_DATE.test(value)) {
        throw new Error(`${source}: frontmatter "${key}" must be a quoted date string like '2024-01-31'.`);
    }

    return value;
}

export function readObject(input: Frontmatter, key: string, source: string) : Frontmatter {
    const value = input[key];
    if (!isObject(value)) {
        throw new Error(`${source}: frontmatter "${key}" must be an object.`);
    }

    return value;
}

export function readList(input: Frontmatter, key: string, source: string) : Frontmatter[] {
    const value = input[key];
    if (!Array.isArray(value) || value.length === 0) {
        throw new Error(`${source}: frontmatter "${key}" must be a non-empty list.`);
    }

    return value.map((item, index) => {
        if (!isObject(item)) {
            throw new Error(`${source}: frontmatter "${key}[${index}]" must be an object.`);
        }

        return item;
    });
}
```

`src/.vitepress/domains/content/index.ts`: `export * from './frontmatter.ts';` (with copyright header).

- [ ] **Step 6: Implement the project domain**

`src/.vitepress/domains/project/types.ts` (with copyright header):

```ts
export type ProjectFunding = {
    /**
     * The funding body.
     *
     * @example 'BMFTR'
     */
    funder: string,

    /**
     * The original reference text, rendered in parentheses.
     *
     * @example 'funding number: 01ZZ2316A'
     */
    reference?: string
};

export type ProjectRuntime = {
    /**
     * ISO date (YYYY-MM-DD).
     */
    start: string,

    /**
     * ISO date (YYYY-MM-DD), inclusive.
     */
    end: string
};

export type Project = {
    /**
     * Page URL as produced by createContentLoader.
     */
    url: string,

    /**
     * Short name.
     *
     * @example 'GHGA'
     */
    title: string,

    /**
     * Full name.
     *
     * @example 'German Human Genome-Phenome Archive'
     */
    name: string,

    website?: string,

    funding: ProjectFunding[],

    runtime: ProjectRuntime,

    /**
     * Candidate for the start page while the project is running.
     */
    featured: boolean
};
```

`src/.vitepress/domains/project/build.ts` (with copyright header):

```ts
import type { Frontmatter } from '../content/frontmatter.ts';
import {
    readDate,
    readList,
    readObject,
    readOptionalString,
    readString,
} from '../content/frontmatter.ts';
import type { Project } from './types.ts';

export function buildProject(url: string, frontmatter: Frontmatter) : Project {
    const runtime = readObject(frontmatter, 'runtime', url);

    return {
        url,
        title: readString(frontmatter, 'title', url),
        name: readString(frontmatter, 'name', url),
        website: readOptionalString(frontmatter, 'website', url),
        funding: readList(frontmatter, 'funding', url).map((item) => ({
            funder: readString(item, 'funder', url),
            reference: readOptionalString(item, 'reference', url),
        })),
        runtime: {
            start: readDate(runtime, 'start', url),
            end: readDate(runtime, 'end', url),
        },
        featured: frontmatter.featured === true,
    };
}
```

`src/.vitepress/domains/project/select.ts` (with copyright header):

```ts
import type { Project } from './types.ts';

export function compareProjectsByStart(a: Project, b: Project) : number {
    return b.runtime.start.localeCompare(a.runtime.start);
}

export function isProjectRunning(project: Project, now: Date) : boolean {
    return now.getTime() <= new Date(`${project.runtime.end}T23:59:59.999`).getTime();
}

export function selectFeaturedProjects(projects: Project[], now: Date, limit = 4) : Project[] {
    return projects
        .filter((project) => project.featured && isProjectRunning(project, now))
        .sort(compareProjectsByStart)
        .slice(0, limit);
}
```

`src/.vitepress/domains/project/format.ts` (with copyright header):

```ts
import type { ProjectFunding, ProjectRuntime } from './types.ts';

function formatDate(value: string) : string {
    const [year, month, day] = value.split('-');
    return `${day}.${month}.${year}`;
}

export function formatRuntime(runtime: ProjectRuntime) : string {
    return `${formatDate(runtime.start)} - ${formatDate(runtime.end)}`;
}

export function formatRuntimeYears(runtime: ProjectRuntime) : string {
    return `${runtime.start.slice(0, 4)} – ${runtime.end.slice(0, 4)}`;
}

export function formatFunding(funding: ProjectFunding[]) : string {
    return funding
        .map((item) => (item.reference ? `${item.funder} (${item.reference})` : item.funder))
        .join(' and ');
}
```

`src/.vitepress/domains/project/index.ts` (with copyright header):

```ts
export * from './build.ts';
export * from './format.ts';
export * from './select.ts';
export * from './types.ts';
```

In `src/.vitepress/domains/index.ts`, the exports become (alphabetical):

```ts
export * from './content/index.ts';
export * from './history/index.ts';
export * from './person/index.ts';
export * from './project/index.ts';
export * from './publication/index.ts';
export * from './team/index.ts';
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all suites from Tasks 1 and 2).

- [ ] **Step 8: Create `KProjectMeta`**

`src/.vitepress/components/project/KProjectMeta.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { useData } from 'vitepress';
import { computed, defineComponent } from 'vue';
import { buildProject } from '../../domains/project/build.ts';
import { formatFunding, formatRuntime } from '../../domains/project/format.ts';

export default defineComponent({
    setup() {
        const { frontmatter, page } = useData();

        const project = computed(() => buildProject(page.value.relativePath, frontmatter.value));
        const funding = computed(() => formatFunding(project.value.funding));
        const runtime = computed(() => formatRuntime(project.value.runtime));

        return {
            funding,
            runtime,
        };
    },
});
</script>
<template>
    <p>
        <strong>Funding:</strong> {{ funding }}<br>
        <strong>Project runtime:</strong> {{ runtime }}
    </p>
</template>
```

It renders inside the doc layout (no `vp-raw`), so it keeps the VitePress text styles of the surrounding markdown.

`src/.vitepress/components/project/index.ts` (with copyright header): `export { default as KProjectMeta } from './KProjectMeta.vue';`

`src/.vitepress/components/index.ts`: add `export * from './project/index.ts';` after the `person` export.

- [ ] **Step 9: Register it globally**

`src/.vitepress/theme/index.mjs` becomes:

```js
import vuecs from '@vuecs/core';
import pagination from '@vuecs/pagination';
import tailwind from '@vuecs/theme-tailwind';
import DefaultTheme from 'vitepress/theme';
import '@fortawesome/fontawesome-free/css/all.css';
import KProjectMeta from '../components/project/KProjectMeta.vue';
import './style.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // Used in src/projects/*.md, so lab members don't need a script block.
        app.component('KProjectMeta', KProjectMeta);

        app.use(vuecs, {
            themes: [tailwind()],
            overrides: {
                elements: {
                    pagination: {
                        defaultVariants: {
                            variant: 'soft',
                            size: 'sm',
                        },
                    },
                },
            },
        });
        app.use(pagination);
    },
};
```

- [ ] **Step 10: Add frontmatter to the 12 project pages**

Insert each block at **line 1** of the file (before any `<script setup>`). Dates and references are quoted on purpose.

`src/projects/a4b.md`:

```yaml
---
title: A4B
name: Analytics for Biologics
website: https://cordis.europa.eu/project/id/765502
funding:
  - funder: EU
    reference: 'Grant agreement ID: 765502'
runtime:
  start: '2017-10-01'
  end: '2022-03-31'
---
```

`src/projects/dekcd.md`:

```yaml
---
title: de.KCD
name: German Competence Center Cloud Technologies for Data Management and Processing
website: https://datenkompetenz.cloud/en/
funding:
  - funder: BMFTR
    reference: 'funding number: 16DKZ2072B'
runtime:
  start: '2023-12-01'
  end: '2026-11-30'
---
```

`src/projects/denbi.md`:

```yaml
---
title: de.NBI
name: German Network for Bioinformatics Infrastructure
website: https://www.denbi.de/
funding:
  - funder: BMFTR
    reference: 'funding number: W-de.NBI-022'
runtime:
  start: '2023-01-01'
  end: '2027-12-31'
featured: true
---
```

`src/projects/difuture.md`:

```yaml
---
title: DIFUTURE
name: Data Integration for Future Medicine
website: https://difuture.de
funding:
  - funder: BMFTR
    reference: 'funding number: 01ZZ2304C'
runtime:
  start: '2023-01-01'
  end: '2026-12-31'
---
```

`src/projects/epic-xs.md`:

```yaml
---
title: Epic-XS
name: European Proteomics Infrastructure Consortium providing Access
funding:
  - funder: EU
    reference: 'funding number: H2020-INFRAIA-2018-1'
  - funder: Centre for Genomic Regulation (CRG)
runtime:
  start: '2019-01-01'
  end: '2022-12-31'
---
```

`src/projects/eyematics.md`:

```yaml
---
title: EyeMatics
name: Treatment of eye diseases with interoperable medical informatics
website: https://www.medizininformatik-initiative.de/en/use-case-eyematics-treatment-eye-diseases-interoperable-medical-informatics
funding:
  - funder: BMFTR
    reference: 'funding number: 01ZZ2319G'
runtime:
  start: '2024-03-01'
  end: '2025-04-30'
---
```

`src/projects/gdi.md`:

```yaml
---
title: GDI
name: European Genomic Data Infrastructure
website: https://gdi.onemilliongenomes.eu/
funding:
  - funder: BMFTR
    reference: 'funding number: 03LW0309'
  - funder: EU
    reference: 'Proposal 101081813, DIGITAL-2021-CLOUD-AI-01-FEI-DS-GENOMICS'
runtime:
  start: '2022-11-01'
  end: '2026-10-31'
---
```

`src/projects/ghga.md`:

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

`src/projects/num-diz.md`:

```yaml
---
title: NUM-DIZ
name: Network of University Medicine – Data Integration Centres
website: https://www.netzwerk-universitaetsmedizin.de/en/research/num-diz
funding:
  - funder: BMFTR
    reference: 'funding number: 01KX2121'
runtime:
  start: '2023-01-01'
  end: '2025-06-30'
---
```

`src/projects/pcor-mii.md`:

```yaml
---
title: PCOR-MII
name: Patient-Centered Outcomes Research in the Medical Informatics Initiative
website: https://pcor-mii.de/eng/
funding:
  - funder: BMFTR
    reference: 'Funding number: 01ZZ2321J'
runtime:
  start: '2024-03-01'
  end: '2028-02-29'
---
```

`src/projects/pm4onco.md`:

```yaml
---
title: PM4Onco
name: Personalized Medicine for Oncology
website: https://pm4onco.de/en/
funding:
  - funder: BMFTR
    reference: 'funding number: 01ZZ2322C'
runtime:
  start: '2023-05-01'
  end: '2027-04-30'
featured: true
---
```

`src/projects/privateaim.md`:

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

- [ ] **Step 11: Replace the bold lines with the component**

```bash
for f in a4b dekcd denbi difuture epic-xs eyematics gdi ghga num-diz pcor-mii pm4onco privateaim; do
  perl -0pi -e 's/\*\*Funding:\*\*[^\n]*\n\*\*Project runtime:\*\*[^\n]*\n/<KProjectMeta \/>\n/' "src/projects/$f.md"
done
grep -c "KProjectMeta" src/projects/*.md
grep -l "\*\*Funding:\*\*\|\*\*Project runtime:\*\*" src/projects/*.md
```

Expected: `1` for each of the 12 files and `0` for `index.md`; the second `grep` prints nothing.

- [ ] **Step 12: Verify the rendered text is identical**

Run `npm run build`, then the `node -e` command from Step 1 with the output redirected to `.temp/project-meta-after.txt`, then:

```bash
diff .temp/project-meta-before.txt .temp/project-meta-after.txt && echo IDENTICAL
```

Expected: `IDENTICAL`. A build error of the form `…: frontmatter "…" must …` points at the page and key to fix.

- [ ] **Step 13: Final gates and commit**

Run the final gates.

```bash
git add src/.vitepress/domains src/.vitepress/components src/.vitepress/theme/index.mjs src/projects
git commit -m "feat: move project funding and runtime into frontmatter"
```

---

### Task 3: Software and research area frontmatter

**Files:**
- Create: `src/.vitepress/domains/software/types.ts`, `build.ts`, `select.ts`, `index.ts`, `software.spec.ts`
- Create: `src/.vitepress/domains/research/types.ts`, `build.ts`, `slugify.ts`, `index.ts`, `research.spec.ts`
- Modify: `src/.vitepress/domains/index.ts`
- Modify: `src/software/{claudio,dnpm-dip,flame,fred-2,open-ms,xlec}.md`
- Modify: `src/research/index.md`

**Interfaces:**
- Consumes: `Frontmatter`, `readString`, `readOptionalString`, `readList` from `domains/content/frontmatter.ts` (Task 2).
- Produces: `Software { url, title, summary, website?, repository?, featured: boolean }`; `buildSoftware(url: string, frontmatter: Frontmatter): Software`; `selectFeaturedSoftware(items: Software[], limit?: number): Software[]` (featured only, sorted by title, default limit 4).
- Produces: `ResearchArea { title, summary, icon, anchor }`; `slugify(value: string): string` (VitePress heading-anchor algorithm); `buildResearchAreas(source: string, frontmatter: Frontmatter): ResearchArea[]`.

- [ ] **Step 1: Write the failing tests**

`src/.vitepress/domains/software/software.spec.ts` (with copyright header):

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildSoftware } from './build.ts';
import { selectFeaturedSoftware } from './select.ts';
import type { Software } from './types.ts';

function software(title: string, featured = true) : Software {
    return {
        url: `/software/${title}.html`,
        title,
        summary: title,
        featured,
    };
}

describe('buildSoftware', () => {
    it('maps valid frontmatter', () => {
        assert.deepEqual(buildSoftware('/software/open-ms.html', {
            title: 'OpenMS',
            summary: 'Open-source software for mass spectrometry analysis.',
            website: 'https://www.openms.de',
            repository: 'https://github.com/OpenMS/OpenMS',
            featured: true,
        }), {
            url: '/software/open-ms.html',
            title: 'OpenMS',
            summary: 'Open-source software for mass spectrometry analysis.',
            website: 'https://www.openms.de',
            repository: 'https://github.com/OpenMS/OpenMS',
            featured: true,
        });
    });

    it('requires a summary', () => {
        assert.throws(() => buildSoftware('/software/x.html', { title: 'X' }), /"summary"/);
    });
});

describe('selectFeaturedSoftware', () => {
    it('keeps featured items sorted by title, limited', () => {
        const result = selectFeaturedSoftware([
            software('OpenMS'),
            software('XLEC', false),
            software('FLAME'),
            software('DNPM:DIP'),
        ], 2);

        assert.deepEqual(result.map((item) => item.title), ['DNPM:DIP', 'FLAME']);
    });
});
```

`src/.vitepress/domains/research/research.spec.ts` (with copyright header):

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildResearchAreas } from './build.ts';
import { slugify } from './slugify.ts';

describe('slugify', () => {
    it('matches VitePress heading anchors', () => {
        assert.equal(slugify('Computational Mass Spectrometry'), 'computational-mass-spectrometry');
        assert.equal(slugify('DNPM:DIP & Co.'), 'dnpm-dip-co');
        assert.equal(slugify('Café'), 'cafe');
        assert.equal(slugify('1st Area'), '_1st-area');
    });
});

describe('buildResearchAreas', () => {
    it('maps areas and derives anchors', () => {
        assert.deepEqual(buildResearchAreas('/research/', {
            areas: [
                { title: 'Personalized Medicine', summary: 'Data integration.', icon: 'fa-solid fa-heart-pulse' },
            ],
        }), [
            {
                title: 'Personalized Medicine',
                summary: 'Data integration.',
                icon: 'fa-solid fa-heart-pulse',
                anchor: 'personalized-medicine',
            },
        ]);
    });

    it('requires an icon', () => {
        assert.throws(
            () => buildResearchAreas('/research/', { areas: [{ title: 'A', summary: 'B' }] }),
            /^Error: \/research\/: frontmatter "icon"/,
        );
    });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npm test`
Expected: FAIL with `Cannot find module '.../software/build.ts'` and `.../research/build.ts`.

- [ ] **Step 3: Implement the software domain**

`src/.vitepress/domains/software/types.ts` (with copyright header):

```ts
export type Software = {
    /**
     * Page URL as produced by createContentLoader.
     */
    url: string,

    title: string,

    /**
     * One sentence for cards.
     */
    summary: string,

    website?: string,

    repository?: string,

    /**
     * Shown on the start page.
     */
    featured: boolean
};
```

`src/.vitepress/domains/software/build.ts` (with copyright header):

```ts
import type { Frontmatter } from '../content/frontmatter.ts';
import { readOptionalString, readString } from '../content/frontmatter.ts';
import type { Software } from './types.ts';

export function buildSoftware(url: string, frontmatter: Frontmatter) : Software {
    return {
        url,
        title: readString(frontmatter, 'title', url),
        summary: readString(frontmatter, 'summary', url),
        website: readOptionalString(frontmatter, 'website', url),
        repository: readOptionalString(frontmatter, 'repository', url),
        featured: frontmatter.featured === true,
    };
}
```

`src/.vitepress/domains/software/select.ts` (with copyright header):

```ts
import type { Software } from './types.ts';

export function selectFeaturedSoftware(items: Software[], limit = 4) : Software[] {
    return items
        .filter((item) => item.featured)
        .sort((a, b) => a.title.localeCompare(b.title))
        .slice(0, limit);
}
```

`src/.vitepress/domains/software/index.ts` (with copyright header):

```ts
export * from './build.ts';
export * from './select.ts';
export * from './types.ts';
```

- [ ] **Step 4: Implement the research domain**

`src/.vitepress/domains/research/types.ts` (with copyright header):

```ts
export type ResearchArea = {
    /**
     * Must match the `##` heading on the research page.
     */
    title: string,

    summary: string,

    /**
     * FontAwesome classes.
     *
     * @example 'fa-solid fa-chart-column'
     */
    icon: string,

    /**
     * Heading anchor on /research, derived from the title.
     */
    anchor: string
};
```

`src/.vitepress/domains/research/slugify.ts` (with copyright header):

```ts
// Same algorithm VitePress uses for heading anchors (@mdit-vue/shared).
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u001F]/g;
const SPECIAL = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g;
const COMBINING = /[\u0300-\u036F]/g;

export function slugify(value: string) : string {
    return value
        .normalize('NFKD')
        .replace(COMBINING, '')
        .replace(CONTROL, '')
        .replace(SPECIAL, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/^(\d)/, '_$1')
        .toLowerCase();
}
```

`src/.vitepress/domains/research/build.ts` (with copyright header):

```ts
import type { Frontmatter } from '../content/frontmatter.ts';
import { readList, readString } from '../content/frontmatter.ts';
import { slugify } from './slugify.ts';
import type { ResearchArea } from './types.ts';

export function buildResearchAreas(source: string, frontmatter: Frontmatter) : ResearchArea[] {
    return readList(frontmatter, 'areas', source).map((item) => {
        const title = readString(item, 'title', source);

        return {
            title,
            summary: readString(item, 'summary', source),
            icon: readString(item, 'icon', source),
            anchor: slugify(title),
        };
    });
}
```

`src/.vitepress/domains/research/index.ts` (with copyright header):

```ts
export * from './build.ts';
export * from './slugify.ts';
export * from './types.ts';
```

`src/.vitepress/domains/index.ts`: add `export * from './research/index.ts';` after `publication` and `export * from './software/index.ts';` after `research`.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Add frontmatter to the software pages**

Insert at **line 1** of each file (before any `<script setup>`).

`src/software/claudio.md`:

```yaml
---
title: Claudio
summary: Structural analysis, validation and modeling of protein cross-links.
repository: https://github.com/KohlbacherLab/CLAUDIO
---
```

`src/software/dnpm-dip.md`:

```yaml
---
title: 'DNPM:DIP'
summary: Data Integration Platform of the German Network for Personalized Medicine.
website: https://docs.dnpm-dip.net/
repository: https://github.com/dnpm-dip
featured: true
---
```

`src/software/flame.md`:

```yaml
---
title: FLAME
summary: Federated learning and analyses in medicine, the open-source core of PrivateAIM.
website: https://docs.privateaim.net/
repository: https://github.com/PrivateAim
featured: true
---
```

`src/software/fred-2.md`:

```yaml
---
title: Fred2
summary: Python framework for computational immunomics.
website: https://fred-2.github.io
repository: https://github.com/FRED-2/Fred2
featured: true
---
```

`src/software/open-ms.md`:

```yaml
---
title: OpenMS
summary: Open-source software for mass spectrometry analysis.
website: https://www.openms.de
repository: https://github.com/OpenMS/OpenMS
featured: true
---
```

`src/software/xlec.md`:

```yaml
---
title: XLEC
summary: Cross-linking data and evolutionary couplings for large-scale modeling of protein-protein interactions.
repository: https://github.com/KohlbacherLab/XLEC
---
```

- [ ] **Step 7: Add the research areas**

Insert at line 1 of `src/research/index.md`. The `title` values must stay identical to the `##` headings below.

```yaml
---
areas:
  - title: Computational Immunomics
    summary: MHC ligandomics, HLA typing and neoepitope discovery from mass spectrometry and NGS data.
    icon: fa-solid fa-shield-virus
  - title: Computational Mass Spectrometry
    summary: Algorithms and the OpenMS platform for high-throughput proteomics and metabolomics.
    icon: fa-solid fa-chart-column
  - title: Personalized Medicine
    summary: Data integration for molecular tumor boards across 26 university hospitals (DNPM).
    icon: fa-solid fa-heart-pulse
  - title: Structural Bioinformatics
    summary: Computer-aided drug design, cheminformatics and prediction of protein-protein complexes.
    icon: fa-solid fa-cubes
  - title: Translational Bioinformatics
    summary: Bridging molecular and clinical data, e.g. federated, privacy-preserving analytics with FLAME.
    icon: fa-solid fa-arrow-right-arrow-left
---
```

- [ ] **Step 8: Verify pages still render**

Run the final gates, then:

```bash
grep -o "<title>[^<]*" src/.vitepress/dist/software/open-ms.html src/.vitepress/dist/software/flame.html src/.vitepress/dist/research/index.html
```

Expected: `OpenMS | KohlbacherLab`, `FLAME | KohlbacherLab` (the frontmatter title now wins over the long H1) and the research page title unchanged. No frontmatter text appears in the page body (`grep -c "summary:" src/.vitepress/dist/software/*.html` prints `0` everywhere).

- [ ] **Step 9: Commit**

```bash
git add src/.vitepress/domains src/software src/research
git commit -m "feat: add software and research area frontmatter"
```

---

### Task 4: Team and contact helpers, group filter on the team page

**Files:**
- Create: `src/.vitepress/domains/person/avatar.ts`
- Modify: `src/.vitepress/domains/person/index.ts`
- Create: `src/.vitepress/domains/team/select.ts`
- Create: `src/.vitepress/domains/team/team.spec.ts`
- Modify: `src/.vitepress/domains/team/index.ts`
- Create: `src/.vitepress/domains/contact/constants.ts`, `src/.vitepress/domains/contact/index.ts`
- Modify: `src/.vitepress/domains/index.ts`
- Modify: `src/.vitepress/components/team/KTeam.vue`
- Modify: `src/.vitepress/components/contact/KContact.vue`

**Interfaces:**
- Produces: `DEFAULT_AVATAR = '/images/persons/default.png'`, `getPersonAvatar(person: Person): string` (`domains/person/avatar.ts`).
- Produces (`domains/team/select.ts`): `type PersonEntry = [string, Person]`; `isTeamMember(person: Person, team: string): boolean`; `selectActiveMembers(entries: PersonEntry[]): PersonEntry[]`; `selectTeamMembers(entries: PersonEntry[], team: string, leadSlug?: string): PersonEntry[]` (active members of the team, lead first, otherwise input order); `parseTeamQuery(search: string): TeamID.ABI | TeamID.TBI | undefined` (reads `?group=`).
- Produces (`domains/contact/constants.ts`): `LAB_ADDRESS { institution, building, street, city }`, `LAB_CONTACT { address: string[], phone: string, email: string }`.

- [ ] **Step 1: Write the failing tests**

`src/.vitepress/domains/team/team.spec.ts` (with copyright header):

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEFAULT_AVATAR, getPersonAvatar } from '../person/avatar.ts';
import type { Person } from '../person/types.ts';
import { TeamID } from './constants.ts';
import type { PersonEntry } from './select.ts';
import {
    isTeamMember,
    parseTeamQuery,
    selectActiveMembers,
    selectTeamMembers,
} from './select.ts';

function person(name: string, team: string | string[], extra: Partial<Person> = {}) : Person {
    return { name, team, ...extra };
}

const entries : PersonEntry[] = [
    ['a', person('A', TeamID.ABI)],
    ['b', person('B', TeamID.TBI)],
    ['lead', person('Lead', [TeamID.ABI, TeamID.TBI])],
    ['gone', person('Gone', TeamID.ABI, { inactive: true })],
];

describe('isTeamMember', () => {
    it('handles single and multiple teams', () => {
        assert.equal(isTeamMember(entries[0][1], TeamID.ABI), true);
        assert.equal(isTeamMember(entries[0][1], TeamID.TBI), false);
        assert.equal(isTeamMember(entries[2][1], TeamID.TBI), true);
    });
});

describe('selectActiveMembers', () => {
    it('drops inactive persons', () => {
        assert.deepEqual(selectActiveMembers(entries).map(([slug]) => slug), ['a', 'b', 'lead']);
    });
});

describe('selectTeamMembers', () => {
    it('returns active team members with the lead first', () => {
        assert.deepEqual(selectTeamMembers(entries, TeamID.ABI, 'lead').map(([slug]) => slug), ['lead', 'a']);
        assert.deepEqual(selectTeamMembers(entries, TeamID.TBI).map(([slug]) => slug), ['b', 'lead']);
    });
});

describe('parseTeamQuery', () => {
    it('accepts abi and tbi only', () => {
        assert.equal(parseTeamQuery('?group=abi'), TeamID.ABI);
        assert.equal(parseTeamQuery('?group=tbi'), TeamID.TBI);
        assert.equal(parseTeamQuery('?group=all'), undefined);
        assert.equal(parseTeamQuery(''), undefined);
    });
});

describe('getPersonAvatar', () => {
    it('falls back to the default avatar', () => {
        assert.equal(getPersonAvatar(person('A', TeamID.ABI, { avatar: '/a.png' })), '/a.png');
        assert.equal(getPersonAvatar(person('A', TeamID.ABI)), DEFAULT_AVATAR);
    });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npm test`
Expected: FAIL with `Cannot find module '.../person/avatar.ts'`.

- [ ] **Step 3: Implement**

`src/.vitepress/domains/person/avatar.ts` (with copyright header):

```ts
import type { Person } from './types.ts';

export const DEFAULT_AVATAR = '/images/persons/default.png';

export function getPersonAvatar(person: Person) : string {
    return person.avatar && person.avatar.length > 0 ?
        person.avatar :
        DEFAULT_AVATAR;
}
```

`src/.vitepress/domains/person/index.ts`: add `export * from './avatar.ts';` as the first export.

`src/.vitepress/domains/team/select.ts` (with copyright header):

```ts
import type { Person } from '../person/types.ts';
import { TeamID } from './constants.ts';

export type PersonEntry = [string, Person];

export function isTeamMember(person: Person, team: string) : boolean {
    return [person.team].flat().includes(team);
}

export function selectActiveMembers(entries: PersonEntry[]) : PersonEntry[] {
    return entries.filter(([, person]) => !person.inactive);
}

export function selectTeamMembers(entries: PersonEntry[], team: string, leadSlug?: string) : PersonEntry[] {
    const members = selectActiveMembers(entries)
        .filter(([, person]) => isTeamMember(person, team));

    return [
        ...members.filter(([slug]) => slug === leadSlug),
        ...members.filter(([slug]) => slug !== leadSlug),
    ];
}

export function parseTeamQuery(search: string) : TeamID.ABI | TeamID.TBI | undefined {
    const value = new URLSearchParams(search).get('group');
    if (value === TeamID.ABI || value === TeamID.TBI) {
        return value;
    }

    return undefined;
}
```

`src/.vitepress/domains/team/index.ts`: add `export * from './select.ts';` after the constants export.

`src/.vitepress/domains/contact/constants.ts` (with copyright header):

```ts
export const LAB_ADDRESS = {
    institution: 'University of Tübingen',
    building: 'Tübingen AI Research Building',
    street: 'Maria-von-Linden-Straße 6',
    city: '72076 Tübingen',
};

export const LAB_CONTACT = {
    address: [
        LAB_ADDRESS.institution,
        LAB_ADDRESS.building,
        LAB_ADDRESS.street,
        LAB_ADDRESS.city,
    ],
    phone: '+49 7071 29 70457',
    email: 'oliver.kohlbacher@uni-tuebingen.de',
};
```

`src/.vitepress/domains/contact/index.ts` (with copyright header): `export * from './constants.ts';`

`src/.vitepress/domains/index.ts`: add `export * from './contact/index.ts';` after `content`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Use the contact constants in `KContact`**

In `KContact.vue`, remove the `import type { ContactDetails } …` line, add `import { LAB_CONTACT } from '../../domains/contact/constants.ts';`, and replace `setup()` with:

```ts
    setup() {
        return { contact: LAB_CONTACT };
    },
```

- [ ] **Step 6: Add the group filter to `KTeam`**

In `KTeam.vue`, the script becomes:

```ts
import {
    computed,
    defineComponent,
    onMounted,
    ref,
} from 'vue';
import type { TeamID } from '../../domains/team/constants.ts';
import { TeamFilter } from '../../domains/team/constants.ts';
import { isTeamMember, parseTeamQuery } from '../../domains/team/select.ts';
import { data } from '../../data/team.data';
import KPageTitle from '../utilities/page-title/KPageTitle.vue';
import KTeamMembers from './KTeamMembers.vue';
import KTeamSwitch from './KTeamSwitch.vue';

export default defineComponent({
    components: {
        KPageTitle,
        KTeamMembers,
        KTeamSwitch,
    },
    setup() {
        const group = ref(TeamFilter.ACTIVE);
        const handlePicked = (value: TeamFilter) => {
            group.value = value;
        };

        // `?group=abi|tbi`, used by the start page. Read after mount: the query
        // is not available during SSR.
        const team = ref<TeamID | undefined>(undefined);
        onMounted(() => {
            team.value = parseTeamQuery(window.location.search);
        });

        const clearTeam = () => {
            team.value = undefined;
            window.history.replaceState(window.history.state, '', window.location.pathname);
        };

        const members = data;

        const items = computed(() => members
            .filter(([, member]) => {
                if (team.value && !isTeamMember(member, team.value)) {
                    return false;
                }

                if (group.value === TeamFilter.INACTIVE) {
                    return !!member.inactive;
                }

                return !member.inactive;
            }));

        return {
            group,
            handlePicked,

            team,
            clearTeam,

            items,
        };
    },
});
```

In the template, insert directly after the `<div>` that wraps `<KTeamSwitch …/>`:

```vue
            <p
                v-if="team"
                class="m-0 text-sm text-fg-muted"
            >
                Showing {{ team.toUpperCase() }} members only.
                <button
                    type="button"
                    class="font-semibold text-primary-700 hover:underline dark:text-primary-300"
                    @click="clearTeam"
                >
                    Show all
                </button>
            </p>
```

- [ ] **Step 7: Verify in the browser**

Run the final gates. With the dev server running, open `http://localhost:5199/team?group=tbi` and run:

```js
await new Promise((r) => setTimeout(r, 500));
document.querySelectorAll('.vp-raw article').length
```

Expected: `7` (6 TBI members plus Oliver Kohlbacher). Click "Show all", run the snippet again: `21`, and the URL no longer contains `?group`. `http://localhost:5199/contact` shows the same address as before.

- [ ] **Step 8: Commit**

```bash
git add src/.vitepress/domains src/.vitepress/components/team/KTeam.vue src/.vitepress/components/contact/KContact.vue
git commit -m "feat: filter the team page by group"
```

---

### Task 5: Brand tokens, shared styles and site footer

**Files:**
- Modify: `src/.vitepress/theme/style.css` (full replacement below)
- Create: `src/.vitepress/theme/Layout.vue`
- Modify: `src/.vitepress/theme/index.mjs`
- Create: `src/.vitepress/components/layout/KFooter.vue`
- Create: `src/.vitepress/components/layout/index.ts`
- Modify: `src/.vitepress/components/index.ts`
- Modify: `src/.vitepress/config.mjs` (remove `footer`)

**Interfaces:**
- Produces CSS classes (`@layer components`): `k-section`, `k-section-alt`, `k-wrap`, `k-eyebrow`, `k-heading`, `k-link`, `k-card`, `k-card-interactive`, `k-night`, `k-gradient-text`, `k-footer` (+ `has-sidebar`).
- Produces Tailwind colors: `night`, `night-fg`, `night-fg-muted`, `night-border`, `accent-sky`, `accent-pink`.
- Produces CSS variables: `--k-dark-bg`, `--k-dark-fg`, `--k-dark-fg-muted`, `--k-dark-border`, `--k-accent-sky`, `--k-accent-pink`, `--k-glow-primary`, `--k-glow-sky`, `--k-glow-pink`.

- [ ] **Step 1: Take baseline screenshots**

With the dev server running, screenshot `/team`, `/projects/ghga.html` and `/publications` in light and dark mode (see Verification Toolkit). Keep them for comparison in Step 7.

- [ ] **Step 2: Replace `theme/style.css`**

```css
/*
 * Tailwind v4 entry.
 *
 * VitePress ships its base and doc styles unlayered, so they would win over
 * every Tailwind utility. Custom components therefore render inside a
 * `.vp-raw` wrapper, which `postcssIsolateStyles()` (see config.mjs) excludes
 * from those styles.
 */
@layer theme, vuecs, base, components, utilities;

@import "tailwindcss" source(none);
@import "@vuecs/design";
@import "@vuecs/theme-tailwind";
@import "@vuecs/pagination/style.css";

/* VitePress toggles `.dark` on <html>. */
@custom-variant dark (&:where(.dark, .dark *));

@source "../components";
@source "../../../node_modules/@vuecs";

@theme inline {
    --font-sans: var(--vp-font-family-base);

    /* Fixed-dark surfaces (hero, footer) that ignore the color mode. */
    --color-night: var(--k-dark-bg);
    --color-night-fg: var(--k-dark-fg);
    --color-night-fg-muted: var(--k-dark-fg-muted);
    --color-night-border: var(--k-dark-border);

    /* Accents taken from the logo. */
    --color-accent-sky: var(--k-accent-sky);
    --color-accent-pink: var(--k-accent-pink);
}

@layer base {
    :root {
        /*
         * Bind the vuecs semantic tokens to the VitePress palette, so
         * utilities (`bg-bg-muted`, `text-fg-muted`, ...) and vuecs components
         * follow the VitePress color scheme and its dark mode.
         */
        --vc-color-bg: var(--vp-c-bg);
        --vc-color-bg-muted: var(--vp-c-bg-soft);
        --vc-color-bg-elevated: var(--vp-c-bg-elv);
        --vc-color-fg: var(--vp-c-text-1);
        --vc-color-fg-muted: var(--vp-c-text-2);
        --vc-color-border: var(--vp-c-divider);
        --vc-color-border-muted: var(--vp-c-gutter);

        /* primary → indigo */
        --vc-color-primary-50: var(--color-indigo-50);
        --vc-color-primary-100: var(--color-indigo-100);
        --vc-color-primary-200: var(--color-indigo-200);
        --vc-color-primary-300: var(--color-indigo-300);
        --vc-color-primary-400: var(--color-indigo-400);
        --vc-color-primary-500: var(--color-indigo-500);
        --vc-color-primary-600: var(--color-indigo-600);
        --vc-color-primary-700: var(--color-indigo-700);
        --vc-color-primary-800: var(--color-indigo-800);
        --vc-color-primary-900: var(--color-indigo-900);
        --vc-color-primary-950: var(--color-indigo-950);

        /* Lab tokens: fixed-dark surfaces, logo accents, hero glow. */
        --k-dark-bg: #070b18;
        --k-dark-fg: #e8ecf6;
        --k-dark-fg-muted: #aeb6cc;
        --k-dark-border: rgb(255 255 255 / 0.12);
        --k-accent-sky: #7dd3fc;
        --k-accent-pink: #f5a0a3;
        --k-glow-primary: rgb(99 102 241 / 0.4);
        --k-glow-sky: rgb(110 207 246 / 0.18);
        --k-glow-pink: rgb(245 160 163 / 0.1);
    }

    /* Preflight resets headings to inherit; restore a heading scale. */
    .vp-raw :where(h1, h2, h3, h4, h5, h6) {
        @apply mb-2 leading-tight font-medium;
    }

    .vp-raw h1 { @apply text-4xl; }
    .vp-raw h2 { @apply text-3xl; }
    .vp-raw h3 { @apply text-2xl; }
    .vp-raw h4 { @apply text-xl; }
    .vp-raw h5 { @apply text-lg; }
    .vp-raw h6 { @apply text-base; }

    /* Keep the VitePress weight instead of preflight's `bolder`. */
    .vp-raw :where(b, strong) {
        @apply font-semibold;
    }
}

@layer components {
    .entity-card {
        @apply relative rounded-[4px] border border-bg-muted bg-bg-muted px-4 py-2 break-all
            shadow-[0_4px_25px_0_rgb(0_0_0/0.1)] transition-all duration-300 ease-in-out;
    }

    .entity-card.active {
        @apply border-neutral-700 bg-neutral-700 text-neutral-100
            dark:border-primary-400 dark:bg-primary-500 dark:text-white;
    }

    /* Vertical rhythm of a start page section. */
    .k-section {
        @apply py-16 md:py-20;
    }

    .k-section-alt {
        background-color: var(--vp-c-bg-alt);
    }

    /* Centered content column. Not `container`: VitePress uses that class. */
    .k-wrap {
        @apply mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-10;
    }

    .k-eyebrow {
        @apply m-0 mb-2 text-xs font-semibold tracking-[0.12em] text-primary-600 uppercase dark:text-primary-400;
    }

    .k-heading {
        @apply m-0 text-3xl leading-tight font-bold tracking-tight text-fg md:text-4xl;
    }

    .k-link {
        @apply font-semibold text-primary-700 dark:text-primary-300;
    }

    .k-card {
        @apply rounded-[16px] border border-border bg-bg-elevated;
    }

    .k-card-interactive {
        @apply transition duration-200 hover:-translate-y-0.5 hover:border-primary-500
            hover:shadow-[0_12px_30px_-16px_rgb(79_70_229/0.45)];
    }

    /* Fixed-dark surface with glow and a faint grid (hero, call-to-action cards). */
    .k-night {
        @apply relative overflow-hidden bg-night text-night-fg;
    }

    .k-night::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
            radial-gradient(640px 420px at 80% 10%, var(--k-glow-primary), transparent 70%),
            radial-gradient(520px 360px at 100% 95%, var(--k-glow-sky), transparent 70%),
            radial-gradient(420px 300px at 5% 100%, var(--k-glow-pink), transparent 70%);
    }

    .k-night::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.5;
        background-image:
            linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(circle at 72% 28%, #000 15%, transparent 70%);
    }

    .k-night > * {
        position: relative;
        z-index: 1;
    }

    .k-gradient-text {
        background-image: linear-gradient(90deg, var(--k-accent-sky), var(--vc-color-primary-300) 50%, var(--k-accent-pink));
        background-clip: text;
        color: transparent;
    }

    /* Keep the footer clear of the fixed sidebar, mirroring VPContent.has-sidebar. */
    @media (min-width: 960px) {
        .k-footer.has-sidebar {
            padding-left: var(--vp-sidebar-width);
        }
    }

    @media (min-width: 1440px) {
        .k-footer.has-sidebar {
            padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
            padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
        }
    }
}

/*
 * Unlayered: VitePress defines its variables and component styles unlayered,
 * so overrides of them must stay outside of any @layer to win.
 */

/* VitePress brand colors follow the vuecs primary scale. */
:root {
    --vp-c-brand-1: var(--vc-color-primary-600);
    --vp-c-brand-2: var(--vc-color-primary-500);
    --vp-c-brand-3: var(--vc-color-primary-500);
    --vp-c-brand-soft: color-mix(in srgb, var(--vc-color-primary-500) 14%, transparent);
}

.dark {
    --vp-c-brand-1: var(--vc-color-primary-300);
    --vp-c-brand-2: var(--vc-color-primary-400);
    --vp-c-brand-3: var(--vc-color-primary-500);
    --vp-c-brand-soft: color-mix(in srgb, var(--vc-color-primary-400) 16%, transparent);
}
```

- [ ] **Step 3: Create `KFooter`**

`src/.vitepress/components/layout/KFooter.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { VPLink, useSidebar } from 'vitepress/theme';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        VPLink,
    },
    setup() {
        const { hasSidebar } = useSidebar();

        const columns = [
            {
                title: 'Lab',
                links: [
                    { text: 'Team', link: '/team' },
                    { text: 'Research', link: '/research' },
                    { text: 'Publications', link: '/publications' },
                    { text: 'Contact', link: '/contact' },
                ],
            },
            {
                title: 'Work',
                links: [
                    { text: 'Projects', link: '/projects' },
                    { text: 'Software', link: '/software' },
                    { text: 'Teaching', link: 'https://alma.uni-tuebingen.de/alma/pages/startFlow.xhtml?_flowId=searchCourseNonStaff-flow' },
                ],
            },
            {
                title: 'Links',
                links: [
                    { text: 'University of Tübingen', link: 'https://uni-tuebingen.de' },
                    { text: 'University Hospital Tübingen', link: 'https://www.medizin.uni-tuebingen.de' },
                    { text: 'GitHub', link: 'https://github.com/KohlbacherLab' },
                ],
            },
        ];

        return {
            columns,
            hasSidebar,
        };
    },
});
</script>
<template>
    <footer
        class="vp-raw k-footer bg-night text-night-fg-muted"
        :class="{ 'has-sidebar': hasSidebar }"
    >
        <div class="k-wrap grid gap-8 py-14 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
            <div>
                <img
                    class="mb-4 h-7 w-auto"
                    src="/images/icon/logo_light.png"
                    alt="KohlbacherLab"
                >
                <p class="m-0 max-w-[36ch] text-sm leading-relaxed">
                    Applied and Translational Bioinformatics at the University of Tübingen and the
                    University Hospital Tübingen, led by Prof. Dr. Oliver Kohlbacher.
                </p>
            </div>
            <nav
                v-for="column in columns"
                :key="column.title"
                :aria-label="column.title"
            >
                <h2 class="m-0 mb-3 text-sm font-semibold text-night-fg">
                    {{ column.title }}
                </h2>
                <ul class="m-0 grid list-none gap-2 p-0 text-sm">
                    <li
                        v-for="link in column.links"
                        :key="link.text"
                    >
                        <VPLink
                            class="transition-colors hover:text-night-fg"
                            :href="link.link"
                        >
                            {{ link.text }}
                        </VPLink>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="border-t border-night-border">
            <div class="k-wrap flex flex-wrap justify-between gap-2 py-4 text-xs">
                <span>© 2024–present KohlbacherLab</span>
                <span>
                    Website by
                    <a
                        class="text-night-fg hover:underline"
                        href="https://tada5hi.net"
                        target="_blank"
                        rel="noopener"
                    >Peter Placzek</a>
                    (<a
                        class="text-night-fg hover:underline"
                        href="https://github.com/tada5hi"
                        target="_blank"
                        rel="noopener"
                    >@tada5hi</a>)
                </span>
            </div>
        </div>
    </footer>
</template>
```

`src/.vitepress/components/layout/index.ts` (with copyright header): `export { default as KFooter } from './KFooter.vue';`

`src/.vitepress/components/index.ts`: add `export * from './layout/index.ts';` after `history`.

- [ ] **Step 4: Mount it through a layout wrapper**

`src/.vitepress/theme/Layout.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import DefaultTheme from 'vitepress/theme';
import { defineComponent } from 'vue';
import KFooter from '../components/layout/KFooter.vue';

export default defineComponent({
    components: {
        DefaultLayout: DefaultTheme.Layout,
        KFooter,
    },
});
</script>
<template>
    <DefaultLayout>
        <template #layout-bottom>
            <KFooter />
        </template>
    </DefaultLayout>
</template>
```

`src/.vitepress/theme/index.mjs`: add `import Layout from './Layout.vue';` after the `KProjectMeta` import, and `Layout,` after `extends: DefaultTheme,`.

- [ ] **Step 5: Remove the VitePress footer**

In `src/.vitepress/config.mjs`, delete the line `footer: { copyright: 'Copyright © 2024-present KohlbacherLab' },`.

- [ ] **Step 6: Final gates**

Run the final gates.

- [ ] **Step 7: Verify in the browser**

On `http://localhost:5199/team`:

```js
({
    oldFooter: document.querySelector('.VPFooter'),
    footer: !!document.querySelector('.k-footer'),
    credit: document.querySelector('.k-footer').textContent.includes('Website by'),
    brandMatchesPrimary: getComputedStyle(document.documentElement).getPropertyValue('--vp-c-brand-1').trim()
        === getComputedStyle(document.documentElement).getPropertyValue('--vc-color-primary-600').trim(),
})
```

Expected: `oldFooter: null`, `footer: true`, `credit: true`, `brandMatchesPrimary: true`.

On `http://localhost:5199/projects/ghga.html` (sidebar page), with the viewport ≥ 1440px:

```js
getComputedStyle(document.querySelector('.k-footer')).paddingLeft === getComputedStyle(document.querySelector('.VPContent')).paddingLeft
```

Expected: `true`. Then `await kFrames('/projects/ghga.html', [390, 1200])`, and for each result check `overflow === false` and, for `1200`, that `r.doc.querySelector('.k-footer').getBoundingClientRect().left + parseFloat(getComputedStyle(r.doc.querySelector('.k-footer')).paddingLeft)` is at least `r.doc.querySelector('.VPSidebar').getBoundingClientRect().right`.

Compare with the Step 1 screenshots in both color modes: only the footer and the slightly different brand shade may change.

- [ ] **Step 8: Commit**

```bash
git add src/.vitepress/theme src/.vitepress/components src/.vitepress/config.mjs
git commit -m "feat: add brand tokens and site-wide footer"
```

---

### Task 6: Start page shell, hero and transparent nav

**Files:**
- Modify: `src/index.md` (full replacement)
- Create: `src/.vitepress/components/home/types.ts`
- Create: `src/.vitepress/components/home/composables.ts`
- Create: `src/.vitepress/components/home/KHome.vue`
- Create: `src/.vitepress/components/home/KHomeHero.vue`
- Create: `src/.vitepress/components/home/index.ts`
- Modify: `src/.vitepress/components/index.ts`
- Modify: `src/.vitepress/theme/style.css` (append hero/spectrum rules and nav overrides)

**Interfaces:**
- Consumes: `data` from `data/team.data` (`[string, Person][]`), `getPersonAvatar` (Task 4), CSS classes from Task 5.
- Produces (`components/home/types.ts`): `HomeAction { text, link }`, `HomeHero { eyebrow, title, highlight, description, actions: HomeAction[] }`, `HomeLead { person, name, role, summary }`, `HomeGroup { id: 'abi' | 'tbi', name, institution, summary }`, `HomeGroups { intro, items: HomeGroup[] }`.
- Produces (`components/home/composables.ts`): `useHomeLead(): ComputedRef<HomeLeadView>` with `HomeLeadView = HomeLead & { avatar: string }`.
- Produces: `KHome` (root `vp-raw`, composes the sections in order).

- [ ] **Step 1: Replace `src/index.md`**

```md
---
layout: page
pageClass: k-home
title: KohlbacherLab
titleTemplate: Applied and Translational Bioinformatics

lead:
  person: kohlbacher-oliver
  name: Prof. Dr. Oliver Kohlbacher
  role: Head of the lab
  summary: Director, Institute for Translational Bioinformatics, University Medical Center Tübingen. ISCB Fellow.

hero:
  eyebrow: Applied & Translational Bioinformatics · Tübingen
  title: Algorithms, software and infrastructure for
  highlight: omics and clinical data.
  description: From mass spectrometry, immunomics and structural bioinformatics to national research data platforms such as GHGA, DNPM and PrivateAIM.
  actions:
    - text: Our research
      link: /research
    - text: Publications
      link: /publications

groups:
  intro: Founded in 2000 and led by Prof. Dr. Oliver Kohlbacher. Both groups work side by side in the Tübingen AI Research Building.
  items:
    - id: abi
      name: Applied Bioinformatics
      institution: University of Tübingen
      summary: Analysis of omics data (genomics, proteomics, metabolomics), structural bioinformatics and computational immunomics, with a reputation for high-quality research software.
    - id: tbi
      name: Translational Bioinformatics
      institution: University Hospital Tübingen
      summary: At the intersection of medical informatics and bioinformatics. As part of DIFUTURE, the group builds Data Integration Centers for the German Medical Informatics Initiative.
---

<script setup>
import KHome from './.vitepress/components/home/KHome.vue';
</script>

<KHome />
```

- [ ] **Step 2: Types and the lead composable**

`src/.vitepress/components/home/types.ts` (with copyright header):

```ts
export type HomeAction = {
    text: string,
    link: string
};

export type HomeHero = {
    eyebrow: string,

    /**
     * Headline before the highlighted part.
     */
    title: string,

    /**
     * Headline end, rendered with the accent gradient.
     */
    highlight: string,

    description: string,

    /**
     * First action is the primary button.
     */
    actions: HomeAction[]
};

export type HomeLead = {
    /**
     * Person slug (file name in data/persons without extension).
     */
    person: string,

    /**
     * Display name including titles.
     */
    name: string,

    role: string,

    summary: string
};

export type HomeGroup = {
    id: 'abi' | 'tbi',
    name: string,
    institution: string,
    summary: string
};

export type HomeGroups = {
    intro: string,
    items: HomeGroup[]
};
```

`src/.vitepress/components/home/composables.ts` (with copyright header):

```ts
import { useData } from 'vitepress';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { data } from '../../data/team.data';
import { getPersonAvatar } from '../../domains/person/avatar.ts';
import type { HomeLead } from './types.ts';

export type HomeLeadView = HomeLead & { avatar: string };

export function useHomeLead() : ComputedRef<HomeLeadView> {
    const { frontmatter } = useData();

    return computed(() => {
        const lead = frontmatter.value.lead as HomeLead;
        const entry = data.find(([slug]) => slug === lead.person);
        if (!entry) {
            throw new Error(`index.md: frontmatter "lead.person" (${lead.person}) matches no person data file.`);
        }

        return {
            ...lead,
            avatar: getPersonAvatar(entry[1]),
        };
    });
}
```

- [ ] **Step 3: Hero component**

`src/.vitepress/components/home/KHomeHero.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { useData } from 'vitepress';
import { VPLink } from 'vitepress/theme';
import { computed, defineComponent } from 'vue';
import { useHomeLead } from './composables.ts';
import type { HomeHero } from './types.ts';

// Bar heights in percent, shaped like the peaks in the logo.
const SPECTRUM = [
    4, 7, 3, 9, 5, 4, 11, 6, 3, 8, 5, 14, 4, 6, 3, 9, 5, 7, 4, 12, 6, 3,
    8, 22, 9, 5, 28, 48, 66, 95, 72, 41, 14, 6, 9, 4, 18, 34, 12, 5, 7, 3, 10, 5,
];

const ACCENTS : Record<number, string> = {
    28: 'bg-accent-sky',
    29: 'bg-accent-pink',
    30: 'bg-accent-sky',
    37: 'bg-accent-sky',
};

export default defineComponent({
    components: {
        VPLink,
    },
    setup() {
        const { frontmatter } = useData();

        const hero = computed(() => frontmatter.value.hero as HomeHero);
        const lead = useHomeLead();

        const bars = SPECTRUM.map((height, index) => ({
            height: `${height}%`,
            color: ACCENTS[index] ?? 'bg-primary-400',
        }));

        return {
            hero,
            lead,
            bars,
        };
    },
});
</script>
<template>
    <header class="k-night k-hero">
        <div class="k-wrap">
            <div class="max-w-[860px]">
                <p class="m-0 mb-4 text-xs font-semibold tracking-[0.12em] text-primary-300 uppercase">
                    {{ hero.eyebrow }}
                </p>
                <h1 class="m-0 mb-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] font-bold tracking-[-0.035em] text-white">
                    {{ hero.title }} <span class="k-gradient-text">{{ hero.highlight }}</span>
                </h1>
                <p class="m-0 mb-8 max-w-[58ch] text-base leading-relaxed text-night-fg-muted md:text-lg">
                    {{ hero.description }}
                </p>
                <div class="flex flex-wrap gap-3">
                    <VPLink
                        v-for="(action, index) in hero.actions"
                        :key="action.link"
                        :href="action.link"
                        :class="index === 0 ?
                            'rounded-[10px] bg-primary-500 px-4.5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgb(99_102_241)] transition-colors hover:bg-primary-400' :
                            'rounded-[10px] border border-white/20 bg-white/5 px-4.5 py-2.5 text-sm text-night-fg transition-colors hover:border-white/40'"
                    >
                        {{ action.text }}<span
                            v-if="index > 0"
                            aria-hidden="true"
                        > →</span>
                    </VPLink>
                </div>
                <VPLink
                    :href="`/persons/${lead.person}`"
                    class="mt-11 flex w-fit items-center gap-3 text-sm text-night-fg-muted"
                >
                    <img
                        class="size-10 rounded-full border-2 border-primary-300/50 object-cover"
                        :src="lead.avatar"
                        alt=""
                    >
                    <span>Led by <strong class="text-white">{{ lead.name }}</strong></span>
                </VPLink>
            </div>
        </div>
        <div
            class="k-wrap mt-14"
            aria-hidden="true"
        >
            <div class="flex h-24 items-end gap-1 border-b border-white/20 md:h-28">
                <span
                    v-for="(bar, index) in bars"
                    :key="index"
                    class="k-spectrum-bar flex-1 rounded-t-sm opacity-80"
                    :class="bar.color"
                    :style="{ height: bar.height }"
                />
            </div>
        </div>
    </header>
</template>
```

- [ ] **Step 4: Start page root**

`src/.vitepress/components/home/KHome.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { defineComponent } from 'vue';
import KHomeHero from './KHomeHero.vue';

export default defineComponent({
    components: {
        KHomeHero,
    },
});
</script>
<template>
    <div class="vp-raw">
        <KHomeHero />
    </div>
</template>
```

`src/.vitepress/components/home/index.ts` (with copyright header): `export { default as KHome } from './KHome.vue';`

`src/.vitepress/components/index.ts`: add `export * from './home/index.ts';` after `history`.

- [ ] **Step 5: Hero, spectrum and nav CSS**

In `theme/style.css`, append inside `@layer components { … }` (before its closing brace, after `.k-gradient-text`):

```css
    .k-hero {
        padding-top: 4rem;
    }

    /* Spectrum bars in the hero: gentle, staggered height changes. */
    .k-spectrum-bar {
        transform-origin: bottom;
        animation: k-breathe 3.2s ease-in-out infinite;
    }

    .k-spectrum-bar:nth-child(3n) {
        animation-duration: 2.6s;
        animation-delay: -0.8s;
    }

    .k-spectrum-bar:nth-child(4n + 1) {
        animation-duration: 3.8s;
        animation-delay: -1.9s;
    }

    .k-spectrum-bar:nth-child(5n + 2) {
        animation-duration: 2.2s;
        animation-delay: -1.1s;
    }

    @keyframes k-breathe {
        0%,
        100% {
            transform: scaleY(1);
        }

        50% {
            transform: scaleY(0.55);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .k-spectrum-bar {
            animation: none;
        }
    }
```

Append at the very end of the file (unlayered):

```css
/*
 * Start page (`pageClass: k-home`): the nav sits transparently on the dark
 * hero while scrolled to the top (`.VPNavBar.top`), and the hero extends
 * under the fixed nav (≥ 960px, the VitePress breakpoint).
 */
@media (min-width: 960px) {
    .Layout.k-home .VPContent {
        padding-top: 0;
    }

    .Layout.k-home .k-hero {
        padding-top: calc(var(--vp-nav-height) + 5rem);
    }
}

/* Below 960px the nav is not fixed and sits above the hero. */
@media (max-width: 959px) {
    .Layout.k-home .VPNav {
        background-color: var(--k-dark-bg);
    }
}

.Layout.k-home .VPNavBar.top:not(.screen-open) {
    --vp-nav-bg-color: transparent;
    --vp-c-gutter: transparent;
}

/* Scoped to the bar's own items so flyout menus keep their normal colors. */
.Layout.k-home .VPNavBar.top:not(.screen-open) :is(
    .VPNavBarTitle,
    .VPNavBarMenu,
    .VPNavBarSearch,
    .VPNavBarAppearance,
    .VPNavBarSocialLinks,
    .VPNavBarHamburger
),
.Layout.k-home .VPNavBar.top:not(.screen-open) .VPNavBarExtra > .button {
    --vp-c-text-1: var(--k-dark-fg);
    --vp-c-text-2: var(--k-dark-fg-muted);
    --vp-c-brand-1: var(--vc-color-primary-300);
    --vp-c-divider: var(--k-dark-border);
    --vp-c-bg-alt: rgb(255 255 255 / 0.06);
    --vp-input-border-color: var(--k-dark-border);
    --vp-input-switch-bg-color: rgb(255 255 255 / 0.08);
}

/* Light logo variant on the dark hero, in both color modes. */
.Layout.k-home .VPNavBar.top:not(.screen-open) .VPNavBarTitle .VPImage.light {
    display: none;
}

html:not(.dark) .Layout.k-home .VPNavBar.top:not(.screen-open) .VPNavBarTitle .VPImage.dark {
    display: inline;
}
```

- [ ] **Step 6: Final gates**

Run the final gates.

- [ ] **Step 7: Verify in the browser**

On `http://localhost:5199/` in **light** mode, scrolled to the top:

```js
const bar = document.querySelector('.VPNavBar');
({
    top: bar.classList.contains('top'),
    navBg: getComputedStyle(bar).backgroundColor,
    linkColor: getComputedStyle(document.querySelector('.VPNavBarMenuLink')).color,
    lightLogoVisible: getComputedStyle(document.querySelector('.VPNavBarTitle .VPImage.dark')).display !== 'none',
    heroTop: document.querySelector('.k-hero').getBoundingClientRect().top,
    title: document.title,
})
```

Expected: `top: true`, `navBg: 'rgba(0, 0, 0, 0)'`, `linkColor: 'rgb(232, 236, 246)'`, `lightLogoVisible: true`, `heroTop: 0`, `title: 'KohlbacherLab | Applied and Translational Bioinformatics'`.

Then `window.scrollTo(0, 900)`, wait 300 ms, run it again: `top: false`, `navBg` is not transparent, `linkColor` is dark again.

Frames: `const r = await kFrames('/', [390, 1200])`. Expected for both: `overflow: false`. At 390: `getComputedStyle(r[0].doc.querySelector('.VPNav')).backgroundColor === 'rgb(7, 11, 24)'`. At 1200: `getComputedStyle(r[1].doc.querySelector('.VPNavBarExtra .button')).color === 'rgb(232, 236, 246)'`; open that flyout (`.click()`) and check its menu text is still dark in light mode.

Toggle dark mode and screenshot the hero: headline gradient, primary button, lead avatar and animated bars visible. Confirm the reduced-motion rule shipped: `grep -l "prefers-reduced-motion" src/.vitepress/dist/assets/*.css` prints a file.

Open the mobile menu at 390 (`r[0].doc.querySelector('.VPNavBarHamburger').click()`): the menu screen uses the normal VitePress colors.

- [ ] **Step 8: Commit**

```bash
git add src/index.md src/.vitepress/components src/.vitepress/theme/style.css
git commit -m "feat: add start page hero"
```

---

### Task 7: Groups and research sections

**Files:**
- Create: `src/.vitepress/components/home/KHomeSectionHeader.vue`
- Create: `src/.vitepress/components/home/KHomeGroups.vue`
- Create: `src/.vitepress/components/home/KHomeResearch.vue`
- Create: `src/.vitepress/data/research.data.ts`
- Modify: `src/.vitepress/components/home/KHome.vue`

**Interfaces:**
- Consumes: `selectTeamMembers` (Task 4), `getPersonAvatar` (Task 4), `useHomeLead` + `HomeGroups` (Task 6), `buildResearchAreas` + `ResearchArea` (Task 3).
- Produces: `KHomeSectionHeader` with props `eyebrow: string` (required), `title: string` (required), `link?: string`, `linkText?: string`, default slot below the title.
- Produces: `data/research.data.ts` exporting `data: ResearchArea[]`.

- [ ] **Step 1: Research loader**

`src/.vitepress/data/research.data.ts` (with copyright header):

```ts
import { createContentLoader } from 'vitepress';
import { buildResearchAreas } from '../domains/research/build.ts';
import type { ResearchArea } from '../domains/research/types.ts';

declare const data: ResearchArea[];
export { data };

export default createContentLoader('research/index.md', {
    transform(raw) : ResearchArea[] {
        const [page] = raw;
        if (!page) {
            throw new Error('research/index.md not found.');
        }

        return buildResearchAreas(page.url, page.frontmatter);
    },
});
```

- [ ] **Step 2: Section header**

`src/.vitepress/components/home/KHomeSectionHeader.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        VPLink,
    },
    props: {
        eyebrow: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            default: undefined,
        },
        linkText: {
            type: String,
            default: undefined,
        },
    },
});
</script>
<template>
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
            <p class="k-eyebrow">
                {{ eyebrow }}
            </p>
            <h2 class="k-heading">
                {{ title }}
            </h2>
            <slot />
        </div>
        <VPLink
            v-if="link && linkText"
            :href="link"
            class="k-link text-sm whitespace-nowrap"
        >
            {{ linkText }} →
        </VPLink>
    </div>
</template>
```

- [ ] **Step 3: Groups section**

`src/.vitepress/components/home/KHomeGroups.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { useData } from 'vitepress';
import { VPLink } from 'vitepress/theme';
import { computed, defineComponent } from 'vue';
import { data } from '../../data/team.data';
import { getPersonAvatar } from '../../domains/person/avatar.ts';
import { selectTeamMembers } from '../../domains/team/select.ts';
import KHomeSectionHeader from './KHomeSectionHeader.vue';
import { useHomeLead } from './composables.ts';
import type { HomeGroups } from './types.ts';

const STACK_SIZE = 6;

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        const { frontmatter } = useData();
        const lead = useHomeLead();

        const intro = computed(() => (frontmatter.value.groups as HomeGroups).intro);

        const groups = computed(() => (frontmatter.value.groups as HomeGroups).items.map((group) => {
            const members = selectTeamMembers(data, group.id, lead.value.person);

            return {
                ...group,
                avatars: members.slice(0, STACK_SIZE).map(([slug, person]) => ({
                    slug,
                    name: person.name,
                    avatar: getPersonAvatar(person),
                })),
                rest: Math.max(members.length - STACK_SIZE, 0),
            };
        }));

        return {
            intro,
            groups,
        };
    },
});
</script>
<template>
    <section class="k-section">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="Who we are"
                title="One lab, two groups"
            >
                <p class="m-0 mt-3 max-w-[60ch] text-base text-fg-muted">
                    {{ intro }}
                </p>
            </KHomeSectionHeader>
            <div class="grid gap-5 md:grid-cols-2">
                <article
                    v-for="group in groups"
                    :key="group.id"
                    class="k-card flex flex-col p-6"
                >
                    <div
                        class="mb-5 inline-grid h-11 w-fit place-items-center rounded-[12px] bg-primary-50 px-3 text-[15px]
                            font-extrabold tracking-wide text-primary-600 uppercase dark:bg-primary-500/15 dark:text-primary-300"
                    >
                        {{ group.id }}
                    </div>
                    <h3 class="m-0 text-xl font-bold tracking-tight text-fg">
                        {{ group.name }}
                    </h3>
                    <p class="m-0 mt-0.5 mb-3 text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {{ group.institution }}
                    </p>
                    <p class="m-0 mb-5 grow text-[15px] leading-relaxed text-fg-muted">
                        {{ group.summary }}
                    </p>
                    <div class="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                        <div class="flex items-center">
                            <img
                                v-for="(member, index) in group.avatars"
                                :key="member.slug"
                                class="size-9 rounded-full border-2 border-bg-elevated object-cover"
                                :class="{ '-ml-2.5': index > 0 }"
                                :src="member.avatar"
                                :alt="member.name"
                                :title="member.name"
                            >
                            <span
                                v-if="group.rest > 0"
                                class="-ml-2.5 grid size-9 place-items-center rounded-full border-2 border-bg-elevated bg-primary-50
                                    text-xs font-bold text-primary-600 dark:bg-primary-900 dark:text-primary-300"
                            >
                                +{{ group.rest }}
                            </span>
                        </div>
                        <VPLink
                            class="k-link text-sm"
                            :href="`/team?group=${group.id}`"
                        >
                            Meet the {{ group.id.toUpperCase() }} team →
                        </VPLink>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>
```

- [ ] **Step 4: Research section**

`src/.vitepress/components/home/KHomeResearch.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';
import { data } from '../../data/research.data';
import KHomeSectionHeader from './KHomeSectionHeader.vue';

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        return {
            areas: data,
        };
    },
});
</script>
<template>
    <section class="k-section k-section-alt">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="What we work on"
                title="Research areas"
                link="/research"
                link-text="All research"
            />
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <VPLink
                    v-for="area in areas"
                    :key="area.anchor"
                    :href="`/research#${area.anchor}`"
                    class="k-card k-card-interactive block p-6"
                >
                    <div
                        class="mb-4 grid size-[42px] place-items-center rounded-[11px] bg-primary-50 text-lg text-primary-600
                            dark:bg-primary-500/15 dark:text-primary-300"
                    >
                        <i
                            :class="area.icon"
                            aria-hidden="true"
                        />
                    </div>
                    <h3 class="m-0 mb-1.5 text-[17px] font-semibold tracking-tight text-fg">
                        {{ area.title }}
                    </h3>
                    <p class="m-0 text-[14.5px] leading-relaxed text-fg-muted">
                        {{ area.summary }}
                    </p>
                </VPLink>
                <VPLink
                    href="/research"
                    class="k-night k-card-interactive flex min-h-40 flex-col justify-between rounded-[16px] p-6"
                >
                    <h3 class="m-0 text-lg font-semibold text-white">
                        Explore our research in depth
                    </h3>
                    <span class="text-sm font-semibold text-primary-300">Go to research →</span>
                </VPLink>
            </div>
        </div>
    </section>
</template>
```

- [ ] **Step 5: Add both sections to `KHome`**

`KHome.vue` becomes:

```vue
<!-- copyright header -->
<script lang="ts">
import { defineComponent } from 'vue';
import KHomeGroups from './KHomeGroups.vue';
import KHomeHero from './KHomeHero.vue';
import KHomeResearch from './KHomeResearch.vue';

export default defineComponent({
    components: {
        KHomeGroups,
        KHomeHero,
        KHomeResearch,
    },
});
</script>
<template>
    <div class="vp-raw">
        <KHomeHero />
        <KHomeGroups />
        <KHomeResearch />
    </div>
</template>
```

- [ ] **Step 6: Final gates and anchor check**

Run the final gates, then check that every card anchor exists on the research page:

```bash
for a in computational-immunomics computational-mass-spectrometry personalized-medicine structural-bioinformatics translational-bioinformatics; do
  printf "%s: " "$a"; grep -c "id=\"$a\"" src/.vitepress/dist/research/index.html
done
```

Expected: `1` for each.

- [ ] **Step 7: Verify in the browser**

On `http://localhost:5199/`:

```js
({
    groups: document.querySelectorAll('.vp-raw article').length,
    abiStack: document.querySelectorAll('.vp-raw article')[0].querySelectorAll('img').length,
    abiRest: document.querySelectorAll('.vp-raw article')[0].querySelector('span.grid')?.textContent.trim(),
    tbiRest: document.querySelectorAll('.vp-raw article')[1].querySelector('span.grid')?.textContent.trim(),
    areaCards: document.querySelectorAll('a[href^="/research.html#"]').length,
})
```

Expected: `groups: 2`, `abiStack: 6`, `abiRest: '+9'`, `tbiRest: '+1'`, `areaCards: 5`. The first ABI avatar is Oliver Kohlbacher's. Click "Meet the TBI team →": the team page shows 7 members. Click a research card: `/research` scrolls to that heading.

`await kFrames('/', [390, 1200])`: no overflow. Screenshot both sections in light and dark mode; cards on the alternate background stay distinguishable in dark mode.

- [ ] **Step 8: Commit**

```bash
git add src/.vitepress/components/home src/.vitepress/data/research.data.ts
git commit -m "feat: add groups and research sections to the start page"
```

---

### Task 8: Projects & software and publications sections

**Files:**
- Create: `src/.vitepress/data/projects.data.ts`
- Create: `src/.vitepress/data/software.data.ts`
- Create: `src/.vitepress/components/home/KHomeProjects.vue`
- Create: `src/.vitepress/components/home/KHomePublications.vue`
- Modify: `src/.vitepress/components/home/KHome.vue`

**Interfaces:**
- Consumes: `buildProject`, `compareProjectsByStart`, `selectFeaturedProjects`, `formatRuntimeYears`, `Project` (Task 2); `buildSoftware`, `selectFeaturedSoftware`, `Software` (Task 3); `formatAuthors`, `getPublicationLink` (Task 1); `data` from `data/bib.data` (BibTeX string); `KHomeSectionHeader` (Task 7).
- Produces: `data/projects.data.ts` exporting `data: Project[]` (newest start first), `data/software.data.ts` exporting `data: Software[]`.

- [ ] **Step 1: Loaders**

`src/.vitepress/data/projects.data.ts` (with copyright header):

```ts
import { createContentLoader } from 'vitepress';
import { buildProject } from '../domains/project/build.ts';
import { compareProjectsByStart } from '../domains/project/select.ts';
import type { Project } from '../domains/project/types.ts';

declare const data: Project[];
export { data };

export default createContentLoader('projects/*.md', {
    transform(raw) : Project[] {
        return raw
            // The section index (`/projects/`) has no project frontmatter.
            .filter((page) => !page.url.endsWith('/'))
            .map((page) => buildProject(page.url, page.frontmatter))
            .sort(compareProjectsByStart);
    },
});
```

`src/.vitepress/data/software.data.ts` (with copyright header):

```ts
import { createContentLoader } from 'vitepress';
import { buildSoftware } from '../domains/software/build.ts';
import type { Software } from '../domains/software/types.ts';

declare const data: Software[];
export { data };

export default createContentLoader('software/*.md', {
    transform(raw) : Software[] {
        return raw
            // The section index (`/software/`) has no software frontmatter.
            .filter((page) => !page.url.endsWith('/'))
            .map((page) => buildSoftware(page.url, page.frontmatter));
    },
});
```

- [ ] **Step 2: Projects & software section**

`src/.vitepress/components/home/KHomeProjects.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';
import { data as projects } from '../../data/projects.data';
import { data as software } from '../../data/software.data';
import { formatRuntimeYears } from '../../domains/project/format.ts';
import { selectFeaturedProjects } from '../../domains/project/select.ts';
import { selectFeaturedSoftware } from '../../domains/software/select.ts';
import KHomeSectionHeader from './KHomeSectionHeader.vue';

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        const featuredProjects = selectFeaturedProjects(projects, new Date())
            .map((project) => ({
                url: project.url,
                title: project.title,
                name: project.name,
                funders: project.funding.map((item) => item.funder).join(' · '),
                years: formatRuntimeYears(project.runtime),
            }));

        return {
            featuredProjects,
            featuredSoftware: selectFeaturedSoftware(software),
            projectCount: projects.length,
        };
    },
});
</script>
<template>
    <section class="k-section">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="Projects & software"
                title="From research to infrastructure"
            />
            <div class="grid gap-11 lg:grid-cols-[1.1fr_1fr]">
                <div>
                    <div class="mb-3 flex items-baseline justify-between gap-4">
                        <h3 class="m-0 text-[13px] font-semibold tracking-[0.08em] text-fg-muted uppercase">
                            Current projects
                        </h3>
                        <VPLink
                            href="/projects"
                            class="k-link text-sm"
                        >
                            All {{ projectCount }} projects →
                        </VPLink>
                    </div>
                    <ul class="m-0 list-none border-t border-border p-0">
                        <li
                            v-for="project in featuredProjects"
                            :key="project.url"
                            class="border-b border-border"
                        >
                            <VPLink
                                :href="project.url"
                                class="group grid grid-cols-[1fr_auto] items-center gap-4 py-4"
                            >
                                <span>
                                    <span class="block text-[16.5px] font-semibold text-fg group-hover:text-primary-600 dark:group-hover:text-primary-300">
                                        {{ project.title }}
                                    </span>
                                    <span class="mt-0.5 block text-sm text-fg-muted">
                                        {{ project.name }}
                                    </span>
                                </span>
                                <span class="text-right text-[12.5px] whitespace-nowrap text-fg-muted tabular-nums">
                                    <span class="block font-semibold text-fg">{{ project.funders }}</span>
                                    {{ project.years }}
                                </span>
                            </VPLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <div class="mb-3 flex items-baseline justify-between gap-4">
                        <h3 class="m-0 text-[13px] font-semibold tracking-[0.08em] text-fg-muted uppercase">
                            Open-source software
                        </h3>
                        <VPLink
                            href="/software"
                            class="k-link text-sm"
                        >
                            All software →
                        </VPLink>
                    </div>
                    <div class="grid gap-3 sm:grid-cols-2">
                        <article
                            v-for="item in featuredSoftware"
                            :key="item.url"
                            class="k-card k-card-interactive relative flex flex-col gap-2 p-[18px]"
                        >
                            <h4 class="m-0 text-[17px] font-bold tracking-tight text-fg">
                                <VPLink
                                    :href="item.url"
                                    class="after:absolute after:inset-0"
                                >
                                    {{ item.title }}
                                </VPLink>
                            </h4>
                            <p class="m-0 grow text-[13.5px] leading-relaxed text-fg-muted">
                                {{ item.summary }}
                            </p>
                            <a
                                v-if="item.repository"
                                :href="item.repository"
                                target="_blank"
                                rel="noopener"
                                class="k-link relative z-10 w-fit text-[13px]"
                            >Repository ↗</a>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
```

- [ ] **Step 3: Publications section**

`src/.vitepress/components/home/KHomePublications.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { parse } from '@retorquere/bibtex-parser';
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';
import { data } from '../../data/bib.data';
import { formatAuthors } from '../../domains/publication/format.ts';
import { getPublicationLink } from '../../domains/publication/link.ts';
import KHomeSectionHeader from './KHomeSectionHeader.vue';

// pub.bib lists the newest entries first.
const LIMIT = 4;

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        const { entries } = parse(data);

        const items = entries.slice(0, LIMIT).map((entry) => ({
            key: entry.key,
            title: entry.fields.title,
            year: entry.fields.year,
            venue: entry.fields.journal,
            authors: formatAuthors(entry),
            link: getPublicationLink(entry),
        }));

        return {
            items,
        };
    },
});
</script>
<template>
    <section class="k-section k-section-alt">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="Output"
                title="Latest publications"
                link="/publications"
                link-text="All publications"
            />
            <ol class="m-0 list-none border-t border-border p-0">
                <li
                    v-for="item in items"
                    :key="item.key"
                    class="grid gap-2 border-b border-border py-5 md:grid-cols-[150px_1fr] md:gap-6"
                >
                    <div>
                        <div class="text-[22px] leading-none font-bold tracking-tight text-fg">
                            {{ item.year }}
                        </div>
                        <span
                            v-if="item.venue"
                            class="mt-2 inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700
                                dark:bg-primary-500/15 dark:text-primary-300"
                        >
                            {{ item.venue }}
                        </span>
                    </div>
                    <div class="min-w-0">
                        <h3 class="m-0 text-[16.5px] leading-snug font-semibold text-fg">
                            <VPLink
                                v-if="item.link"
                                :href="item.link"
                                class="hover:text-primary-600 dark:hover:text-primary-300"
                            >
                                {{ item.title }}
                            </VPLink>
                            <template v-else>
                                {{ item.title }}
                            </template>
                        </h3>
                        <p class="m-0 mt-1.5 truncate text-[13.5px] text-fg-muted">
                            {{ item.authors }}
                        </p>
                    </div>
                </li>
            </ol>
        </div>
    </section>
</template>
```

- [ ] **Step 4: Add both sections to `KHome`**

`KHome.vue` becomes:

```vue
<!-- copyright header -->
<script lang="ts">
import { defineComponent } from 'vue';
import KHomeGroups from './KHomeGroups.vue';
import KHomeHero from './KHomeHero.vue';
import KHomeProjects from './KHomeProjects.vue';
import KHomePublications from './KHomePublications.vue';
import KHomeResearch from './KHomeResearch.vue';

export default defineComponent({
    components: {
        KHomeGroups,
        KHomeHero,
        KHomeProjects,
        KHomePublications,
        KHomeResearch,
    },
});
</script>
<template>
    <div class="vp-raw">
        <KHomeHero />
        <KHomeGroups />
        <KHomeResearch />
        <KHomeProjects />
        <KHomePublications />
    </div>
</template>
```

- [ ] **Step 5: Final gates**

Run the final gates. A build error `…: frontmatter "…"` names the page to fix.

- [ ] **Step 6: Verify in the browser**

On `http://localhost:5199/`:

```js
({
    projects: [...document.querySelectorAll('a[href^="/projects/"]')].map((a) => a.querySelector('span span')?.textContent.trim()).filter(Boolean),
    allProjects: [...document.querySelectorAll('a[href="/projects.html"]')].map((a) => a.textContent.trim()),
    software: [...document.querySelectorAll('h4 a[href^="/software/"]')].map((a) => a.textContent.trim()),
    publications: document.querySelectorAll('ol > li').length,
})
```

Expected (as of 2026-09-17): `projects: ['PM4Onco', 'PrivateAIM', 'de.NBI', 'GHGA']`, `allProjects` contains `All 12 projects →`, `software: ['DNPM:DIP', 'FLAME', 'Fred2', 'OpenMS']`, `publications: 4`. The first publication is the Nature Protocols 2024 entry. Clicking a software card opens its page; clicking "Repository ↗" opens GitHub in a new tab.

`await kFrames('/', [390, 1200])`: no overflow (long author lists truncate). Screenshot light and dark.

- [ ] **Step 7: Commit**

```bash
git add src/.vitepress/components/home src/.vitepress/data/projects.data.ts src/.vitepress/data/software.data.ts
git commit -m "feat: add projects, software and publications to the start page"
```

---

### Task 9: Team and contact sections

**Files:**
- Create: `src/.vitepress/components/home/KHomeTeam.vue`
- Create: `src/.vitepress/components/home/KHomeContact.vue`
- Modify: `src/.vitepress/components/home/KHome.vue`
- Delete: `src/public/images/contact/abi.jpg`, `src/public/images/contact/tbi.jpg`

**Interfaces:**
- Consumes: `useHomeLead` (Task 6), `selectActiveMembers`, `getPersonAvatar` (Task 4), `LAB_ADDRESS`, `LAB_CONTACT` (Task 4), `KHomeSectionHeader` (Task 7).

- [ ] **Step 1: Team section**

`src/.vitepress/components/home/KHomeTeam.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { computed, defineComponent } from 'vue';
import { data } from '../../data/team.data';
import { getPersonAvatar } from '../../domains/person/avatar.ts';
import { selectActiveMembers } from '../../domains/team/select.ts';
import KHomeSectionHeader from './KHomeSectionHeader.vue';
import { useHomeLead } from './composables.ts';

export default defineComponent({
    components: {
        KHomeSectionHeader,
        VPLink,
    },
    setup() {
        const lead = useHomeLead();

        const members = computed(() => selectActiveMembers(data)
            .filter(([slug]) => slug !== lead.value.person)
            .map(([slug, person]) => ({
                slug,
                name: person.name,
                avatar: getPersonAvatar(person),
                role: [person.role ?? []].flat()[0],
            })));

        return {
            lead,
            members,
        };
    },
});
</script>
<template>
    <section class="k-section">
        <div class="k-wrap">
            <KHomeSectionHeader
                eyebrow="People"
                title="The team"
                link="/team"
                link-text="Meet the team"
            />
            <div class="grid gap-7 lg:grid-cols-[340px_1fr]">
                <VPLink
                    :href="`/persons/${lead.person}`"
                    class="k-card k-card-interactive flex flex-col self-start overflow-hidden"
                >
                    <img
                        class="h-64 w-full object-cover object-[50%_25%]"
                        :src="lead.avatar"
                        :alt="lead.name"
                    >
                    <span class="block p-5">
                        <span class="k-eyebrow mb-1 block">{{ lead.role }}</span>
                        <span class="block text-[22px] leading-tight font-bold tracking-tight text-fg">{{ lead.name }}</span>
                        <span class="mt-2 mb-3.5 block text-sm leading-relaxed text-fg-muted">{{ lead.summary }}</span>
                        <span class="k-link text-sm">View profile →</span>
                    </span>
                </VPLink>
                <ul class="m-0 grid list-none grid-cols-3 content-start gap-x-3 gap-y-5 p-0 sm:grid-cols-4 md:grid-cols-5">
                    <li
                        v-for="member in members"
                        :key="member.slug"
                        class="text-center"
                    >
                        <VPLink
                            :href="`/persons/${member.slug}`"
                            class="group block"
                        >
                            <img
                                class="mx-auto mb-2 size-14 rounded-full border-2 border-bg object-cover ring-1 ring-border transition
                                    group-hover:ring-primary-500 md:size-[60px]"
                                :src="member.avatar"
                                :alt="member.name"
                            >
                            <span class="block text-[13px] leading-tight font-semibold text-fg">{{ member.name }}</span>
                            <span
                                v-if="member.role"
                                class="block text-[11.5px] leading-snug text-fg-muted"
                            >{{ member.role }}</span>
                        </VPLink>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
```

- [ ] **Step 2: Contact section**

`src/.vitepress/components/home/KHomeContact.vue`:

```vue
<!-- copyright header -->
<script lang="ts">
import { VPLink } from 'vitepress/theme';
import { defineComponent } from 'vue';
import { LAB_ADDRESS, LAB_CONTACT } from '../../domains/contact/constants.ts';

export default defineComponent({
    components: {
        VPLink,
    },
    setup() {
        return {
            address: LAB_ADDRESS,
            contact: LAB_CONTACT,
            phoneHref: `tel:${LAB_CONTACT.phone.replace(/\s+/g, '')}`,
        };
    },
});
</script>
<template>
    <section class="k-section k-section-alt">
        <div class="k-wrap">
            <div class="k-card grid overflow-hidden md:grid-cols-[1fr_1.1fr]">
                <div class="p-6 md:p-10">
                    <p class="k-eyebrow">
                        Visit us
                    </p>
                    <h2 class="k-heading md:text-3xl">
                        {{ address.building }}
                    </h2>
                    <address class="my-5 text-[15px] leading-7 text-fg not-italic">
                        <span class="block">{{ address.institution }}</span>
                        <span class="block">{{ address.street }}</span>
                        <span class="block">{{ address.city }}</span>
                        <a
                            class="k-link font-normal"
                            :href="phoneHref"
                        >{{ contact.phone }}</a>
                        ·
                        <a
                            class="k-link font-normal break-all"
                            :href="`mailto:${contact.email}`"
                        >{{ contact.email }}</a>
                    </address>
                    <VPLink
                        href="/contact"
                        class="inline-block rounded-[10px] bg-fg px-4 py-2.5 text-sm font-semibold text-bg"
                    >
                        How to find us →
                    </VPLink>
                </div>
                <img
                    class="h-64 w-full object-cover md:h-full md:min-h-80"
                    src="/images/contact/mvl6.jpg"
                    alt="The Tübingen AI Research Building at Maria-von-Linden-Straße 6"
                >
            </div>
        </div>
    </section>
</template>
```

- [ ] **Step 3: Add both sections to `KHome`**

`KHome.vue` becomes:

```vue
<!-- copyright header -->
<script lang="ts">
import { defineComponent } from 'vue';
import KHomeContact from './KHomeContact.vue';
import KHomeGroups from './KHomeGroups.vue';
import KHomeHero from './KHomeHero.vue';
import KHomeProjects from './KHomeProjects.vue';
import KHomePublications from './KHomePublications.vue';
import KHomeResearch from './KHomeResearch.vue';
import KHomeTeam from './KHomeTeam.vue';

export default defineComponent({
    components: {
        KHomeContact,
        KHomeGroups,
        KHomeHero,
        KHomeProjects,
        KHomePublications,
        KHomeResearch,
        KHomeTeam,
    },
});
</script>
<template>
    <div class="vp-raw">
        <KHomeHero />
        <KHomeGroups />
        <KHomeResearch />
        <KHomeProjects />
        <KHomePublications />
        <KHomeTeam />
        <KHomeContact />
    </div>
</template>
```

- [ ] **Step 4: Delete the outdated building photos**

Both groups are located at MVL6 now; the photos are unused.

```bash
grep -rn "abi.jpg\|tbi.jpg" src --include='*.vue' --include='*.md' --include='*.ts' --include='*.mjs'
git rm src/public/images/contact/abi.jpg src/public/images/contact/tbi.jpg
```

Expected: the `grep` prints nothing before the removal.

- [ ] **Step 5: Final gates**

Run the final gates.

- [ ] **Step 6: Verify in the browser**

On `http://localhost:5199/`:

```js
({
    leadCard: document.querySelector('a[href="/persons/kohlbacher-oliver.html"] img[alt="Prof. Dr. Oliver Kohlbacher"]') !== null,
    members: document.querySelectorAll('ul li a[href^="/persons/"]').length,
    leadInGrid: document.querySelectorAll('ul li a[href="/persons/kohlbacher-oliver.html"]').length,
    building: [...document.querySelectorAll('h2')].some((h) => h.textContent.trim() === 'Tübingen AI Research Building'),
})
```

Expected: `leadCard: true`, `members: 20`, `leadInGrid: 0`, `building: true`. Oliver Kohlbacher appears in the hero, groups intro, team card and footer.

- [ ] **Step 7: Commit**

```bash
git add src/.vitepress/components/home
git commit -m "feat: add team and contact sections to the start page"
```

---

### Task 10: Documentation and full visual QA

**Files:**
- Modify: `AGENTS.md`
- Modify: `.agents/structure.md`
- Modify: `.agents/architecture.md`
- Modify: `.agents/conventions.md`

- [ ] **Step 1: Update `AGENTS.md`**

In the Quick Reference code block, add after the Lint commands:

```bash
# Test (domain logic, Node's built-in test runner)
npm test
```

In the Content Sections table, change the Home row to: `| Home | src/index.md | Start page: frontmatter (hero, lead, groups) rendered by KHome |`.

- [ ] **Step 2: Update `.agents/structure.md`**

In the directory tree:
- under `components/`, replace `home/  # (currently empty)` with `home/  # KHome + section components (KHomeHero, KHomeGroups, ...), types, composables`, and add `layout/  # KFooter` and `project/  # KProjectMeta (global, used in projects/*.md)`;
- under `data/`, add `research.data.ts`, `projects.data.ts`, `software.data.ts` (createContentLoader over frontmatter);
- under `domains/`, add `contact/`, `content/` (frontmatter readers), `project/`, `publication/`, `research/`, `software/`, and note `*.spec.ts` unit tests;
- under `theme/`, add `Layout.vue  # wraps DefaultTheme.Layout, mounts KFooter in layout-bottom`.

In the Module Responsibilities table, add: `| theme/Layout.vue | Adds the site footer via the layout-bottom slot |` and `| *.spec.ts | Unit tests for domain logic (npm test) |`.

- [ ] **Step 3: Update `.agents/architecture.md`**

Add a section after "Team":

```md
### Projects, Software, Research Areas

Metadata lives in frontmatter and is validated by `domains/content/frontmatter.ts` (build errors name the page and
key). Dates are quoted ISO strings.

- `src/projects/*.md`: `title`, `name`, `website`, `funding[]` (`funder`, `reference`), `runtime` (`start`, `end`),
  `featured`. Pages place `<KProjectMeta />` where funding and runtime should render.
- `src/software/*.md`: `title`, `summary`, `website`, `repository`, `featured`.
- `src/research/index.md`: `areas[]` (`title` = the `##` heading, `summary`, `icon`).

`projects.data.ts`, `software.data.ts` and `research.data.ts` use `createContentLoader` and the domain builders.

### Start Page

`src/index.md` uses `layout: page` and `pageClass: k-home`, holds the editable texts in frontmatter (`lead`, `hero`,
`groups`) and mounts `KHome`, which composes `KHomeHero`, `KHomeGroups`, `KHomeResearch`, `KHomeProjects`,
`KHomePublications`, `KHomeTeam` and `KHomeContact`.
```

In "Styling with Tailwind", add these bullets:

```md
- Lab tokens: `--k-dark-*` (fixed-dark hero/footer surfaces, Tailwind colors `night`, `night-fg`, `night-fg-muted`,
  `night-border`) and logo accents (`accent-sky`, `accent-pink`). Shared classes: `k-section`, `k-section-alt`,
  `k-wrap`, `k-eyebrow`, `k-heading`, `k-link`, `k-card`, `k-card-interactive`, `k-night`, `k-gradient-text`.
- VitePress brand variables are bound to the vuecs primary scale. Overrides of VitePress variables and component
  styles (e.g. the transparent start page nav) live in the unlayered part at the end of `style.css`.
- Client components import runtime code from concrete domain files, never from `domains/index.ts` (it re-exports
  `person/read.ts`, which uses `node:fs`).
```

In "Theme Architecture", add step 5: `Wraps DefaultTheme.Layout in theme/Layout.vue to render KFooter in the layout-bottom slot`.

- [ ] **Step 4: Update `.agents/conventions.md`**

In the CI/CD table, change the `check.yml` steps to `Install, Test, Typecheck, Build, Lint`. Add a "Testing" section:

```md
## Testing

- Domain logic under `src/.vitepress/domains/**` has `*.spec.ts` unit tests next to the code.
- Runner: Node's built-in `node:test` with `--experimental-transform-types` (`npm test`). No test dependencies.
- Components are verified in the browser (light/dark, 390px and desktop widths).
```

- [ ] **Step 5: Full visual QA**

With the dev server running, for each path `/`, `/team`, `/team?group=abi`, `/research`, `/projects`, `/projects/ghga.html`, `/software/open-ms.html`, `/publications`, `/contact`, `/persons/kohlbacher-oliver`:

1. `const r = await kFrames(path, [390, 1200])` → `overflow: false` for both.
2. Screenshot at full width in light and dark mode.

On `/` additionally: nav transparent at the top and solid after scrolling, hero under the nav, spectrum animating, all 7 sections in order, footer credit present. On sidebar pages: footer to the right of the sidebar.

Compare `/team`, `/publications`, `/projects/ghga.html` with the Task 5 baseline: only footer and brand shade differ.

- [ ] **Step 6: Final gates and commit**

Run the final gates.

```bash
git add AGENTS.md .agents
git commit -m "docs: document start page, content frontmatter and tests"
```

- [ ] **Step 7: Push and open the PR**

Ask the user before pushing. Then:

```bash
git push -u origin feat/redesign-home
gh pr create --base master --title "feat: redesign start page and add site footer" --body "$(cat <<'EOF'
## Summary

- New start page (`src/index.md` → `KHome`): dark hero with animated spectrum bars, the two groups, research areas, projects & software, latest publications, team and contact. Texts are editable in the frontmatter of `src/index.md`.
- Site-wide footer (`theme/Layout.vue` + `KFooter`); VitePress brand colors follow the vuecs primary scale.
- Project, software and research-area metadata moved into frontmatter. Project pages render funding and runtime via `<KProjectMeta />`. Format: `.agents/architecture.md`.
- The team page accepts `?group=abi|tbi`.
- `npm test` for domain logic (Node's built-in test runner), also in CI.
- Removed the outdated `abi.jpg` / `tbi.jpg`.

Design: `.agents/plans/001-site-redesign.md` · Plan: `.agents/plans/002-site-redesign-part-1.md`
EOF
)"
```

No Claude attribution in the PR. Afterwards, tell the user to drag the light/dark start page screenshots from Step 5 into the PR description (`gh` cannot upload images).
