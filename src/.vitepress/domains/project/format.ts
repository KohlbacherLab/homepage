/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { ProjectFunding, ProjectRuntime } from './types.ts';

function formatDate(value: string) : string {
    const [year, month, day] = value.split('-');
    return `${day}.${month}.${year}`;
}

export function formatRuntime(runtime: ProjectRuntime) : string {
    return `${formatDate(runtime.start)} - ${formatDate(runtime.end)}`;
}

export function formatRuntimeYears(runtime: ProjectRuntime) : string {
    return `${runtime.start.slice(0, 4)} – ${runtime.end.slice(0, 4)}`;
}

export function formatFunding(funding: ProjectFunding[]) : string {
    return funding
        .map((item) => (item.reference ? `${item.funder} (${item.reference})` : item.funder))
        .join(' and ');
}
