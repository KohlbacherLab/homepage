/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { slugify } from './slugify.ts';
import type { ResearchArea } from './types.ts';

const HEADING = /^##\s+(.+)$/;

/**
 * Level-2 (`## `) Markdown heading titles, in document order. Deeper
 * headings (`### `, ...) are ignored.
 */
export function extractHeadings(src: string) : string[] {
    return src
        .split('\n')
        .map((line) => HEADING.exec(line.trim())?.[1]?.trim())
        .filter((heading) : heading is string => !!heading);
}

/**
 * Verify every area's `anchor` matches a `## ` heading on the research
 * page, so a renamed heading fails the build instead of leaving a dead
 * link on the start page.
 */
export function verifyResearchAnchors(areas: ResearchArea[], headings: string[], source: string) : void {
    const known = new Set(headings.map(slugify));

    for (const area of areas) {
        if (!known.has(area.anchor)) {
            const found = headings.length > 0 ? headings.join(', ') : 'none';
            throw new Error(`${source}: research area "${area.title}" has no matching "## " heading on the page (found: ${found}).`);
        }
    }
}
