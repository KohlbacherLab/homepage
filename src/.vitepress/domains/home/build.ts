/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Frontmatter } from '../content/frontmatter.ts';
import {
    readList,
    readObject,
    readString,
} from '../content/frontmatter.ts';
import { TeamID } from '../team/constants.ts';
import type {
    Home,
    HomeAction,
    HomeGroup,
    HomeGroups,
    HomeHero,
    HomeLead,
} from './types.ts';

function isKnownGroupId(value: string) : value is HomeGroup['id'] {
    return value === TeamID.ABI || value === TeamID.TBI;
}

function buildHomeLead(frontmatter: Frontmatter, source: string) : HomeLead {
    const lead = readObject(frontmatter, 'lead', source);

    return {
        person: readString(lead, 'person', source),
        name: readString(lead, 'name', source),
        role: readString(lead, 'role', source),
        summary: readString(lead, 'summary', source),
    };
}

function buildHomeAction(item: Frontmatter, source: string) : HomeAction {
    return {
        text: readString(item, 'text', source),
        link: readString(item, 'link', source),
    };
}

function buildHomeHero(frontmatter: Frontmatter, source: string) : HomeHero {
    const hero = readObject(frontmatter, 'hero', source);

    return {
        eyebrow: readString(hero, 'eyebrow', source),
        title: readString(hero, 'title', source),
        highlight: readString(hero, 'highlight', source),
        description: readString(hero, 'description', source),
        actions: readList(hero, 'actions', source).map((item) => buildHomeAction(item, source)),
    };
}

function buildHomeGroup(item: Frontmatter, source: string) : HomeGroup {
    const id = readString(item, 'id', source);
    if (!isKnownGroupId(id)) {
        throw new Error(`${source}: frontmatter "groups.items[].id" (${id}) is not a known team id.`);
    }

    return {
        id,
        name: readString(item, 'name', source),
        institution: readString(item, 'institution', source),
        summary: readString(item, 'summary', source),
    };
}

function buildHomeGroups(frontmatter: Frontmatter, source: string) : HomeGroups {
    const groups = readObject(frontmatter, 'groups', source);

    return {
        intro: readString(groups, 'intro', source),
        items: readList(groups, 'items', source).map((item) => buildHomeGroup(item, source)),
    };
}

export function buildHome(source: string, frontmatter: Frontmatter) : Home {
    return {
        lead: buildHomeLead(frontmatter, source),
        hero: buildHomeHero(frontmatter, source),
        groups: buildHomeGroups(frontmatter, source),
    };
}
