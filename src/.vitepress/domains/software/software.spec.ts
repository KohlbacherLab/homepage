/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildSoftware } from './build.ts';
import { selectFeaturedSoftware } from './select.ts';
import type { Software } from './types.ts';

function software(title: string, featured = true) : Software {
    return {
        url: `/software/${title}.html`,
        title,
        summary: title,
        featured,
    };
}

describe('buildSoftware', () => {
    it('maps valid frontmatter', () => {
        assert.deepEqual(buildSoftware('/software/open-ms.html', {
            title: 'OpenMS',
            summary: 'Open-source software for mass spectrometry analysis.',
            website: 'https://www.openms.de',
            repository: 'https://github.com/OpenMS/OpenMS',
            featured: true,
        }), {
            url: '/software/open-ms.html',
            title: 'OpenMS',
            summary: 'Open-source software for mass spectrometry analysis.',
            website: 'https://www.openms.de',
            repository: 'https://github.com/OpenMS/OpenMS',
            featured: true,
        });
    });

    it('requires a summary', () => {
        assert.throws(() => buildSoftware('/software/x.html', { title: 'X' }), /"summary"/);
    });
});

describe('selectFeaturedSoftware', () => {
    it('keeps featured items sorted by title, limited', () => {
        const result = selectFeaturedSoftware([
            software('OpenMS'),
            software('XLEC', false),
            software('FLAME'),
            software('DNPM:DIP'),
        ], 2);

        assert.deepEqual(result.map((item) => item.title), ['DNPM:DIP', 'FLAME']);
    });
});
