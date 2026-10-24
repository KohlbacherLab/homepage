/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

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
