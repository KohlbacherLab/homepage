/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildProject } from './build.ts';
import { formatFunding, formatRuntime, formatRuntimeYears } from './format.ts';
import { isProjectRunning, selectFeaturedProjects } from './select.ts';
import type { Project } from './types.ts';

function project(title: string, start: string, end: string, featured = true) : Project {
    return {
        url: `/projects/${title}.html`,
        title,
        name: title,
        funding: [{ funder: 'DFG' }],
        runtime: { start, end },
        featured,
    };
}

describe('buildProject', () => {
    it('maps valid frontmatter', () => {
        const result = buildProject('/projects/ghga.html', {
            title: 'GHGA',
            name: 'German Human Genome-Phenome Archive',
            website: 'https://ghga.de',
            funding: [{ funder: 'DFG', reference: 'funding number: 441914366' }],
            runtime: { start: '2020-10-01', end: '2028-12-31' },
            featured: true,
        });

        assert.deepEqual(result, {
            url: '/projects/ghga.html',
            title: 'GHGA',
            name: 'German Human Genome-Phenome Archive',
            website: 'https://ghga.de',
            funding: [{ funder: 'DFG', reference: 'funding number: 441914366' }],
            runtime: { start: '2020-10-01', end: '2028-12-31' },
            featured: true,
        });
    });

    it('defaults featured to false and allows funders without reference', () => {
        const result = buildProject('/projects/x.html', {
            title: 'X',
            name: 'X',
            funding: [{ funder: 'Centre for Genomic Regulation (CRG)' }],
            runtime: { start: '2019-01-01', end: '2022-12-31' },
        });

        assert.equal(result.featured, false);
        assert.equal(result.website, undefined);
        assert.deepEqual(result.funding, [{ funder: 'Centre for Genomic Regulation (CRG)', reference: undefined }]);
    });

    it('names the file and key in errors', () => {
        assert.throws(
            () => buildProject('/projects/x.html', {
                title: 'X',
                funding: [{ funder: 'DFG' }],
                runtime: { start: '2019-01-01', end: '2022-12-31' },
            }),
            /^Error: \/projects\/x\.html: frontmatter "name"/,
        );
    });
});

describe('isProjectRunning', () => {
    it('treats the end date as inclusive', () => {
        const item = project('a', '2020-01-01', '2028-12-31');
        assert.equal(isProjectRunning(item, new Date('2028-12-31T12:00:00')), true);
        assert.equal(isProjectRunning(item, new Date('2029-01-01T00:00:01')), false);
    });
});

describe('selectFeaturedProjects', () => {
    it('keeps featured running projects, newest start first, limited', () => {
        const now = new Date('2026-09-17T12:00:00');
        const result = selectFeaturedProjects([
            project('old', '2017-10-01', '2022-03-31'),
            project('ghga', '2020-10-01', '2028-12-31'),
            project('hidden', '2024-01-01', '2028-12-31', false),
            project('pm4onco', '2023-05-01', '2027-04-30'),
            project('privateaim', '2023-04-01', '2027-03-31'),
        ], now, 2);

        assert.deepEqual(result.map((item) => item.title), ['pm4onco', 'privateaim']);
    });
});

describe('format', () => {
    it('formats runtime as German dates and as years', () => {
        const runtime = { start: '2020-10-01', end: '2028-12-31' };
        assert.equal(formatRuntime(runtime), '01.10.2020 - 31.12.2028');
        assert.equal(formatRuntimeYears(runtime), '2020 – 2028');
    });

    it('joins funders with their references', () => {
        assert.equal(
            formatFunding([
                { funder: 'EU', reference: 'funding number: H2020-INFRAIA-2018-1' },
                { funder: 'Centre for Genomic Regulation (CRG)' },
            ]),
            'EU (funding number: H2020-INFRAIA-2018-1) and Centre for Genomic Regulation (CRG)',
        );
    });
});
