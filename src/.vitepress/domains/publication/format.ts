/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Entry } from '@retorquere/bibtex-parser';

/**
 * Format authors as "Doe, J., Roe, R. & Poe, P.". BibTeX "and others" is dropped.
 */
export function formatAuthors(entry: Entry) : string {
    const names = (entry.fields.author ?? [])
        .filter((author) => !!author.lastName && author.lastName !== 'others')
        .map((author) => (author.firstName ?
            `${author.lastName}, ${author.firstName.at(0)}.` :
            `${author.lastName}`));

    const last = names.pop();
    if (!last) {
        return '';
    }

    if (names.length === 0) {
        return last;
    }

    return `${names.join(', ')} & ${last}`;
}

/**
 * Format the source as "(2024). Nature, 11 (1), pp. 663".
 */
export function formatSource(entry: Entry) : string {
    const parts : string[] = [];
    if (entry.fields.journal) {
        parts.push(entry.fields.journal);
    }

    if (entry.fields.volume) {
        let text = entry.fields.volume;
        if (entry.fields.number) {
            text += ` (${entry.fields.number})`;
        }

        parts.push(text);
    }

    if (entry.fields.pages) {
        parts.push(`pp. ${entry.fields.pages}`);
    }

    const source = parts.join(', ');
    if (!entry.fields.year) {
        return source;
    }

    return source.length > 0 ?
        `(${entry.fields.year}). ${source}` :
        `(${entry.fields.year}).`;
}
