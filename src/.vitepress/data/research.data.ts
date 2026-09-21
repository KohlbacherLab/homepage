/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { createContentLoader } from 'vitepress';
import { buildResearchAreas } from '../domains/research/build.ts';
import { extractHeadings, verifyResearchAnchors } from '../domains/research/headings.ts';
import type { ResearchArea } from '../domains/research/types.ts';

declare const data: ResearchArea[];
export { data };

export default createContentLoader('research/index.md', {
    includeSrc: true,
    transform(raw) : ResearchArea[] {
        const [page] = raw;
        if (!page) {
            throw new Error('research/index.md not found.');
        }

        const areas = buildResearchAreas(page.url, page.frontmatter);

        // `anchor` is derived from `title` and must match a `## ` heading on
        // the page (see `ResearchArea.title`); catch a renamed heading here
        // instead of leaving a dead link on the start page.
        verifyResearchAnchors(areas, extractHeadings(page.src ?? ''), page.url);

        return areas;
    },
});
