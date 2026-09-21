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
