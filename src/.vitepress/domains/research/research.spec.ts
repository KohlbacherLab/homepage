/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildResearchAreas } from './build.ts';
import { slugify } from './slugify.ts';

describe('slugify', () => {
    it('matches VitePress heading anchors', () => {
        assert.equal(slugify('Computational Mass Spectrometry'), 'computational-mass-spectrometry');
        assert.equal(slugify('DNPM:DIP & Co.'), 'dnpm-dip-co');
        assert.equal(slugify('Café'), 'cafe');
        assert.equal(slugify('1st Area'), '_1st-area');
    });

    it('handles Unicode curly quotes', () => {
        assert.equal(slugify('A "smart" and ‘curly’ title'), 'a-smart-and-curly-title');
    });
});

describe('buildResearchAreas', () => {
    it('maps areas and derives anchors', () => {
        assert.deepEqual(buildResearchAreas('/research/', {
            areas: [
                {
                    title: 'Personalized Medicine',
                    summary: 'Data integration.',
                    icon: 'fa-solid fa-heart-pulse',
                },
            ],
        }), [
            {
                title: 'Personalized Medicine',
                summary: 'Data integration.',
                icon: 'fa-solid fa-heart-pulse',
                anchor: 'personalized-medicine',
            },
        ]);
    });

    it('requires an icon', () => {
        assert.throws(
            () => buildResearchAreas('/research/', {
                areas: [
                    { title: 'A', summary: 'B' },
                ],
            }),
            /^Error: \/research\/: frontmatter "icon"/,
        );
    });
});
