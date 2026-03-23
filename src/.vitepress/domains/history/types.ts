/*
 * Copyright (c) 2024-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

/**
 * Represents a chronological entry (e.g., education, award, biography item).
 */
export type HistoryEntry = {
    /**
     * The year or year range of the entry.
     * Use a single number for a specific year or a tuple for a range.
     *
     * @example 2020
     * @example [2018, 2022]
     */
    year: number | [number, number],

    /**
     * A description of the entry.
     */
    value: string
};
