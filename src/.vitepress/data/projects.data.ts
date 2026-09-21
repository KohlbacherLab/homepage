/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { createContentLoader } from 'vitepress';
import { buildProject } from '../domains/project/build.ts';
import { compareProjectsByStart } from '../domains/project/select.ts';
import type { Project } from '../domains/project/types.ts';

declare const data: { generatedAt: string, items: Project[] };
export { data };

export default createContentLoader('projects/*.md', {
    transform(raw) : { generatedAt: string, items: Project[] } {
        return {
            // Stamped once at build time so components derive "featured" the
            // same way during SSR and client hydration.
            generatedAt: new Date().toISOString(),
            items: raw
                // The section index (`/projects/`) has no project frontmatter.
                .filter((page) => !page.url.endsWith('/'))
                .map((page) => buildProject(page.url, page.frontmatter))
                .sort(compareProjectsByStart),
        };
    },
});
