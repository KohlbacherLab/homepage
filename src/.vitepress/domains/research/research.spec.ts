/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildResearchAreas } from './build.ts';
import { extractHeadings, verifyResearchAnchors } from './headings.ts';
import { slugify } from './slugify.ts';
import type { ResearchArea } from './types.ts';

describe('slugify', () => {
    it('matches VitePress heading anchors', () => {
        assert.equal(slugify('Computational Mass Spectrometry'), 'computational-mass-spectrometry');
        assert.equal(slugify('DNPM:DIP & Co.'), 'dnpm-dip-co');
        assert.equal(slugify('Café'), 'cafe');
        assert.equal(slugify('1st Area'), '_1st-area');
    });

    it('handles Unicode curly quotes', () => {
        assert.equal(slugify('A \u201csmart\u201d and \u2018curly\u2019 title'), 'a-smart-and-curly-title');
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
            () => buildResearchAreas('/research/', { areas: [{ title: 'A', summary: 'B' }] }),
            /^Error: \/research\/: frontmatter "icon"/,
        );
    });
});

describe('extractHeadings', () => {
    it('collects "## " headings in document order', () => {
        const src = [
            '# Research',
            'Intro text.',
            '',
            '## Computational Immunomics',
            'Body.',
            '',
            '## Structural Bioinformatics',
            'Body.',
        ].join('\n');

        assert.deepEqual(extractHeadings(src), ['Computational Immunomics', 'Structural Bioinformatics']);
    });

    it('ignores deeper headings', () => {
        const src = '## Area\n### Not a match\n#### Also not a match';
        assert.deepEqual(extractHeadings(src), ['Area']);
    });
});

describe('verifyResearchAnchors', () => {
    function area(title: string) : ResearchArea {
        return {
            title,
            summary: 'Summary.',
            icon: 'fa-solid fa-flask',
            anchor: slugify(title),
        };
    }

    it('passes when every anchor matches a heading', () => {
        assert.doesNotThrow(() => verifyResearchAnchors(
            [area('Personalized Medicine')],
            ['Personalized Medicine'],
            '/research/',
        ));
    });

    it('names the offending title and the headings that do exist', () => {
        assert.throws(
            () => verifyResearchAnchors(
                [area('Personalized Medicine')],
                ['Structural Bioinformatics'],
                '/research/',
            ),
            /^Error: \/research\/: research area "Personalized Medicine" has no matching "## " heading on the page \(found: Structural Bioinformatics\)\.$/,
        );
    });
});
