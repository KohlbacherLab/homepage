/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export type HomeAction = {
    text: string,
    link: string
};

export type HomeHero = {
    eyebrow: string,

    /**
     * Headline before the highlighted part.
     */
    title: string,

    /**
     * Headline end, rendered with the accent gradient.
     */
    highlight: string,

    description: string,

    /**
     * First action is the primary button.
     */
    actions: HomeAction[]
};

export type HomeLead = {
    /**
     * Person slug (file name in data/persons without extension).
     */
    person: string,

    /**
     * Display name including titles.
     */
    name: string,

    role: string,

    summary: string
};

export type HomeGroup = {
    id: 'abi' | 'tbi',
    name: string,
    institution: string,
    summary: string
};

export type HomeGroups = {
    intro: string,
    items: HomeGroup[]
};

export type Home = {
    lead: HomeLead,
    hero: HomeHero,
    groups: HomeGroups
};
