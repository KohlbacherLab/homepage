/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEFAULT_AVATAR, getPersonAvatar } from '../person/avatar.ts';
import type { Person } from '../person/types.ts';
import { TeamID } from './constants.ts';
import type { PersonEntry } from './select.ts';
import {
    isTeamMember,
    parseTeamQuery,
    selectActiveMembers,
    selectTeamMembers,
} from './select.ts';

function person(name: string, team: string | string[], extra: Partial<Person> = {}) : Person {
    return {
        name,
        team,
        ...extra,
    };
}

const entries : [PersonEntry, PersonEntry, PersonEntry, PersonEntry] = [
    ['a', person('A', TeamID.ABI)],
    ['b', person('B', TeamID.TBI)],
    ['lead', person('Lead', [TeamID.ABI, TeamID.TBI])],
    ['gone', person('Gone', TeamID.ABI, { inactive: true })],
];

describe('isTeamMember', () => {
    it('handles single and multiple teams', () => {
        assert.equal(isTeamMember(entries[0][1], TeamID.ABI), true);
        assert.equal(isTeamMember(entries[0][1], TeamID.TBI), false);
        assert.equal(isTeamMember(entries[2][1], TeamID.TBI), true);
    });
});

describe('selectActiveMembers', () => {
    it('drops inactive persons', () => {
        assert.deepEqual(selectActiveMembers(entries).map(([slug]) => slug), ['a', 'b', 'lead']);
    });
});

describe('selectTeamMembers', () => {
    it('returns active team members with the lead first', () => {
        assert.deepEqual(selectTeamMembers(entries, TeamID.ABI, 'lead').map(([slug]) => slug), ['lead', 'a']);
        assert.deepEqual(selectTeamMembers(entries, TeamID.TBI).map(([slug]) => slug), ['b', 'lead']);
    });
});

describe('parseTeamQuery', () => {
    it('accepts abi and tbi only', () => {
        assert.equal(parseTeamQuery('?group=abi'), TeamID.ABI);
        assert.equal(parseTeamQuery('?group=tbi'), TeamID.TBI);
        assert.equal(parseTeamQuery('?group=all'), undefined);
        assert.equal(parseTeamQuery(''), undefined);
    });
});

describe('getPersonAvatar', () => {
    it('falls back to the default avatar', () => {
        assert.equal(getPersonAvatar(person('A', TeamID.ABI, { avatar: '/a.png' })), '/a.png');
        assert.equal(getPersonAvatar(person('A', TeamID.ABI)), DEFAULT_AVATAR);
    });
});
