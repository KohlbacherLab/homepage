/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { useData } from 'vitepress';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { data } from '../../data/team.data';
import { buildHome } from '../../domains/home/build.ts';
import { getPersonAvatar } from '../../domains/person/avatar.ts';
import type { Home, HomeLead } from './types.ts';

// The only file this validates: src/index.md, the VitePress home page.
const SOURCE = 'index.md';

export type HomeLeadView = HomeLead & { avatar: string };

/**
 * Validated `src/index.md` frontmatter (`lead`, `hero`, `groups`). Throws
 * with the offending key when a page author's edit does not match the
 * shape `KHomeHero`/`KHomeGroups`/`useHomeLead` expect.
 */
export function useHome() : ComputedRef<Home> {
    const { frontmatter } = useData();

    return computed(() => buildHome(SOURCE, frontmatter.value));
}

export function useHomeLead() : ComputedRef<HomeLeadView> {
    const home = useHome();

    return computed(() => {
        const { lead } = home.value;
        const entry = data.find(([slug]) => slug === lead.person);
        if (!entry) {
            throw new Error(`${SOURCE}: frontmatter "lead.person" (${lead.person}) matches no person data file.`);
        }

        return {
            ...lead,
            avatar: getPersonAvatar(entry[1]),
        };
    });
}
