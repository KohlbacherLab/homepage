/*
 * Copyright (c) 2026.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export type Software = {
    /**
     * Page URL as produced by createContentLoader.
     */
    url: string,

    title: string,

    /**
     * One sentence for cards.
     */
    summary: string,

    website?: string,

    repository?: string,

    /**
     * Shown on the start page.
     */
    featured: boolean
};
