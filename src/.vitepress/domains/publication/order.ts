/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Entry } from '@retorquere/bibtex-parser';

/**
 * Sort entries newest year first. Entries with a missing or non-numeric
 * `year` sort last. Stable: entries that tie on year (including two
 * without one) keep their relative order from `entries`.
 */
export function sortByYearDescending(entries: Entry[]) : Entry[] {
    return [...entries].sort((a, b) => {
        const yearA = Number(a.fields.year);
        const yearB = Number(b.fields.year);
        const validA = Number.isFinite(yearA);
        const validB = Number.isFinite(yearB);

        if (!validA && !validB) {
            return 0;
        }

        if (!validA) {
            return 1;
        }

        if (!validB) {
            return -1;
        }

        return yearB - yearA;
    });
}
