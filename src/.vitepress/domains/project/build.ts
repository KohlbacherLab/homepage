/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

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
