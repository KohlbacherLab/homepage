/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildHome } from './build.ts';

const LEAD = {
    person: 'kohlbacher-oliver',
    name: 'Prof. Dr. Oliver Kohlbacher',
    role: 'Head of the lab',
    summary: 'Director.',
};

const HERO = {
    eyebrow: 'Applied & Translational Bioinformatics',
    title: 'Algorithms, software and infrastructure for',
    highlight: 'omics and clinical data.',
    description: 'From mass spectrometry to national research data platforms.',
    actions: [
        { text: 'Our research', link: '/research' },
        { text: 'Publications', link: '/publications' },
    ],
};

const GROUP_ABI = {
    id: 'abi',
    name: 'Applied Bioinformatics',
    institution: 'University of Tübingen',
    summary: 'Omics data analysis.',
};

const GROUP_TBI = {
    id: 'tbi',
    name: 'Translational Bioinformatics',
    institution: 'University Hospital Tübingen',
    summary: 'Medical informatics.',
};

const GROUPS = {
    intro: 'Founded in 2000.',
    items: [GROUP_ABI, GROUP_TBI],
};

const VALID = {
    lead: LEAD,
    hero: HERO,
    groups: GROUPS,
};

describe('buildHome', () => {
    it('maps valid frontmatter', () => {
        assert.deepEqual(buildHome('index.md', VALID), VALID);
    });

    it('names the file and key when a key is missing', () => {
        const hero = {
            eyebrow: HERO.eyebrow,
            title: HERO.title,
            description: HERO.description,
            actions: HERO.actions,
        };

        assert.throws(
            () => buildHome('index.md', { ...VALID, hero }),
            /^Error: index\.md: frontmatter "highlight"/,
        );
    });

    it('rejects a groups.items[].id that is not a known team id', () => {
        assert.throws(
            () => buildHome('index.md', {
                ...VALID,
                groups: { ...GROUPS, items: [{ ...GROUP_ABI, id: 'all' }] },
            }),
            /^Error: index\.md: frontmatter "groups\.items\[\]\.id" \(all\) is not a known team id\.$/,
        );
    });
});
