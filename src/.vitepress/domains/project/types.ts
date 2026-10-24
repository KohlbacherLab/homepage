/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export type ProjectFunding = {
    /**
     * The funding body.
     *
     * @example 'BMFTR'
     */
    funder: string,

    /**
     * The original reference text, rendered in parentheses.
     *
     * @example 'funding number: 01ZZ2316A'
     */
    reference?: string
};

export type ProjectRuntime = {
    /**
     * ISO date (YYYY-MM-DD).
     */
    start: string,

    /**
     * ISO date (YYYY-MM-DD), inclusive.
     */
    end: string
};

export type Project = {
    /**
     * Page URL as produced by createContentLoader.
     */
    url: string,

    /**
     * Short name.
     *
     * @example 'GHGA'
     */
    title: string,

    /**
     * Full name.
     *
     * @example 'German Human Genome-Phenome Archive'
     */
    name: string,

    website?: string,

    funding: ProjectFunding[],

    runtime: ProjectRuntime,

    /**
     * Candidate for the start page while the project is running.
     */
    featured: boolean
};
