/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

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
