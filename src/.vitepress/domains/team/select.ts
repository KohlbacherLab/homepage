/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Person } from '../person/types.ts';
import { TeamID } from './constants.ts';

export type PersonEntry = [string, Person];

export function isTeamMember(person: Person, team: string) : boolean {
    return [person.team].flat().includes(team);
}

export function selectActiveMembers(entries: PersonEntry[]) : PersonEntry[] {
    return entries.filter(([, person]) => !person.inactive);
}

export function selectTeamMembers(entries: PersonEntry[], team: string, leadSlug?: string) : PersonEntry[] {
    const members = selectActiveMembers(entries)
        .filter(([, person]) => isTeamMember(person, team));

    return [
        ...members.filter(([slug]) => slug === leadSlug),
        ...members.filter(([slug]) => slug !== leadSlug),
    ];
}

export function parseTeamQuery(search: string) : TeamID.ABI | TeamID.TBI | undefined {
    const value = new URLSearchParams(search).get('group');
    if (value === TeamID.ABI || value === TeamID.TBI) {
        return value;
    }

    return undefined;
}
