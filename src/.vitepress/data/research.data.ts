/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

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
