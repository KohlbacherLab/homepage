/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

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
