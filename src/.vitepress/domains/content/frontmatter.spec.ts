/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
    readDate,
    readList,
    readObject,
    readOptionalString,
    readString,
} from './frontmatter.ts';

describe('readString', () => {
    it('returns trimmed strings', () => {
        assert.equal(readString({ title: ' GHGA ' }, 'title', 'a.md'), 'GHGA');
    });

    it('throws for missing or empty values', () => {
        assert.throws(() => readString({}, 'title', 'a.md'), /^Error: a\.md: frontmatter "title"/);
        assert.throws(() => readString({ title: '  ' }, 'title', 'a.md'), /non-empty string/);
    });
});

describe('readOptionalString', () => {
    it('returns undefined for missing values', () => {
        assert.equal(readOptionalString({}, 'website', 'a.md'), undefined);
    });

    it('validates present values', () => {
        assert.throws(() => readOptionalString({ website: 3 }, 'website', 'a.md'), /"website"/);
    });
});

describe('readDate', () => {
    it('accepts quoted ISO dates', () => {
        assert.equal(readDate({ start: '2020-10-01' }, 'start', 'a.md'), '2020-10-01');
    });

    it('rejects unquoted YAML dates and other formats', () => {
        assert.throws(() => readDate({ start: new Date('2020-10-01') }, 'start', 'a.md'), /quoted date string/);
        assert.throws(() => readDate({ start: '01.10.2020' }, 'start', 'a.md'), /quoted date string/);
    });
});

describe('readObject', () => {
    it('returns objects and rejects lists', () => {
        assert.deepEqual(readObject({ runtime: { start: 'x' } }, 'runtime', 'a.md'), { start: 'x' });
        assert.throws(() => readObject({ runtime: [] }, 'runtime', 'a.md'), /must be an object/);
    });
});

describe('readList', () => {
    it('returns lists of objects', () => {
        assert.deepEqual(readList({ funding: [{ funder: 'DFG' }] }, 'funding', 'a.md'), [{ funder: 'DFG' }]);
    });

    it('rejects empty lists and non-object items', () => {
        assert.throws(() => readList({ funding: [] }, 'funding', 'a.md'), /non-empty list/);
        assert.throws(() => readList({ funding: ['DFG'] }, 'funding', 'a.md'), /"funding\[0\]" must be an object/);
    });
});
