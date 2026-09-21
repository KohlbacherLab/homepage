/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parse } from '@retorquere/bibtex-parser';
import { formatAuthors, formatSource } from './format.ts';
import { getPublicationLink } from './link.ts';
import { sortByYearDescending } from './order.ts';

const { entries } = parse(`
@article{doe2024, title={A Test}, author={Doe, Jane and Roe, Richard and others}, journal={Nature}, volume={11}, number={1}, pages={663}, year={2024}, url={https://example.org/a}}
@article{pmid123, title={Solo}, author={Smith, John}, year={2023}}
@misc{bare, title={Bare}}
`);

const [full, solo, bare] = entries as [typeof entries[0], typeof entries[1], typeof entries[2]];

describe('formatAuthors', () => {
    it('joins last names with initials and drops "others"', () => {
        assert.equal(formatAuthors(full), 'Doe, J. & Roe, R.');
    });

    it('renders a single author without a leading ampersand', () => {
        assert.equal(formatAuthors(solo), 'Smith, J.');
    });

    it('returns an empty string without authors', () => {
        assert.equal(formatAuthors(bare), '');
    });
});

describe('formatSource', () => {
    it('renders year, journal, volume, number and pages', () => {
        assert.equal(formatSource(full), '(2024). Nature, 11 (1), pp. 663');
    });

    it('renders only the year when nothing else is known', () => {
        assert.equal(formatSource(solo), '(2023).');
    });

    it('returns an empty string without any source fields', () => {
        assert.equal(formatSource(bare), '');
    });
});

describe('getPublicationLink', () => {
    it('prefers PubMed for pmid keys', () => {
        assert.equal(getPublicationLink(solo), 'https://pubmed.ncbi.nlm.nih.gov/123');
    });

    it('falls back to the url field', () => {
        assert.equal(getPublicationLink(full), 'https://example.org/a');
    });

    it('returns undefined without pmid or url', () => {
        assert.equal(getPublicationLink(bare), undefined);
    });
});

describe('sortByYearDescending', () => {
    const { entries: yearEntries } = parse(`
@misc{a, title={A}, year={2022}}
@misc{b, title={B}, year={2024}}
@misc{c, title={C}, year={2023}}
@misc{old, title={Old}, year={2020}}
@misc{new, title={New}, year={2026}}
@misc{none, title={None}}
@misc{first, title={First}, year={2024}}
@misc{second, title={Second}, year={2024}}
@misc{no-year-first, title={NoYearFirst}}
@misc{no-year-second, title={NoYearSecond}}
`);

    function findByKeys(...keys: string[]) : typeof yearEntries {
        return keys.map((key) => {
            const entry = yearEntries.find((candidate) => candidate.key === key);
            assert.ok(entry, `missing test fixture entry "${key}"`);
            return entry;
        });
    }

    it('orders newest year first', () => {
        const result = sortByYearDescending(findByKeys('a', 'b', 'c'));
        assert.deepEqual(result.map((entry) => entry.key), ['b', 'c', 'a']);
    });

    it('fixes an out-of-order file', () => {
        const result = sortByYearDescending(findByKeys('old', 'new'));
        assert.deepEqual(result.map((entry) => entry.key), ['new', 'old']);
    });

    it('sorts entries with a missing year last', () => {
        const result = sortByYearDescending(findByKeys('none', 'a'));
        assert.deepEqual(result.map((entry) => entry.key), ['a', 'none']);
    });

    it('keeps file order stable within the same year, missing years included', () => {
        const result = sortByYearDescending(findByKeys('first', 'no-year-first', 'second', 'no-year-second'));

        assert.deepEqual(
            result.map((entry) => entry.key),
            ['first', 'second', 'no-year-first', 'no-year-second'],
        );
    });
});
